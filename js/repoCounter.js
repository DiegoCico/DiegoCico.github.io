// Fetches GitHub repo count with proper pagination for public repositories
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
            if (repos.length === 0) break; // Stop when no more repos are returned
            repoCount += repos.length;
            console.log(`Page ${page}: Fetched ${repos.length} repositories`);
            page++;
        }

        // Update HTML dynamically
        const aboutContent = document.querySelector(".about-content p:first-of-type");
        if (aboutContent) {
            aboutContent.innerHTML = `Hi, I am a current student at Northeastern University, class of 2026, studying Computer Science. I currently have <strong>${repoCount}</strong> public projects in my GitHub repository.`;
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
