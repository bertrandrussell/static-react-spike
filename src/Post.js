// Post.js
import React from 'react';

class Post extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data : null
		};
	}

	componentDidMount() {
		const client = createClient({
			space       : process.env.REACT_APP_SPACE_ID,
			accessToken : process.env.REACT_APP_ACCESS_TOKEN
		});

		client
			.getEntry(this.props.match.params.id)
			.then((response) => {
				this.setState({
					data : response.fields
				});
			})
			.catch(console.error);
	}

	render() {
		console.log(this.state.data);
		return <p> Post </p>;
	}
}

export default Post;
