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
app.use(cors());

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

// TODO: Route for api
app.use('/api/v1', require('./app/routes/api/index'));

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});
