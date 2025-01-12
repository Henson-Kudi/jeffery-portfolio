import { Facebook, Instagram, Twitter } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 mb-4 md:mb-0">
            © 2023 John Doe Photography. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="facebook.com" className="text-gray-400 hover:text-teal-500 transition duration-300">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="instagram.com" className="text-gray-400 hover:text-teal-500 transition duration-300">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="twitter.com" className="text-gray-400 hover:text-teal-500 transition duration-300">
              <Twitter className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

