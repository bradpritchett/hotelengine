export default {
	search: function(searchTerm) {
		return fetch(`https://api.github.com/search/repositories?q=${searchTerm}&sort=stars&order=desc`, {
			method: 'GET',
			headers: {
				Accept: 'application/vnd.github.v3+json'
			}
		}).then(response => response.json());
	}	
}
