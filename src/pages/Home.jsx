import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HomePage = () => {
  useEffect(() => {
    console.log("Component mounted");
    toast.success("Welcome", { duration: 1000 });
  }, []);

  return (
    <div>
      <Navbar />

      <div
        className="bg-gray-100 min-h-screen p-4 bg-cover bg-center flex flex-col justify-center items-start pl-10"
        style={{ backgroundImage: "url('https://wallpapercave.com/wp/JNBY2E8.jpg')" }}
      >
        <div className="text-white">
          <h1 className="text-4xl md:text-6xl font-bold">Kicks Vibe</h1>
          <p className="text-lg md:text-xl mt-2">
            Elevate your sneaker game with the latest and trendiest kicks.
          </p>
          <div className="mt-4 flex space-x-4">
            <Link
              to="/products?category=men"
              className="bg-white text-black px-6 py-2 rounded hover:bg-black hover:text-white transition"
            >
              Men
            </Link>
            <Link
              to="/products?category=women"
              className="bg-white text-black px-6 py-2 rounded hover:bg-black hover:text-white transition"
            >
              Women
            </Link>
          </div>
        </div>
      </div>

      <div
        className="w-full h-screen bg-cover bg-center flex items-center justify-center text-center px-4"
        style={{ backgroundImage: "url('https://getwallpapers.com/wallpaper/full/4/7/e/713496-cool-shoes-hd-wallpapers-1920x1080-for-ipad-pro.jpg')" }}
      >
        <div>
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            New Arrivals Are Here!
          </h2>
          <p className="text-lg text-white mt-2">
            Grab your favorite sneakers before they’re gone.
          </p>
          <Link
            to="/products"
            className="mt-4 inline-block bg-white text-black px-6 py-2 rounded hover:bg-black hover:text-white transition"
          >
            Explore Now
          </Link>
        </div>
      </div>

      <div className="w-full h-screen flex flex-col md:flex-row">
        <div
          className="w-full md:w-1/2 h-screen bg-cover bg-center"
          style={{ backgroundImage: "url('https://getwallpapers.com/wallpaper/full/2/6/2/713133-cool-shoes-hd-wallpapers-2560x1600-ios.jpg')" }}
        ></div>

        <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center p-10 md:p-20">
          <h2 className="text-3xl md:text-5xl font-bold text-black">
            Exclusive Deals Just for You!
          </h2>
          <p className="text-lg text-gray-700 mt-4">
            Limited-time offers on top sneaker brands.
          </p>
          <Link
            to="/products"
            className="mt-6 inline-block bg-white text-black px-8 py-3 rounded border border-black hover:bg-black hover:text-white transition"
          >
            View Deals
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
