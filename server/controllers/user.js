const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const {
    generateAccessToken,
    generateRefreshToken,
} = require('../middlewares/jwt');

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
        const accesccToken = generateAccessToken(response._id, role);
        const refreshToken = generateRefreshToken(response._id);
        //Save refreshtoken to database
        await User.findByIdAndUpdate(
            response._id,
            { refreshToken },
            { new: true },
        );
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res.status(200).json({
            success: true,
            accesccToken,
            userData,
        });
    } else {
        throw new Error('Invalid');
    }
});

const getCurrent = asyncHandler(async (req, res) => {
    const { _id } = req.user;

    const user = await User.findById({ _id }).select(
        '-refreshToken -password -role',
    );

    return res.status(200).json({
        success: true,
        rs: user ? user : 'User not found',
    });
});

module.exports = {
    register,
    login,
    getCurrent,
};
