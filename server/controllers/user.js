const User = require('../models/user');
const asyncHandler = require('express-async-handler');

const register = asyncHandler(async (req, res) => {
    const { email, password, firstname, lastname } = req.body;
    if (!email || !password || !firstname || !lastname) {
        return res.status(400).json({
            success: false,
            message: 'Please fill all the fields',
        });
    }

    const user = await User.findOne({ email: email });

    if (user) {
        throw new Error(`User <${user.email}> already exists`);
    } else {
        const newUser = await User.create(req.body);
        return res.status(200).json({
            success: newUser ? true : false,
            message: newUser
                ? 'User created successfully'
                : 'Somrthings went wrong',
        });
    }
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Please fill all the fields',
        });
    }

    const response = await User.findOne({ email });

    if (response && (await response.isCorrectPassword(password))) {
        const { password, role, ...userData } = response.toObject();
        return res.status(200).json({
            success: true,
            userData,
        });
    } else {
        throw new Error('Invalid');
    }
});

module.exports = {
    register,
    login,
};
