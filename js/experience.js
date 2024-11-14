document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".experience-slider");
  const pages = Array.from(document.querySelectorAll(".experience-page"));
  const pagination = document.querySelector(".pagination-lines");

  let currentPage = 0;

  // Function to navigate to a specific page
  function goToPage(pageIndex) {
    currentPage = pageIndex;
    const offset = pageIndex * -100;
    slider.style.transform = `translateX(${offset}%)`;
    updatePagination();
  }

  // Create pagination dots
  function createPagination() {
    pages.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.classList.add("line");
      if (index === currentPage) dot.classList.add("active");
      dot.addEventListener("click", () => goToPage(index));
      pagination.appendChild(dot);
    });
  }

  // Update active dot based on the current page
  function updatePagination() {
    Array.from(pagination.children).forEach((dot, index) => {
      dot.classList.toggle("active", index === currentPage);
    });
  }

  // Initialize the pagination and slider
  createPagination();
  goToPage(currentPage);

  // Swipe functionality for mobile
  let startX = 0;
  slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  slider.addEventListener("touchmove", (e) => {
    const deltaX = e.touches[0].clientX - startX;
    if (deltaX > 50 && currentPage > 0) {
      goToPage(currentPage - 1); // Swipe right
    } else if (deltaX < -50 && currentPage < pages.length - 1) {
      goToPage(currentPage + 1); // Swipe left
    }
  });
});
