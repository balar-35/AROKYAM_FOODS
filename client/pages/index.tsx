import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import {
  Star,
  Clock,
  Truck,
  Coffee,
  Soup,
  Sunset,
  Droplets,
  Cookie,
  Candy,
  Cherry,
  Snowflake,
} from "lucide-react";

const specialFoods = [
  {
    id: 1,
    name: "Chettinad Chicken Biryani",
    price: "₹32",
    rating: 4.8,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F484c6be2bdff4776bbfa6da91d814f6e%2F0b594083b5274cb8b627cd122e4ae092",
    description:
      "Aromatic basmati rice with tender chicken and signature spices",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Traditional Thali",
    price: "₹280",
    rating: 4.9,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F484c6be2bdff4776bbfa6da91d814f6e%2Fddb23488bbef4628a8537bf5927ecb17",
    description: "Complete meal with rice, sambar, rasam, and variety curries",
    badge: "Top Rated",
  },
  {
    id: 3,
    name: "Crispy Samosas",
    price: "₹80",
    rating: 4.7,
    image:
      "https://images.pexels.com/photos/8992923/pexels-photo-8992923.jpeg?auto=compress&cs=tinysrgb&w=300",
    description: "Golden fried samosas with spiced potato filling",
    badge: "Special",
  },
];

const categories = [
  { name: "Breakfast", icon: Coffee, color: "from-orange-400 to-red-500" },
  { name: "Lunch", icon: Soup, color: "from-green-400 to-blue-500" },
  { name: "Dinner", icon: Sunset, color: "from-purple-400 to-pink-500" },
  { name: "Beverages", icon: Droplets, color: "from-blue-400 to-cyan-500" },
  { name: "Snacks", icon: Cookie, color: "from-yellow-400 to-orange-500" },
  { name: "Sweets", icon: Candy, color: "from-pink-400 to-rose-500" },
  { name: "Beeda", icon: Cherry, color: "from-emerald-400 to-teal-500" },
  {
    name: "Ice Cream",
    icon: Snowflake,
    color: "from-indigo-400 to-purple-500",
  },
];

export default function Index() {
  const { addItem } = useCart();

  const handleAddToCart = (food: (typeof specialFoods)[0]) => {
    addItem({
      id: food.id.toString(),
      name: food.name,
      price: parseInt(food.price.replace("₹", "")),
      image: food.image,
      category: "Special",
    });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('https://images.pexels.com/photos/17050759/pexels-photo-17050759.jpeg?auto=compress&cs=tinysrgb&w=1920')`,
          }}
        />

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Welcome to{" "}
            <span className="bg-gradient-to-r from-nature-400 to-leaf-400 bg-clip-text text-transparent">
              AROKYAM
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 leading-relaxed"
          >
            Authentic Tamil Nadu cuisine crafted with love, tradition, and the
            finest ingredients. Experience the rich heritage of South Indian
            flavors delivered fresh to your doorstep.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/menu">
              <Button
                size="lg"
                className="bg-nature-500 hover:bg-nature-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Explore Menu
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-black hover:bg-white hover:text-nature-700 px-8 py-4 text-lg font-semibold rounded-full"
            >
              Order Now
            </Button>
          </motion.div>
        </div>

        {/* Floating elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-20 left-10 w-16 h-16 bg-nature-400/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-32 right-20 w-24 h-24 bg-leaf-400/20 rounded-full blur-xl"
        />
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: "Quick Delivery",
                description: "Fresh food delivered in 30 minutes or less",
              },
              {
                icon: Star,
                title: "Premium Quality",
                description: "Authentic recipes with finest ingredients",
              },
              {
                icon: Truck,
                title: "State Wide",
                description: "We deliver across Tamil Nadu",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-nature-100 to-leaf-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon size={32} className="text-nature-600" />
                </div>
                <h3 className="text-xl font-semibold text-nature-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-nature-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Foods Section */}
      <section className="py-20 bg-gradient-to-br from-nature-50 to-leaf-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-nature-800 mb-4">
              Today's Special
            </h2>
            <p className="text-nature-600 text-lg max-w-2xl mx-auto">
              Handpicked dishes that showcase the authentic flavors of Tamil
              Nadu cuisine
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specialFoods.map((food, index) => (
              <motion.div
                key={food.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-0">
                  <div className="relative">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-nature-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {food.badge}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                      <div className="flex items-center space-x-1">
                        <Star
                          size={14}
                          className="text-yellow-500 fill-current"
                        />
                        <span className="text-sm font-medium">
                          {food.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-nature-800 mb-2">
                      {food.name}
                    </h3>
                    <p className="text-nature-600 mb-4">{food.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-nature-700">
                        {food.price}
                      </span>
                      <Button
                        onClick={() => handleAddToCart(food)}
                        className="bg-nature-500 hover:bg-nature-600 text-white rounded-full px-6"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-nature-800 mb-4">
              Food Categories
            </h2>
            <p className="text-nature-600 text-lg max-w-2xl mx-auto">
              Explore our diverse range of authentic Tamil Nadu delicacies
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group cursor-pointer"
              >
                <Link to="/menu">
                  <Card className="h-32 border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <CardContent className="p-0 h-full relative">
                      <div
                        className={`h-full bg-gradient-to-br ${category.color} flex flex-col items-center justify-center text-white relative overflow-hidden`}
                      >
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
                        <category.icon
                          size={32}
                          className="mb-2 group-hover:scale-110 transition-transform duration-300 relative z-10"
                        />
                        <span className="font-semibold text-sm relative z-10">
                          {category.name}
                        </span>

                        {/* Animated background elements */}
                        <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/20 rounded-full group-hover:scale-150 transition-transform duration-500" />
                        <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-white/10 rounded-full group-hover:scale-125 transition-transform duration-700" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-nature-600 to-leaf-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h2 className="text-4xl font-bold mb-4">
              Ready to Experience Authentic Tamil Flavors?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Order now and get your favorite dishes delivered fresh and hot!
            </p>
            <Link to="/menu">
              <Button
                size="lg"
                className="bg-white text-nature-700 hover:bg-nature-50 px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Ordering
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
