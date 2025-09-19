// Mobile menu toggle
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close mobile menu when clicking on a nav link
    document.querySelectorAll(".nav-link").forEach((n) =>
      n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      })
    );
  }

  // Contact form handling
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit);
  }

  // Initialize animations
  initScrollAnimations();
});

// Form validation and submission
function handleFormSubmit(e) {
  e.preventDefault();

  // Clear previous error messages
  clearErrorMessages();

  // Get form data
  const formData = new FormData(e.target);
  const name = formData.get("name").trim();
  const email = formData.get("email").trim();
  const message = formData.get("message").trim();

  let isValid = true;

  // Validate name
  if (!name) {
    showError("nameError", "Name is required");
    isValid = false;
  } else if (name.length < 2) {
    showError("nameError", "Name must be at least 2 characters");
    isValid = false;
  }

  // Validate email
  if (!email) {
    showError("emailError", "Email is required");
    isValid = false;
  } else if (!isValidEmail(email)) {
    showError("emailError", "Please enter a valid email address");
    isValid = false;
  }

  // Validate message
  if (!message) {
    showError("messageError", "Message is required");
    isValid = false;
  } else if (message.length < 10) {
    showError("messageError", "Message must be at least 10 characters");
    isValid = false;
  }

  if (isValid) {
    // Simulate form submission
    simulateFormSubmission();
  }
}

function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = "block";
  }
}

function clearErrorMessages() {
  const errorElements = document.querySelectorAll(".error-message");
  errorElements.forEach((element) => {
    element.textContent = "";
    element.style.display = "none";
  });
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function simulateFormSubmission() {
  // Show loading state
  const submitButton = document.querySelector(
    '.contact-form button[type="submit"]'
  );
  const originalText = submitButton.textContent;
  submitButton.textContent = "Sending...";
  submitButton.disabled = true;

  // Simulate network delay
  setTimeout(() => {
    // Reset form
    document.getElementById("contactForm").reset();

    // Show success message
    showSuccessMessage();

    // Reset button
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  }, 1500);
}

function showSuccessMessage() {
  const successMessage = document.getElementById("successMessage");
  if (successMessage) {
    successMessage.style.display = "flex";
    // Auto-close after 5 seconds
    setTimeout(() => {
      closeSuccessMessage();
    }, 5000);
  }
}

function closeSuccessMessage() {
  const successMessage = document.getElementById("successMessage");
  if (successMessage) {
    successMessage.style.display = "none";
  }
}

// Scroll animations
function initScrollAnimations() {
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
  const animatedElements = document.querySelectorAll(
    ".feature-card, .service-card, .value-card, .team-card, .stat-card, .process-step"
  );

  animatedElements.forEach((el, index) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = `opacity 0.6s ease ${
      index * 0.1
    }s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
  });
}

// Smooth scrolling for anchor links (if any)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add loading class to body when navigating between pages
window.addEventListener("beforeunload", function () {
  document.body.style.opacity = "0.8";
});

// Form input focus animations
document
  .querySelectorAll(
    ".form-group input, .form-group select, .form-group textarea"
  )
  .forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentElement.classList.add("focused");
    });

    input.addEventListener("blur", function () {
      if (!this.value) {
        this.parentElement.classList.remove("focused");
      }
    });

    // Check if input has value on page load
    if (input.value) {
      input.parentElement.classList.add("focused");
    }
  });

// Add CSS class for focused form groups
const style = document.createElement("style");
style.textContent = `
    .form-group.focused label {
        color: var(--primary-color);
        transform: translateY(-2px);
    }
`;
document.head.appendChild(style);
