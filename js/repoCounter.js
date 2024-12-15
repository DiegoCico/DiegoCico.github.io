// Fetches GitHub repo count and updates the "About Me" section dynamically
async function fetchAndDisplayRepoCount(username) {
    const url = `https://api.github.com/users/${username}/repos`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const repos = await response.json();
        const repoCount = repos.length;
        
        // Update the HTML dynamically
        const aboutContent = document.querySelector(".about-content");
        const repoCountParagraph = document.createElement("p");
        repoCountParagraph.innerHTML = `I currently have <strong>${repoCount}</strong> projects in my GitHub repository.`;
        aboutContent.insertBefore(repoCountParagraph, aboutContent.querySelector("p:nth-of-type(2)")); // Insert after the first paragraph
    } catch (error) {
        console.error(`An error occurred: ${error}`);
    }
}

// Replace 'DiegoCico' with your GitHub username
fetchAndDisplayRepoCount("DiegoCico");
