import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { useState, useRef, useEffect } from "react";
import {
  Star,
  Plus,
  Minus,
  Coffee,
  Soup,
  Sunset,
  Droplets,
  Cookie,
  Candy,
  Cherry,
  Snowflake,
} from "lucide-react";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  isVeg: boolean;
}

const menuItems: MenuItem[] = [
  // Breakfast
  {
    id: "b1",
    name: "Idli Sambar",
    description: "Soft steamed rice cakes with lentil curry",
    price: 80,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F484c6be2bdff4776bbfa6da91d814f6e%2F7d84a1ff2c7e49e6a121a532127973ab",
    category: "Breakfast",
    rating: 4.8,
    isVeg: true,
  },
  {
    id: "b2",
    name: "Masala Dosa",
    description: "Crispy crepe with spiced potato filling",
    price: 120,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F484c6be2bdff4776bbfa6da91d814f6e%2Fca9058863c834b029b58fa0d00695f3e",
    category: "Breakfast",
    rating: 4.9,
    isVeg: true,
  },
  {
    id: "b3",
    name: "Pongal",
    description: "Savory rice and lentil dish with ghee",
    price: 90,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F484c6be2bdff4776bbfa6da91d814f6e%2F0c08cd81a13549f186f7774bb944890c",
    category: "Breakfast",
    rating: 4.6,
    isVeg: true,
  },
  {
    id: "b4",
    name: "Upma",
    description: "Semolina porridge with vegetables",
    price: 70,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F484c6be2bdff4776bbfa6da91d814f6e%2Ff6a60be802f24aadb6cdb4705d0cd657",
    category: "Breakfast",
    rating: 4.5,
    isVeg: true,
  },
  {
    id: "b5",
    name: "Vada",
    description: "Crispy lentil donuts",
    price: 60,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F484c6be2bdff4776bbfa6da91d814f6e%2F45388ad5fe494a2c801eb09a19f46ba7",
    category: "Breakfast",
    rating: 4.7,
    isVeg: true,
  },

  // Lunch
  {
    id: "l1",
    name: "Chettinad Chicken",
    description: "Spicy chicken curry with aromatic spices",
    price: 320,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F484c6be2bdff4776bbfa6da91d814f6e%2F25b8ca03313b4da7818bbb7c414581e2",
    category: "Lunch",
    rating: 4.9,
    isVeg: false,
  },
  {
    id: "l2",
    name: "Mutton Biryani",
    description: "Fragrant rice with tender mutton",
    price: 380,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F484c6be2bdff4776bbfa6da91d814f6e%2Fd6ae241657684b80980000645323ddf4",
    category: "Lunch",
    rating: 4.8,
    isVeg: false,
  },
  {
    id: "l3",
    name: "Fish Curry",
    description: "Traditional fish curry with coconut",
    price: 280,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F484c6be2bdff4776bbfa6da91d814f6e%2F2adfbd9c4e994ecf80c2c9024b418aad",
    category: "Lunch",
    rating: 4.7,
    isVeg: false,
  },
  {
    id: "l4",
    name: "Sambar Rice",
    description: "Rice with lentil curry and vegetables",
    price: 150,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F484c6be2bdff4776bbfa6da91d814f6e%2F41539263bad1452b822e3e05ed04e50a",
    category: "Lunch",
    rating: 4.6,
    isVeg: true,
  },
  {
    id: "l5",
    name: "Rasam Rice",
    description: "Tangy tamarind soup with rice",
    price: 140,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F484c6be2bdff4776bbfa6da91d814f6e%2F20cfbcd1d5614c64a863b969a1ba4df7",
    category: "Lunch",
    rating: 4.5,
    isVeg: true,
  },

  // Dinner
  {
    id: "d1",
    name: "Fried Chicken",
    description: "Spicy fried chicken appetizer",
    price: 250,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F484c6be2bdff4776bbfa6da91d814f6e%2F20cd6c6cdf504b0ab8078467e52b6bb7",
    category: "Dinner",
    rating: 4.8,
    isVeg: false,
  },
  {
    id: "d2",
    name: "Mutton Curry",
    description: "Rich and flavorful mutton curry",
    price: 350,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F484c6be2bdff4776bbfa6da91d814f6e%2F275f14e002bc4af394da9bcfa50b866d",
    category: "Dinner",
    rating: 4.7,
    isVeg: false,
  },
  {
    id: "d3",
    name: "Prawn Masala",
    description: "Spicy prawn curry with onions",
    price: 320,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F484c6be2bdff4776bbfa6da91d814f6e%2Fc4be670c687040d7b25350fcad5fd559",
    category: "Dinner",
    rating: 4.6,
    isVeg: false,
  },
  {
    id: "d4",
    name: "Vegetable Biryani",
    description: "Aromatic rice with mixed vegetables",
    price: 220,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F484c6be2bdff4776bbfa6da91d814f6e%2Fe70bbea2db974b51910c30c9aaf595fb",
    category: "Dinner",
    rating: 4.5,
    isVeg: true,
  },

  // Beverages
  {
    id: "bv1",
    name: "Filter Coffee",
    description: "Traditional South Indian coffee",
    price: 40,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F484c6be2bdff4776bbfa6da91d814f6e%2F841da69465464e03984c3900fe318e02",
    category: "Beverages",
    rating: 4.9,
    isVeg: true,
  },
  {
    id: "bv2",
    name: "Masala Chai",
    description: "Spiced tea with milk",
    price: 35,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F484c6be2bdff4776bbfa6da91d814f6e%2F6e5d53da7f5343008a1a2ec7c79489ed",
    category: "Beverages",
    rating: 4.7,
    isVeg: true,
  },
  {
    id: "bv3",
    name: "Buttermilk",
    description: "Refreshing spiced yogurt drink",
    price: 30,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F484c6be2bdff4776bbfa6da91d814f6e%2Fc0ed57c450464fd28fd15e765a5e50c1",
    category: "Beverages",
    rating: 4.6,
    isVeg: true,
  },
  {
    id: "bv4",
    name: "Fresh Lime Soda",
    description: "Fizzy lime drink",
    price: 45,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F484c6be2bdff4776bbfa6da91d814f6e%2Ff582fe97a9f44f22be3ae9b42215535f",
    category: "Beverages",
    rating: 4.5,
    isVeg: true,
  },
  {
    id: "bv5",
    name: "Tender Coconut",
    description: "Fresh coconut water",
    price: 50,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F484c6be2bdff4776bbfa6da91d814f6e%2Fe37606e6897643659b131e716e05fffb",
    category: "Beverages",
    rating: 4.8,
    isVeg: true,
  },

  // Snacks
  {
    id: "s1",
    name: "Murukku",
    description: "Crispy rice flour spirals",
    price: 60,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F484c6be2bdff4776bbfa6da91d814f6e%2F2cbcb03b498b4e9d90ec346f3ed32f6a",
    category: "Snacks",
    rating: 4.7,
    isVeg: true,
  },
  {
    id: "s2",
    name: "Banana Chips",
    description: "Crispy fried banana slices",
    price: 50,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F484c6be2bdff4776bbfa6da91d814f6e%2F2a4e4539b928430cafef4c14cb809fd3",
    category: "Snacks",
    rating: 4.6,
    isVeg: true,
  },
  {
    id: "s3",
    name: "Mixture",
    description: "Spicy snack mix",
    price: 55,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F484c6be2bdff4776bbfa6da91d814f6e%2F95b826af7ac74fc09a8714aafb0a1e3a",
    category: "Snacks",
    rating: 4.5,
    isVeg: true,
  },
  {
    id: "s4",
    name: "Vadai",
    description: "Fried lentil fritters",
    price: 40,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F484c6be2bdff4776bbfa6da91d814f6e%2F78de57a400a9484593d3937481ae8de7",
    category: "Snacks",
    rating: 4.4,
    isVeg: true,
  },
  {
    id: "s5",
    name: "Bonda",
    description: "Deep fried potato balls",
    price: 45,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F484c6be2bdff4776bbfa6da91d814f6e%2F71d12865f3a249e8a3f12639621f9459",
    category: "Snacks",
    rating: 4.3,
    isVeg: true,
  },

  // Sweets
  {
    id: "sw1",
    name: "Gulab Jamun",
    description: "Sweet milk dumplings in syrup",
    price: 80,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F484c6be2bdff4776bbfa6da91d814f6e%2F59d0b77db2254dd28d74ef400c0dcf4c",
    category: "Sweets",
    rating: 4.8,
    isVeg: true,
  },
  {
    id: "sw2",
    name: "Jalebi",
    description: "Crispy sweet spirals",
    price: 70,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F484c6be2bdff4776bbfa6da91d814f6e%2F8121cc7dfd884258acd35cad72d9a2f2",
    category: "Sweets",
    rating: 4.7,
    isVeg: true,
  },
  {
    id: "sw3",
    name: "Mysore Pak",
    description: "Rich gram flour sweet",
    price: 90,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F484c6be2bdff4776bbfa6da91d814f6e%2F811d7be39c4141669835c5b96d56677a",
    category: "Sweets",
    rating: 4.6,
    isVeg: true,
  },
  {
    id: "sw4",
    name: "Laddu",
    description: "Sweet gram flour balls",
    price: 85,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F484c6be2bdff4776bbfa6da91d814f6e%2F34157509d76845bebc94a3a08ef8614b",
    category: "Sweets",
    rating: 4.5,
    isVeg: true,
  },
  {
    id: "sw5",
    name: "Halwa",
    description: "Sweet semolina pudding",
    price: 75,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F484c6be2bdff4776bbfa6da91d814f6e%2F4b0389e998b145a29424925885caa346",
    category: "Sweets",
    rating: 4.4,
    isVeg: true,
  },

  // Ice Cream
  {
    id: "ic1",
    name: "Kulfi",
    description: "Traditional Indian ice cream",
    price: 60,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F484c6be2bdff4776bbfa6da91d814f6e%2F4bdf7b81c0264e3cabfcabd4006ed6dc",
    category: "Ice Cream",
    rating: 4.8,
    isVeg: true,
  },
  {
    id: "ic2",
    name: "Vanilla Scoop",
    description: "Classic vanilla ice cream",
    price: 40,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F484c6be2bdff4776bbfa6da91d814f6e%2F53612dd39037435ba32f39fbda63a292",
    category: "Ice Cream",
    rating: 4.5,
    isVeg: true,
  },
  {
    id: "ic3",
    name: "Mango Scoop",
    description: "Fresh mango ice cream",
    price: 50,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F484c6be2bdff4776bbfa6da91d814f6e%2F74502ca1928d48ea928f74bfabdcfe1b",
    category: "Ice Cream",
    rating: 4.7,
    isVeg: true,
  },
  {
    id: "ic4",
    name: "Chocolate Scoop",
    description: "Rich chocolate ice cream",
    price: 45,
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F484c6be2bdff4776bbfa6da91d814f6e%2Fdc7e5c78f5fe47b9a99fb6fa43af3af8",
    category: "Ice Cream",
    rating: 4.6,
    isVeg: true,
  },
];

