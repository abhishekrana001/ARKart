// Category Default & Original Assets
import electronicesImage from "../assets/electronics.png";
import fashion from "../assets/fashion.png";
import shoes from "../assets/shoes.png";
import accessories from "../assets/accessories.png";
import beauty from "../assets/beauty.png";

// Dedicated Custom Product Images
import smartWatchImg from "../assets/smart_watch.jpg";
import gamingHeadsetImg from "../assets/gaming_headset.jpg";
import runningSneakersImg from "../assets/running_sneakers.jpg";
import leatherWalletImg from "../assets/leather_wallet.jpg";
import streetwearHoodieImg from "../assets/streetwear_hoodie.jpg";
import earbudsImg from "../assets/earbuds.jpg";
import studioHeadphonesImg from "../assets/studio_headphones.jpg";
import urbanShirtImg from "../assets/urban_shirt.jpg";
import chinoPantsImg from "../assets/chino_pants.jpg";
import canvasSneakersImg from "../assets/canvas_sneakers.jpg";
import trailTrainersImg from "../assets/trail_trainers.jpg";
import foamingCleanserImg from "../assets/foaming_cleanser.jpg";
import dayMoisturizerImg from "../assets/day_moisturizer.jpg";
import aviatorSunglassesImg from "../assets/aviator_sunglasses.jpg";

