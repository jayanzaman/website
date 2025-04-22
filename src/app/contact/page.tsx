'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="content-wrapper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link 
          href="/"
          className="inline-flex items-center text-[#1A1A1A] hover:text-[#FF5F00] mb-8"
        >
          <FaArrowLeft className="mr-2" /> Back to Home
        </Link>
        
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-[#1A1A1A] mb-4">Get in Touch</h1>
          <p className="text-[#4A4A4A] mb-8">
            Have a question or want to discuss how we can help transform your business? 
            Fill out the form below and we&apos;ll get back to you shortly.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-[#1A1A1A] font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-md border border-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#FF5F00]"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-[#1A1A1A] font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-md border border-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#FF5F00]"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-[#1A1A1A] font-medium mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-md border border-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#FF5F00]"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-[#1A1A1A] font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 rounded-md border border-[#E5E5E5] focus:outline-none focus:ring-2 focus:ring-[#FF5F00]"
              />
            </div>

            <button
              type="submit"
              className="w-full synpulse-button"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
