// Fetches GitHub repo count and updates the "About Me" section dynamically
async function fetchAndDisplayRepoCount(username) {
    const url = `https://api.github.com/users/${username}/repos?per_page=100`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const repos = await response.json();
        
        // Update HTML with the correct repo count
        const repoCount = repos.length;
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
