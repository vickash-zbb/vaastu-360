# Deployment to Hostinger

This guide explains how to deploy the Vaastu 360 webapp to Hostinger's Node.js hosting.

## Prerequisites

- Hostinger account with Node.js hosting plan (Cloud or VPS)
- SSH access to your hosting server
- Node.js installed on the server (Hostinger provides this)

## Build the Application

1. On your local machine, run:

   ```bash
   pnpm install
   pnpm build
   ```

2. This will create:
   - `dist/spa/` - Built client files
   - `dist/server/` - Built server files

## Upload Files to Hostinger

1. Connect to your Hostinger server via SSH or FTP
2. Upload the entire `deploy/` folder to your server
   - This includes all necessary files: dist/, package.json, package-lock.json
   - If you have a `.env` file, upload it to the deploy/ directory

## Install Dependencies on Server

1. SSH into your server
2. Navigate to your project directory
3. Install dependencies:
   ```bash
   npm install --production
   ```
   or if using pnpm:
   ```bash
   npm install -g pnpm
   pnpm install --production
   ```

## Configure Environment

1. Set environment variables if needed:
   ```bash
   export PORT=3000
   export PING_MESSAGE="Hello from Hostinger"
   ```
   Or create a `.env` file in the project root.

## Start the Application

1. Start the server:

   ```bash
   node dist/server/node-build.mjs
   ```

2. The app should be running on the port specified (default 3000)

## Hostinger Specific Configuration

- If using Hostinger's control panel, set the startup command to: `node dist/server/node-build.mjs`
- Ensure the port matches Hostinger's requirements (usually 3000 or as configured)
- For domain setup, point your domain to the server's IP

## Troubleshooting

- Check server logs for errors
- Ensure all dependencies are installed
- Verify file permissions
- Make sure the port is not blocked by firewall

## Production Notes

- The server serves static files from `dist/spa/`
- API endpoints are available at `/api/*`
- The app uses Express.js and supports SPA routing
