// Home.js
import React from 'react';
import { createClient } from 'contentful';

class Home extends React.Component {
	state = {
		posts : []
	};

	componentWillMount() {
		const client = createClient({
			space       : process.env.REACT_APP_SPACE_ID,
			accessToken : process.env.REACT_APP_ACCESS_TOKEN
		});

		client
			.getEntries({})
			.then((response) => {
				this.setState({
					posts : response.items
				});
			})
			.catch(console.error);
	}

	render() {
		if (!this.state.posts.length) return <p>No posts found.</p>;

		return this.state.posts.map((post) => {
			console.log(post);
			return <p>Post</p>;
		});
	}
}

export default Home;

// then save as > Post.js with file updated accordingly
