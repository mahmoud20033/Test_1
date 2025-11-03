# Production Deployment Guide

This guide covers deploying your Node.js/Express backend and MongoDB database to production cloud platforms.

---

## Table of Contents
1. [Heroku Deployment (Easiest)](#heroku-deployment)
2. [AWS Deployment](#aws-deployment)
3. [Azure Deployment](#azure-deployment)
4. [Environment Variables Configuration](#environment-variables)
5. [Database Setup](#database-setup)
6. [Testing & Monitoring](#testing--monitoring)

---

## Heroku Deployment

### Prerequisites
- Heroku account (free tier available)
- Heroku CLI installed
- Git installed
- MongoDB Atlas account (free tier)

### Step 1: Create MongoDB Atlas Database

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account or sign in
3. Create a new project
4. Create a cluster (select "M0 Free Tier")
5. Configure security:
   - Go to Network Access
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (0.0.0.0/0)
6. Create database user:
   - Go to Database Access
   - Create a user (e.g., `admin`, password: strong password)
   - Set role as "Atlas Admin"
7. Get connection string:
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<username>`, `<password>` with your credentials
   - Example: `mongodb+srv://admin:password123@cluster0.mongodb.net/mydb?retryWrites=true&w=majority`

### Step 2: Create Heroku App

```bash
# Login to Heroku
heroku login

# Create new Heroku app
heroku create your-app-name

# Check app created successfully
heroku apps
```

### Step 3: Configure Environment Variables in Heroku

```bash
# Set MongoDB connection string
heroku config:set MONGODB_URI="mongodb+srv://admin:password123@cluster0.mongodb.net/mydb?retryWrites=true&w=majority"

# Set Node environment
heroku config:set NODE_ENV=production

# Verify variables
heroku config
```

### Step 4: Create Procfile

Create a file named `Procfile` in your backend root directory (same level as app.js):

```
web: node app.js
```

### Step 5: Update package.json

Ensure your `package.json` has these scripts:

```json
{
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  },
  "engines": {
    "node": "18.x",
    "npm": "9.x"
  }
}
```

### Step 6: Deploy to Heroku

```bash
# Add Heroku remote
git remote add heroku https://git.heroku.com/your-app-name.git

# Deploy
git push heroku main

# View logs
heroku logs --tail

# Get your app URL
heroku open
```

### Step 7: Update Frontend API URL

In your frontend components, update the API base URL:

```javascript
// Before (development)
const API_URL = 'http://localhost:8080'

// After (production)
const API_URL = process.env.REACT_APP_API_URL || 'https://your-app-name.herokuapp.com'
```

### Step 8: Build and Deploy Frontend

```bash
# In frontend directory
npm run build

# This creates the dist folder that your backend serves
```

### Heroku Useful Commands

```bash
# View app status
heroku ps

# Restart app
heroku restart

# View environment variables
heroku config

# Update environment variable
heroku config:set MONGODB_URI="new-connection-string"

# Deploy specific branch
git push heroku your-branch:main
```

---

## AWS Deployment

### Prerequisites
- AWS account (free tier available)
- AWS CLI installed
- EC2 key pair created

### Step 1: Create MongoDB Atlas Database (Same as above)

### Step 2: Launch EC2 Instance

1. Go to AWS Console → EC2
2. Click "Launch Instances"
3. Select:
   - AMI: Ubuntu Server 22.04 LTS (free tier eligible)
   - Instance type: t2.micro (free tier)
   - Key pair: Create or select existing
   - Security group: Allow HTTP (80), HTTPS (443), SSH (22)
4. Launch instance
5. Note down the public IPv4 address

### Step 3: Connect to EC2 Instance

```bash
# Connect via SSH
ssh -i your-key.pem ubuntu@your-ec2-ip

# Update system
sudo apt update && sudo apt upgrade -y
```

### Step 4: Install Node.js and npm

```bash
# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node -v
npm -v
```

### Step 5: Install and Configure Git

```bash
# Install Git
sudo apt install -y git

# Configure Git
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"

# Generate SSH key for GitHub
ssh-keygen -t ed25519 -C "your-email@example.com"

# Copy public key and add to GitHub
cat ~/.ssh/id_ed25519.pub
# Add to GitHub → Settings → SSH Keys
```

### Step 6: Clone and Setup Project

```bash
# Clone repository
git clone git@github.com:your-username/your-repo.git
cd your-repo/backend-directory

# Install dependencies
npm install
```

### Step 7: Configure Environment Variables

```bash
# Create .env file
nano .env

# Add these variables:
# MONGODB_URI=mongodb+srv://admin:password@cluster0.mongodb.net/db?retryWrites=true&w=majority
# NODE_ENV=production
# PORT=8080

# Save: Ctrl+X, then Y, then Enter
```

### Step 8: Install PM2 (Process Manager)

```bash
# Install PM2 globally
sudo npm install -g pm2

# Start application with PM2
pm2 start app.js --name "backend"

# Setup PM2 to start on boot
pm2 startup
pm2 save

# Monitor app
pm2 monit
```

### Step 9: Install Nginx (Reverse Proxy)

```bash
# Install Nginx
sudo apt install -y nginx

# Start Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

# Configure Nginx
sudo nano /etc/nginx/sites-available/default
```

Replace the file content with:

```nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    server_name _;

    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Verify Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### Step 10: Setup SSL Certificate (Free with Let's Encrypt)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal (already configured)
sudo systemctl status certbot.timer
```

### Step 11: Update DNS

1. Update your domain's DNS A record to point to your EC2 instance's Elastic IP
2. Create Elastic IP in AWS EC2 console and associate with instance

### AWS Useful Commands

```bash
# SSH into instance
ssh -i your-key.pem ubuntu@your-ec2-ip

# Pull latest code
git pull origin main
npm install
pm2 restart backend

# View PM2 logs
pm2 logs backend

# Monitor resources
free -h
df -h
```

---

## Azure Deployment

### Prerequisites
- Azure account (free tier available)
- Azure CLI installed

### Step 1: Create MongoDB Atlas Database (Same as above)

### Step 2: Create App Service Plan

```bash
# Login to Azure
az login

# Create resource group
az group create --name myResourceGroup --location eastus

# Create App Service Plan
az appservice plan create --name myServicePlan --resource-group myResourceGroup --sku B1 --is-linux
```

### Step 3: Create Web App

```bash
# Create Web App
az webapp create --resource-group myResourceGroup --plan myServicePlan --name my-app-name --runtime "NODE|18-lts"

# Enable Git deployment
az webapp deployment user set --user-name gituser --password gitpassword123
```

### Step 4: Configure Deployment Source

```bash
# Initialize local Git repo
git init
git add .
git commit -m "Initial commit"

# Add Azure remote
git remote add azure https://gituser@my-app-name.scm.azurewebsites.net:443/my-app-name.git

# Deploy
git push azure master
```

### Step 5: Configure Environment Variables

```bash
# Set environment variables
az webapp config appsettings set --resource-group myResourceGroup --name my-app-name --settings MONGODB_URI="mongodb+srv://admin:password@..." NODE_ENV=production

# Verify
az webapp config appsettings list --resource-group myResourceGroup --name my-app-name
```

### Step 6: Check Deployment

```bash
# View deployment logs
az webapp log tail --resource-group myResourceGroup --name my-app-name

# App URL: https://my-app-name.azurewebsites.net
```

---

## Environment Variables

### Required Environment Variables

Create `.env` file in backend root:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority

# Environment
NODE_ENV=production
PORT=8080

# CORS Origins (update with your domain)
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

# Optional: API Keys, tokens, etc.
JWT_SECRET=your-secret-key-here
```

### Load Environment Variables in app.js

```javascript
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI
const NODE_ENV = process.env.NODE_ENV
const PORT = process.env.PORT || 8080

if (!MONGODB_URI) {
    console.error('MONGODB_URI environment variable is not set')
    process.exit(1)
}
```

---

## Database Setup

### MongoDB Atlas Setup Checklist

- [ ] Create account at mongodb.com/cloud/atlas
- [ ] Create free M0 cluster
- [ ] Allow all IPs in Network Access (0.0.0.0/0)
- [ ] Create database user with strong password
- [ ] Get connection string
- [ ] Create initial database and collections
- [ ] Enable automatic backups

### Connection String Format

```
mongodb+srv://username:password@clustername.mongodb.net/databasename?retryWrites=true&w=majority
```

### Create Initial Data (Optional)

```javascript
// In backend, add initialization script:
const initializeDatabase = async () => {
    try {
        // Create default admin user
        await createDefaultAdmin()
        console.log('Database initialized successfully')
    } catch (error) {
        console.error('Database initialization failed:', error)
    }
}

// Call on startup
initializeDatabase()
```

---

## Testing & Monitoring

### Test Deployment

```bash
# Test API endpoints
curl https://your-app-domain.com/api/user/login

# Test health check
curl https://your-app-domain.com/

# Test CORS
curl -H "Origin: https://your-frontend-domain.com" https://your-app-domain.com/api/client
```

### Update Frontend for Production

In your Vite config (`vite.config.js`):

```javascript
export default {
  server: {
    proxy: {
      '/api': {
        target: 'https://your-app-domain.com',
        changeOrigin: true
      }
    }
  }
}
```

Or set environment variable:

```bash
VITE_API_URL=https://your-app-domain.com
```

### Monitoring Tools

**Heroku:**
- Dashboard at heroku.com
- Real-time logs: `heroku logs --tail`
- Metrics: App → Metrics

**AWS:**
- CloudWatch for logs
- EC2 console for instance status
- PM2 monitoring: `pm2 monit`

**Azure:**
- Azure Monitor
- Application Insights
- Log Stream in Portal

### Common Issues & Solutions

**Issue: 502 Bad Gateway**
- Solution: Check if Node.js is running, restart app
```bash
# Heroku
heroku restart

# AWS (PM2)
pm2 restart backend

# Azure
az webapp restart --resource-group myResourceGroup --name my-app-name
```

**Issue: Cannot connect to MongoDB**
- Solution: Verify connection string and IP whitelist
- Check MongoDB Atlas → Network Access → IP Whitelist

**Issue: CORS errors**
- Solution: Update CORS origins in app.js
```javascript
const corsOptions = {
    origin: ['https://yourdomain.com', 'https://www.yourdomain.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}
```

**Issue: Frontend shows old code**
- Solution: Clear browser cache and rebuild frontend
```bash
npm run build
# In backend: ensure dist folder is updated
```

---

## Final Checklist

- [ ] MongoDB Atlas database created
- [ ] Environment variables configured (.env file)
- [ ] Backend tested locally with production settings
- [ ] Frontend built and dist folder created
- [ ] Backend serving frontend from dist folder
- [ ] SSL/HTTPS certificate configured
- [ ] CORS origins updated for production domain
- [ ] All API endpoints tested in production
- [ ] Monitoring and logging setup
- [ ] Database backups configured
- [ ] Custom domain configured and DNS updated

---

## Support Resources

- **Heroku Docs**: https://devcenter.heroku.com/
- **AWS EC2 Guide**: https://docs.aws.amazon.com/ec2/
- **Azure App Service**: https://docs.microsoft.com/en-us/azure/app-service/
- **MongoDB Atlas**: https://docs.atlas.mongodb.com/
- **Node.js Best Practices**: https://nodejs.org/en/docs/guides/
