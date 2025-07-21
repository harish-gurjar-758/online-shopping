// user controller file 
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//  Registore the user
export default registerUser = async (req, res) => {
    try {
        const { userName, email, phone, password, role, address } = req.body;

        const existingUser = await User.findOne({ phone }) || User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                error: "Phone number or Email already registered"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);


        // Create user
        const newUser = new User({
            userName,
            email,
            phone,
            password: hashedPassword,
            role,
            address
        });

        await newUser.save();

        // Create JWT
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: '60d',
        });


        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            user: {
                id: newUser._id,
                userName: newUser.userName,
                phone: newUser.phone,
                email: newUser.email,
                role: newUser.role,
                address: newUser.address
            },
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error during registration', details: err.message });
    }
};