window.addEventListener('scroll', function(){
    const navbar = this.document.getElementById ('navheader');
    const navList = navbar.querySelector ('.navbar-nav');
    
    if (window.scrollY > 50){
        navbar.classList.add('scrolled');
        // navList.classList.remove('mx-auto');
        // navList.classList.add ('ms-auto');
    }else{
        // navbar.classList.remove('scrolled');
        // navList.classList.add('mx-auto');
        navList.classList.remove('ms-auto');
    }
})

// ── LANGUAGE SWITCH ─────────────────────────────────────────────────
const langOptions = document.querySelectorAll('.lang-option');
const categorySpan = document.querySelector('.carousel-category');
let currentLang = 'en';

function applyLanguage(lang) {
  // Textos normales
  document.querySelectorAll('[data-en]').forEach(el => {
    el.textContent = el.dataset[lang];
  });

  // Placeholders del formulario
  document.querySelectorAll('[data-en-placeholder]').forEach(el => {
    el.placeholder = lang === 'en' ? el.dataset.enPlaceholder : el.dataset.esPlaceholder;
  });

  // Categoría del carousel Bootstrap (sincronizar con slide activo)
  const activeSlide = document.querySelector('.carousel-item.active');
  if (activeSlide) {
    categorySpan.textContent = activeSlide.dataset[`category${lang.charAt(0).toUpperCase() + lang.slice(1)}`];
  }

  // Estado visual del switch
  langOptions.forEach(opt => opt.classList.toggle('active', opt.dataset.lang === lang));

  currentLang = lang;
}

langOptions.forEach(opt => {
  opt.addEventListener('click', () => {
    if (opt.dataset.lang !== currentLang) applyLanguage(opt.dataset.lang);
  });
});

// Actualizar categoría del carousel al cambiar slide
document.getElementById('servicesCarousel')?.addEventListener('slid.bs.carousel', function(event) {
  const newSlide = event.relatedTarget;
  const key = `category${currentLang.charAt(0).toUpperCase() + currentLang.slice(1)}`;
  categorySpan.style.opacity = '0';
  setTimeout(() => {
    categorySpan.textContent = newSlide.dataset[key];
    categorySpan.style.transition = 'opacity 0.3s ease';
    categorySpan.style.opacity = '1';
  }, 150);
});


const navbar = document.querySelector('.navbar');
const logo = document.querySelector('.navbar-logo');

let isDark = false;
window.addEventListener('scroll', () => {
  const shouldBeDark = window.scrollY > 50;
  if (shouldBeDark === isDark) return;
  isDark = shouldBeDark;
  navbar.classList.toggle('scrolled', isDark);

  logo.classList.add('fade-out');
  setTimeout(() => {
    logo.src = isDark
      ? logo.dataset.logoDark
      : logo.dataset.logoLight;
    logo.classList.remove('fade-out');
  }, 150);
});

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

// Forzar autoplay en iOS para todos los videos
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('video[autoplay]').forEach(video => {
    video.muted = true;
    video.play().catch(() => {
      // Si falla, intentar al primer toque del usuario
      document.addEventListener('touchstart', () => video.play(), { once: true });
    });
  });
});

const videoHero = document.getElementById("hero-video");
const fadeDuration = 0.7;
let fading = false;

videoHero.addEventListener("loadeddata", () => {
    videoHero.style.opacity = 1;
});

videoHero.addEventListener("timeupdate", () => {

  if(!fading && videoHero.currentTime >= videoHero.duration - fadeDuration){

      fading = true;

      videoHero.style.opacity = 0;

      setTimeout(()=>{
          videoHero.currentTime = 0;
          videoHero.play();
          videoHero.style.opacity = 1;
          fading = false;
      }, fadeDuration * 1000);
  }

});

const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries)=>{
  
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("active");
    }
  });
},{
  threshold:0.2
});
reveals.forEach(el => observer.observe(el));


