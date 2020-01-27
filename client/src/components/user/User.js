import React, { Component } from 'react';
import { isAuthenticated } from '../auth';
import { Redirect, Link } from 'react-router-dom';
import { getUser } from './apiUser';
import { listByUser } from '../post/apiPost';
import DefaultProfile from '../../assets/avatar.png';
import DeleteUser from './DeleteUser';
import FollowUserButton from './FollowUserButton';
import ProfileTabs from './UserTabs';

class User extends Component {
	constructor() {
		super();
		this.state = {
			user: { following: [], followers: [] },
			redirectToLogin: false,
			following: false,
			error: '',
			posts: []
		};
	}

	checkFollow = user => {
		const jwt = isAuthenticated();
		//check followers list for a follower who has the same id as the currently logged in person (are you their follower?)
		const match = user.followers.find(follower => {
			return follower._id === jwt.user._id;
		});
		return match;
	};

	clickFollowButton = callApi => {
		const userId = isAuthenticated().user._id;
		const token = isAuthenticated().token;
		callApi(userId, token, this.state.user._id).then(data => {
			if (data.error) {
				this.setState({ error: data.error });
			} else {
				this.setState({ user: data, following: !this.state.following });
			}
		});
	};

	init = userId => {
		const token = isAuthenticated().token;
		getUser(userId, token).then(data => {
			if (data.error) {
				this.setState({ redirectToLogin: true });
			} else {
				let following = this.checkFollow(data);
				this.setState({ user: data, following });
				this.loadPosts(data._id);
			}
		});
	};

	loadPosts = userId => {
		const token = isAuthenticated().token;
		listByUser(userId, token).then(data => {
			if (data.error) {
				console.log(data.error);
			} else {
				this.setState({ posts: data });
			}
		});
	};

	componentDidMount() {
		const userId = this.props.match.params.userId;
		this.init(userId);
	}

	componentWillReceiveProps(props) {
		const userId = props.match.params.userId;
		this.init(userId);
	}

	render() {
		const { redirectToLogin, user, following, posts } = this.state;
		if (redirectToLogin) return <Redirect to='/login' />;

		const photoUrl = user._id
			? `/api/user/photo/${
					user._id
			  }?${new Date().getTime()}`
			: DefaultProfile;

		return (
			<div className='container'>
				<h2 className='mt-5 mb-5'>Profile</h2>
				<div className='row'>
					<div className='col-md-4'>
						<img
							style={{ height: '200px', width: 'auto' }}
							className='img-thumbnail'
							src={photoUrl}
							onError={i => (i.target.src = DefaultProfile)}
							alt={user.name}
						/>
					</div>
					<div className='col-md-8'>
						<div className='lead mt-2'>
							<p>Hello {user.name}</p>
							<p>Email: {user.email}</p>
							<p>{`Joined ${new Date(
								user.created
							).toDateString()}`}</p>
						</div>
						{isAuthenticated().user &&
						isAuthenticated().user._id === user._id ? (
							<div className='d-inline-block'>
								<Link
									className='btn btn-raised btn-info mr-5'
									to={`/post/create`}>
									Create Post
								</Link>
								<Link
									className='btn btn-raised btn-success mr-5'
									to={`/user/edit/${user._id}`}>
									Edit Profile
								</Link>
								<DeleteUser userId={user._id} />
							</div>
						) : (
							<FollowUserButton
								following={following}
								onButtonClick={this.clickFollowButton}
							/>
						)}
					</div>
				</div>
				<div className='row'>
					<div className='col-md-12 mt-5 mb-5'>
						<hr />
						<p className='lead'>{user.about}</p>
						<hr />
						<ProfileTabs
							followers={user.followers}
							following={user.following}
							posts={posts}
						/>
					</div>
				</div>
			</div>
		);
	}
}
export default User;
