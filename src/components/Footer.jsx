import { Facebook, Instagram, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-taiyo-red rounded-full flex items-center justify-center">
                <span className="text-white font-serif font-bold text-lg">T</span>
              </div>
              <span className="font-serif text-2xl font-bold">Taiyo Sushi</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Authentic Japanese cuisine in the heart of Damascus. Experience the art of sushi and traditional Japanese hospitality.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-taiyo-red transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-taiyo-red transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-taiyo-red transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 text-taiyo-gold">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Menu', 'Gallery', 'Reservations'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 text-taiyo-gold">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Cham City Center</li>
              <li>Damascus, Syria</li>
              <li>+963 991 966 674</li>
              <li>Daily: 10AM - 11:59PM</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© 2024 Taiyo Sushi Restaurant. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}