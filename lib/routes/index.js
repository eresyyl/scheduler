const Router = require('koa-router'),
	KoaBody = require('koa-body'),
	subscribersController = require('../controllers/subscribersController.js'),
	ordersController = require('../controllers/ordersController.js'),
	coffeeController = require('../controllers/coffeeController.js');

const router = new Router();

router
	.get('/subscribers/', subscribersController.list)
	.post('/subscribers/', KoaBody(), subscribersController.create)
	.get('/subscribers/:response_path', subscribersController.check)
	.delete('/subscribers/:response_path', subscribersController.remove)
	.get('/coffee/', coffeeController.list)
	.post('/orders/', KoaBody(), ordersController.create)
	.put('/orders/confirm/', KoaBody(), ordersController.confirm)
	.delete('/orders/:id', ordersController.remove);

module.exports = {
    routes () { return router.routes() },
    allowedMethods () { return router.allowedMethods() }
};