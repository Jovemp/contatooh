var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var mongoose =require('mongoose');

module.exports = function() {

	var Usuario = mongoose.model('Usuario');

	passport.use( new GitHubStrategy( {
		clientID: 'f09ee54cf3ad2824e514',
		clientSecret: 'd3fa016e1121d20e437c68f73dab3bd361ba2da1',
		callbackURL: 'http://localhost:3000/auth/github/callback'
	}, function (accessToken, refreshToken, profile, done) {

		Usuario.findOrCreate(
			{"login" : profile.username},
			{"nome" : profile.username},
			function(erro, usuario){
				if (erro) {
					console.log(erro);
					return done(erro);
				}
				return done(null, usuario);
			});
	}));

	/*
		Chamao apenas uma vez e recebe o usuário do nosso
		banco disponibilizado pelo callback da estratégia de 
		autenticação. Realizará a serialização apenas do
		ObjectId do usuário na sessão
	*/

	passport.serializeUser(function(usuario, done) {
		done(null, usuario._id);
	});

	/*
		recebe o ObjectId do usuário armazenado na sessão
		chamado a cada requisição
	*/

	passport.deserializeUser(function(id, done) {
		Usuario.findById(id).exec()
		.then(function(usuario) {
			done(null, usuario);
		});
	});
};