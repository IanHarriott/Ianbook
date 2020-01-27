import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { logout, isAuthenticated } from '../auth';

const isActive = (history, path) => {
	if (history.location.pathname === path) return { color: '#ff9900' };
	else return { color: '#ffffff' };
};

class Menu extends Component {
	constructor() {
		super();
		this.state = { isOpen: false };
	}

	toggleCollapse = () => {
		this.setState({ isOpen: !this.state.isOpen });
	};

	render() {
		const { history } = this.props;
		return (
			<Navbar bg='dark' variant='dark' expand='lg'>
				<Navbar.Brand href='/'>Ianbook</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='mr-auto'>
						<Nav.Link href='/' style={isActive(history, '/')}>
							Home
						</Nav.Link>
						<Nav.Link
							href='/users'
							style={isActive(history, '/users')}>
							Users
						</Nav.Link>
						{isAuthenticated() && (
							<>
								<Nav.Link
									href='/findpeople'
									style={isActive(history, '/findpeople')}>
									Find People
								</Nav.Link>
								<Nav.Link
									href='/post/create'
									style={isActive(history, '/post/create')}>
									Create Post
								</Nav.Link>
							</>
						)}
					</Nav>
					{isAuthenticated() ? (
						<Nav>
							<Nav.Link
								href={`/user/${isAuthenticated().user._id}`}
								style={isActive(
									history,
									`/user/${isAuthenticated().user._id}`
								)}>
								{isAuthenticated().user.name}'s profile
							</Nav.Link>
							<Nav.Link
								href='/register'
								onClick={() =>
									logout(() => {
										history.push('/');
									})
								}>
								Logout
							</Nav.Link>
						</Nav>
					) : (
						<Nav>
							<Nav.Link
								href='/login'
								style={isActive(history, '/login')}>
								Login
							</Nav.Link>
							<Nav.Link
								href='/register'
								style={isActive(history, '/register')}>
								Register
							</Nav.Link>
						</Nav>
					)}
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

export default withRouter(Menu);
