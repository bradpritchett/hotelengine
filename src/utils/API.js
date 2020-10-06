export default {
	search: function(searchTerm, sort) {
		let url = `https://api.github.com/search/repositories?q=${searchTerm}&sort=${sort}&order=desc`;
		return fetch(url, {
			method: 'GET',
			headers: {
				Accept: 'application/vnd.github.v3+json'
			}
		}).then(response => response.json());
	}	
}
