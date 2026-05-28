/* ============================================
   Kadir Yönak — Portfolio Script
   Language Toggle, Scroll Animations, Navbar
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---------- Language Toggle ----------
  const langBtns = document.querySelectorAll('.lang-btn');
  const translatables = document.querySelectorAll('[data-tr]');

  function setLang(lang) {
    translatables.forEach(el => {
      el.textContent = el.getAttribute(`data-${lang}`);
    });
    langBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    document.documentElement.lang = lang === 'tr' ? 'tr' : 'en';
    localStorage.setItem('lang', lang);
  }

  langBtns.forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });

  // Restore saved language
  const savedLang = localStorage.getItem('lang') || 'tr';
  setLang(savedLang);


  // ---------- Navbar Scroll Effect ----------
  const navbar = document.querySelector('.navbar');

  function handleNavScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();


  // ---------- Active Section Highlight ----------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-links a[href^="#"]');

  function highlightNav() {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();


  // ---------- Scroll Animations ----------
  const fadeElements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  fadeElements.forEach(el => observer.observe(el));


  // ---------- Lightbox ----------
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');
  let currentImages = [];
  let currentIndex = 0;

  if (lightbox) {
    document.querySelectorAll('.lightbox-trigger').forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        const imagesStr = trigger.getAttribute('data-images');
        if (imagesStr) {
          currentImages = imagesStr.split(',');
          currentIndex = 0;
          showLightboxImage();
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
          
          if (currentImages.length > 1) {
            prevBtn.style.display = 'block';
            nextBtn.style.display = 'block';
          } else {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
          }
        }
      });
    });

    function showLightboxImage() {
      if (currentImages.length > 0) {
        lightboxImg.src = currentImages[currentIndex];
      }
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target === document.querySelector('.lightbox-content')) {
        closeLightbox();
      }
    });

    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
      showLightboxImage();
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % currentImages.length;
      showLightboxImage();
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevBtn.click();
      if (e.key === 'ArrowRight') nextBtn.click();
    });
  }

  // ---------- Mobile Menu Toggle ----------
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinksContainer = document.querySelector('.navbar-links');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('open');
      navLinksContainer.classList.toggle('open');
    });

    // Close menu on link click
    navLinksContainer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        navLinksContainer.classList.remove('open');
      });
    });
  }

});
