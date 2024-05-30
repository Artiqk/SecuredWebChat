const bcrypt = require('bcrypt');
const { User } = require('../models');

const saltRounds = 10;

exports.createUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
      username: username,
      password: hashedPassword
    });

    // FIXME: Password returned in data
    res.status(201).json({ message: 'User created', data: user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });

    res.status(200).json({ data: users });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({
      where: { username },
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findOne({
      where: { id: userId },
      attributes: { exclude: ['password'] }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}