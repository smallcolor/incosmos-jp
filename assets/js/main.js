/* main.js — InCosmos JP site interactions */

function initReveals() {
  gsap.registerPlugin(ScrollTrigger);

  // Generic reveal: fade in + slide up + unblur
  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.75,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });

  // Title reveal: line-by-line uncover
  gsap.utils.toArray('[data-reveal-title]').forEach((el) => {
    const split = new SplitType(el, { types: 'lines' });
    split.lines.forEach((line) => {
      const wrapper = document.createElement('div');
      wrapper.style.overflow = 'hidden';
      line.parentNode.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });
    gsap.from(split.lines, {
      yPercent: 120,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.06,
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });

  // Horizontal line reveal
  gsap.utils.toArray('[data-reveal-line]').forEach((el) => {
    gsap.from(el, {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  });
}

function initNavHover() {
  if (typeof SplitType === 'undefined') return;

  document.querySelectorAll('.nav-links a').forEach((link) => {
    const split = new SplitType(link, { types: 'chars' });

    link.addEventListener('mouseenter', () => {
      gsap.to(split.chars, {
        yPercent: -100,
        duration: 0.3,
        ease: 'power3.out',
        stagger: 0.02,
      });
    });

    link.addEventListener('mouseleave', () => {
      gsap.to(split.chars, {
        yPercent: 0,
        duration: 0.3,
        ease: 'power3.out',
        stagger: 0.02,
      });
    });
  });
}

function initNav() {
  const nav = document.querySelector('.nav');
  const burger = document.querySelector('.nav-burger');
  const menu = document.querySelector('.mobile-menu');

  // Scroll: add .scrolled class
  if (nav) {
    window.addEventListener(
      'scroll',
      () => {
        nav.classList.toggle('scrolled', window.scrollY > 50);
      },
      { passive: true }
    );
  }

  // Burger toggle
  if (burger && menu) {
    burger.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      document.body.style.overflow = isOpen ? 'hidden' : '';
      burger.setAttribute('aria-expanded', String(isOpen));
    });

    // Mobile menu links close menu
    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
        document.body.style.overflow = '';
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

function initFAQ() {
  document.querySelectorAll('.faq-question').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('open');

      // Close all others
      document.querySelectorAll('.faq-item.open').forEach((openItem) => {
        openItem.classList.remove('open');
      });

      // Toggle clicked item
      if (!wasOpen) {
        item.classList.add('open');
      }
    });
  });
}

// --- Boot ---
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initNavHover();
  initFAQ();

  if (typeof gsap !== 'undefined') {
    initReveals();
  }
});
