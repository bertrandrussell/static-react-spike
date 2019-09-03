// Post.js
import React, { createElement } from 'react';
import { createClient } from 'contentful';
import Helmet from 'react-helmet';
import marksy from 'marksy';

const getMarkup = (field) => {
	if (!field) return null;
	const compile = marksy({
		createElement,
		elements      : {}
	});
	return compile(field).tree;
};

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

		if (!this.state.data) return null;

		let content = getMarkup(this.state.data.content);

		return (
			<React.Fragment>
				<Helmet title={this.state.data.title} />
				<h1>{this.state.data.title}</h1>
				{content}
			</React.Fragment>
		);
	}
}

export default Post;
