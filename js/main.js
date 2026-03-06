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

const video = document.getElementById('video1');
const btnPlay = document.getElementById ('playbtn');

btnPlay.addEventListener('click', () => {
  video.play();
  btnPlay.parentElement.style.display = 'none';
  video.setAttribute('controls', 'true');
});

const video2 = document.getElementById('video2');
const btnPlay2 = document.getElementById ('playbtn2');

btnPlay2.addEventListener('click', () => {
  video2.play();
  btnPlay2.parentElement.style.display = 'none';
  video2.setAttribute('controls', 'true');
});

const video4 = document.getElementById('video4');
const btnPlay4 = document.getElementById ('playbtn4');

btnPlay4.addEventListener('click', () => {
  video4.play();
  btnPlay4.parentElement.style.display = 'none';
  video4.setAttribute('controls', 'true');
});

const video5 = document.getElementById('video5');
const btnPlay5 = document.getElementById ('playbtn5');

btnPlay5.addEventListener('click', () => {
  video5.play();
  btnPlay5.parentElement.style.display = 'none';
  video5.setAttribute('controls', 'true');
});

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