function verificaAutenticacao(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.status('401').json('Não autorizado');
	}
}

module.exports = function(app) {
	var controllers = app.controllers.contato;

	app.route('/contatos')
		.get(verificaAutenticacao, controllers.listaContatos)
		.post(verificaAutenticacao, controllers.salvaContato);

	app.route('/contatos/:id')
	    .get(verificaAutenticacao, controllers.obtemContato)
	    .delete(verificaAutenticacao, controllers.removeContato);
};