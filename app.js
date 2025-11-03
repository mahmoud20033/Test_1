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
const corsOptions = {
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000'], // Common frontend development ports
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    credentials: true
}
app.use(express.static(path.join(__dirname, "dist")));

app.get(["/", "/:path"], (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.use(cors(corsOptions))
app.use(bodyParser.json())

const url = process.env.MONGODB_URI
const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(url)
        console.log('DataBase connected');
    } catch (error) {
        console.log('DataBase connection failed', error);
        process.exit()

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
    console.log(`Example app listening on port ${port}`)
    console.log(`Local: http://localhost:${port}`)
    console.log(`Network: http://<your-ip-address>:${port}`)


})