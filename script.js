// ============================================================
// SCRIPT - CARPINTERÍA ALFREDO
// Menú hamburguesa, WhatsApp, catálogo dinámico, galería y validación
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
  const PHONE_NUMBER = '5491123456789'; // Reemplazar con número real

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

  // ---------- 3. DATOS DE PRODUCTOS CON IMÁGENES ----------
  const productosData = [
    { 
      nombre: 'Armarios a medida', 
      material: 'Madera de pino y roble', 
      desc: 'Diseños personalizados para cada espacio.',
      img: 'static/img/armario.jpg'
    },
    { 
      nombre: 'Mesas familiares', 
      material: 'Madera de nogal y castaño', 
      desc: 'Mesas amplias y duraderas para reuniones.',
      img: 'static/img/mesas.jpg'
    },
    { 
      nombre: 'Sillas de madera', 
      material: 'Roble y haya', 
      desc: 'Sólidas, cómodas y con estilo rústico.',
      img: 'static/img/sillas.png'
    },
    { 
      nombre: 'Aparadores', 
      material: 'Cedro y caoba', 
      desc: 'Elegancia y funcionalidad para tu hogar.',
      img: 'static/img/aparadores.png'
    },
    { 
      nombre: 'Puertas principales', 
      material: 'Madera maciza de pino', 
      desc: 'Seguridad y belleza en la entrada.',
      img: 'static/img/puertas.png'
    },
    { 
      nombre: 'Marcos estructurales', 
      material: 'Madera laminada', 
      desc: 'Perfectos para techos y vigas a la vista.',
      img: 'static/img/marcos.png'
    },
    { 
      nombre: 'Letreros tallados', 
      material: 'Madera de algarrobo', 
      desc: 'Arte en madera para negocios y hogares.',
      img: 'static/img/letreros.png'
    },
    { 
      nombre: 'Camas y cabeceras', 
      material: 'Pino y cerezo', 
      desc: 'Diseños únicos para un descanso reparador.',
      img: 'static/img/camas.png'
    },
    { 
      nombre: 'Cobertizos / Pérgolas', 
      material: 'Madera tratada', 
      desc: 'Estructuras exteriores resistentes y hermosas.',
      img: 'static/img/cobertizo.png'
    },
    { 
      nombre: 'Casitas para mascotas', 
      material: 'Madera reciclada', 
      desc: 'Hogares acogedores para tus compañeros.',
      img: 'static/img/casa_perro.png'
    }
  ];

  // ---------- 4. RENDERIZAR CATÁLOGO ----------
  function renderCatalogo() {
    const grid = document.getElementById('catalogoGrid');
    if (!grid) return;

    let html = '';
    productosData.forEach((prod, index) => {
      html += `
        <div class="producto-card">
          <img src="${prod.img}" alt="${prod.nombre}" class="producto-imagen" loading="lazy" />
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

  // ---------- 5. RENDERIZAR GALERÍA ----------
  function renderGaleria() {
    const grid = document.getElementById('galeriaGrid');
    if (!grid) return;

    // Usamos las mismas imágenes pero en un layout de galería
    let html = '';
    productosData.forEach(prod => {
      html += `<img src="${prod.img}" alt="${prod.nombre}" loading="lazy" />`;
    });
    grid.innerHTML = html;
  }

  // ---------- 6. VALIDACIÓN DEL FORMULARIO ----------
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

  // ---------- 7. EJECUTAR AL CARGAR ----------
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      renderCatalogo();
      renderGaleria();
      initForm();
      // Reasignar eventos a botones ya existentes (hero)
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