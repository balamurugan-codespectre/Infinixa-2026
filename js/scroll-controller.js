/**
 * SYMPOSIUM 2026 - Scroll Controller & Section Observer
 * Coordinates sticky navigation, active section indicators, parallax depth, and entry triggers.
 */

class ScrollController {
  constructor() {
    this.nav = document.querySelector('.cyber-nav');
    this.navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    this.sections = document.querySelectorAll('section[id]');
    this.init();
  }

  init() {
    window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
    this.setupSmoothScroll();
    this.setupIntersectionObservers();
    this.handleScroll(); // Initial check
  }

  handleScroll() {
    const scrollY = window.scrollY;

    // Sticky nav state
    if (this.nav) {
      if (scrollY > 50) {
        this.nav.classList.add('scrolled');
      } else {
        this.nav.classList.remove('scrolled');
      }
    }

    // Active nav link highlight based on scroll position
    let currentSection = '';
    const scrollPosition = scrollY + 250;

    this.sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    if (currentSection) {
      this.navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${currentSection}`) {
          link.classList.add('active');
        }
      });
    }
  }

  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#' || targetId === '') return;

        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          
          if (window.cyberAudio) {
            window.cyberAudio.playWarp();
          }

          // Close mobile menu if open
          const mobileDrawer = document.querySelector('.mobile-nav-drawer');
          const mobileBtn = document.querySelector('.mobile-menu-btn');
          if (mobileDrawer && mobileDrawer.classList.contains('open')) {
            mobileDrawer.classList.remove('open');
            if (mobileBtn) mobileBtn.classList.remove('open');
          }

          const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - 70;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  setupIntersectionObservers() {
    // Observe Event Cards & Content for 3D Entrance
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.event-card, .detail-card, .about-content').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      cardObserver.observe(el);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.scrollController = new ScrollController();
});
