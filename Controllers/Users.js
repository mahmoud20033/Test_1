const userSchema = require('../Schemas/Users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    try {
        //hash password
        const hashPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = new userSchema({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
            role: req.body.role || 'user' // Default to 'user' if no role specified
        })
        let createUser = await newUser.save()
        res.json({ message: 'user created successfully', user: createUser })
    } catch (error) {
        res.status(400).json({ message: 'error in creating user', error: error.message })
    }
}

exports.login = async (req, res) => {
    try {
        let user = await userSchema.findOne({ email: req.body.email })
        if (!user) {
            return res.status(401).json({ message: 'invalid email or password' })
        }
        let passwordCheck = await bcrypt.compare(req.body.password, user.password)
        if (passwordCheck === false) {
            return res.status(401).json({ message: 'invalid email or password' })
        }
        const token = jwt.sign({ _id: user._id, username: user.username, role: user.role }, 'secret')
        res.status(200).json({ message: 'login successful', token: token, role: user.role })
    } catch (error) {
        res.status(400).json({ message: 'error', error: error.message })
    }
}

// Function to create a default admin user
exports.createDefaultAdmin = async () => {
    try {
        // Check if admin user already exists
        const existingAdmin = await userSchema.findOne({ username: 'admin' })
        if (existingAdmin) {
            // Update the role if it's not set correctly
            if (existingAdmin.role !== 'admin') {
                existingAdmin.role = 'admin'
                await existingAdmin.save()
                console.log('Admin user role updated successfully')
            } else {
                console.log('Admin user already exists')
            }
            return
        }

        // Create default admin user
        const hashPassword = await bcrypt.hash('admin123', 10)
        const adminUser = new userSchema({
            username: 'admin',
            email: 'admin@example.com',
            password: hashPassword,
            role: 'admin'
        })
        await adminUser.save()
        console.log('Default admin user created successfully')
    } catch (error) {
        console.error('Error creating default admin user:', error.message)
    }
}