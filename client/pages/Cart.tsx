import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";
import {
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Percent,
  Clock,
  MapPin,
} from "lucide-react";

export default function Cart() {
  const { state, updateQuantity, removeItem, clearCart } = useCart();

  const deliveryFee = state.items.length > 0 ? 40 : 0;
  const discount = state.total > 500 ? Math.min(50, state.total * 0.1) : 0;
  const finalTotal = state.total + deliveryFee - discount;

  const handleQuantityChange = (id: string, change: number) => {
    const item = state.items.find((item) => item.id === id);
    if (item) {
      const newQuantity = Math.max(0, item.quantity + change);
      updateQuantity(id, newQuantity);
    }
  };

  if (state.items.length === 0) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-nature-50 to-leaf-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-md mx-auto px-4"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-24 h-24 bg-gradient-to-br from-nature-200 to-leaf-200 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <ShoppingBag size={40} className="text-nature-600" />
            </motion.div>
            <h1 className="text-3xl font-bold text-nature-800 mb-4">
              Your cart is empty
            </h1>
            <p className="text-nature-600 mb-8 leading-relaxed">
              Looks like you haven't added any delicious items to your cart yet.
              Explore our menu and discover authentic Tamil Nadu flavors!
            </p>
            <Link to="/menu">
              <Button
                size="lg"
                className="bg-nature-500 hover:bg-nature-600 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Explore Menu
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-nature-50 to-leaf-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-nature-200">
          <div className="container mx-auto px-4 py-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between"
            >
              <div>
                <h1 className="text-4xl font-bold text-nature-800 mb-2">
                  Your Cart
                </h1>
                <p className="text-nature-600">
                  {state.items.length} item{state.items.length !== 1 ? "s" : ""}{" "}
                  in your cart
                </p>
              </div>
              {state.items.length > 0 && (
                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="border-red-300 text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={16} className="mr-2" />
                  Clear Cart
                </Button>
              )}
            </motion.div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {state.items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    layout
                  >
                    <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row gap-4">
                          {/* Image */}
                          <div className="flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full sm:w-24 h-24 object-cover rounded-lg"
                            />
                          </div>

                          {/* Item Details */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold text-nature-800 mb-1">
                                  {item.name}
                                </h3>
                                <p className="text-sm text-nature-600 mb-2">
                                  Category: {item.category}
                                </p>
                                <p className="text-lg font-bold text-nature-700">
                                  ₹{item.price} each
                                </p>
                              </div>

                              {/* Remove Button */}
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => removeItem(item.id)}
                                className="self-end sm:self-start p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                              >
                                <Trash2 size={16} />
                              </motion.button>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center space-x-3 bg-nature-100 rounded-full px-3 py-2">
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
                                <span className="font-semibold text-nature-800 min-w-[30px] text-center">
                                  {item.quantity}
                                </span>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() =>
                                    handleQuantityChange(item.id, 1)
                                  }
                                  className="w-8 h-8 bg-nature-500 text-white rounded-full flex items-center justify-center hover:bg-nature-600 transition-colors"
                                >
                                  <Plus size={16} />
                                </motion.button>
                              </div>

                              <div className="text-right">
                                <p className="text-sm text-nature-600">
                                  Subtotal
                                </p>
                                <motion.p
                                  key={item.quantity}
                                  initial={{ scale: 1.2 }}
                                  animate={{ scale: 1 }}
                                  className="text-xl font-bold text-nature-700"
                                >
                                  ₹{item.price * item.quantity}
                                </motion.p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="sticky top-24"
              >
                <Card className="shadow-xl border-0 bg-white overflow-hidden">
                  <div className="bg-gradient-to-r from-nature-500 to-leaf-600 p-6 text-white">
                    <h2 className="text-2xl font-bold mb-2">Order Summary</h2>
                    <p className="opacity-90">Review your order details</p>
                  </div>

                  <CardContent className="p-6 space-y-4">
                    {/* Items Total */}
                    <div className="flex justify-between items-center">
                      <span className="text-nature-600">
                        Items ({state.items.length})
                      </span>
                      <span className="font-semibold text-nature-800">
                        ₹{state.total}
                      </span>
                    </div>

                    {/* Delivery Fee */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <MapPin size={16} className="text-nature-500" />
                        <span className="text-nature-600">Delivery Fee</span>
                      </div>
                      <span className="font-semibold text-nature-800">
                        ₹{deliveryFee}
                      </span>
                    </div>

                    {/* Discount */}
                    {discount > 0 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex justify-between items-center text-green-600"
                      >
                        <div className="flex items-center space-x-2">
                          <Percent size={16} />
                          <span>Discount</span>
                        </div>
                        <span className="font-semibold">-₹{discount}</span>
                      </motion.div>
                    )}

                    <div className="border-t border-nature-200 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-nature-800">
                          Total
                        </span>
                        <motion.span
                          key={finalTotal}
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                          className="text-2xl font-bold text-nature-700"
                        >
                          ₹{finalTotal}
                        </motion.span>
                      </div>
                    </div>

                    {/* Delivery Time */}
                    <div className="bg-nature-50 rounded-lg p-4">
                      <div className="flex items-center space-x-2 text-nature-700">
                        <Clock size={16} />
                        <span className="font-medium">
                          Estimated Delivery: 25-30 mins
                        </span>
                      </div>
                    </div>

                    {/* Discount Banner */}
                    {state.total < 500 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-r from-orange-100 to-yellow-100 border border-orange-200 rounded-lg p-4"
                      >
                        <div className="text-center">
                          <p className="text-sm font-medium text-orange-800">
                            Add ₹{500 - state.total} more to get 10% discount!
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {/* Checkout Button */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="pt-4"
                    >
                      <Button
                        size="lg"
                        className="w-full bg-gradient-to-r from-nature-500 to-leaf-600 hover:from-nature-600 hover:to-leaf-700 text-white py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Proceed to Checkout
                        <ArrowRight size={20} className="ml-2" />
                      </Button>
                    </motion.div>

                    {/* Continue Shopping */}
                    <Link to="/menu">
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full border-nature-300 text-nature-700 hover:bg-nature-50 py-3 rounded-full"
                      >
                        Continue Shopping
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
