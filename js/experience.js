// Modal logic
const modal = document.getElementById('experience-modal');
const closeBtn = document.querySelector('.close-btn');

// Handle clicking on an experience item
document.querySelectorAll('.experience-item').forEach(item => {
  item.addEventListener('click', () => {
    document.getElementById('company-name').innerText = item.querySelector('h4').innerText;
    document.getElementById('job-role').innerText = item.dataset.role;
    document.getElementById('job-duration').innerText = item.dataset.duration;
    document.getElementById('job-description').innerText = item.dataset.description;

    modal.style.display = 'block';
  });
});

// Handle closing the modal
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close modal when clicking outside of the modal content
window.addEventListener('click', (event) => {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
});