const products = [
  // --- ELECTRONICS ---
  {
    id: 1,
    name: "Wireless Noise-Canceling Headphones",
    category: "electronics",
    price: 1999,
    image: electronicesImage,
    rating: 4.8,
    reviewsCount: 142,
    description: "Immersive audio with active hybrid noise cancellation, 30-hour battery life, and crystal-clear dual microphones for seamless calling."
  },
  {
    id: 2,
    name: "Pro Gaming Wireless Headset",
    category: "electronics",
    price: 2899,
    image: gamingHeadsetImg,
    rating: 4.7,
    reviewsCount: 98,
    description: "Ultra-low latency 2.4GHz wireless connection, 7.1 surround sound drivers, RGB breath lighting and plush memory foam ear cushions."
  },
  {
    id: 3,
    name: "True Bass Bluetooth Earbuds",
    category: "electronics",
    price: 1299,
    image: earbudsImg,
    rating: 4.5,
    reviewsCount: 215,
    description: "Compact ergonomic earbuds with IPX5 water resistance, fast Type-C charging, and touch controls for music & call assistance."
  },
  {
    id: 4,
    name: "Studio Monitor Audio Headphones",
    category: "electronics",
    price: 3499,
    image: studioHeadphonesImg,
    rating: 4.9,
    reviewsCount: 84,
    description: "Precision-engineered 50mm neodymium drivers delivering rich acoustics, flat frequency response, and detachable gold-plated aux cable."
  },

  // --- FASHION ---
  {
    id: 5,
    name: "Premium Casual Denim Jacket",
    category: "fashion",
    price: 2499,
    image: fashion,
    rating: 4.6,
    reviewsCount: 112,
    description: "Timeless vintage wash denim jacket made from 100% breathable organic cotton with durable metallic button closures."
  },
  {
    id: 6,
    name: "Slim Fit Urban Cotton Shirt",
    category: "fashion",
    price: 1199,
    image: urbanShirtImg,
    rating: 4.4,
    reviewsCount: 167,
    description: "Lightweight and breathable formal-casual shirt, featuring wrinkle-resistant fabric and a modern tailored fit."
  },
  {
    id: 7,
    name: "Oversized Streetwear Hoodie",
    category: "fashion",
    price: 1899,
    image: streetwearHoodieImg,
    rating: 4.8,
    reviewsCount: 180,
    description: "Heavyweight 380 GSM fleece hoodie with kangaroo pocket, double-lined hood, and relaxed dropped shoulder silhouette."
  },
  {
    id: 8,
    name: "Classic Stretch Chino Trousers",
    category: "fashion",
    price: 1499,
    image: chinoPantsImg,
    rating: 4.5,
    reviewsCount: 94,
    description: "Versatile four-way stretch chinos designed for everyday comfort from office hours to evening outings."
  },

  // --- SHOES ---
  {
    id: 9,
    name: "Ultra-Lightweight Running Shoes",
    category: "shoes",
    price: 3199,
    image: runningSneakersImg,
    rating: 4.7,
    reviewsCount: 230,
    description: "High-performance athletic sneakers equipped with breathable mesh uppers, shock-absorbing EVA foam, and slip-resistant rubber tread."
  },
  {
    id: 10,
    name: "Everyday Street Canvas Sneakers",
    category: "shoes",
    price: 1699,
    image: canvasSneakersImg,
    rating: 4.5,
    reviewsCount: 145,
    description: "Classic low-top skate sneakers featuring durable canvas construction, reinforced toe caps, and cushioned insoles for all-day walking."
  },
  {
    id: 11,
    name: "Slip-On Memory Foam Walking Shoes",
    category: "shoes",
    price: 2099,
    image: shoes,
    rating: 4.6,
    reviewsCount: 178,
    description: "Effortless hands-free slip-on shoes with soft memory foam insoles that contour to your foot shape for cloud-like comfort."
  },
  {
    id: 12,
    name: "Rugged Outdoor Trail Trainers",
    category: "shoes",
    price: 3799,
    image: trailTrainersImg,
    rating: 4.8,
    reviewsCount: 76,
    description: "Weather-resistant hiking and trail shoes with deep-lug traction outsoles, reinforced heel guards, and waterproof membrane."
  },

  // --- BEAUTY ---
  {
    id: 13,
    name: "Natural Glow Skincare Serum & Cream",
    category: "beauty",
    price: 899,
    image: beauty,
    rating: 4.5,
    reviewsCount: 310,
    description: "Rejuvenating antioxidant serum formulated with Vitamin C, Hyaluronic Acid, and botanical extracts to brighten and hydrate dull skin."
  },
  {
    id: 14,
    name: "Gentle Foaming Deep Cleanser",
    category: "beauty",
    price: 549,
    image: foamingCleanserImg,
    rating: 4.6,
    reviewsCount: 195,
    description: "pH-balanced gentle facial cleanser enriched with green tea and niacinamide to clear pores without stripping natural moisture."
  },
  {
    id: 15,
    name: "Hydrating Day Moisturizer SPF 50",
    category: "beauty",
    price: 799,
    image: dayMoisturizerImg,
    rating: 4.7,
    reviewsCount: 240,
    description: "Non-greasy, fast-absorbing daily moisturizer offering broad-spectrum UVA/UVB sun protection and long-lasting barrier hydration."
  },
  {
    id: 16,
    name: "Organic Botanical Hair Repair Oil",
    category: "beauty",
    price: 649,
    image: beauty,
    rating: 4.4,
    reviewsCount: 128,
    description: "Pure cold-pressed argan and rosemary oil blend that revitalizes dry roots, tames frizz, and restores silky shine."
  },

  // --- ACCESSORIES ---
  {
    id: 17,
    name: "Classic Minimalist Watch & Accessories",
    category: "accessories",
    price: 1499,
    image: accessories,
    rating: 4.6,
    reviewsCount: 152,
    description: "Sophisticated analog quartz wristwatch with genuine brown leather strap, stainless steel casing, and water resistance up to 30m."
  },
  {
    id: 18,
    name: "Matte Black Smart Fitness Band",
    category: "accessories",
    price: 1999,
    image: smartWatchImg,
    rating: 4.4,
    reviewsCount: 204,
    description: "Sleek AMOLED health tracker with 24/7 heart rate monitoring, SpO2 sensor, sleep tracking, and 14-day battery life."
  },
  {
    id: 19,
    name: "Handcrafted Genuine Leather Wallet",
    category: "accessories",
    price: 999,
    image: leatherWalletImg,
    rating: 4.8,
    reviewsCount: 189,
    description: "Slim bifold wallet made from premium full-grain leather with RFID blocking technology, 8 card slots, and currency compartment."
  },
  {
    id: 20,
    name: "Polarized Aviator Sunglasses",
    category: "accessories",
    price: 1299,
    image: aviatorSunglassesImg,
    rating: 4.5,
    reviewsCount: 110,
    description: "Timeless aviator frames with UV400 polarized lenses that eliminate glare while offering crisp vision in bright daylight."
  }
];

export default products;