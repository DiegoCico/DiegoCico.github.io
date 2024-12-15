// Fetches GitHub repo count with pagination and updates the "About Me" section dynamically
async function fetchAndDisplayRepoCount(username) {
    const baseUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
    let page = 1;
    let repoCount = 0;

    try {
        while (true) {
            const response = await fetch(`${baseUrl}&page=${page}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const repos = await response.json();
            if (repos.length === 0) break; // No more repositories to fetch
            repoCount += repos.length;
            page++;
        }

        // Update HTML with the correct repo count
        const aboutContent = document.querySelector(".about-content p:first-of-type");
        if (aboutContent) {
            aboutContent.innerHTML = `Hi, I am a current student at Northeastern University, class of 2026, studying Computer Science. I currently have <strong>${repoCount}</strong> projects in my GitHub repository.`;
        }
    } catch (error) {
        console.error(`An error occurred: ${error}`);
    }
}

// Main function
async function main() {
    const githubUsername = "DiegoCico"; // Replace with your GitHub username
    await fetchAndDisplayRepoCount(githubUsername);
}

main();
