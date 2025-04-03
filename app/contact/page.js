"use client"
import { Feather, PhoneIcon } from 'lucide-react';
import React, { useState } from 'react';

function page() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Client-side validation
    const { name, email, phone, subject, message } = formData;
    if (!name || !email || !phone || !subject || !message) {
      setError('All fields are required.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format.');
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || 'Failed to send message.');
        return;
      }

      setSuccess('Message sent successfully!');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      setError('An unexpected error occurred.');
    }
  };

  return (
    <div>
      <div className="flex items-center flex-col">
        <h1 className="text-4xl font-bold pt-10 pb-8">
          <PhoneIcon className="w-4" /> संपर्क करें
        </h1>
        <div className="w-[100px] h-[10px] bg-[#F53D3D] rounded-3xl mb-8 relative -top-4"></div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center p-6 md:gap-x-12 gap-y-12 md:gap-y-0 mb-16">
        {/* Left: Map */}
        <div className="w-full md:w-1/2 h-[350px]">
          <iframe
            className="w-full h-full rounded-lg shadow-lg"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.4951539921597!2d80.93464607536766!3d26.846693076673464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be2a88b7fbd7b%3A0x5b0313d29ab377a2!2sLucknow%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1710235768695!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Right: Contact Form */}
        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Contact Us</h2>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full p-3 border border-gray-300 rounded"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              className="w-full p-3 border border-gray-300 rounded"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              className="w-full p-3 border border-gray-300 rounded"
              value={formData.subject}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Message"
              className="w-full p-3 border border-gray-300 rounded h-32"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-[#FF3d3d] text-white p-3 rounded-lg hover:bg-[red] cursor-pointer transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default page;
