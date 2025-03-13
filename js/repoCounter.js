async function fetchAllGitHubProjects(username) {
    const apiUrl = `https://api.github.com/users/${username}/repos`;
    let page = 1;
    let repos = [];

    try {
      while (true) {
        const response = await fetch(`${apiUrl}?per_page=100&page=${page}`);
        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }
        const data = await response.json();
        if (data.length === 0) break; // Stop when no more repos are returned
        repos = repos.concat(data);
        page++;
      }

      document.getElementById('projectCount').textContent = repos.length;
    } catch (error) {
      console.error('Error fetching GitHub repositories:', error);
      document.getElementById('projectCount').textContent = 'API used to much :(';
    }
  }

  // Call the function with your GitHub username
  fetchAllGitHubProjects('DiegoCico');