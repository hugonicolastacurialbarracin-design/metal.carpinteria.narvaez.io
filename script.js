// ============================================================
// SCRIPT - Metal Carpintería Narváez
// Menú hamburguesa, galería con carruseles y leyendas,
// catálogo dinámico, envío de correos con EmailJS
// ============================================================

(function() {
  'use strict';

  // ---------- 1. MENÚ HAMBURGUESA ----------
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle('open');
      menuToggle.classList.toggle('active');
      menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
    });

    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-label', 'Abrir menú');
      });
    });

    document.addEventListener('click', function(e) {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        navMenu.classList.remove('open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-label', 'Abrir menú');
      }
    });
  }

  // ---------- 2. DATOS DE PRODUCTOS (ACTUALIZADOS) ----------
  const productosData = [
    {
      nombre: 'Armarios a medida',
      material: 'Madera o metal, según preferencia',
      desc: 'Diseños personalizados para cada espacio.',
      imagenes: ['armario.jpg', 'armario.png', 'armario3.png', 'armario2.png', 'armario4.png']
    },
    {
      nombre: 'Mesas familiares',
      material: 'Madera',
      desc: 'Mesas amplias y duraderas para reuniones.',
      imagenes: ['mesa2.png', 'mesa1.png']   // Principal: mesa2.png
    },
    {
      nombre: 'Sillas de madera',
      material: 'Madera o metal, según preferencia',
      desc: 'Sólidas, cómodas y con estilo rústico.',
      imagenes: ['sillas.png', 'sillas2.png', 'sillas3.png']
    },
    {
      nombre: 'Aparadores',
      material: 'Unitarios o juegos completos',
      desc: 'Elegancia y funcionalidad para tu hogar.',
      imagenes: ['aparadores.png', 'juego_aparadores.png']
    },
    {
      nombre: 'Puertas',
      material: 'Madera',
      desc: 'Seguridad y belleza en la entrada.',
      imagenes: ['puerta4.png', 'puerta5.png', 'puerta3.png', 'puerta2.png', 'puerta1.png'] // Principal: puerta4.png
    },
    // Eliminados: Marcos, Letreros, Cobertizos, Casitas
    {
      nombre: 'Camas',
      material: 'Madera o metal, según preferencia',
      desc: 'Diseños únicos para un descanso reparador.',
      imagenes: ['camas.png', 'cama2.png', 'camas3.png']
    },
    {
      nombre: 'Escaleras',
      material: 'Madera o metal, según preferencia',
      desc: 'Escaleras sólidas y elegantes, diseñadas a medida.',
      imagenes: ['escaleras.png', 'escaleras2.png']
    },
    {
      nombre: 'Ventanas',
      material: 'Madera o metal, según preferencia',
      desc: 'Ventanas rústicas con excelente aislamiento y durabilidad.',
      imagenes: ['ventana.png']
    },
    {
      nombre: 'Percheros',
      material: 'Madera o metal, según preferencia',
      desc: 'Percheros únicos, perfectos para recibidores y espacios rústicos.',
      imagenes: ['perchero_hierro.png']
    }
  ];

  // ---------- 3. RENDERIZAR CATÁLOGO (sin botón de WhatsApp) ----------
  function renderCatalogo() {
    const grid = document.getElementById('catalogoGrid');
    if (!grid) return;

    let html = '';
    productosData.forEach((prod) => {
      const imgPrincipal = prod.imagenes.length > 0 ? prod.imagenes[0] : '';
      html += `
        <div class="producto-card">
          <img src="${imgPrincipal}" alt="${prod.nombre}" class="producto-imagen" loading="lazy" />
          <h3>${prod.nombre}</h3>
          <p class="producto-material">Material sugerido: ${prod.material}</p>
          <p class="producto-desc">${prod.desc}</p>
        </div>
      `;
    });
    grid.innerHTML = html;
  }

  // ---------- 4. RENDERIZAR GALERÍA CON CARRUSELES Y LEYENDAS ----------
  function renderGaleria() {
    const container = document.getElementById('galeriaContainer');
    if (!container) return;

    let html = '';
    productosData.forEach((prod, index) => {
      if (prod.imagenes.length === 0) return;

      let slidesHtml = '';
      prod.imagenes.forEach((img) => {
        slidesHtml += `
          <div class="carrusel-slide-wrapper" style="min-width:100%; height:100%; position:relative;">
            <img src="${img}" alt="${prod.nombre}" class="carrusel-slide" loading="lazy" />
            <div class="carrusel-leyenda">${prod.nombre}</div>
          </div>
        `;
      });

      let indicadoresHtml = '';
      for (let i = 0; i < prod.imagenes.length; i++) {
        indicadoresHtml += `<button class="carrusel-indicador ${i === 0 ? 'active' : ''}" data-index="${i}"></button>`;
      }

      html += `
        <div class="carrusel-categoria" data-categoria="${index}">
          <h3>${prod.nombre}</h3>
          <div class="carrusel-wrapper">
            <div class="carrusel-slides" data-slide="${index}">
              ${slidesHtml}
            </div>
            <button class="carrusel-btn prev" data-categoria="${index}"><i class="fas fa-chevron-left"></i></button>
            <button class="carrusel-btn next" data-categoria="${index}"><i class="fas fa-chevron-right"></i></button>
          </div>
          <div class="carrusel-indicadores" data-categoria="${index}">
            ${indicadoresHtml}
          </div>
        </div>
      `;
    });
    container.innerHTML = html;

    inicializarCarruseles();
  }

  // ---------- 5. LÓGICA DE CARRUSELES ----------
  function inicializarCarruseles() {
    const categorias = document.querySelectorAll('.carrusel-categoria');
    categorias.forEach((cat) => {
      const slidesContainer = cat.querySelector('.carrusel-slides');
      const slides = slidesContainer.querySelectorAll('.carrusel-slide-wrapper');
      const totalSlides = slides.length;
      if (totalSlides <= 1) {
        cat.querySelector('.carrusel-btn.prev').style.display = 'none';
        cat.querySelector('.carrusel-btn.next').style.display = 'none';
        cat.querySelector('.carrusel-indicadores').style.display = 'none';
        return;
      }

      let currentIndex = 0;
      const prevBtn = cat.querySelector('.carrusel-btn.prev');
      const nextBtn = cat.querySelector('.carrusel-btn.next');
      const indicadores = cat.querySelectorAll('.carrusel-indicador');

      function goToSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        currentIndex = index;
        const offset = -currentIndex * 100;
        slidesContainer.style.transform = `translateX(${offset}%)`;
        indicadores.forEach((ind, i) => {
          ind.classList.toggle('active', i === currentIndex);
        });
      }

      prevBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        goToSlide(currentIndex - 1);
      });

      nextBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        goToSlide(currentIndex + 1);
      });

      indicadores.forEach((ind, i) => {
        ind.addEventListener('click', function() {
          goToSlide(i);
        });
      });
    });
  }

  // ---------- 6. FORMULARIO DE CONTACTO CON EMAILJS ----------
  function initForm() {
    const form = document.getElementById('contactForm');
    const feedback = document.getElementById('formFeedback');
    if (!form || !feedback) return;

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const nombre = document.getElementById('nombre');
      const email = document.getElementById('email');
      const mensaje = document.getElementById('mensaje');

      // Validación
      let valid = true;
      let errorMsg = '';
      [nombre, email, mensaje].forEach(field => field.style.borderColor = '');

      if (!nombre.value.trim()) {
        valid = false;
        nombre.style.borderColor = '#b33c3c';
        errorMsg = 'Por favor, completa tu nombre.';
      } else if (!email.value.trim() || !email.value.includes('@')) {
        valid = false;
        email.style.borderColor = '#b33c3c';
        errorMsg = 'Por favor, ingresa un correo electrónico válido.';
      } else if (!mensaje.value.trim()) {
        valid = false;
        mensaje.style.borderColor = '#b33c3c';
        errorMsg = 'Escribe tu mensaje para poder ayudarte.';
      }

      if (!valid) {
        feedback.textContent = '❌ ' + errorMsg;
        feedback.className = 'form-feedback error';
        return;
      }

      // ---------- CONFIGURACIÓN DE EMAILJS ----------
      // Reemplaza estos valores con los tuyos desde EmailJS
      const serviceID = 'service_xxxxxxxx';   // Tu Service ID
      const templateID = 'template_xxxxxxxx'; // Tu Template ID
      const publicKey = 'xxxxxxxxxxxxxxxx';   // Tu Public Key

      // Inicializar EmailJS (solo una vez)
      if (typeof emailjs !== 'undefined') {
        emailjs.init(publicKey);
      } else {
        feedback.textContent = '❌ Error: EmailJS no está cargado.';
        feedback.className = 'form-feedback error';
        return;
      }

      const params = {
        from_name: nombre.value,
        from_email: email.value,
        message: mensaje.value,
        to_email: 'alfredronarvaez@gmail.com'
      };

      emailjs.send(serviceID, templateID, params)
        .then(function(response) {
          feedback.textContent = '✅ ¡Mensaje enviado con éxito! Te responderemos a la brevedad.';
          feedback.className = 'form-feedback success';
          form.reset();
          [nombre, email, mensaje].forEach(field => field.style.borderColor = '');
        })
        .catch(function(error) {
          feedback.textContent = '❌ Error al enviar el mensaje. Intenta de nuevo más tarde.';
          feedback.className = 'form-feedback error';
          console.error('EmailJS error:', error);
        });
    });
  }

  // ---------- 7. EJECUTAR AL CARGAR ----------
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      renderCatalogo();
      renderGaleria();
      initForm();
    });
  } else {
    renderCatalogo();
    renderGaleria();
    initForm();
  }
})();
