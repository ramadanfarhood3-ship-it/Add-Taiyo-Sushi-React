import { useEffect, useRef, useState } from 'react'
import { Star } from 'lucide-react'

const reviews = [
  { name: 'Ahmad K.', rating: 5, text: 'The best sushi in Damascus! The Dragon Roll is absolutely divine. Fresh ingredients and beautiful presentation.', date: '2 weeks ago' },
  { name: 'Sarah M.', rating: 5, text: 'An authentic Japanese experience right here in Cham City Center. The ambiance is elegant and the service is impeccable.', date: '1 month ago' },
  { name: 'Omar H.', rating: 4, text: 'Great variety on the menu. The sashimi platter was incredibly fresh. A bit pricey but worth every penny for the quality.', date: '3 weeks ago' },
  { name: 'Lina S.', rating: 5, text: 'Perfect date night spot. The dim lighting, traditional decor, and amazing food make this our favorite restaurant in Damascus.', date: '2 months ago' },
  { name: 'Youssef R.', rating: 5, text: "The ramen here rivals what I've had in Tokyo. The broth is rich and flavorful. Highly recommend the Tonkotsu!", date: '1 week ago' },
]

function StarRating({ rating }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-5 h-5 ${star <= rating ? 'text-taiyo-gold fill-taiyo-gold' : 'text-gray-300 dark:text-gray-600'}`}
        />
      ))}
    </div>
  )
}

export default function Reviews() {
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
    <section id="reviews" className="py-20 md:py-32 bg-white dark:bg-taiyo-black transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-taiyo-red font-medium tracking-wider uppercase text-sm">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mt-2 mb-4">
            What Our <span className="text-taiyo-gold">Guests Say</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-5xl font-bold text-gray-900 dark:text-white">4.8</span>
            <span className="text-2xl text-gray-500 dark:text-gray-400">/5</span>
          </div>
          <StarRating rating={5} />
          <p className="text-gray-500 dark:text-gray-400 mt-2">Based on 200+ reviews</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <StarRating rating={review.rating} />
                <span className="text-sm text-gray-400">{review.date}</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed italic">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-taiyo-red rounded-full flex items-center justify-center text-white font-bold">
                  {review.name.charAt(0)}
                </div>
                <span className="font-medium text-gray-900 dark:text-white">{review.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}