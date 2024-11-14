document.addEventListener('DOMContentLoaded', () => {
  // Selectors
  const slider = document.querySelector('.experience-slider');
  const pagination = document.querySelector('.pagination-lines');
  const experiencePages = document.querySelectorAll('.experience-page');
  let currentIndex = 0;
  let isScrolling = false;

  // Function to Create Pagination Lines Dynamically
  const createPaginationLines = () => {
    experiencePages.forEach((page, index) => {
      const line = document.createElement('div');
      line.classList.add('line');
      if (index === 0) line.classList.add('active');
      line.setAttribute('data-index', index);
      line.setAttribute('aria-label', `Go to experience section ${index + 1}`);
      pagination.appendChild(line);
    });
  };

  // Initialize Pagination Lines
  createPaginationLines();
  const lines = document.querySelectorAll('.pagination-lines .line');

  // Function to Update Active Line
  const updateActiveLine = (index) => {
    lines.forEach(line => line.classList.remove('active'));
    if (lines[index]) {
      lines[index].classList.add('active');
    }
  };

  // Function to Scroll to Specific Experience Page
  const scrollToPage = (index) => {
    const page = experiencePages[index];
    if (page) {
      const pagePosition = page.offsetLeft;
      slider.scrollTo({
                        left: pagePosition,
                        behavior: 'smooth'
                      });
      currentIndex = index;
      updateActiveLine(index);
    }
  };

  // Add Click Event Listeners to Lines
  lines.forEach(line => {
    line.addEventListener('click', (e) => {
      const index = parseInt(e.target.getAttribute('data-index'));
      scrollToPage(index);
    });
  });

  // Update Active Line on Manual Scroll
  const handleScroll = () => {
    if (isScrolling) return;
    isScrolling = true;

    setTimeout(() => {
      const sliderScrollLeft = slider.scrollLeft;
      const sliderWidth = slider.offsetWidth;
      let closestIndex = 0;
      let closestDistance = Infinity;

      experiencePages.forEach((page, index) => {
        const pageCenter = page.offsetLeft + (page.offsetWidth / 2);
        const distance = Math.abs(pageCenter - (sliderScrollLeft + (sliderWidth / 2)));
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      currentIndex = closestIndex;
      updateActiveLine(closestIndex);
      isScrolling = false;
    }, 100); // Debounce time
  };

  slider.addEventListener('scroll', handleScroll);

  // Modal Functionality
  const modal = document.getElementById('experience-modal');
  const closeBtn = modal.querySelector('.close-btn');
  const companyName = document.getElementById('company-name');
  const jobRole = document.getElementById('job-role');
  const jobDuration = document.getElementById('job-duration');
  const jobDescription = document.getElementById('job-description');

  const experienceItems = document.querySelectorAll('.experience-item');

  experienceItems.forEach(item => {
    item.addEventListener('click', () => {
      companyName.textContent = item.querySelector('h4').textContent;
      jobRole.textContent = item.getAttribute('data-role');
      jobDuration.textContent = item.getAttribute('data-duration');
      jobDescription.textContent = item.getAttribute('data-description');
      modal.style.display = 'block';
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Drag-to-Scroll Functionality
  let isDown = false;
  let startX;
  let scrollLeftPos;

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeftPos = slider.scrollLeft;
  });

  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
  });

  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5; // Adjust scroll speed as needed
    slider.scrollLeft = scrollLeftPos - walk;
  });

  // Optional: Keyboard Navigation (Left and Right Arrow Keys)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      if (currentIndex > 0) {
        scrollToPage(currentIndex - 1);
      }
    } else if (e.key === 'ArrowRight') {
      if (currentIndex < experiencePages.length - 1) {
        scrollToPage(currentIndex + 1);
      }
    }
  });
});
