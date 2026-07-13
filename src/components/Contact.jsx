import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('Please fill in all fields.');
      return;
    }
    // Simulate sending message
    setStatus('Thank you! Your message has been sent successfully (simulated).');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="contact-section">
      <div className="section-header">
        <h2>Get In Touch</h2>
        <p className="subtitle">Feel free to drop a message. I'd love to connect with you!</p>
      </div>

      <div className="contact-container">
        <form className="contact-form" onSubmit={handleSubmit}>
          {status && (
            <div className={`form-status ${status.includes('successfully') ? 'success' : 'error'}`}>
              {status}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email address"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              rows="5"
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">
            Send Message
          </button>
        </form>

        <div className="contact-info-card">
          <h3>Direct Connect</h3>
          <p>If you prefer direct emails or social media channels, reach out below:</p>
          <ul className="direct-links">
            <li>
              <strong>Email:</strong> <a href="mailto:bhanderitirth94@gmail.com">bhanderitirth94@gmail.com</a>
            </li>
            <li>
              <strong>Phone:</strong> <a href="tel:+919737006181">+91 9737006181</a>
            </li>
            <li>
              <strong>Location:</strong> Rajkot, Gujarat, India
            </li>
            <li>
              <strong>LinkedIn:</strong>{' '}
              <a href="https://linkedin.com/in/tirth-bhanderi-345763289" target="_blank" rel="noopener noreferrer">
                tirth-bhanderi-345763289
              </a>
            </li>
            <li>
              <strong>GitHub:</strong>{' '}
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                github.com
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
