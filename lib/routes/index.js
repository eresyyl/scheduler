const Router = require('koa-router'),
	KoaBody = require('koa-body'),
	jwt = require('koa-jwt'),
	subscribersController = require('../controllers/subscribersController.js'),
	ordersController = require('../controllers/ordersController.js'),
	coffeeController = require('../controllers/coffeeController.js'),
	tokenController = require('../controllers/tokenController.js'),
	{jwt_secret} = require("../../config/security.json");

const router = new Router();

router
	//.get('/token/', tokenController.get).
	.get('/subscribers/', subscribersController.list)
	.post('/subscribers/', KoaBody(), subscribersController.create)
	.get('/subscribers/:response_path', subscribersController.check)
	.delete('/subscribers/:response_path', subscribersController.remove)
	.get('/coffee/', coffeeController.list)
	.post('/orders/', KoaBody(), ordersController.create)
	.put('/orders/confirm/', KoaBody(), ordersController.confirm)
	.delete('/orders/:id', ordersController.remove);
	
router
	.use(['/orders/:id', '/orders/confirm/'], jwt({ secret: jwt_secret }));

module.exports = {
    routes () { return router.routes() },
    allowedMethods () { return router.allowedMethods() }
};