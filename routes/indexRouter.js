const { Router } = require('express');
const indexRouter = Router();
const indexController = require('../controllers/indexController');

indexRouter.get('/', indexController.getHomepage);

indexRouter.get('/sign-up', indexController.getSignUpForm);
indexRouter.post('/sign-up', indexController.postSignUpForm);

indexRouter.post('/log-in', indexController.postLogInForm);

indexRouter.get('/log-out', indexController.getLogOutForm);

module.exports = indexRouter;