/* const video = document.getElementById('video1');
const btnPlay = document.getElementById ('playbtn');

btnPlay.addEventListener('click', () => {
  video.play();
  btnPlay.parentElement.style.display = 'none';
  video.setAttribute('controls', 'true');
});

// const video2 = document.getElementById('video2');
// const btnPlay2 = document.getElementById ('playbtn2');

// btnPlay2.addEventListener('click', () => {
//   video2.play();
//   btnPlay2.parentElement.style.display = 'none';
//   video2.setAttribute('controls', 'true');
// });

// const video4 = document.getElementById('video4');
// const btnPlay4 = document.getElementById ('playbtn4');

// btnPlay4.addEventListener('click', () => {
//   video4.play();
//   btnPlay4.parentElement.style.display = 'none';
//   video4.setAttribute('controls', 'true');
// });

const video5 = document.getElementById('video5');
const btnPlay5 = document.getElementById ('playbtn5');

btnPlay5.addEventListener('click', () => {
  video5.play();
  btnPlay5.parentElement.style.display = 'none';
  video5.setAttribute('controls', 'true');
}); */


document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const form = this;
  const formData = new FormData(form);

  fetch("send.php", {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert("Mensaje enviado correctamente");
      form.reset();
    } else {
      alert("Error al enviar el mensaje");
    }
  })
  .catch(() => alert("Error de conexión"));
});

const btn = document.getElementById("btnToTop");

window.onscroll = function() {
  if (document.documentElement.scrollTop > 300) {
    btn.style.display = "flex";
  } else {
    btn.style.display = "none";
  }
};


/* const carousel = document.getElementById("servicesCarousel")
const categorySpan = document.querySelector(".carousel-category")

carousel.addEventListener("slid.bs.carousel", function (event) {
  const newCategory = event.relatedTarget.dataset.category;

  // Fade suave del texto
  categorySpan.style.opacity = "0";
  setTimeout(() => {
    categorySpan.textContent = newCategory;
    categorySpan.style.transition = "opacity 0.3s ease";
    categorySpan.style.opacity = "1";
  }, 150);

})
 */
