const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const app = express()
const port = process.env.PORT || 8080
const clientRouter = require('./Routers/client')
const rawMaterialStoreRouter = require('./Routers/rawMaterialStore')
const scrapStoreRouter = require('./Routers/scrapStore')
const storeSupervisorRouter = require('./Routers/storeSupervisor')
const supplierRouter = require('./Routers/supplier')
const userRouter = require('./Routers/Users')
const workerRouter = require('./Routers/worker')
const managerRouter = require('./Routers/managers')
const { createDefaultAdmin } = require('./Controllers/Users')
require('dotenv').config()

// Configure CORS to allow frontend requests
// For production, update these origins with your domain
const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000']

const corsOptions = {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    credentials: true
}

app.use(cors(corsOptions))
app.use(bodyParser.json())

const distPath = path.join(__dirname, 'dist')
app.use(express.static(distPath))

app.get(["/", "/:path"], (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const url = process.env.MONGODB_URI

// Validate required environment variables
if (!url) {
    console.error('❌ ERROR: MONGODB_URI environment variable is not set')
    console.error('Please set MONGODB_URI in your .env file or environment variables')
    console.error('Format: mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority')
    process.exit(1)
}
const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect(url)
        console.log('✅ Database connected successfully')
    } catch (error) {
        console.error('❌ Database connection failed:', error.message)
        console.error('Please verify your MongoDB connection string')
        process.exit(1)
    }
}
connectDB()

// Create default admin user
createDefaultAdmin()

// API Routes
app.use('/api', clientRouter)
app.use('/api', rawMaterialStoreRouter)
app.use('/api', scrapStoreRouter)
app.use('/api', storeSupervisorRouter)
app.use('/api', supplierRouter)
app.use('/api', userRouter)
app.use('/api', workerRouter)
app.use('/api', managerRouter)

// Add a root route for testing
app.get('/', (req, res) => {
    res.json({ message: 'Backend API is running' });
});

app.listen(port, '0.0.0.0', () => {
    console.log('')
    console.log('═══════════════════════════════════════════')
    console.log(`🚀 Backend Server Running`)
    console.log('═══════════════════════════════════════════')
    console.log(`📍 Port: ${port}`)
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`)
    console.log(`🔗 Local: http://localhost:${port}`)
    console.log(`🌐 Network: http://<your-ip-address>:${port}`)
    console.log('═══════════════════════════════════════════')
    console.log('')
    console.log('API Routes:')
    console.log(`  POST   /api/user/login`)
    console.log(`  GET    /api/client`)
    console.log(`  GET    /api/worker`)
    console.log(`  GET    /api/Material`)
    console.log(`  GET    /api/supplier`)
    console.log(`  GET    /api/managers`)
    console.log('')
    console.log('📚 Documentation: Check DEPLOYMENT_GUIDE.md')
    console.log('')
})