import { ChevronDown } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1553621042-f6e147245754?w=1920&h=1080&fit=crop"
          alt="Sushi background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
      </div>

      <div
        ref={ref}
        className={`relative z-10 text-center px-4 max-w-5xl mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="mb-6 inline-block">
          <div className="w-20 h-20 mx-auto bg-taiyo-red rounded-full flex items-center justify-center mb-4 animate-float">
            <span className="text-white font-serif text-3xl font-bold">T</span>
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-4 text-shadow tracking-tight">
          Taiyo Sushi
        </h1>
        <p className="text-xl md:text-2xl text-taiyo-gold font-serif italic mb-2">Restaurant</p>
        <div className="w-24 h-1 bg-taiyo-red mx-auto mb-6"></div>
        <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl mx-auto font-light">
          Authentic Japanese Cuisine in Damascus
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#menu"
            className="px-8 py-4 bg-taiyo-red hover:bg-red-700 text-white rounded-full font-medium transition-all hover:scale-105 shadow-lg hover:shadow-xl"
          >
            View Menu
          </a>
          <a
            href="#reservation"
            className="px-8 py-4 border-2 border-taiyo-gold text-taiyo-gold hover:bg-taiyo-gold hover:text-black rounded-full font-medium transition-all hover:scale-105"
          >
            Reserve a Table
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-white/70 hover:text-white transition-colors">
          <ChevronDown className="w-8 h-8" />
        </a>
      </div>
    </section>
  )
}