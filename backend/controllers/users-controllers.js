const { v4: uuid } = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const DUMMY_USERS = [
  {
    id: 'u1',
    name: 'Jeff Ripke',
    email: 'test@test.com',
    password: 'testers',
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const signup = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }
  const { name, email, password, places } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne();
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      'User exists already, please lgoin instead.',
      422
    );
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    image: 'https://www.esbnyc.com/sites/default/files/2020-01/ESB%20Day.jpg',
    password,
    places,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = newHttp('Signing Up failed, please try again.', 500);
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const hasUser = DUMMY_USERS.find((u) => u.email === email);
  if (hasUser) {
    return next(
      new HttpError('Could not create user, eamil already exists.', 422)
    );
  }

  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    return next(
      new HttpError('Could not identy user, credentials seem to be wrong.', 401)
    );
  }

  res.json({ mesage: 'Logged in' });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
