const bcrypt = require('bcrypt');
const UserModel = require('../Models/User.js'); // Ensure correct path to user.js
const jwt = require('jsonwebtoken');

const singup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the user already exists
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({ message: 'User already exists', success: false });
        }
        // Create a new user
        const userModel = new UserModel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        // Respond with success
        res.status(201).json({ message: 'Signup Successful', success: true });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', success: false });
    }
}

const login = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Check if the user already exists
        const user = await UserModel.findOne({ email });
        const errorMsg = 'Authentication Failed email and password is wrong';
        if (!user) {
            return res.status(403).json({ message: errorMsg, success: false });
        }

        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403).json({ message: errorMsg, success: false });
        }
        const jwtToken = jwt.sign({ email: user.email, _id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' })

        // Respond with success
        res.status(200).json({ message: 'Login Success!', success: true, jwtToken, email, name: user.name });
    } catch (error) {
        // Handle errors
        res.status(500).json({ message: 'Internal Server Error', success: false });
    }
};

module.exports = { singup, login }