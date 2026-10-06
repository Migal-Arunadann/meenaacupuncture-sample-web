/**
 * Meena Acupuncture Clinic · Vanilla JavaScript
 * High-End Japanese/Nordic Editorial Spa Experience
 * Accessible navigation, condition tab switcher, quiet review carousel.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initTestimonials();
  initConditionTabs();
});

/* --------------------------------------------------------------------------
   01. ACCESSIBLE MOBILE NAVIGATION
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');

  if (!menuToggle || !mobileNav) return;

  function toggleMenu(open) {
    const isCurrentlyOpen = mobileNav.classList.contains('is-open');
    const shouldOpen = open !== undefined ? open : !isCurrentlyOpen;

    if (shouldOpen) {
      mobileNav.classList.add('is-open');
      menuToggle.setAttribute('aria-expanded', 'true');
      menuToggle.setAttribute('aria-label', 'Close menu');
      menuToggle.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      `;
    } else {
      mobileNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation menu');
      menuToggle.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
          <line x1="4" y1="7" x2="20" y2="7"></line>
          <line x1="4" y1="12" x2="20" y2="12"></line>
          <line x1="4" y1="17" x2="20" y2="17"></line>
        </svg>
      `;
    }
  }

  menuToggle.addEventListener('click', () => toggleMenu());

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
      toggleMenu(false);
      menuToggle.focus();
    }
  });

  document.addEventListener('click', (e) => {
    if (mobileNav.classList.contains('is-open')) {
      const isInside = mobileNav.contains(e.target) || menuToggle.contains(e.target);
      if (!isInside) {
        toggleMenu(false);
      }
    }
  });
}

/* --------------------------------------------------------------------------
   02. CONDITIONS WE ADDRESS (Interactive Tab Switcher)
   -------------------------------------------------------------------------- */
function initConditionTabs() {
  const tabButtons = document.querySelectorAll('.condition-tab-btn');
  const panels = document.querySelectorAll('.conditions-panel');

  if (!tabButtons.length || !panels.length) return;

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetId = button.getAttribute('data-tab');

      // Update active tab buttons
      tabButtons.forEach(btn => {
        btn.classList.remove('is-active');
        btn.setAttribute('aria-selected', 'false');
      });
      button.classList.add('is-active');
      button.setAttribute('aria-selected', 'true');

      // Update panels
      panels.forEach(panel => {
        if (panel.id === targetId) {
          panel.classList.add('is-active');
        } else {
          panel.classList.remove('is-active');
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   03. PATIENT TESTIMONIALS CAROUSEL
   -------------------------------------------------------------------------- */
function initTestimonials() {
  const quoteEl = document.getElementById('testimonialQuote');
  const authorEl = document.getElementById('testimonialAuthor');
  const sourceEl = document.getElementById('testimonialSource');
  const prevBtn = document.getElementById('testimonialPrev');
  const nextBtn = document.getElementById('testimonialNext');
  const dotsContainer = document.getElementById('testimonialDots');

  if (!quoteEl || !authorEl || !prevBtn || !nextBtn || !dotsContainer) return;

  // Real verified Google reviews
  const reviews = [
    {
      quote: "We are attending Dr. Sakthivel sir's acu treatment since 2021. He is our family doctor now. Thank you sir and whole team.",
      author: "Arumugam S",
      source: "Google Review · Kolathur"
    },
    {
      quote: "By the grace of God, I have undergone a healthy transformation through you.",
      author: "Mohammed Raffik",
      source: "Google Review"
    },
    {
      quote: "Personalized treatment for all strata of people. Staff are down to earth.",
      author: "Dhanalakshmi K",
      source: "Google Review"
    },
    {
      quote: "The doctors and the staffs are really awesome to take care of the patients very well...",
      author: "Vinod Benjamin",
      source: "Google Review"
    },
    {
      quote: "Excellent diagnosis by checking pulse... staffs were also very kind.",
      author: "Deepa Sairam",
      source: "Google Review"
    }
  ];

  let currentIndex = 0;

  dotsContainer.innerHTML = '';
  reviews.forEach((_, idx) => {
    const dot = document.createElement('button');
    dot.className = `testimonial-dot ${idx === 0 ? 'active' : ''}`;
    dot.setAttribute('aria-label', `Go to testimonial ${idx + 1}`);
    dot.addEventListener('click', () => {
      currentIndex = idx;
      updateDisplay();
    });
    dotsContainer.appendChild(dot);
  });

  function updateDisplay() {
    const item = reviews[currentIndex];
    
    quoteEl.style.opacity = '0';
    quoteEl.style.transform = 'translateY(6px)';
    
    setTimeout(() => {
      quoteEl.textContent = `“${item.quote}”`;
      authorEl.textContent = item.author;
      if (sourceEl) sourceEl.textContent = item.source;
      
      quoteEl.style.transition = 'opacity 300ms ease, transform 300ms ease';
      quoteEl.style.opacity = '1';
      quoteEl.style.transform = 'translateY(0)';
    }, 150);

    const dots = dotsContainer.querySelectorAll('.testimonial-dot');
    dots.forEach((dot, idx) => {
      if (idx === currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + reviews.length) % reviews.length;
    updateDisplay();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % reviews.length;
    updateDisplay();
  });
}
