import Express from 'express';
import cookieParser from 'cookie-parser';
import * as authController from './controllers/authController.js';
import * as viewController from './controllers/viewsController.js';

const app = Express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(Express.static('./public'));
app.use(cookieParser());

app.route('/protected')
  .get(authController.jwtAuthorization, viewController.getProtectedView);

app.route('/signin')
  .get(viewController.getSignInView)
  .post(authController.jwtAuthentication, (req, res) => res.redirect('protected'));

app.route('/signup')
  .get(viewController.getSignUpView)
  .post(authController.signUp);

export default app;
