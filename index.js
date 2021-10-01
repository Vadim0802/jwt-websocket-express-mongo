import Express from 'express';
import cookieParser from 'cookie-parser';
import * as AuthController from './controllers/authController.js';
import * as ViewController from './controllers/viewsController.js';

const app = Express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(Express.static('./public'));
app.use(cookieParser());

app.route('/protected')
  .get(AuthController.jwtAuthorization, ViewController.getProtectedView);

app.route('/signin')
  .get(ViewController.getSignInView)
  .post(AuthController.jwtAuthentication, (req, res) => res.redirect('protected'));

app.route('/signup')
  .get(ViewController.getSignUpView)
  .post(AuthController.signUp);

export default app;