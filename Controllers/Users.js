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
            role: req.body.role || 'user', // Default to 'user' if no role specified
            permissions: req.body.permissions || {
                Manager: false,
                Dashboard: false,
                Foreman_Supervisor: false,
                Store_Supervisor: false,
                Workers: false,
                Scrapstore: false,
                Rawmaterial: false,
                Suppliers: false,
                Clients: false
            }
        })
        let createUser = await newUser.save()
        res.json({ message: 'user created successfully', user: createUser })
    } catch (error) {
        res.status(400).json({ message: 'error in creating user', error: error.message })
    }
}

exports.login = async (req, res) => {
    try {
        console.log('Login attempt with email:', req.body.email);
        let user = await userSchema.findOne({ email: req.body.email })
        if (!user) {
            console.log('User not found with email:', req.body.email);
            return res.status(401).json({ message: 'invalid email or password' })
        }
        console.log('User found:', user.username, 'Role:', user.role);
        let passwordCheck = await bcrypt.compare(req.body.password, user.password)
        if (passwordCheck === false) {
            console.log('Password check failed for user:', user.username);
            return res.status(401).json({ message: 'invalid email or password' })
        }
        const token = jwt.sign({ _id: user._id, username: user.username, email: user.email, role: user.role }, 'secret')
        console.log('Login successful for user:', user.username);
        res.status(200).json({
            message: 'login successful',
            token: token,
            role: user.role,
            email: user.email,
            username: user.username,
            permissions: user.permissions
        })
    } catch (error) {
        console.error('Login error:', error);
        res.status(400).json({ message: 'error', error: error.message })
    }
}

// Function to create a default admin user
exports.createDefaultAdmin = async () => {
    try {
        // Check if manager user already exists
        const existingManager = await userSchema.findOne({ username: 'Manager' })
        if (existingManager) {
            // Update the role if it's not set correctly to manager
            if (existingManager.role !== 'manager') {
                existingManager.role = 'manager'
                // Ensure all permissions are granted
                existingManager.permissions = {
                    Manager: true,
                    Dashboard: true,
                    Foreman_Supervisor: true,
                    Store_Supervisor: true,
                    Workers: true,
                    Scrapstore: true,
                    Rawmaterial: true,
                    Suppliers: true,
                    Clients: true
                }
                await existingManager.save()
                console.log('Manager user role and permissions updated successfully')
            } else {
                console.log('Manager user already exists with full permissions')
            }
            return
        }

        // Create default manager user with all permissions
        const hashPassword = await bcrypt.hash('admin123', 10)
        const managerUser = new userSchema({
            username: 'Manager',
            email: 'adminss@gmail.com',
            password: hashPassword,
            role: 'manager',
            permissions: {
                Manager: true,
                Dashboard: true,
                Foreman_Supervisor: true,
                Store_Supervisor: true,
                Workers: true,
                Scrapstore: true,
                Rawmaterial: true,
                Suppliers: true,
                Clients: true
            }
        })
        await managerUser.save()
        console.log('Default manager user created successfully with username: admin, password: admin123')
    } catch (error) {
        console.error('Error creating default manager user:', error.message)
    }
}

// Get all users (manager only)
exports.getAllUsers = async (req, res) => {
    try {
        if (req.user.role !== 'manager') {
            return res.status(403).json({ message: 'Only managers can view all users' });
        }

        const users = await userSchema.find().select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
}

// Update user permissions (manager only)
exports.updateUserPermissions = async (req, res) => {
    try {
        if (req.user.role !== 'manager') {
            return res.status(403).json({ message: 'Only managers can update permissions' });
        }

        const { email, permissions } = req.body;
        const user = await userSchema.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.permissions = permissions;
        await user.save();

        res.status(200).json({ message: 'Permissions updated successfully', user: { ...user.toObject(), password: undefined } });
    } catch (error) {
        res.status(500).json({ message: 'Error updating permissions', error: error.message });
    }
}

// Update user role (manager only)
exports.updateUserRole = async (req, res) => {
    try {
        if (req.user.role !== 'manager') {
            return res.status(403).json({ message: 'Only managers can update roles' });
        }

        const { email, role } = req.body;
        const user = await userSchema.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.role = role;
        await user.save();

        res.status(200).json({ message: 'Role updated successfully', user: { ...user.toObject(), password: undefined } });
    } catch (error) {
        res.status(500).json({ message: 'Error updating role', error: error.message });
    }
}

// Delete user (manager only)
exports.deleteUser = async (req, res) => {
    try {
        if (req.user.role !== 'manager') {
            return res.status(403).json({ message: 'Only managers can delete users' });
        }

        const { email } = req.params;

        // Prevent deleting own account
        if (email === req.user.email) {
            return res.status(400).json({ message: 'Cannot delete your own account' });
        }

        const user = await userSchema.findOneAndDelete({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
}

// Update user info (email/password)
exports.updateUserInfo = async (req, res) => {
    try {
        if (req.user.role !== 'manager') {
            return res.status(403).json({ message: 'Only managers can update user info' });
        }

        const { email, newEmail, password } = req.body;
        const user = await userSchema.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (newEmail) {
            user.email = newEmail;
        }

        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();

        res.status(200).json({ message: 'User info updated successfully', user: { ...user.toObject(), password: undefined } });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user info', error: error.message });
    }
}

// Check if manager exists (for debugging)
exports.checkManager = async (req, res) => {
    try {
        const manager = await userSchema.findOne({ email: 'adminss@gmail.com' }).select('-password');
        if (manager) {
            res.status(200).json({
                exists: true,
                user: manager,
                message: 'Manager account found. Use email: adminss@gmail.com, password: admin123'
            });
        } else {
            res.status(404).json({
                exists: false,
                message: 'Manager account not found. Please restart the server to create it.'
            });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error checking manager', error: error.message });
    }
}

// Reset manager password (for debugging - remove in production)
exports.resetManager = async (req, res) => {
    try {
        const manager = await userSchema.findOne({ email: 'adminss@gmail.com' });
        if (manager) {
            // Reset password to admin123
            manager.password = await bcrypt.hash('admin123', 10);
            manager.role = 'manager';
            manager.permissions = {
                Manager: true,
                Dashboard: true,
                Foreman_Supervisor: true,
                Store_Supervisor: true,
                Workers: true,
                Scrapstore: true,
                Rawmaterial: true,
                Suppliers: true,
                Clients: true
            };
            await manager.save();
            res.status(200).json({ message: 'Manager password reset to admin123 successfully' });
        } else {
            res.status(404).json({ message: 'Manager account not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error resetting manager password', error: error.message });
    }
}