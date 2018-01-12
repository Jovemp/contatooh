var helmet = require('helmet');

var express = require('express');
// foi comentado devido ter adicionado a linha abaixo
//var home = require('../app/routes/home');
var load = require('express-load');

var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

module.exports = function() {
	var app = express();
	// variavel de ambiente
	app.set('port', 3000);

	app.use(cookieParser());
	app.use(session(
	{
		secret: 'homem avestruz',
		resave: true,
		saveUninitialized: true
	}));

	app.use(passport.initialize());
	app.use(passport.session());
	app.use(helmet.hidePoweredBy({setTo: 'PHP 5.5.14'}));
	app.use(helmet.xframe());
	app.use(helmet.xssFilter());
	app.use(helmet.nosniff());
	//app.use(helmet());
	
	// middleware
	app.use(express.static('./public'));
	
	app.set('view engine', 'ejs');
	app.set('views', './app/views');
	
	// middleware para tratar protocolo http
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(require('method-override')());
	
	//home(app);
	// Rotas
	load('models', {cwd: 'app'})
		.then('controllers')
		.then('routes')
		.into(app);

	// se nenhuma rota atender, direciona para página 404
	app.get('*', function(req, res) {
		res.status(404).render('404');
	});
	
	return app;
}