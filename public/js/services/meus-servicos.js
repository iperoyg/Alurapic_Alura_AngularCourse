angular.module('meusServicos', ['ngResource'])
    .factory('recursoFoto', function ($resource) {
        return $resource('v1/fotos/:fotoId', null, {
            'update': {
                method: 'PUT'
            },
        });
    })
    .factory('cadastroDeFotos', function (recursoFoto, $q, $rootScope) {
        return {
            cadastrar: function (foto) {
                var evento = 'fotoCadastrada';
                return $q(function (resolve, reject) {
                    if (foto._id) {
                        recursoFoto.update({ fotoId: foto._id }, foto,
                            function () {
                                $rootScope.$broadcast(evento);
                                resolve({
                                    mensagem: 'Foto atualizada com sucesso!',
                                    inclusao: false
                                });
                            }, function (erro) {
                                reject({
                                    mensagem: 'ERRO ao atualizar a foto!'
                                });
                                console.log(erro);
                            });
                    }
                    else {
                        recursoFoto.save(foto,
                            function () {
                                $rootScope.$broadcast(evento);
                                resolve({
                                    mensagem: 'SUCESSO!',
                                    inclusao: true
                                });
                            }, function (erro) {
                                reject({
                                    mensagem: 'ERROR!'
                                });
                                console.log(erro);
                            });
                    }

                })
            }
        }
    });