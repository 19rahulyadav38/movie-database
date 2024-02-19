// pages/api/login.js
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  try {
    const { email, password } = req.body;

    if (email === 'admin@example.com' && password === 'password') {
      const token = jwt.sign({ user: email }, '74fa1d434e50c294bb483379a88d4d38d341fff906036910f8e7aa274d3f967d');
      res.status(200).json({
        data: { tokenKey: token, userMail: email },
        message: 'You have been logged in successfully',
      });
    } else {
      return res.status(400).json({ message: 'Invalid user or password' });
    }
  } catch (error) {
    console.log('Error in login API: ', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
