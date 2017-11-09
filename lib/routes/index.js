const Router = require('koa-router'),
	KoaBody = require('koa-body'),
	subscriberController = require('../controllers/subscriberController.js');

const router = new Router();

router
	.get('/subscribers/', subscriberController.list)
	.post('/subscribers/', KoaBody(), subscriberController.create)
	.delete('/subscribers/:response_path', subscriberController.remove);

module.exports = {
    routes () { return router.routes() },
    allowedMethods () { return router.allowedMethods() }
};