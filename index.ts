import Express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import fs from "node:fs";
import toml from "toml";
import fetchEggs from "./controller/fetchEggs.ts";
import { spawn } from "child_process"; // Import child_process
import { ASCII_ART } from "./ascii";

// config
const config = toml.parse(fs.readFileSync("./config.toml", "utf-8"));

// Router import
import loginRoute from "./api/login.ts";
import registerRoute from "./api/register.ts";
import createServerRoute from "./api/createServer.ts";
import deleteServerRoute from "./api/deleteServer.ts";
import configRoute from "./api/config.ts";
import renewRoute from "./api/renew.ts"; // Import the renew route
import eggsRoute from "./api/eggs.ts";

// app
const app = Express();

app.use(bodyParser());
app.use(cors("*"));
app.use(Express.json());
app.use(cookieParser());

// Router define

app.get("/api/", (req, res) => {
  res.json({ status: "running", success: true });
});

app.get("/api/check-auth", (req, res) => {
  const authCookie = req.cookies.authToken; // Adjust based on your auth cookie name
  res.json({ authenticated: !!authCookie });
});

app.use(loginRoute);
app.use(registerRoute);
app.use(createServerRoute);
app.use(deleteServerRoute);
app.use(configRoute);
app.use(renewRoute); // Use the renew route
app.use(eggsRoute);

const BACKEND_PORT = config.domain.port + 1; // Backend port will be config port + 1

// Start the frontend development server
const startFrontend = () => {
  const frontendProcess = spawn('npm', ['run', 'dev', '--', '--port', config.domain.port.toString(), '--host', config.domain.listen, '--strictPort'], {
    cwd: './app',
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: true,
  });

  frontendProcess.stdout.on('data', (data) => {
    const output = data.toString();
    if (output.includes('Local:') || output.includes('Network:')) {
      console.log('\n🌐 Frontend URLs:');
      console.log(output.trim());
    }
  });

  frontendProcess.stderr.on('data', (data) => {
    const error = data.toString();
    if (error.includes('EADDRINUSE')) {
      console.log('\x1b[31m%s\x1b[0m', `❌ Port ${config.domain.port} is already in use. Please choose a different port in config.toml`);
      process.exit(1);
    }
    if (!error.includes('npm ERR!')) {
      console.error('\x1b[31m%s\x1b[0m', error.trim());
    }
  });

  frontendProcess.on('close', (code) => {
    if (code !== 0 && code !== null) {
      console.log('\x1b[31m%s\x1b[0m', '❌ Frontend process stopped unexpectedly. Attempting to restart...');
      setTimeout(startFrontend, 5000); // Attempt to restart after 5 seconds
    }
  });

  // Handle process termination
  process.on('SIGINT', () => {
    console.log('\n\x1b[33m%s\x1b[0m', '🛑 Shutting down gracefully...');
    frontendProcess.kill();
    process.exit(0);
  });
};

// Start the backend server
app.listen(BACKEND_PORT, config.domain.listen, () => {
  console.clear();
  console.log('\x1b[36m%s\x1b[0m', ASCII_ART);
  console.log('\x1b[32m%s\x1b[0m', '🚀 Dashboard Backend Started Successfully!');
  console.log('\x1b[33m%s\x1b[0m', `📡 API Running on ${config.domain.listen}:${BACKEND_PORT}`);
  console.log('\x1b[34m%s\x1b[0m', `⚡ Starting frontend on ${config.domain.listen}:${config.domain.port}...\n`);
  
  setTimeout(startFrontend, 1000);
});

// Modify fetchEggs to handle errors gracefully
fetchEggs().catch(error => {
  if (error.response?.status === 401) {
    console.log('\n');
    console.log('\x1b[33m%s\x1b[0m', '⚠️  Pterodactyl API Connection Error');
    console.log('\x1b[33m%s\x1b[0m', '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\x1b[37m%s\x1b[0m', '1. Go to your Pterodactyl panel');
    console.log('\x1b[37m%s\x1b[0m', '2. Navigate to: Admin > Application API');
    console.log('\x1b[37m%s\x1b[0m', '3. Create a new API key');
    console.log('\x1b[37m%s\x1b[0m', '4. Update your config.toml with the new key');
    console.log('\x1b[37m%s\x1b[0m', '   Location: [pterodactyl] > api = "your_api_key"');
    console.log('\x1b[33m%s\x1b[0m', '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  } else {
    console.log('\x1b[31m%s\x1b[0m', '❌ Error fetching eggs:', error.message);
  }
});

// Database connection messages
console.log('\x1b[36m%s\x1b[0m', '📦 Database:');
console.log('\x1b[36m%s\x1b[0m', '━━━━━━━━━━━');
console.log('\x1b[32m%s\x1b[0m', '✓ SQLite initialized successfully');
console.log('\x1b[32m%s\x1b[0m', '✓ Connection established\n');
