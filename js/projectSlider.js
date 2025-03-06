// projects.js

/* ----- Pagination for Main Carousel ----- */
let currentPage = 1;
const totalPages = 4; // Adjust if you add more pages

function showPage(page) {
  if (page < 1 || page > totalPages) return;
  document.querySelectorAll('.projects-page').forEach(pageDiv => {
    pageDiv.classList.remove('active');
  });
  document.getElementById('projects-page-' + page).classList.add('active');
  currentPage = page;
}

function showNextProjects() {
  let nextPage = currentPage + 1;
  if (nextPage > totalPages) {
    nextPage = 1; // Loop back to the first page
  }
  showPage(nextPage);
}

function showPrevProjects() {
  let prevPage = currentPage - 1;
  if (prevPage < 1) {
    prevPage = totalPages; // Loop to the last page
  }
  showPage(prevPage);
}

/* ----- Filtering Across All Projects ----- */
function updateFilteredResults() {
  const activeFilters = Array.from(document.querySelectorAll('.filter-btn.active'))
                              .map(btn => btn.getAttribute('data-language').toLowerCase());
  const filteredContainer = document.getElementById('filtered-projects');
  const carousel = document.querySelector('.projects-carousel');

  // If no filters are active, show the main carousel and hide the filtered results.
  if (activeFilters.length === 0) {
    carousel.style.display = 'flex';
    filteredContainer.style.display = 'none';
    return;
  }

  // Otherwise, hide the main carousel and build the filtered results.
  carousel.style.display = 'none';
  filteredContainer.style.display = 'flex';
  filteredContainer.innerHTML = ''; // Clear previous results

  // Loop through each original project card inside the carousel pages.
  document.querySelectorAll('.projects-page .project-card').forEach(card => {
    const languages = card.getAttribute('data-language')
                          .toLowerCase()
                          .split(',')
                          .map(lang => lang.trim());
    // Check if the card matches any of the active filters.
    const match = activeFilters.some(filter => languages.includes(filter));
    if (match) {
      // Clone the card so that we can display it in the filtered container.
      const clone = card.cloneNode(true);
      clone.style.display = 'block';
      clone.classList.remove('animate');
      void clone.offsetWidth; // Force reflow to restart animation
      clone.classList.add('animate');
      filteredContainer.appendChild(clone);
    }
  });
}

// Attach event listeners to every filter button.
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    updateFilteredResults();
  });
});
