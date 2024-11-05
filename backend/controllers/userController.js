const User = require('../models/userModel')

const createNewUser = async (req, res) => {
    try{
        const { name, email, password } = req.body;

          if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" ,error:error.message});

    }
}

module.exports = {
    createNewUser
}
