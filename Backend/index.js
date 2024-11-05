const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const Register = require('./models/Register.js');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const secretKey = process.env.JWT_SECRET || 'your-secret-key';

app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;    
    const hashedPassword = await bcrypt.hash(password, 10);
    const registerUser = await Register.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'user',  
    });

    res.status(200).json(registerUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Register.findOne({ email });
    if (!user) {
      return res.json({ status: 'error', login: false, message: 'User not found' });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect) { 
      const token = jwt.sign({ id: user._id, name : user.name, email: user.email, role: user.role }, secretKey, { expiresIn: '1h' });
      return res.json({
        status: 'ok',
        login: true,
        token,
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } else {
      return res.json({ status: 'error', login: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(403).json({ message: 'Access denied' });
  }
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token is not valid' });
    }
    req.user = user;  
    next();
  });
};
const authorizeRole = (roles) => {
  return (req, res, next) => {
    const { role } = req.user;  
    if (roles.includes(role)) {
      next();
    } else {
      return res.status(403).json({ message: 'Forbidden: Access denied' });
    }
  };
};
app.get('/api/admin', authenticateJWT, authorizeRole(['admin']), (req, res) => {
  res.json({ message: 'Welcome Admin!' });
});
app.get('/api/user', authenticateJWT, authorizeRole(['admin', 'user']), (req, res) => {
  res.json({ message: 'Welcome User!' });
});
mongoose.connect('mongodb+srv://huzaifaahmed1206:huzaifa12@cluster0.3fonl.mongodb.net/UserAuth?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log("Connected to database");
    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  })
  .catch(() => {
    console.log("Not connected");
  });
