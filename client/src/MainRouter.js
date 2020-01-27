import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/core/Home';
import Menu from './components/core/Menu';
// import Signup from './user/Signup';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
// import Profile from './user/Profile';
import Users from './components/user/Users';
// import EditProfile from './user/EditProfile';
// import FindPeople from './user/FindPeople';
// import NewPost from './post/NewPost';
// import SinglePost from './post/SinglePost';
// import EditPost from './post/EditPost';
// import ForgotPassword from './user/ForgotPassword';
// import ResetPassword from './user/ResetPassword';
// import PrivateRoute from './auth/PrivateRoute';

const MainRouter = () => (
	<div>
		<Menu />
		<Switch>
			<Route exact path='/' component={Home} />
			{/* <Route exact path='/forgot-password' component={ForgotPassword} /> */}
			{/* <Route
				exact
				path='/reset-password/:resetPasswordToken'
				component={ResetPassword}
			/> */}
			{/* <PrivateRoute exact path='/post/create' component={NewPost} /> */}
			{/* <Route exact path='/post/:postId' component={SinglePost} /> */}
			{/* <PrivateRoute
				exact
				path='/post/edit/:postId'
				component={EditPost}
			/> */}
			<Route exact path='/users' component={Users} />
			<Route exact path='/register' component={Register} />
			<Route exact path='/login' component={Login} />
			{/* <PrivateRoute exact path='/user/:userId' component={Profile} /> */}
			{/* <PrivateRoute
				exact
				path='/user/edit/:userId'
				component={EditProfile}
			/> */}
			{/* <PrivateRoute exact path='/findpeople' component={FindPeople} /> */}
		</Switch>
	</div>
);

export default MainRouter;
