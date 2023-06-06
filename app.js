'use strict';

const express = require('express');
const app = express();
const {sequelize} = require('./app/models/index');
const path = require('path');
const cors = require('cors');

const expressLayouts = require('express-ejs-layouts');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(
	cors({
		origin: process.env.HOST_FRONT || 'http://127.0.0.1:5174',
		credentials: true,
	})
);

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.set('views', __dirname + '/views');

// conexion a la base de datos
sequelize
	.authenticate()
	.then(() => {
		console.log('DB Connection exitosa yupi...');
	})
	.catch((error) => {
		console.log('Failed to Connection DB Local\n', error);
	});

//  fin db

// rutas
app.get('/', (req, res) => {
	res.render('index', {title: 'Página de inicio'});
});
app.get('*', (req, res) => {
	res.sendFile(__dirname+'/public/index.html')
});

// TODO: Route for api
app.use('/api/v1', require('./app/routes/api/index'));

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});
