import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white h-[50vh] flex flex-col justify-center items-center text-center p-6 mt-10">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Kicks Vibe</h2>
        <p className="text-gray-400 text-sm">Step Up Your Sneaker Game</p>
      </div>

      <div className="flex space-x-6 text-sm mb-6">
        <a href="#" className="hover:underline">Privacy Policy</a>
        <a href="#" className="hover:underline">Terms of Service</a>
        <a href="#" className="hover:underline">Shipping & Returns</a>
        <a href="#" className="hover:underline">Contact Us</a>
      </div>

      <div className="flex space-x-6 mb-6">
        <a href="#" className="hover:text-blue-400">
          <Facebook size={28} />
        </a>
        <a href="#" className="hover:text-pink-400">
          <Instagram size={28} />
        </a>
        <a href="#" className="hover:text-blue-300">
          <Twitter size={28} />
        </a>
      </div>

      <div className="text-gray-400 text-sm">
        <p>Email: support@kicksvibe.com</p>
        <p>Phone: +1 (800) 123-4567</p>
      </div>

      <div className="mt-6 text-gray-500 text-xs">
        <p>&copy; {new Date().getFullYear()} Kicks Vibe. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
