var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;

// ObjectID de algum contato existende
var _idProcurado = new ObjectID('582f23a20585f9f5c1125d3b');

MongoClient.connect('mongodb://127.0.0.1:27017/contatooh',
	function(erro, db) {
		if(erro, db) {
			if (erro) throw err;
			db.collection('contatos').findOne({_id: _idProcurado}, 
				function (erro, contato) {
					if (erro) throw err;
					console.log(contato);
				});
		}
	});