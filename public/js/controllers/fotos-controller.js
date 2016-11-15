angular.module('alurapic').controller('FotosController', function ($scope, recursoFoto) {

	$scope.filtro = '';
	$scope.fotos = [];
	$scope.mensagem = '';

	recursoFoto.query(
		function (foto) {
			console.log(foto);
			$scope.fotos = foto;
		}, function (erro) {
			console.log(erro);
		});

	$scope.remover = function (foto) {
		recursoFoto.delete({ fotoId: foto._id },
			function (foto) {
				$scope.fotos.splice($scope.fotos.indexOf(foto), 1);
				$scope.mensagem = 'Foto removida com sucesso.';
				console.log(foto);
			}, function (erro) {
				$scope.mensagem = 'Foto NÃO foi removida.';
				console.log(erro);
			});
	};

});