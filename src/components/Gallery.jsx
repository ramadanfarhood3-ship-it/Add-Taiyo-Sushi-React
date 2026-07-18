import { useState, useEffect, useRef } from 'react'
import { X, ZoomIn } from 'lucide-react'

const galleryImages = [
  'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1534256958597-7fe685cbd46f?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=600&h=600&fit=crop',
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=600&fit=crop',
]

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null)
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
    <section id="gallery" className="py-20 md:py-32 bg-gray-50 dark:bg-taiyo-dark transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-taiyo-red font-medium tracking-wider uppercase text-sm">Gallery</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mt-2 mb-4">
            Visual <span className="text-taiyo-gold">Journey</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Experience the artistry of our cuisine and the elegance of our dining space.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((img, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-xl cursor-pointer group ${
                index === 0 || index === 5 ? 'md:col-span-2 md:row-span-2' : ''
              }`}
              onClick={() => setSelectedImage(img)}
            >
              <img
                src={img}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover aspect-square group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <ZoomIn className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button className="absolute top-4 right-4 text-white hover:text-taiyo-gold transition-colors">
            <X className="w-10 h-10" />
          </button>
          <img
            src={selectedImage}
            alt="Enlarged"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}