// ── NAVBAR SCROLL ────────────────────────────────────────────────────
window.addEventListener('scroll', function () {
  const navbar = document.getElementById('navheader');
  const navList = navbar.querySelector('.navbar-nav');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navList.classList.remove('ms-auto');
  }
});

// ── LOGO SWAP ON SCROLL ──────────────────────────────────────────────
const navbar = document.querySelector('.navbar');
const logo   = document.querySelector('.navbar-logo');
let isDark   = false;

window.addEventListener('scroll', () => {
  const shouldBeDark = window.scrollY > 50;
  if (shouldBeDark === isDark) return;
  isDark = shouldBeDark;
  navbar.classList.toggle('scrolled', isDark);

  logo.classList.add('fade-out');
  setTimeout(() => {
    logo.src = isDark ? logo.dataset.logoDark : logo.dataset.logoLight;
    logo.classList.remove('fade-out');
  }, 150);
});

// ── NAVBAR MOBILE ────────────────────────────────────────────────────
const navCollapse = document.getElementById('nav');
const navCloseBtn = document.getElementById('navCloseBtn');

navCloseBtn.addEventListener('click', () => {
  const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
  if (bsCollapse) bsCollapse.hide();
});

document.querySelectorAll('#nav .nav-link, #nav .btn').forEach(el => {
  el.addEventListener('click', () => {
    if (window.innerWidth < 992) {
      const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
      if (bsCollapse) bsCollapse.hide();
    }
  });
});

// ── LANGUAGE SWITCH ──────────────────────────────────────────────────
const langOptions  = document.querySelectorAll('.lang-option');
const categorySpan = document.querySelector('.carousel-category');
let currentLang    = 'en';

function applyLanguage(lang) {
  document.querySelectorAll('[data-en]').forEach(el => {
    el.textContent = el.dataset[lang];
  });

  document.querySelectorAll('[data-en-placeholder]').forEach(el => {
    el.placeholder = lang === 'en' ? el.dataset.enPlaceholder : el.dataset.esPlaceholder;
  });

  const activeSlide = document.querySelector('.carousel-item.active');
  if (activeSlide && categorySpan) {
    categorySpan.textContent = activeSlide.dataset[`category${lang.charAt(0).toUpperCase() + lang.slice(1)}`];
  }

  langOptions.forEach(opt => opt.classList.toggle('active', opt.dataset.lang === lang));
  currentLang = lang;
}

langOptions.forEach(opt => {
  opt.addEventListener('click', () => {
    if (opt.dataset.lang !== currentLang) applyLanguage(opt.dataset.lang);
  });
});

/* document.getElementById('servicesCarousel')?.addEventListener('slid.bs.carousel', function (event) {
  const newSlide = event.relatedTarget;
  const key = `category${currentLang.charAt(0).toUpperCase() + currentLang.slice(1)}`;
  categorySpan.style.transition = 'none'; 
  categorySpan.style.opacity = '0';
  setTimeout(() => {
    categorySpan.textContent = newSlide.dataset[key];
    categorySpan.style.transition = 'opacity 0.3s ease';
    categorySpan.style.opacity = '1';
  }, 150); */
document.getElementById('servicesCarousel')?.addEventListener('slid.bs.carousel', function (event) {
  const newSlide = event.relatedTarget;
  const key = `category${currentLang.charAt(0).toUpperCase() + currentLang.slice(1)}`;
  const nuevoTexto = newSlide.dataset[key];

  // 1. Convertir el texto actual en letras individuales para animarlas
  categorySpan.innerHTML = categorySpan.textContent.split('').map(l => 
    `<span class="letra-anim">${l === ' ' ? '&nbsp;' : l}</span>`
  ).join('');

  // 2. Efecto de salida (desaparecen con blur)
  const letrasViejas = categorySpan.querySelectorAll('.letra-anim');
  letrasViejas.forEach((l, i) => {
    setTimeout(() => {
      l.style.filter = 'blur(8px)';
      l.style.opacity = '0';
      l.style.transform = 'translateX(15px)'; // Pequeño empujón a la derecha
    }, i * 10); // Delay entre letras para efecto cascada
  });

  // 3. Cambiar al nuevo texto y animar entrada
  setTimeout(() => {
    categorySpan.innerHTML = nuevoTexto.split('').map(l => 
      `<span class="letra-anim" style="opacity:0; filter:blur(8px); transform:translateX(-15px)">${l === ' ' ? '&nbsp;' : l}</span>`
    ).join('');

    const letrasNuevas = categorySpan.querySelectorAll('.letra-anim');
    letrasNuevas.forEach((l, i) => {
      setTimeout(() => {
        l.style.filter = 'blur(0px)';
        l.style.opacity = '1';
        l.style.transform = 'translateX(0)';
      }, i * 10);
    });
  }, 150);
});