/***************Carousel with dots and captions below *********************************************/
const slides = [
    {
      img: './multimedia/img/slide4.png',
      caption: 'Targeted Reach',
      captionEs: 'Alcance Dirigido'
    },
    {
      img: './multimedia/img/slide5.png',
      caption: 'Smart Growth',
      captionEs: 'Crecimiento Inteligente'
    },
    {
      img: './multimedia/img/slide6.png',
      caption: 'Optimized Performance + AI',
      captionEs: 'Rendimiento Optimizado + IA'
    },
    {
      img: './multimedia/img/slide7.png',
      caption: 'Human Precision',
      captionEs: 'Precisión Humana'
    },
  ];

  /* ── State ──────────────────────────────────────────────────────── */
  const TOTAL        = slides.length;
  let currentIndex   = 0;
  let autoplayTimer  = null;
  let isDragging     = false;
  let dragStartX     = 0;
  let dragDeltaX     = 0;
  const DRAG_THRESHOLD = 50; // px to register a swipe

  /* ── DOM refs ───────────────────────────────────────────────────── */
  const track     = document.getElementById('carouselTrack');
  const dotsWrap  = document.getElementById('carouselDots');
  const viewport  = document.getElementById('carouselViewport');

  /* ── Build slides ───────────────────────────────────────────────── */
  slides.forEach((s, i) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide' + (i === 0 ? ' active' : '');
    slide.dataset.index = i;
    slide.innerHTML = `
      <div class="slide-inner">
        <img src="${s.img}" alt="${s.caption}" loading="lazy" />
        <p class="slide-caption" data-en="${s.caption}" data-es="${s.captionEs}">${s.caption}</p>
      </div>`;
    track.appendChild(slide);
  });

  /* ── Build dots ─────────────────────────────────────────────────── */
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Ir al slide ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  /* ── Core: position track ───────────────────────────────────────── */
  function getSlideWidth() {
    // Actual rendered width of a slide element (includes padding via CSS)
    return track.children[0].offsetWidth;
  }

  function updateTrack(extraOffset = 0) {
    const slideW    = getSlideWidth();
    const vpWidth   = viewport.offsetWidth;
    // Center the active slide
    const offset    = (vpWidth / 2) - (slideW / 2) - (currentIndex * slideW) + extraOffset;
    track.style.transform = `translateX(${offset}px)`;
  }

  function updateActive() {
    [...track.children].forEach((slide, i) => {
      slide.classList.toggle('active', i === currentIndex);
    });
    [...dotsWrap.children].forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  function goTo(index) {
    // Wrap around for infinite loop
    currentIndex = ((index % TOTAL) + TOTAL) % TOTAL;
    updateActive();
    updateTrack();
  }

  function next() { goTo(currentIndex + 1); }

  /* ── Autoplay ───────────────────────────────────────────────────── */
  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(next, 5000);
  }
  function stopAutoplay() {
    clearInterval(autoplayTimer);
  }

  /* ── Drag / Swipe ───────────────────────────────────────────────── */
  function onDragStart(e) {
    isDragging = true;
    dragStartX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    dragDeltaX = 0;
    track.classList.add('is-dragging');
    stopAutoplay();
  }

  function onDragMove(e) {
    if (!isDragging) return;
    const x   = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    dragDeltaX = x - dragStartX;
    updateTrack(dragDeltaX);
  }

  function onDragEnd() {
    if (!isDragging) return;
    isDragging = false;
    track.classList.remove('is-dragging');

    if (dragDeltaX < -DRAG_THRESHOLD)      goTo(currentIndex + 1);
    else if (dragDeltaX > DRAG_THRESHOLD)  goTo(currentIndex - 1);
    else                                    updateTrack(); // snap back

    startAutoplay();
  }

  // Mouse
  track.addEventListener('mousedown',  onDragStart);
  window.addEventListener('mousemove', onDragMove);
  window.addEventListener('mouseup',   onDragEnd);

  // Touch
  track.addEventListener('touchstart', onDragStart, { passive: true });
  track.addEventListener('touchmove',  onDragMove,  { passive: true });
  track.addEventListener('touchend',   onDragEnd);

  // Pause autoplay on hover (desktop UX)
  viewport.addEventListener('mouseenter', stopAutoplay);
  viewport.addEventListener('mouseleave', startAutoplay);

  /* ── Init ───────────────────────────────────────────────────────── */
  // Wait for layout before computing widths
  window.addEventListener('load', () => {
    updateTrack();
    startAutoplay();
  });

  // Recalculate on resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => updateTrack(), 100);
  });

const video1 = document.getElementById("video1");
const fadeDuration1 = 0.7;
let fading1 = false;

video1.addEventListener("loadeddata", () => {
    video1.style.opacity = 1;
});

video1.addEventListener("timeupdate", () => {

  if(!fading1 && video1.currentTime >= video1.duration - fadeDuration1){

      fading1 = true;

      video1.style.opacity = 0;

      setTimeout(()=>{
          video1.currentTime = 0;
          video1.play();
          video1.style.opacity = 1;
          fading1 = false;
      }, fadeDuration1 * 1000);
  }

});

const videosm = document.getElementById("video-sm");
const fadeDurationsm = 0.7;
let fadingsm = false;

videosm.addEventListener("loadeddata", () => {
    videosm.style.opacity = 1;
});

videosm.addEventListener("timeupdate", () => {

  if(!fadingsm && videosm.currentTime >= videosm.duration - fadeDurationsm){

      fadingsm = true;

      videosm.style.opacity = 0;

      setTimeout(()=>{
          videosm.currentTime = 0;
          videosm.play();
          videosm.style.opacity = 1;
          fadingsm = false;
      }, fadeDurationsm * 1000);
  }

});