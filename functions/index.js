const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword,
    },
});

const APP_NAME = 'Matrimonio Colenzato';

// [START sendMessageEmail]
/**
 * Sends a message to the spouses.
 */
// [START onCreateTrigger]
exports.sendMessageEmail = functions.database.ref('messages').onWrite((change) => {

    const data = change.after.val();
    const record = data[Object.keys(data)[0]];

    // [END onCreateTrigger]
    // [START eventAttributes]      
    const name = record.name; // The name of the sender.
    const message = record.message;
    // [END eventAttributes]

    return sendEmail(name, message);
});
// [END sendWelcomeEmail]

// Sends a welcome email to the given user.
async function sendEmail(name, message) {
    const mailOptions = {
        from: `${APP_NAME} <noreply@colenzato.it>`,
        to: 'scoletta.developer@gmail.com',
    };

    // The user subscribed to the newsletter.
    mailOptions.subject = `Colenzato! Avete ricevuto un nuovo messaggio`;
    mailOptions.text = `Ciao coppia Colenzato, un vostro amico o parente ha (incredibilmente) voluto lasciarvi un messaggio per il vostro matrimonio!

Ecco chi è il/la pazzo/a:
Nome: ${name}
Messaggio: ${message}

Mi raccomando, ricordatevi di ringraziarlo.

Il magggico webmaster.`;

    await mailTransport.sendMail(mailOptions);

    mailOptions.to = 'stefania.semenzato@gmail.com';

    await mailTransport.sendMail(mailOptions);

    functions.logger.info(`New message from ${name}`);
    return null;
}