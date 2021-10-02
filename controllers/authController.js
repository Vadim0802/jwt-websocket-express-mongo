import jwt from 'jsonwebtoken';
import User from './../models/User.js';

export const jwtAuthorization = async (req, res, next) =>  {
  const { access_token } = req.cookies;

  if (!access_token) return res.redirect('/signin');

  try {
    const { email, password } = jwt.verify(access_token, 'my-super-secret-key');
    const user = await User.findOne({ email, password });
    if (!user) throw new Error();
  } catch (error) { return res.cookie('access_token', access_token, { expires: new Date(Date.now() - 1) } ).redirect('signin') };

  next();
};

export const jwtAuthentication = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (!user) {
    return res.render('signin', { error: 'Invalid email or password' });
  }

  const token = jwt.sign({ email, password }, 'my-super-secret-key');
  res.cookie('access_token', token, { httpOnly: true })
  next();
};

export const signUp = async (req, res) => {
  const { email, password, confirm_password } = req.body;

  if (confirm_password !== password) return res
    .render('signup', { error: 'Passwords dont match!' });
  
  await User.create({ email, password });
  res.redirect('/signin');
};
