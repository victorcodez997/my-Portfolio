// EmailJS Configuration
(function () {
  // Initialize EmailJS with your public key
  emailjs.init("YOUR_PUBLIC_KEY"); // You'll get this from EmailJS dashboard
})();

// Quote Form Functionality
document.addEventListener("DOMContentLoaded", function () {
  const quoteForm = document.getElementById("quote-form");
  const successMessage = document.createElement("div");
  successMessage.className = "success-message";
  successMessage.textContent =
    "Thank you! Your quote request has been submitted successfully. I'll get back to you within 24 hours.";
  quoteForm.parentNode.insertBefore(successMessage, quoteForm);

  // Form submission handler
  quoteForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Basic validation
    if (!validateForm()) {
      return;
    }

    // Show loading state
    const submitBtn = quoteForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    // Get form data
    const formData = new FormData(quoteForm);
    const data = Object.fromEntries(formData);

    // Send email using EmailJS
    sendEmail(data)
      .then(() => {
        // Show success message
        successMessage.style.display = "block";
        quoteForm.style.display = "none";
        successMessage.scrollIntoView({ behavior: "smooth" });
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        alert(
          "Sorry, there was an error sending your message. Please try again or contact me directly at udohv943@gmail.com"
        );
      })
      .finally(() => {
        // Reset button state
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
  });

  // Form validation
  function validateForm() {
    const requiredFields = quoteForm.querySelectorAll("[required]");
    let isValid = true;

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        isValid = false;
        field.style.borderColor = "#e53e3e";
      } else {
        field.style.borderColor = "#cbd5e0";
      }
    });

    // Email validation
    const emailField = document.getElementById("email");
    if (emailField.value && !isValidEmail(emailField.value)) {
      isValid = false;
      emailField.style.borderColor = "#e53e3e";
    }

    return isValid;
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Send email using EmailJS
  function sendEmail(data) {
    // Format the features array
    const features = Array.from(
      document.querySelectorAll('input[name="features[]"]:checked')
    )
      .map((checkbox) => checkbox.value)
      .join(", ");

    // Prepare email parameters
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      phone: data.phone || "Not provided",
      company: data.company || "Not provided",
      project_type: data["project-type"],
      project_description: data["project-description"],
      target_audience: data["target-audience"] || "Not specified",
      features: features || "None selected",
      additional_features: data["additional-features"] || "None",
      design_style: data["design-style"] || "Not specified",
      color_preferences: data["color-preferences"] || "Not specified",
      reference_websites: data["reference-websites"] || "None provided",
      timeline: data.timeline || "Not specified",
      budget: data.budget || "Not specified",
      content_management: data["content-management"] || "Not specified",
      hosting_domain: data["hosting-domain"] || "Not specified",
      maintenance: data.maintenance || "Not specified",
      additional_notes: data["additional-notes"] || "None",
    };

    // Send email using EmailJS
    return emailjs.send(
      "YOUR_SERVICE_ID", // Replace with your EmailJS service ID
      "YOUR_TEMPLATE_ID", // Replace with your EmailJS template ID
      templateParams
    );
  }

  // Real-time budget calculator
  const budgetSelect = document.getElementById("budget");
  const featureCheckboxes = document.querySelectorAll(
    'input[name="features[]"]'
  );

  function updateBudgetEstimate() {
    const selectedFeatures = Array.from(featureCheckboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    console.log("Selected features:", selectedFeatures);
  }

  featureCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", updateBudgetEstimate);
  });

  // Project type change handler
  const projectTypeSelect = document.getElementById("project-type");
  projectTypeSelect.addEventListener("change", function () {
    const selectedType = this.value;
    console.log("Project type changed to:", selectedType);
  });
});
