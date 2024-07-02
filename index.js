const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://sumayyaom18:KNItak915sGtQkTE@cluster0.bskq6f4.mongodb.net/Encryption');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Generate a salt
        const salt = await bcrypt.genSalt(10);
        
        // Hash the password with the salt
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Create a new user with the hashed password
        const newUser = new User({ username, password: hashedPassword });
        
        // Save the user to the database
        await newUser.save();
        
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(500).send('Error registering user');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
