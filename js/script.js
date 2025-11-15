// Mobile menu functionality
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");
const overlay = document.querySelector(".overlay");
const mobileMenuLinks = document.querySelectorAll(".mobile-menu-links a");

function toggleMobileMenu() {
  mobileMenuBtn.classList.toggle("active");
  mobileMenu.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.style.overflow = mobileMenu.classList.contains("active")
    ? "hidden"
    : "";
}

mobileMenuBtn.addEventListener("click", toggleMobileMenu);
overlay.addEventListener("click", toggleMobileMenu);

mobileMenuLinks.forEach((link) => {
  link.addEventListener("click", toggleMobileMenu);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Header scroll effect
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.style.padding = "0.5rem 0";
    header.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
  } else {
    header.style.padding = "";
    header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  }
});

// Simple animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animation
document
  .querySelectorAll(
    ".project-card, .service-card, .about-content, .testimonial-card"
  )
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

// Enhanced WhatsApp functionality with follow-up message
document.getElementById("whatsapp-btn").addEventListener("click", function (e) {
  e.preventDefault();

  // Your phone number (with country code)
  const phoneNumber = "+2348085072614";

  // Initial message
  const initialMessage =
    "Hi Victor! I'm interested in your web development services. I found you through your portfolio website.";

  // Follow-up message (sent after a delay)
  const followUpMessage =
    "Could you please share more information about your services and availability?";

  // Encode the messages for URL
  const encodedInitialMessage = encodeURIComponent(initialMessage);

  // Create the WhatsApp URL with the initial message
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedInitialMessage}`;

  // Open WhatsApp in a new tab
  window.open(whatsappUrl, "_blank");

  // Show notification about follow-up message
  setTimeout(() => {
    alert(
      'After sending your initial message, you can follow up with: \n\n"' +
        followUpMessage +
        '"'
    );
  }, 1000);
});