// ── HERO VIDEO CROSSFADE ─────────────────────────────────────────────
const vidA = document.getElementById('hero-video-a');
const vidB = document.getElementById('hero-video-b');
let current  = vidA;
let next     = vidB;
let swapping = false;

// Precargar ambos
vidA.load();
vidB.load();

vidA.addEventListener('canplaythrough', () => { vidA.play(); });

vidA.addEventListener('timeupdate', () => {
  if (current !== vidA || swapping) return;
  if (vidA.duration && vidA.currentTime >= vidA.duration - 2) {
    doSwap();
  }
});

vidB.addEventListener('timeupdate', () => {
  if (current !== vidB || swapping) return;
  if (vidB.duration && vidB.currentTime >= vidB.duration - 2) {
    doSwap();
  }
});

function doSwap() {
  swapping = true;

  // Arrancar el next desde el inicio
  next.currentTime = 0;
  next.play();

  // Crossfade CSS
  next.classList.add('active');
  current.classList.remove('active');

  const outgoing = current;

  // Intercambiar referencias
  [current, next] = [next, current];

  // Pausar el outgoing después de que termine el fade (1.5s = transition CSS)
  setTimeout(() => {
    outgoing.pause();
    outgoing.currentTime = 0;
    swapping = false;
  }, 1500);
}

// ── AUTOPLAY IOS FIX ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('video[autoplay]').forEach(video => {
    video.muted = true;
    video.play().catch(() => {
      document.addEventListener('touchstart', () => video.play(), { once: true });
    });
  });
});


// ── REVEAL ON SCROLL ──────────────────────────────────────────────────
const reveals  = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('active');
  });
}, { threshold: 0.2 });
reveals.forEach(el => observer.observe(el));

// ── BACK TO TOP ───────────────────────────────────────────────────────
const btn = document.getElementById('btnToTop');
window.onscroll = function () {
  btn.style.display = document.documentElement.scrollTop > 300 ? 'flex' : 'none';
};

// ── CAROUSEL WITH DOTS ────────────────────────────────────────────────
const slides = [
  { img: './multimedia/img/slide4.png', caption: 'Targeted Reach',            captionEs: 'Alcance Dirigido'          },
  { img: './multimedia/img/slide5.png', caption: 'Smart Growth',              captionEs: 'Crecimiento Inteligente'   },
  { img: './multimedia/img/slide6.png', caption: 'Optimized Performance + AI',captionEs: 'Rendimiento Optimizado + IA'},
  { img: './multimedia/img/slide7.png', caption: 'Human Precision',           captionEs: 'Precisión Humana'          },
];

const TOTAL          = slides.length;
let currentIndex     = 0;
let autoplayTimer    = null;
let isDragging       = false;
let dragStartX       = 0;
let dragDeltaX       = 0;
const DRAG_THRESHOLD = 50;

const track    = document.getElementById('carouselTrack');
const dotsWrap = document.getElementById('carouselDots');
const viewport = document.getElementById('carouselViewport');

slides.forEach((s, i) => {
  const slide = document.createElement('div');
  slide.className   = 'carousel-slide' + (i === 0 ? ' active' : '');
  slide.dataset.index = i;
  slide.innerHTML = `
    <div class="slide-inner">
      <img src="${s.img}" alt="${s.caption}" loading="lazy" />
      <p class="slide-caption" data-en="${s.caption}" data-es="${s.captionEs}">${s.caption}</p>
    </div>`;
  track.appendChild(slide);
});

slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'dot' + (i === 0 ? ' active' : '');
  dot.setAttribute('aria-label', `Ir al slide ${i + 1}`);
  dot.addEventListener('click', () => goTo(i));
  dotsWrap.appendChild(dot);
});

function getSlideWidth() { return track.children[0].offsetWidth; }

function updateTrack(extraOffset = 0) {
  const slideW  = getSlideWidth();
  const vpWidth = viewport.offsetWidth;
  const offset  = (vpWidth / 2) - (slideW / 2) - (currentIndex * slideW) + extraOffset;
  track.style.transform = `translateX(${offset}px)`;
}

function updateActive() {
  [...track.children].forEach((slide, i) => slide.classList.toggle('active', i === currentIndex));
  [...dotsWrap.children].forEach((dot, i)   => dot.classList.toggle('active',  i === currentIndex));
}

function goTo(index) {
  currentIndex = ((index % TOTAL) + TOTAL) % TOTAL;
  updateActive();
  updateTrack();
}

function nextSlide() { goTo(currentIndex + 1); }

function startAutoplay() {
  stopAutoplay();
  autoplayTimer = setInterval(nextSlide, 5000);
}
function stopAutoplay() { clearInterval(autoplayTimer); }

function onDragStart(e) {
  isDragging = true;
  dragStartX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
  dragDeltaX = 0;
  track.classList.add('is-dragging');
  stopAutoplay();
}

