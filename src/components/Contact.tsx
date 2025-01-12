import { Mail, Phone, MapPin } from 'lucide-react'

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-teal-500">Contact Me</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-lg mb-4">
              I'd love to hear from you! Whether you're looking to book a session or have any questions, feel free to reach out.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="w-6 h-6 text-teal-500 mr-2" />
                <a href="mailto:john@example.com" className="hover:text-teal-500 transition duration-300">
                  john@example.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="w-6 h-6 text-teal-500 mr-2" />
                <a href="tel:+1234567890" className="hover:text-teal-500 transition duration-300">
                  (123) 456-7890
                </a>
              </div>
              <div className="flex items-center">
                <MapPin className="w-6 h-6 text-teal-500 mr-2" />
                <span>New York City, NY</span>
              </div>
            </div>
          </div>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
            <textarea
              placeholder="Your Message"
              rows={4}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-teal-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-teal-600 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact

