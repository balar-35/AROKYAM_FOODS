import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Menu, Home, UtensilsCrossed, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { state } = useCart();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/menu", label: "Menu", icon: UtensilsCrossed },
    { href: "/contact", label: "Contact", icon: Phone },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-nature-50 to-leaf-100">
      {/* Navigation Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-nature-200 shadow-sm"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 bg-gradient-to-br from-nature-500 to-leaf-600 rounded-full flex items-center justify-center"
              >
                <span className="text-white font-bold text-lg">A</span>
              </motion.div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-2xl font-bold bg-gradient-to-r from-nature-700 to-leaf-600 bg-clip-text text-transparent"
              >
                AROKYAM
              </motion.span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link key={item.href} to={item.href}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                        isActive
                          ? "bg-nature-100 text-nature-700"
                          : "text-nature-600 hover:text-nature-700 hover:bg-nature-50"
                      }`}
                    >
                      <Icon size={18} />
                      <span className="font-medium">{item.label}</span>
                    </motion.div>
                  </Link>
                );
              })}
            </nav>

            {/* Cart and Mobile Menu */}
            <div className="flex items-center space-x-4">
              <Link to="/cart">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-nature-300 text-nature-700 hover:bg-nature-100"
                  >
                    <ShoppingCart size={18} />
                    <span className="ml-2 hidden sm:inline">Cart</span>
                    {state.items.length > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 bg-nature-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                      >
                        {state.items.reduce(
                          (sum, item) => sum + item.quantity,
                          0,
                        )}
                      </motion.span>
                    )}
                  </Button>
                </motion.div>
              </Link>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu size={20} />
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4 border-t border-nature-200"
            >
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <motion.div
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg mx-2 mb-2 transition-colors ${
                        isActive
                          ? "bg-nature-100 text-nature-700"
                          : "text-nature-600 hover:text-nature-700 hover:bg-nature-50"
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </motion.div>
                  </Link>
                );
              })}
            </motion.nav>
          )}
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-nature-800 text-nature-100 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-nature-400 to-leaf-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">A</span>
                </div>
                <span className="text-xl font-bold">AROKYAM</span>
              </div>
              <p className="text-nature-300 leading-relaxed">
                Authentic Tamil Nadu cuisine delivered fresh to your doorstep.
                Experience the rich flavors and traditional recipes passed down
                through generations.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="text-nature-300 hover:text-nature-100 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-nature-300">
                <p>📞 +91 63815 81435</p>
                <p>📧 balamuralik950@gmail.com</p>
                <p>📍 Coimbatore, Tamil Nadu</p>
              </div>
            </div>
          </div>

          <div className="border-t border-nature-700 mt-8 pt-8 text-center text-nature-400">
            <p>
              &copy; 2025 AROKYAM. All rights reserved. Made with ❤️ in Tamil
              Nadu.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
