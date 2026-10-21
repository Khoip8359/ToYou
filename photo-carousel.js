(function () {
  const IMAGE_FILES = [
    '12760d561971992fc060.jpg',
    '0e1bf697e1b061ee38a1.jpg',
    '2c09132f07088756de19.jpg',
    '5546f47ce05b6005394a.jpg',
    '7c9758b94c9eccc0958f.jpg',
    'b8eb93c587e207bc5ef3.jpg',
    'b9164e9a59bdd9e380ac.jpg',
    'c2bee098f4bf74e12dae.jpg',
    'c2bee098f4bf74e12dae (1).jpg',
    'f442bac7ade02dbe74f1.jpg',
  ];

  const BASE = new URL('our_images/', window.location.href).href;
  let currentIndex = 0;
  let slides = [];
  let started = false;

  function imageUrl(file) {
    return BASE + encodeURIComponent(file);
  }

  function preloadImages() {
    IMAGE_FILES.forEach(function (file) {
      const img = new Image();
      img.src = imageUrl(file);
    });
  }

  function buildCarousel() {
    const root = document.getElementById('memory-carousel');
    if (!root) return;

    const track = document.createElement('div');
    track.className = 'carousel-track';
    track.setAttribute('role', 'list');

    IMAGE_FILES.forEach(function (file, i) {
      const slide = document.createElement('div');
      slide.className = 'carousel-slide';
      slide.setAttribute('role', 'listitem');
      slide.dataset.index = String(i);

      const img = document.createElement('img');
      img.src = imageUrl(file);
      img.alt = 'Kỷ niệm ' + (i + 1);
      img.decoding = 'async';
      slide.appendChild(img);
      track.appendChild(slide);
      slides.push(slide);
    });

    root.appendChild(track);
    layoutSlides();
  }

  function offsetForSlide(i) {
    const n = slides.length;
    let d = i - currentIndex;
    if (d > n / 2) d -= n;
    if (d < -n / 2) d += n;
    return d;
  }

  function layoutSlides() {
    slides.forEach(function (slide, i) {
      const d = offsetForSlide(i);
      const isRevealed = slide.classList.contains('revealed');
      slide.className = 'carousel-slide';
      if (isRevealed) slide.classList.add('revealed');

      if (d === 0) slide.classList.add('pos-center');
      else if (d === -1) slide.classList.add('pos-left-1');
      else if (d === -2) slide.classList.add('pos-left-2');
      else if (d === 1) slide.classList.add('pos-right-1');
      else if (d === 2) slide.classList.add('pos-right-2');
      else if (d < -2) slide.classList.add('pos-hidden-left');
      else slide.classList.add('pos-hidden-right');
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    layoutSlides();
  }

  function revealStaggered() {
    slides.forEach(function (slide, i) {
      window.setTimeout(function () {
        slide.classList.add('revealed');
        layoutSlides();
      }, 350 + i * 420);
    });
  }

  function startCarousel() {
    if (started) return;
    started = true;

    const root = document.getElementById('memory-carousel');
    const heading = document.querySelector('h1');
    if (!root) return;

    root.classList.add('visible');
    if (heading) heading.classList.add('fade-out');

    revealStaggered();
    window.setInterval(nextSlide, 3800);
  }

  function maybeStart() {
    if (started) return;
    if (window.scrollY > window.innerHeight * 0.15) startCarousel();
  }

  window.showMemoryCarousel = startCarousel;

  document.addEventListener('DOMContentLoaded', function () {
    preloadImages();
    buildCarousel();
    window.addEventListener('scroll', maybeStart, { passive: true });
    window.setTimeout(startCarousel, 2500);
  });
})();
