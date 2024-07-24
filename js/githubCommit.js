document.addEventListener('DOMContentLoaded', function() {
  const username = 'DiegoCico';

  // Fetch all repositories of the user
  fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error fetching repositories: ${response.statusText}`);
      }
      return response.json();
    })
    .then(repos => {
      if (repos && repos.length > 0) {
        // Get the most recently updated repository
        const latestRepo = repos[0];

        // Fetch commits of the latest repository
        return fetch(`https://api.github.com/repos/${username}/${latestRepo.name}/commits`)
          .then(response => {
            if (!response.ok) {
              throw new Error(`Error fetching commits for ${latestRepo.name}: ${response.statusText}`);
            }
            return response.json();
          })
          .then(commits => {
            if (commits && commits.length > 0) {
              const latestCommit = commits[0];
              const latestCommitDate = new Date(latestCommit.commit.author.date);
              const currentDate = new Date();
              const timeDifference = Math.floor((currentDate - latestCommitDate) / (1000 * 60 * 60 * 24));

              const timeText = timeDifference === 0 ? 'today' : `${timeDifference} days ago`;

              document.getElementById('lastCommitDate').innerHTML = `<strong>${latestRepo.name}</strong>: ${timeText}`;
            } else {
              document.getElementById('lastCommitDate').textContent = 'No commits found';
            }
          });
      } else {
        document.getElementById('lastCommitDate').textContent = 'No repositories found';
      }
    })
    .catch(error => {
      console.error('Error fetching repository data:', error);
      document.getElementById('lastCommitDate').textContent = 'Error loading repository data';
    });
});
