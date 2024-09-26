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

const slider = document.querySelector('.experience-slider');
let isDown = false;
let startX;
let scrollLeft;

// Mouse down event
slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

// Mouse leave event
slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});

// Mouse up event
slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});

// Mouse move event
slider.addEventListener('mousemove', (e) => {
  if (!isDown) return; // Stop the function from running if not holding the mouse button
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 2; // Multiply by 2 to make the scroll faster
  slider.scrollLeft = scrollLeft - walk;
});

// Touch support (for mobile)
slider.addEventListener('touchstart', (e) => {
  isDown = true;
  startX = e.touches[0].pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('touchend', () => {
  isDown = false;
});

slider.addEventListener('touchmove', (e) => {
  if (!isDown) return;
  const x = e.touches[0].pageX - slider.offsetLeft;
  const walk = (x - startX) * 2;
  slider.scrollLeft = scrollLeft - walk;
});

