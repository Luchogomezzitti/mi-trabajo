// =====================================================
// ESPERAR A QUE CARGUE TODO EL DOM
// =====================================================
window.addEventListener('load', function() {
    console.log('🚀 Página cargada completamente');
    inicializarFormulario();
    inicializarCarousel();
    inicializarAnimaciones();
});

// =====================================================
// FORMULARIO DE CONTACTO - WHATSAPP
// =====================================================
function inicializarFormulario() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        console.log('✅ Formulario encontrado');
        
        form.onsubmit = function(e) {
            e.preventDefault();
            console.log('📝 Formulario enviado');
            
            // Obtener valores
            var nombre = document.getElementById('nombre').value;
            var telefono = document.getElementById('telefono').value;
            var especialidad = document.getElementById('especialidad').value;
            var mensaje = document.getElementById('mensaje').value;
            
            console.log('Nombre:', nombre);
            console.log('Teléfono:', telefono);
            console.log('Especialidad:', especialidad);
            
            // Validar campos obligatorios
            if (!nombre || !telefono || !especialidad) {
                alert('Por favor completa todos los campos obligatorios');
                return false;
            }
            
            // Crear mensaje para WhatsApp
            var texto = '🏥 SOLICITUD DE TURNO - PETRA CONSULTORIOS\n\n';
            texto += '👤 Nombre: ' + nombre + '\n';
            texto += '📱 Teléfono: ' + telefono + '\n';
            texto += '🩺 Especialidad: ' + especialidad + '\n';
            
            if (mensaje && mensaje.trim() !== '') {
                texto += '\n📝 Mensaje:\n' + mensaje;
            }
            
            console.log('📱 Mensaje:', texto);
            
            // Codificar mensaje
            var mensajeCodificado = encodeURIComponent(texto);
            
            // Número de WhatsApp
            var numero = '5492216712102';
            
            // URL completa de WhatsApp
            var url = 'https://wa.me/' + numero + '?text=' + mensajeCodificado;
            
            console.log('🔗 URL:', url);
            
            // Abrir WhatsApp en nueva pestaña
            window.open(url, '_blank');
            
            // Limpiar formulario después de enviar
            form.reset();
            
            return false;
        };
    } else {
        console.error('❌ No se encontró el formulario');
    }
}

// =====================================================
// CAROUSEL DE INSTALACIONES
// =====================================================
let slideIndex = 0;

function inicializarCarousel() {
    // Cambiar slide automáticamente cada 5 segundos
    setInterval(function() {
        slideIndex++;
        showSlide(slideIndex);
    }, 5000);
}

function currentSlide(n) {
    slideIndex = n;
    showSlide(n);
}

function showSlide(n) {
    const slides = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.carousel-dot');
    
    if (!slides.length) return;
    
    // Ajustar índice si está fuera de rango
    if (n >= slides.length) {
        slideIndex = 0;
    }
    if (n < 0) {
        slideIndex = slides.length - 1;
    }
    
    // Ocultar todos los slides
    slides.forEach(function(slide) {
        slide.classList.remove('active');
    });
    
    // Desactivar todos los dots
    dots.forEach(function(dot) {
        dot.classList.remove('active');
    });
    
    // Mostrar slide actual
    if (slides[slideIndex]) {
        slides[slideIndex].classList.add('active');
    }
    
    // Activar dot correspondiente
    if (dots[slideIndex]) {
        dots[slideIndex].classList.add('active');
    }
}

// =====================================================
// TEST DE AUTOEVALUACIÓN
// =====================================================
function evaluarTest() {
    // Contar respuestas "Sí"
    let respuestasSi = 0;
    const totalPreguntas = 8;
    
    for (let i = 1; i <= totalPreguntas; i++) {
        const respuesta = document.querySelector('input[name="q' + i + '"]:checked');
        if (respuesta && respuesta.value === 'si') {
            respuestasSi++;
        }
    }
    
    console.log('Respuestas Sí:', respuestasSi);
    
    // Mensajes personalizados según las respuestas
    let mensaje = '';
    
    if (respuestasSi === 0) {
        mensaje = '¡Qué bueno que te sientas bien! 😊\n\nRecordá que está bien buscar ayuda profesional en cualquier momento, incluso para crecer y conocerte mejor.';
    } else if (respuestasSi <= 2) {
        mensaje = 'Parece que hay algunas áreas que podrían mejorar. 💙\n\nConsiderar hablar con un profesional puede ayudarte a sentirte mejor y desarrollar herramientas para tu bienestar emocional.';
    } else if (respuestasSi <= 5) {
        mensaje = 'Varias de tus respuestas sugieren que podrías beneficiarte de apoyo profesional. 🤝\n\nNo estás solo en esto. En Petra podemos ayudarte a encontrar el camino hacia tu bienestar.';
    } else {
        mensaje = 'Tus respuestas indican que sería muy beneficioso que hables con un profesional. 💚\n\nCuidar tu salud mental es tan importante como cuidar tu salud física. Estamos aquí para acompañarte en este proceso.';
    }
    
    // Mostrar resultado
    alert(mensaje + '\n\n¿Te gustaría solicitar un turno?');
    
    // Scroll hacia el formulario de contacto
    document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
}

// =====================================================
// NAVEGACIÓN SUAVE
// =====================================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM cargado');
    
    // Navegación suave para todos los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        });
    });
});

// =====================================================
// ANIMACIONES AL HACER SCROLL
// =====================================================
function inicializarAnimaciones() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar tarjetas de servicios y profesionales
    const cards = document.querySelectorAll('.service-card, .profesional-card');
    cards.forEach(function(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

// =====================================================
// EFECTO EN HEADER AL HACER SCROLL
// =====================================================
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(71, 112, 167, 0.2)';
    }
});

// =====================================================
// LOG DE CONFIRMACIÓN
// =====================================================
console.log('🌟 Script de Petra Consultorios cargado correctamente');
console.log('✨ Todas las funcionalidades están activas');
console.log('💙 ¡Bienvenido a Petra Consultorios Boutique!');