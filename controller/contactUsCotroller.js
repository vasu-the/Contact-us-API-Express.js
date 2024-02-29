const ContactUs = require('../model/contactUsModel');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    auth: {
        user: process.env.USER_NAME,
        pass: process.env.PASS_WORD
    }
});
const Contactus = async (req, res) => {
    const { name, email, companyName, phoneNumber, designTask } = req.body;

    try {

        const contact = new ContactUs({ name, email, companyName, phoneNumber, designTask });
        await contact.save();

        // const mailOptions = {
        //     from: process.env.EMAIL,
        //     to: process.env.EMAIL,
        // };
        const mailOptions = {
            to: "hr@digamend.com",
            from: "digamendtech@gmail.com",
            subject: 'New Contact Form Submission',
            text: `You have a new contact form submission:\nName: ${name}\nEmail: ${email}\nCompany Name: ${companyName}\nPhone Number: ${phoneNumber}\nDesign Task: ${designTask}`
          };
      

        await transporter.sendMail(mailOptions);
        return res.status(201).json({data:contact, message: 'Contact form submitted successfully!' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to submit contact form.' });
    }
};

module.exports = { Contactus }