const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const puppeteer = require('puppeteer');

const client = new Client({
    puppeteer: {
        executablePath: puppeteer.executablePath(),
        headless: true,
        args: ['--no-sandbox'],
    }
});

client.on('qr', (qr) => {
    console.log('QR Code received, scan it with your phone to login:');
    qrcode.generate(qr, { small: true });
});

client.on('authenticated', (session) => {
    console.log('Authenticated');
    console.log(session);
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async (message) => {
    if (message.body === 'Hi' || message.body === 'Hello') {
        await message.reply('Hello! This is an automated response.');
    }
});

client.initialize();
