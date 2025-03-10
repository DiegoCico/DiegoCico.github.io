document.addEventListener("DOMContentLoaded", function () {
  const username = "diegocico"; // Use your GitHub username in lowercase
  // Use the .json extension to fetch JSON data
  const endpoint = `https://github-contributions-api.deno.dev/${username}.json`;

  fetch(endpoint)
    .then(response => response.json())
    .then(data => {
      if (!data.contributions || !Array.isArray(data.contributions)) {
        console.error("No valid contributions data found.");
        return;
      }
      
      // Log the raw contributions array for debugging
      console.log("Contributions array:", data.contributions);
      
      // Assume each element is [ date, commitCount ]
      const contributions = data.contributions;
      const counts = contributions.map(entry => (typeof entry[1] === "number" ? entry[1] : 0));
      console.log("Contribution counts:", counts);
      
      // Calculate the average commit count
      const total = counts.reduce((sum, value) => sum + value, 0);
      const avg = counts.length ? total / counts.length : 0;
      console.log("Average commits per day:", avg.toFixed(2));
      
      // Clear the grid container
      const gridContainer = document.querySelector(".contribution-grid");
      gridContainer.innerHTML = "";
      
      // For each day, create a square with the appropriate data-level
      contributions.forEach(entry => {
        const date = entry[0];
        // Directly use the number from entry[1]
        const count = typeof entry[1] === "number" ? entry[1] : 0;
        const level = mapCountToLevel(count, avg);
        const square = document.createElement("div");
        square.className = "contribution-square";
        square.setAttribute("data-level", level);
        square.title = `${date}: ${count} contributions`;
        gridContainer.appendChild(square);
      });
    })
    .catch(error => {
      console.error("Error fetching contributions:", error);
    });
  
  /**
   * mapCountToLevel(count, avg)
   * Uses the average commit count as the 50% mark and 2 * avg as the 100% mark.
   * The ratio (count / (2 * avg)) is clamped to [0, 1] and divided into four buckets:
   *  - 0 commits → level 0 (lightest red)
   *  - ratio < 0.25 → level 1
   *  - ratio < 0.5  → level 2
   *  - ratio < 0.75 → level 3
   *  - ratio ≥ 0.75 → level 4 (darkest red)
   */
  function mapCountToLevel(count, avg) {
    if (count === 0) return 0;
    if (avg === 0) return 4; // Fallback if average is zero
    const ratio = count / (2 * avg);
    const clampedRatio = Math.min(ratio, 1);
    if (clampedRatio < 0.25) return 1;
    if (clampedRatio < 0.5) return 2;
    if (clampedRatio < 0.75) return 3;
    return 4;
  }
});
