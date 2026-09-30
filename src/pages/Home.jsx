import "./Home.css";
import { Link } from "react-router-dom";
import image from "../assets/image.png";
import electronics from "../assets/electronics.png";
import beauty from "../assets/beauty.png";
import shoes from "../assets/shoes.png";
import fashion from "../assets/fashion.png";
import accessories from "../assets/accessories.png";

function Home() {
  return (
    <>
        <section className='hero'>
            <div className="hero-content">
                <p>Welcome to ARKart</p>
                <h1>Shop smarter. Live Better.</h1>
                <p>Discover quality products at great prices, 
                    all in one place. Shop effortlessly and find 
                    everything you need with ARKart.</p>
                <Link to="/products" className="shop-btn">
                    Shop now
                </Link>
            </div>

            <div className="hero-image">
                <img src={image} alt="shopping" />
            </div>
        </section>

        <section className="categories">
            <h2>Shop by Category</h2>
            <div className="category-container">
                <Link to="/products?category=electronics">
                    <div className="category-card">
                        <img src={electronics} alt="Eclectronics" />
                        <button>Electronics</button>
                    </div>
                </Link>
                <Link to="/products?category=fashion">
                    <div className="category-card">
                        <img src={fashion} alt="Fashion" />
                        <button>Fashion</button>
                    </div>
                </Link>
                <Link to="/products?category=shoes">
                    <div className="category-card">
                        <img src={shoes} alt="Shoes"/>
                        <button>Shoes</button>
                    </div>
                </Link>
                <Link to="/products?category=shoes">
                    <div className="category-card">
                        <img src={beauty} alt="Beauty" />
                        <button>Beauty</button>
                    </div>
                </Link>
                <Link to="/products?category=accessories">
                    <div className="category-card">
                        <img src={accessories} alt="Accessories" />
                        <button>Accessories</button>
                    </div>
                </Link>
            </div>
        </section>
    </>
  )
}

export default Home