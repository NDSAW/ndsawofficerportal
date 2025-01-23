const express = require('express');
const crypto = require('crypto');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Endpoint to receive secure messages
app.post('/api/messages', (req, res) => {
    const { encryptedKey, encryptedMessage } = req.body;

    // Decrypt the AES key using the recipient's private key (simulation)
    const aesKey = Buffer.from(encryptedKey, 'base64').toString(); // Replace with real RSA decryption

    // Decrypt the message using the AES key
    const decipher = crypto.createDecipher('aes-128-cbc', aesKey);
    let decryptedMessage = decipher.update(encryptedMessage, 'base64', 'utf8');
    decryptedMessage += decipher.final('utf8');

    console.log('Decrypted Message:', decryptedMessage);

    res.send({ status: 'success', message: 'Message received and decrypted.' });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
