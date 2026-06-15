import { useState, useEffect, useRef } from 'react'

const menuData = {
  'Sushi Rolls': [
    { name: 'Dragon Roll', description: 'Shrimp tempura, avocado, topped with eel and unagi sauce', price: '$18', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=300&fit=crop' },
    { name: 'Spicy Tuna Roll', description: 'Fresh tuna, spicy mayo, cucumber, and sesame seeds', price: '$14', image: 'https://images.unsplash.com/photo-1617196034438-4e1410f2f6d0?w=400&h=300&fit=crop' },
    { name: 'Rainbow Roll', description: 'California roll topped with assorted fresh fish', price: '$20', image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=300&fit=crop' },
    { name: 'Salmon Avocado Roll', description: 'Fresh salmon and creamy avocado with tobiko', price: '$12', image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=400&h=300&fit=crop' },
    { name: 'California Roll', description: 'Crab stick, avocado, cucumber, and masago', price: '$10', image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=400&h=300&fit=crop' },
    { name: 'Tempura Roll', description: 'Assorted tempura vegetables and shrimp with eel sauce', price: '$16', image: 'https://images.unsplash.com/photo-1617196034183-4214918c5fe5?w=400&h=300&fit=crop' },
  ],
  'Sashimi': [
    { name: 'Salmon Sashimi', description: 'Premium Norwegian salmon, 8 pieces', price: '$22', image: 'https://images.unsplash.com/photo-1534256958597-7fe685cbd46f?w=400&h=300&fit=crop' },
    { name: 'Tuna Sashimi', description: 'Bluefin tuna, 8 pieces', price: '$26', image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop' },
    { name: 'Mixed Sashimi Platter', description: 'Assorted fresh fish, 18 pieces', price: '$45', image: 'https://images.unsplash.com/photo-1559410545-0bdcd187e0a6?w=400&h=300&fit=crop' },
    { name: 'Yellowtail Sashimi', description: 'Hamachi with jalapeño and ponzu', price: '$24', image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=400&h=300&fit=crop' },
  ],
  'Nigiri': [
    { name: 'Salmon Nigiri', description: '2 pieces of premium salmon on seasoned rice', price: '$8', image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=400&h=300&fit=crop' },
    { name: 'Tuna Nigiri', description: '2 pieces of fresh bluefin tuna', price: '$10', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=300&fit=crop' },
    { name: 'Eel Nigiri', description: '2 pieces of unagi with unagi sauce', price: '$12', image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&h=300&fit=crop' },
    { name: 'Shrimp Nigiri', description: '2 pieces of cooked tiger shrimp', price: '$7', image: 'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=400&h=300&fit=crop' },
  ],
  'Appetizers': [
    { name: 'Edamame', description: 'Steamed soybeans with sea salt', price: '$6', image: 'https://images.unsplash.com/photo-1536859355448-76f92ebf4c5f?w=400&h=300&fit=crop' },
    { name: 'Gyoza', description: 'Pan-fried pork dumplings, 6 pieces', price: '$9', image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400&h=300&fit=crop' },
    { name: 'Seaweed Salad', description: 'Mixed seaweed with sesame dressing', price: '$7', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop' },
    { name: 'Agedashi Tofu', description: 'Deep-fried tofu in dashi broth', price: '$8', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop' },
  ],
  'Soups': [
    { name: 'Miso Soup', description: 'Traditional soybean paste soup with tofu and seaweed', price: '$5', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop' },
    { name: 'Tonkotsu Ramen', description: 'Rich pork broth with chashu, egg, and noodles', price: '$16', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop' },
    { name: 'Tempura Udon', description: 'Thick wheat noodles with crispy tempura', price: '$14', image: 'https://images.unsplash.com/photo-1618841557871-b4664fbf0cb3?w=400&h=300&fit=crop' },
    { name: 'Hot & Sour Soup', description: 'Japanese style with mushrooms and bamboo', price: '$6', image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop' },
  ],
  'Main Dishes': [
    { name: 'Teriyaki Salmon', description: 'Grilled salmon with teriyaki glaze, served with rice', price: '$24', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop' },
    { name: 'Chicken Katsu', description: 'Breaded chicken cutlet with tonkatsu sauce', price: '$18', image: 'https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?w=400&h=300&fit=crop' },
    { name: 'Beef Yakiniku', description: 'Grilled marinated beef with vegetables', price: '$28', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop' },
    { name: 'Tempura Platter', description: 'Assorted shrimp and vegetable tempura', price: '$20', image: 'https://images.unsplash.com/photo-1618841557871-b4664fbf0cb3?w=400&h=300&fit=crop' },
  ],
  'Desserts': [
    { name: 'Mochi Ice Cream', description: 'Assorted flavors, 3 pieces', price: '$8', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop' },
    { name: 'Matcha Cheesecake', description: 'Creamy green tea cheesecake', price: '$10', image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop' },
    { name: 'Tempura Ice Cream', description: 'Vanilla ice cream in crispy tempura batter', price: '$9', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop' },
    { name: 'Black Sesame Panna Cotta', description: 'Silky custard with black sesame', price: '$8', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=300&fit=crop' },
  ],
  'Drinks': [
    { name: 'Premium Sake', description: 'Junmai Daiginjo, 180ml', price: '$15', image: 'https://images.unsplash.com/photo-1585553616435-2dc0a54e271d?w=400&h=300&fit=crop' },
    { name: 'Japanese Green Tea', description: 'Premium sencha, hot or iced', price: '$4', image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=400&h=300&fit=crop' },
    { name: 'Matcha Latte', description: 'Ceremonial grade matcha with milk', price: '$6', image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400&h=300&fit=crop' },
    { name: 'Ramune', description: 'Japanese marble soda, assorted flavors', price: '$5', image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=400&h=300&fit=crop' },
  ],
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('Sushi Rolls')
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)
  const categories = Object.keys(menuData)

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
    <section id="menu" className="py-20 md:py-32 bg-white dark:bg-taiyo-black transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-taiyo-red font-medium tracking-wider uppercase text-sm">Our Menu</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mt-2 mb-4">
            Culinary <span className="text-taiyo-gold">Excellence</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover our carefully curated selection of authentic Japanese dishes, crafted with precision and passion.
          </p>
        </div>

        <div className="flex overflow-x-auto scrollbar-hide gap-2 mb-12 pb-4 justify-start md:justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full whitespace-nowrap font-medium transition-all ${
                activeCategory === category
                  ? 'bg-taiyo-red text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuData[activeCategory].map((item, index) => (
            <div
              key={index}
              className="group bg-gray-50 dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 px-3 py-1 rounded-full font-bold text-taiyo-red shadow-md">
                  {item.price}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-gray-900 dark:text-white mb-2">{item.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}