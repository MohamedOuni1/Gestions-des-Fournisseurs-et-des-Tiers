// controllers/auth.controller.js
const User = require('../models/users.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { isValidEmail } = require('../../middleware/UserValidation');
require('dotenv').config();

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password, repeatPassword, role } = req.body;
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return res.status(400).json({ msg: 'You have already registered.' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ msg: 'Invalid email address format.' });
    }

    if (password.length < 8 || !/[A-Z]/.test(password)) {
      return res.status(400).json({
        msg: 'Password must be at least 8 characters long and contain at least one capital letter.'
      });
    }

    // Check if passwords match
    if (password !== repeatPassword) {
      return res.status(400).json({
        status: 'error',
        message: 'Passwords do not match.'
      });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword, role });

    return res.status(201).json({
      status: 'success',
      data: {
        user: user
      }
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Vérifie si l'utilisateur existe dans la base de données
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid Email or Password!'
      });
    }
    
    // Compare les mots de passe avec bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: 'error',
        message: 'Email or Password not matched!'
      });
    }
    
    // Crée un jeton et l'envoie au client
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({
      status: "success",
      result: {
        token: token,
        userId: user._id,
        role: user.role // Ajouter le rôle dans la réponse
      },
      message: "Logged In Successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error'
    });
  }
};
