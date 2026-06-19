// ============================================================
// SCRIPT - Metal Carpintería Narváez
// Menú hamburguesa, WhatsApp, catálogo dinámico, galería con carruseles
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

  // ---------- 2. WHATSAPP ----------
  const DEFAULT_WHATSAPP_MESSAGE = 'Hola, me gustaría cotizar un mueble a medida. ¿Podrían ayudarme?';
  const PHONE_NUMBER = '0982021792';

  function handleWhatsAppClick(e) {
    const btn = e.currentTarget;
    let message = btn.getAttribute('data-message') || DEFAULT_WHATSAPP_MESSAGE;
    const card = btn.closest('.producto-card');
    if (card) {
      const title = card.querySelector('h3')?.textContent?.trim() || '';
      if (title) {
        message = `Hola, me interesa cotizar "${title}". ¿Podrían darme más información?`;
      }
    }
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${PHONE_NUMBER}?text=${encoded}`;
    window.open(url, '_blank');
  }

  document.addEventListener('DOMContentLoaded', function() {
    const whatsappBtns = document.querySelectorAll('.btn-whatsapp');
    whatsappBtns.forEach(btn => {
      btn.addEventListener('click', handleWhatsAppClick);
    });
  });

  // ---------- 3. DATOS DE PRODUCTOS CON MÚLTIPLES IMÁGENES ----------
  const productosData = [
    {
      nombre: 'Armarios a medida',
      material: 'Madera o metal, según preferencia',
      desc: 'Diseños personalizados para cada espacio.',
      imagenes: [
        'armario.jpg', 'armario.png', 'armario3.png', 'armario2.png', 'armario4.png'
      ]
    },
    {
      nombre: 'Mesas familiares',
      material: 'Madera',
      desc: 'Mesas amplias y duraderas para reuniones.',
      imagenes: ['mesas.jpg']
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
      imagenes: ['puertas.png']
    },
    {
      nombre: 'Marcos para fotos o pinturas',
      material: 'Madera',
      desc: 'Perfectos para decorar tu espacio.',
      imagenes: ['marcos.png']
    },
    {
      nombre: 'Letreros tallados',
      material: 'Madera',
      desc: 'Arte en madera para negocios y hogares.',
      imagenes: ['letreros.png']
    },
    {
      nombre: 'Camas',
      material: 'Madera o metal, según preferencia',
      desc: 'Diseños únicos para un descanso reparador.',
      imagenes: ['camas.png', 'cama2.png', 'camas3.png']
    },
    {
      nombre: 'Cobertizos',
      material: 'Madera',
      desc: 'Estructuras exteriores resistentes y hermosas.',
      imagenes: ['cobertizo.png']
    },
    {
      nombre: 'Casitas para mascotas',
      material: 'Madera',
      desc: 'Hogares acogedores para tus compañeros.',
      imagenes: ['casa_perro.png']
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

  // ---------- 4. RENDERIZAR CATÁLOGO ----------
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
          <a href="#" class="btn btn-whatsapp" data-message="Hola, me interesa cotizar "${prod.nombre}". ¿Podrían darme más información?">
            <i class="fab fa-whatsapp"></i> Trabajo bajo pedido - Cotizar diseño
          </a>
        </div>
      `;
    });
    grid.innerHTML = html;

    // Reasignar eventos a los nuevos botones
    const newBtns = grid.querySelectorAll('.btn-whatsapp');
    newBtns.forEach(btn => {
      btn.addEventListener('click', handleWhatsAppClick);
    });
  }

  // ---------- 5. RENDERIZAR GALERÍA CON CARRUSELES ----------
  function renderGaleria() {
    const container = document.getElementById('galeriaContainer');
    if (!container) return;

    let html = '';
    productosData.forEach((prod, index) => {
      if (prod.imagenes.length === 0) return;

      // Crear los slides
      let slidesHtml = '';
      prod.imagenes.forEach((img) => {
        slidesHtml += `<img src="${img}" alt="${prod.nombre}" class="carrusel-slide" loading="lazy" />`;
      });

      // Crear indicadores
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

    // Inicializar cada carrusel
    inicializarCarruseles();
  }

  // ---------- 6. LÓGICA DE CARRUSELES ----------
  function inicializarCarruseles() {
    const categorias = document.querySelectorAll('.carrusel-categoria');
    categorias.forEach((cat, idx) => {
      const slidesContainer = cat.querySelector('.carrusel-slides');
      const slides = slidesContainer.querySelectorAll('.carrusel-slide');
      const totalSlides = slides.length;
      if (totalSlides <= 1) {
        // Ocultar botones si solo hay una imagen
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
        // Actualizar indicadores
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

      // Opcional: teclado o touch, pero por simplicidad no se implementa.
    });
  }

  // ---------- 7. VALIDACIÓN DEL FORMULARIO ----------
  function initForm() {
    const form = document.getElementById('contactForm');
    const feedback = document.getElementById('formFeedback');
    if (!form || !feedback) return;

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const nombre = document.getElementById('nombre');
      const email = document.getElementById('email');
      const mensaje = document.getElementById('mensaje');

      [nombre, email, mensaje].forEach(field => {
        field.style.borderColor = '';
      });

      let valid = true;
      let errorMsg = '';

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

      if (valid) {
        feedback.textContent = '✅ ¡Mensaje enviado con éxito! Te responderemos a la brevedad.';
        feedback.className = 'form-feedback success';
        form.reset();
        [nombre, email, mensaje].forEach(field => {
          field.style.borderColor = '';
        });
      } else {
        feedback.textContent = '❌ ' + errorMsg;
        feedback.className = 'form-feedback error';
      }
    });
  }

  // ---------- 8. EJECUTAR AL CARGAR ----------
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      renderCatalogo();
      renderGaleria();
      initForm();
      const heroBtns = document.querySelectorAll('.hero .btn-whatsapp');
      heroBtns.forEach(btn => btn.addEventListener('click', handleWhatsAppClick));
    });
  } else {
    renderCatalogo();
    renderGaleria();
    initForm();
    const heroBtns = document.querySelectorAll('.hero .btn-whatsapp');
    heroBtns.forEach(btn => btn.addEventListener('click', handleWhatsAppClick));
  }
})();
