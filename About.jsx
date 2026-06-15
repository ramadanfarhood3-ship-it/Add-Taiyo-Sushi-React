import { useEffect, useRef, useState } from 'react'

export default function About() {
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
    <section id="about" className="py-20 md:py-32 bg-gray-50 dark:bg-taiyo-dark transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`grid md:grid-cols-2 gap-12 items-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=1000&fit=crop"
                alt="Restaurant interior"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-taiyo-red rounded-2xl -z-10 hidden md:block"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 border-2 border-taiyo-gold rounded-2xl -z-10 hidden md:block"></div>
          </div>

          <div>
            <span className="text-taiyo-red font-medium tracking-wider uppercase text-sm">Our Story</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mt-2 mb-6">
              A Taste of Japan <br />
              <span className="text-taiyo-gold">in Damascus</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Founded with a passion for authentic Japanese cuisine, Taiyo Sushi Restaurant brings the refined flavors of Tokyo to the heart of Damascus. Located in the prestigious Cham City Center, we offer a modern dining experience that honors centuries-old culinary traditions.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Our master chefs use only the freshest ingredients, imported directly from premium suppliers, to create exquisite sushi, sashimi, and traditional Japanese dishes. Every plate is a work of art, meticulously crafted to delight both the eyes and the palate.
            </p>

            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-taiyo-red mb-1">10+</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-taiyo-red mb-1">50+</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Menu Items</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-taiyo-red mb-1">4.8</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Customer Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}