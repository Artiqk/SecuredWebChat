require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { signupSchema } = require('../validators/userValidator');

const saltRounds = 10;

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });

    const match = user ? await bcrypt.compare(password, user.password) : false;

    if (!user || !match) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

exports.signup = async (req, res) => {
  try {
    const { value, error } = signupSchema.validate(req.body);

    if (error) {
      // FIXME: Error message might be not suitable for production
      return res.status(400).json({ error: error.details[0].message });
    }

    const { username, password } = value;

    const userCount = await User.count({ where: { username } });

    if (userCount > 0) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      username,
      password: hashedPassword
    });

    // FIXME: Password returned in the data
    res.status(201).json({ message: 'User signed up successfully', data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}