function onDragMove(e) {
  if (!isDragging) return;
  const x = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
  dragDeltaX = x - dragStartX;
  updateTrack(dragDeltaX);
}

function onDragEnd() {
  if (!isDragging) return;
  isDragging = false;
  track.classList.remove('is-dragging');
  if      (dragDeltaX < -DRAG_THRESHOLD) goTo(currentIndex + 1);
  else if (dragDeltaX >  DRAG_THRESHOLD) goTo(currentIndex - 1);
  else                                   updateTrack();
  startAutoplay();
}

track.addEventListener('mousedown',  onDragStart);
window.addEventListener('mousemove', onDragMove);
window.addEventListener('mouseup',   onDragEnd);
track.addEventListener('touchstart', onDragStart, { passive: true });
track.addEventListener('touchmove',  onDragMove,  { passive: true });
track.addEventListener('touchend',   onDragEnd);
viewport.addEventListener('mouseenter', stopAutoplay);
viewport.addEventListener('mouseleave', startAutoplay);

window.addEventListener('load', () => { updateTrack(); startAutoplay(); });

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => updateTrack(), 100);
});

// ── PHONE MASK ────────────────────────────────────────────────────────
const phoneConfig = {
  'Argentina': {
    flag: '🇦🇷',
    prefix: '+54 9',
    mask: '(000) 000-0000',
    placeholder: '(011) 1234-5678'
  },
  'Peru': {
    flag: '🇵🇪',
    prefix: '+51',
    mask: '000 000 000',
    placeholder: '999 123 456'
  },
  'USA': {
    flag: '🇺🇸',
    prefix: '+1',
    mask: '(000) 000-0000',
    placeholder: '(555) 123-4567'
  }
};

const countrySelect = document.getElementById('inputState');
const phoneInput    = document.getElementById('phoneInput');
const phonePrefix   = document.getElementById('phonePrefix');
let phoneMask       = null;

function applyPhoneMask(country) {
  const config = phoneConfig[country];
  if (!config) return;
  phonePrefix.textContent  = `${config.flag} ${config.prefix}`;
  phoneInput.value         = '';
  phoneInput.placeholder   = config.placeholder;
  if (phoneMask) phoneMask.destroy();
  phoneMask = IMask(phoneInput, {
    mask: config.mask,
    lazy: false,
    placeholderChar: '0'
  });
}

countrySelect.addEventListener('change', () => {
  const selected = countrySelect.value;
  if (phoneConfig[selected]) {
    applyPhoneMask(selected);
  } else {
    phonePrefix.textContent  = '+';
    phoneInput.value         = '';
    phoneInput.placeholder   = 'Phone number';
    if (phoneMask) { phoneMask.destroy(); phoneMask = null; }
  }
});

if (countrySelect.value && countrySelect.value !== '') {
  applyPhoneMask(countrySelect.value);
}

// ── FORM VALIDATION & SUBMIT ──────────────────────────────────────────
document.getElementById('nameInput').addEventListener('input', function () {
  this.value = this.value.replace(/[^a-záéíóúüñA-ZÁÉÍÓÚÜÑ\s]/g, '');
});

document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form    = this;
  const name    = document.getElementById('nameInput');
  const email   = document.getElementById('emailInput');
  const message = document.getElementById('messageInput');
  const country = countrySelect;
  let valid     = true;

  form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));

  if (!country.value) {
    country.classList.add('is-invalid');
    valid = false;
  }

  // Validar teléfono: que tenga al menos los dígitos de la máscara completos
  if (phoneMask && !phoneMask.masked.isComplete) {
    phoneInput.classList.add('is-invalid');
    valid = false;
  }

  if (!name.value.trim() || /[^a-záéíóúüñA-ZÁÉÍÓÚÜÑ\s]/.test(name.value)) {
    name.classList.add('is-invalid');
    valid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value.trim())) {
    email.classList.add('is-invalid');
    valid = false;
  }

  if (!message.value.trim()) {
    message.classList.add('is-invalid');
    valid = false;
  }

  if (!valid) return;

  const formData = new FormData(form);
  formData.set('phone', `${phonePrefix.textContent} ${phoneInput.value.trim()}`);

  try {
    const res  = await fetch('send.php', { method: 'POST', body: formData });
    const data = await res.json();

    if (data.success) {
      const isEs = currentLang === 'es';
      document.getElementById('successModalTitle').textContent = isEs
        ? '¡Gracias por tu mensaje!'
        : 'Thank you for your message!';
      document.getElementById('successModalText').textContent = isEs
        ? 'Nos pondremos en contacto pronto.'
        : "We'll get back to you soon.";

      const modal = new bootstrap.Modal(document.getElementById('successModal'));
      modal.show();

      form.reset();
      phonePrefix.textContent = '+';

      document.getElementById('successModal').addEventListener('hidden.bs.modal', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, { once: true });
    }
  } catch (err) {
    console.error('Error sending form:', err);
  }
});