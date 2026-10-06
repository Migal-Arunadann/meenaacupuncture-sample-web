/**
 * Meena Acupuncture Clinic · Vanilla JavaScript
 * Purpose: Accessible navigation, quiet testimonial transitions, WhatsApp enquiry formatting.
 * Zero external libraries. Minimal footprint.
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initTestimonials();
  initEnquiryForm();
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
      // Update toggle icon to close (X)
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
      // Update toggle icon to hamburger
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

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
      toggleMenu(false);
      menuToggle.focus();
    }
  });

  // Close when clicking outside header & nav
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
   02. PATIENT TESTIMONIALS CAROUSEL (Quiet, one at a time)
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
      source: "Google Review"
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

  // Build dots
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
    
    // Gentle fade transition
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

    // Update dots
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

/* --------------------------------------------------------------------------
   03. WHATSAPP ENQUIRY FORM HANDLER
   -------------------------------------------------------------------------- */
function initEnquiryForm() {
  const form = document.getElementById('whatsappEnquiryForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('enquiryName');
    const phoneInput = document.getElementById('enquiryPhone');
    const messageInput = document.getElementById('enquiryMessage');

    const name = nameInput ? nameInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const message = messageInput ? messageInput.value.trim() : '';

    if (!name) {
      alert('Please share your name so we can address you properly.');
      nameInput && nameInput.focus();
      return;
    }

    if (!phone) {
      alert('Please provide your phone number.');
      phoneInput && phoneInput.focus();
      return;
    }

    // Construct precise WhatsApp message structure as specified
    const waText = 
`Hello Meena Acupuncture Clinic,

I would like to enquire about a visit.

Name: ${name}
Phone: ${phone}
Message: ${message || 'I would like to know more about scheduling an appointment.'}`;

    const clinicWhatsAppNumber = '918754418502';
    const waUrl = `https://wa.me/${clinicWhatsAppNumber}?text=${encodeURIComponent(waText)}`;

    // Open WhatsApp
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  });
}
