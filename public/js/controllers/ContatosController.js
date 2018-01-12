angular.module('contatooh').controller('ContatosController',
	function ($scope, Contato) {

		$scope.contatos = [];

		$scope.filtro = '';

		$scope.mensagem = {texto: ''};

		var ID_CONTATO_INC = 3;

		function buscaContatos(){
			Contato.query(function(contatos) {
				$scope.contatos = contatos;
				$scope.mensagem = {};
			}, function(erro) {
				$scope.mensagem = { 
					texto: 'Não foi possicel obter a lista de contatos'
				};
				console.log(erro);
			});
		}

		$scope.remove = function(contato) {
			Contato.delete({id: contato._id},
				buscaContatos,
				function(erro) {
					$scope.mensagem = { 
						texto: 'Não foi possivel remove o contato'
					};
					console.log(erro);
				});
		};

		buscaContatos();
	});