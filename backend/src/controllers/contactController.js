import Contact from '../models/Contact.js';
import nodemailer from 'nodemailer';

// POST /api/contact
export const sendMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const contact = await Contact.create({ name, email, subject, message });

    // Send email notification if configured
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST,
          port: process.env.EMAIL_PORT,
          auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
        });
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER,
          subject: `New Contact: ${subject || 'General Inquiry'}`,
          html: `<h3>New message from ${name} (${email})</h3><p>${message}</p>`
        });
      } catch (emailErr) {
        console.warn('Email notification failed:', emailErr.message);
      }
    }

    res.status(201).json({ success: true, message: 'Message sent successfully', data: contact });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// GET /api/contact  (admin)
export const getMessages = async (req, res) => {
  try {
    const messages = await Contact.find();
    res.json({ success: true, count: messages.length, data: messages });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PATCH /api/contact/:id/read  (admin)
export const markRead = async (req, res) => {
  try {
    const msg = await Contact.markAsRead(req.params.id);
    res.json({ success: true, data: msg });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
