# Standalone EcoSure WhatsApp Bot

Lightweight microservice handling WAHA WhatsApp webhooks, Groq AI responses, and Supabase ledger operations.

## 🚀 Quick Deployment on AWS / Linux VPS

### 1. Copy to Server
Copy the `services/whatsapp-bot` folder to your server:
```bash
# On your server:
cd /var/www  # or your preferred directory
git clone <your-repo> ecosure-bot # or upload this folder
cd ecosure-bot/services/whatsapp-bot
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create `.env`
```bash
cp .env.example .env
```

### 4. Run with PM2 (Auto-restarts 24/7)
```bash
pm2 start server.js --name "ecosure-whatsapp"
pm2 save
pm2 startup
```

### 5. Check Logs
```bash
pm2 logs ecosure-whatsapp
```
It will listen on `http://0.0.0.0:4000`, matching WAHA's webhook target (`http://172.18.0.1:4000/api/v1/whatsapp/webhook`).
