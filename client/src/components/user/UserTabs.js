import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DefaultProfile from '../../assets/avatar.png';

class UserTabs extends Component {
	render() {
		const { following, followers, posts } = this.props;
		return (
			<div className='row'>
				<div className='col-md-4'>
					<h3 className='text-primary'>Followers</h3>
					<hr />
					{followers.map((person, i) => (
						<div key={i}>
							<Link to={`/user/${person._id}`}>
								<img
									style={{
										borderRadius: '50%',
										border: '1px solid black'
									}}
									className='float-left mr-2'
									height='30px'
									width='30px'
									src={`${process.env.REACT_APP_API_URL}/user/photo/${person._id}`}
									onError={i =>
										(i.target.src = DefaultProfile)
									}
									alt={person.name}
								/>
								<div>
									<p className='lead'>{person.name}</p>
								</div>
							</Link>
						</div>
					))}
				</div>
				<div className='col-md-4'>
					<h3 className='text-primary'>Following</h3>
					<hr />
					{following.map((person, i) => (
						<div key={i}>
							<Link to={`/user/${person._id}`}>
								<img
									style={{
										borderRadius: '50%',
										border: '1px solid black'
									}}
									className='float-left mr-2'
									height='30px'
									width='30px'
									src={`/api/user/photo/${person._id}`}
									onError={i =>
										(i.target.src = DefaultProfile)
									}
									alt={person.name}
								/>
								<div>
									<p className='lead'>{person.name}</p>
								</div>
							</Link>
						</div>
					))}
				</div>
				<div className='col-md-4'>
					<h3 className='text-primary'>
						Posts <hr />
						{posts.map((post, i) => (
							<div key={i}>
								<Link to={`/post/${post._id}`}>
									<div>
										<p className='lead'>{post.title}</p>
									</div>
								</Link>
							</div>
						))}
					</h3>
				</div>
			</div>
		);
	}
}
export default UserTabs;
