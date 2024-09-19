async function getLinesOfCode() {
  const username = 'DiegoCico';
  let totalLines = 0;

  try {
    // Fetch repositories
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);
    if (!reposResponse.ok) {
      throw new Error(`Error fetching repositories: ${reposResponse.statusText}`);
    }
    const repos = await reposResponse.json();

    for (const repo of repos) {
      console.log(`Fetching commits for repository: ${repo.name}`);

      let page = 1;
      let commits;
      do {
        // Fetch commits with pagination
        const commitsResponse = await fetch(`https://api.github.com/repos/${username}/${repo.name}/commits?per_page=100&page=${page}`);
        if (!commitsResponse.ok) {
          throw new Error(`Error fetching commits for repository ${repo.name}: ${commitsResponse.statusText}`);
        }
        commits = await commitsResponse.json();

        // If there are commits, fetch stats for each one
        for (const commit of commits) {
          const commitDetailsResponse = await fetch(commit.url);
          if (!commitDetailsResponse.ok) {
            throw new Error(`Error fetching commit details for commit ${commit.sha}: ${commitDetailsResponse.statusText}`);
          }
          const commitDetails = await commitDetailsResponse.json();
          if (commitDetails.stats && commitDetails.stats.additions) {
            totalLines += commitDetails.stats.additions;
          }
        }

        page++;
      } while (commits.length > 0); // Continue fetching pages if there are more commits
    }

    document.getElementById('linesOfCode').innerText = totalLines.toLocaleString();
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    document.getElementById('linesOfCode').innerText = 'Error loading data';
  }
}

document.addEventListener('DOMContentLoaded', getLinesOfCode);
