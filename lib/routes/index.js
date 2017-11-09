const Router = require('koa-router'),
	KoaBody = require('koa-body'),
	subscribersController = require('../controllers/subscribersController.js');

const router = new Router();

router
	.get('/subscribers/', subscribersController.list)
	.post('/subscribers/', KoaBody(), subscribersController.create)
	.delete('/subscribers/:response_path', subscribersController.remove);

module.exports = {
    routes () { return router.routes() },
    allowedMethods () { return router.allowedMethods() }
};