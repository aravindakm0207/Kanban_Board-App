const _ = require('lodash');
const User = require("../models/user-model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require('express-validator');
const path = require('path');

const userCltr = {};



userCltr.register = async (req, res) => {
    console.log('Register API called');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error('Validation errors:', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const body = req.body;
        console.log('Received request body:', body);

        let profilePicPath = null;
        if (req.file) {
            // Use the Cloudinary path (secure_url) directly from req.file
            profilePicPath= req.file.path;
            console.log('Profile picture uploaded to Cloudinary:', profilePicPath);
        } else {
            console.log('No profile picture uploaded');
        }

        // Hash the password
        const salt = await bcryptjs.genSalt();
        const hashPassword = await bcryptjs.hash(body.password, salt);
        console.log('Password hashed successfully');

        // Create the user
        const user = new User({
            ...body,
            password: hashPassword,
            profilePic: profilePicPath, // Save the correct Cloudinary URL
        });

        await user.save();
        console.log('User saved successfully:', user);

        // Send response with selected user details
        res.status(201).json(_.pick(user, ['_id', 'firstname', 'lastname', 'email', 'profilePic']));
    } catch (err) {
        console.error('Error during user registration:', err);
        res.status(500).json({ error: 'Something went wrong during registration' });
    }
};


/*
userCltr.register = async (req, res) => {
    console.log('Register API called');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error('Validation errors:', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const body = req.body;
        console.log('Received request body:', body);

        console.log('Uploaded file:', req.file); // Debugging log for file upload
        let profilePicPath = null;
        if (req.file) {
            profilePicPath = `/uploads/${req.file.filename}`;
            console.log('Profile picture uploaded:', profilePicPath);
        } else {
            console.log('No file uploaded');
        }

        const salt = await bcryptjs.genSalt();
        const hashPassword = await bcryptjs.hash(body.password, salt);
        console.log('Password hashed successfully');

        const user = new User({
            ...body,
            password: hashPassword,
            profilePic: profilePicPath
        });

        await user.save();
        console.log('User saved successfully:', user);
        res.status(201).json(_.pick(user, ['_id', 'firstname', 'lastname', 'email', 'profilePic']));
    } catch (err) {
        console.error('Error during user registration:', err);
        res.status(500).json({ error: 'Something went wrong' });
    }
}; 

*/

userCltr.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const body = req.body;
        const user = await User.findOne({ email: body.email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email/password' });
        }
        const isAuth = await bcryptjs.compare(body.password, user.password);
        if (!isAuth) {
            return res.status(401).json({ error: 'Invalid email/password' });
        }
        const tokenData = { id: user._id };
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '7d' });
        return res.json({ token });
    } catch (err) {
        console.error(err); 
        return res.status(500).json({ error: 'Something went wrong' });
    }
};



userCltr.account = async (req, res) => {
    console.log('Fetching account details for user:', req.user.id);
    try {
        const user = await User.findById(req.user.id).select('firstname lastname email profilePic');
        if (!user) {
            console.error('User not found');
            return res.status(404).json({ error: 'User not found' });
        }
        console.log('Fetched user:', user);
        res.json(user);
    } catch (err) {
        console.error('Error fetching user account:', err.message);
        res.status(500).json({ error: 'Something went wrong' });
    }
};





userCltr.uploadProfilePic = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.profilePic = `/uploads/${req.file.filename}`; // Save relative path to the profile pic
        await user.save();

        res.status(200).json({ message: 'Profile picture uploaded successfully', profilePic: user.profilePic });
    } catch (error) {
        console.error('Error uploading profile picture:', error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};

userCltr.list=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
        const user=await User.find(req.user)
        res.json(user)

    }
    catch(err){
        console.log(err)
    }
}


userCltr.update = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const body = _.pick(req.body, ['firstName', 'lastName', 'email']); 
        const user = await User.findByIdAndUpdate(req.user.id, body, { new: true });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.status(200).json(_.pick(user, ['_id', 'firstName', 'lastName', 'email']));
    } catch (err) {
        console.error(err); 
        res.status(500).json({ error: 'Something went wrong' });
    }
};

module.exports = userCltr;
