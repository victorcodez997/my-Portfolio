// Quote Form Functionality
document.addEventListener('DOMContentLoaded', function() {
  const quoteForm = document.getElementById('quote-form');
  const successMessage = document.createElement('div');
  successMessage.className = 'success-message';
  successMessage.textContent = 'Thank you! Your quote request has been submitted successfully. I\'ll get back to you within 24 hours.';
  quoteForm.parentNode.insertBefore(successMessage, quoteForm);

  // Form submission handler
  quoteForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Basic validation
    if (!validateForm()) {
      return;
    }
    
    // Get form data
    const formData = new FormData(quoteForm);
    const data = Object.fromEntries(formData);
    
    // In a real application, you would send this data to a server
    console.log('Quote request data:', data);
    
    // Show success message
    successMessage.style.display = 'block';
    quoteForm.style.display = 'none';
    
    // Scroll to success message
    successMessage.scrollIntoView({ behavior: 'smooth' });
    
    // You could also send the data via email or to a database here
    // sendQuoteRequest(data);
  });

  // Form validation
  function validateForm() {
    const requiredFields = quoteForm.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        isValid = false;
        field.style.borderColor = '#e53e3e';
      } else {
        field.style.borderColor = '#cbd5e0';
      }
    });
    
    // Email validation
    const emailField = document.getElementById('email');
    if (emailField.value && !isValidEmail(emailField.value)) {
      isValid = false;
      emailField.style.borderColor = '#e53e3e';
    }
    
    return isValid;
  }
  
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Real-time budget calculator (optional enhancement)
  const budgetSelect = document.getElementById('budget');
  const featureCheckboxes = document.querySelectorAll('input[name="features"]');
  
  function updateBudgetEstimate() {
    // This is a simplified example - in reality, you'd have more complex pricing logic
    const selectedFeatures = Array.from(featureCheckboxes)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value);
    
    // You could update a budget display based on selected features
    console.log('Selected features:', selectedFeatures);
  }
  
  featureCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateBudgetEstimate);
  });
  
  // Project type change handler
  const projectTypeSelect = document.getElementById('project-type');
  projectTypeSelect.addEventListener('change', function() {
    // You could show/hide certain form sections based on project type
    const selectedType = this.value;
    console.log('Project type changed to:', selectedType);
  });
});

// Function to send quote request (for backend integration)
function sendQuoteRequest(data) {
  // This would be implemented based on your backend setup
  // Example using fetch API:
  /*
  fetch('/api/quote-request', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(result => {
    console.log('Success:', result);
  })
  .catch(error => {
    console.error('Error:', error);
  });
  */
}
