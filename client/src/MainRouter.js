import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/core/Home';
import Menu from './components/core/Menu';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import User from './components/user/User';
import Users from './components/user/Users';
import EditUser from './components/user/EditUser';
import FindPeople from './components/user/FindPeople';
import CreatePost from './components/post/CreatePost';
import Post from './components/post/Post';
import EditPost from './components/post/EditPost';
import ForgotPassword from './components/auth/ForgotPassword';
import ResetPassword from './components/auth/ResetPassword';
import PrivateRoute from './components/auth/PrivateRoute';

const MainRouter = () => (
	<div>
		<Menu />
		<Switch>
			<Route exact path='/' component={Home} />
			<Route exact path='/forgot-password' component={ForgotPassword} />
			<Route
				exact
				path='/reset-password/:resetPasswordToken'
				component={ResetPassword}
			/>
			<PrivateRoute exact path='/post/create' component={CreatePost} />
			<Route exact path='/post/:postId' component={Post} />
			<PrivateRoute
				exact
				path='/post/edit/:postId'
				component={EditPost}
			/>
			<Route exact path='/users' component={Users} />
			<Route exact path='/register' component={Register} />
			<Route exact path='/login' component={Login} />
			<PrivateRoute exact path='/user/:userId' component={User} />
			<PrivateRoute
				exact
				path='/user/edit/:userId'
				component={EditUser}
			/>
			<PrivateRoute exact path='/findpeople' component={FindPeople} />
		</Switch>
	</div>
);

export default MainRouter;