const categories = [
  { name: "Breakfast", icon: Coffee, emoji: "🥣" },
  { name: "Lunch", icon: Soup, emoji: "🍛" },
  { name: "Dinner", icon: Sunset, emoji: "🌙" },
  { name: "Beverages", icon: Droplets, emoji: "🥤" },
  { name: "Snacks", icon: Cookie, emoji: "🍿" },
  { name: "Sweets", icon: Candy, emoji: "🍯" },
  { name: "Ice Cream", icon: Snowflake, emoji: "🍦" },
];

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("Breakfast");
  const { addItem, getItemQuantity, updateQuantity } = useCart();
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredItems = menuItems.filter(
    (item) => item.category === selectedCategory,
  );

  const scrollToCategory = (category: string) => {
    setSelectedCategory(category);
    if (categoryRefs.current[category]) {
      categoryRefs.current[category]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
      });
    }
  };

  const handleAddToCart = (item: MenuItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
    });
  };

  const handleQuantityChange = (id: string, change: number) => {
    const currentQuantity = getItemQuantity(id);
    const newQuantity = Math.max(0, currentQuantity + change);
    updateQuantity(id, newQuantity);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-nature-50 to-leaf-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-nature-200">
          <div className="container mx-auto px-4 py-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-4xl font-bold text-nature-800 mb-2">
                Our Menu
              </h1>
              <p className="text-nature-600 text-lg">
                Authentic Tamil Nadu cuisine crafted with love
              </p>
            </motion.div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b border-nature-200 shadow-sm">
          <div className="container mx-auto px-4">
            <div
              ref={scrollContainerRef}
              className="flex gap-2 py-4 overflow-x-auto scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {categories.map((category) => (
                <motion.button
                  key={category.name}
                  ref={(el) => (categoryRefs.current[category.name] = el)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToCategory(category.name)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
                    selectedCategory === category.name
                      ? "bg-nature-500 text-white shadow-lg"
                      : "bg-white text-nature-600 hover:bg-nature-100 border border-nature-200"
                  }`}
                >
                  <span className="text-lg">{category.emoji}</span>
                  <span>{category.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="container mx-auto px-4 py-8">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredItems.map((item, index) => {
              const quantity = getItemQuantity(item.id);
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4 flex gap-2">
                        {item.isVeg && (
                          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            VEG
                          </span>
                        )}
                        <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                          <div className="flex items-center space-x-1">
                            <Star
                              size={14}
                              className="text-yellow-500 fill-current"
                            />
                            <span className="text-sm font-medium">
                              {item.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-nature-800 mb-2">
                        {item.name}
                      </h3>
                      <p className="text-nature-600 mb-4 text-sm leading-relaxed">
                        {item.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-nature-700">
                          ₹{item.price}
                        </span>

                        <div className="flex items-center space-x-2">
                          {quantity > 0 ? (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="flex items-center space-x-3 bg-nature-100 rounded-full px-2 py-1"
                            >
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() =>
                                  handleQuantityChange(item.id, -1)
                                }
                                className="w-8 h-8 bg-nature-500 text-white rounded-full flex items-center justify-center hover:bg-nature-600 transition-colors"
                              >
                                <Minus size={16} />
                              </motion.button>
                              <span className="font-semibold text-nature-800 min-w-[20px] text-center">
                                {quantity}
                              </span>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => handleQuantityChange(item.id, 1)}
                                className="w-8 h-8 bg-nature-500 text-white rounded-full flex items-center justify-center hover:bg-nature-600 transition-colors"
                              >
                                <Plus size={16} />
                              </motion.button>
                            </motion.div>
                          ) : (
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Button
                                onClick={() => handleAddToCart(item)}
                                className="bg-nature-500 hover:bg-nature-600 text-white rounded-full px-6"
                              >
                                <Plus size={16} className="mr-1" />
                                Add
                              </Button>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
