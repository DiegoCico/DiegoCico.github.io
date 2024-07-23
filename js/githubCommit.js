document.addEventListener('DOMContentLoaded', function() {
  const username = 'DiegoCico';

  // Fetch all repositories of the user
  fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then(repos => {
      if (repos && repos.length > 0) {
        let promises = repos.map(repo => {
          return fetch(`https://api.github.com/repos/${username}/${repo.name}/commits`)
            .then(response => response.json())
            .then(commits => {
              if (commits && commits.length > 0) {
                return {
                  repoName: repo.name,
                  lastCommitDate: new Date(commits[0].commit.author.date)
                };
              } else {
                return null;
              }
            });
        });

        // Process all promises
        Promise.all(promises).then(results => {
          let latestCommit = results.filter(result => result !== null).sort((a, b) => b.lastCommitDate - a.lastCommitDate)[0];

          if (latestCommit) {
            const currentDate = new Date();
            const timeDifference = Math.floor((currentDate - latestCommit.lastCommitDate) / (1000 * 60 * 60 * 24)); // Difference in days

            document.getElementById('lastCommitDate').innerHTML = `<strong>${latestCommit.repoName}</strong>: ${timeDifference} days ago`;
          } else {
            document.getElementById('lastCommitDate').textContent = 'No commits found';
          }
        }).catch(error => {
          console.error('Error processing commit data:', error);
          document.getElementById('lastCommitDate').textContent = 'Error loading commit data';
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
