
var express             = require('express'),

    petController       = require('./controllers/pet'),
    userController      = require('./controllers/user'),
    authController      = require('./controllers/auth'),
    clientController    = require('./controllers/client'),
    oauth2Controller    = require('./controllers/oauth2')

    apiRoutes;

apiRoutes = function(middleware) {
    var router = express.Router();

    router.get('/', function (req, res) {
        res.json({'message': '欢迎来到宠物商店'});
    });

    router.route('/pets')
        .post(authController.isAuthenticated, petController.postPets)
        .get(authController.isAuthenticated, petController.getPets);

    router.route('/pets/:pet_id')
        .get(authController.isAuthenticated, petController.getPet)
        .put(authController.isAuthenticated, petController.updatePet)
        .delete(authController.isAuthenticated, petController.deletePet);

    router.route('/pets/full/:pet_id')
        .get(authController.isAuthenticated, petController.getFullPets);

    // path: /users, for users
    router.route('/users')
        .post(userController.postUsers)
        .get(authController.isAuthenticated, userController.getUsers);

    // 处理 /clients
    router.route('/clients')
        .post(authController.isAuthenticated, clientController.postClients)
        .get(authController.isAuthenticated, clientController.getClients);

    router.route('/oauth2/authorize')
        .post(authController.isAuthenticated, oauth2Controller.decision)
        .get(authController.isAuthenticated, oauth2Controller.authorization);

    router.route('/oauth2/token')
        .post(authController.isClientAuthenticated, oauth2Controller.token);

    return router;
};

module.exports = {
    apiBaseUri: 'api/v1/',
    api: apiRoutes
};