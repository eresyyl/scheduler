const Router = require('koa-router'),
	KoaBody = require('koa-body'),
	subscribersController = require('../controllers/subscribersController.js'),
	coffeeController = require('../controllers/coffeeController.js');

const router = new Router();

router
	.get('/subscribers/', subscribersController.list)
	.post('/subscribers/', KoaBody(), subscribersController.create)
	.get('/subscribers/:response_path', subscribersController.check)
	.delete('/subscribers/:response_path', subscribersController.remove)
	.get('/coffee/', coffeeController.list);

module.exports = {
    routes () { return router.routes() },
    allowedMethods () { return router.allowedMethods() }
};