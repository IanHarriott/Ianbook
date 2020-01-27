const express = require('express');
const app = express();
const mongoose = require('mongoose');
// const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const fs = require('fs');
const path = require('path');
// const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

//db
const connectionString = process.env.MONGO_URI || '';
mongoose
	.connect(connectionString, {
		useUnifiedTopology: true,
		useNewUrlParser: true
	})
	.then(() => {
		console.log('DB Connected');
	});

mongoose.connection.on('error', err => {
	console.log(`DB connection error: ${err.message}`);
});

//bring in routes
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
// apiDocs
app.get('/api', (req, res) => {
	fs.readFile('docs/apiDocs.json', (err, data) => {
		if (err) {
			res.status(400).json({
				error: err
			});
		}
		const docs = JSON.parse(data);
		res.json(docs);
	});
});

//middleware
// app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
// app.use(cors());
app.use('/api', postRoutes);
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use(function(err, req, res, next) {
	if (err.name === 'UnauthorizedError') {
		res.status(401).json({ error: 'Unauthorized!' });
	}
});

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
	// Set static fold
	console.log(path.resolve(__dirname, '../client/build'));
	app.use(__dirname, express.static('../client/build'));

	app.get('*', (req, res) => {
		res.sendFile(
			path.resolve(__dirname, '../client', 'build', 'index.html')
		);
	});
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`A Node Js API is listening on port: ${port}`);
});
