angular.module('minhasDiretivas', ['meusServicos'])
    .directive('meuPainel', function () {
        var ddo = {};

        ddo.restrict = 'AE';
        ddo.scope = {
            titulo: '@titulo'
        };
        ddo.transclude = true;
        ddo.templateUrl = "js/directives/meu-painel.html";
        
        return ddo;
    })
    .directive('minhaFoto', function() {
        return {
            restrict: 'AE',
            scope: {
                titulo: '@',
                urlFoto: '@url'
            },
            template: '<img class="img-responsive center-block" ng-src="{{urlFoto}}" alt="{{titulo}}">' 
        };
    })
    .directive('meuBotaoPerigo', function() {
        return {
            restrict: 'E',
            scope: {
                nome: '@',
                acao: '&'
            },
            template: '<button ng-click="acao()" class="btn btn-danger btn-block">{{nome}}</button>' 
        };
    })
    .directive('meuFocus', function() {
        return {
            restrict: 'A',
            link: function(scope, element) {
                scope.$on('fotoCadastrada', function() {
                    element[0].focus();
                })
            } 
        };
    })
    .directive('meusTitulos', function() {
        return {
            restrict: 'E',
            template: '<ul><li ng-repeat="titulo in titulos">{{titulo}}</li></ul>',
            controller: function ($scope, recursoFoto) {
                recursoFoto.query(function(fotos) {
                    $scope.titulos = fotos.map(function(foto) {
                        return foto.titulo;
                    })
                }, function(error) {
                    console.log(error);
                })
            } 
        };
    });