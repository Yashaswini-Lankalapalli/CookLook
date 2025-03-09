import { useNavigate } from "react-router-dom";
import CustomImage from "./CustomImage";

export default function HeroSection() {
    const navigate = useNavigate(); // React Router hook for navigation

    const images = [
        "/img/gallery/img_1.jpg",
        "/img/gallery/img_2.jpg",
        "/img/gallery/img_3.jpg",
        "/img/gallery/img_4.jpg",
        "/img/gallery/img_5.jpg",
        "/img/gallery/img_6.jpg",
        "/img/gallery/img_7.jpg",
        "/img/gallery/img_8.jpg",
        "/img/gallery/img_9.jpg"
    ];

    return (
        <div className="section hero">
            <div className="col typography">
                <h1 className="title">Our Story, Your Flavors</h1>
                <p className="info">
                    Welcome to CookLook, your ultimate destination for discovering and sharing 
                    delicious recipes from around the world! Whether you're a seasoned chef or 
                    just starting your culinary journey, our platform brings together food lovers 
                    to explore, create, and inspire. Browse a diverse collection of recipes, 
                    share your own kitchen creations, and connect with a passionate community of 
                    home cooks and food enthusiasts. From quick meals to gourmet delights, find 
                    the perfect dish for every occasion. Start your flavorful adventure today!
                </p>
                <button className="btn" onClick={() => navigate("/recipes")}>Explore Now</button>
            </div>
            <div className="col gallery">
                {images.map((src, index) => (
                    <CustomImage key={index} imgSrc={src} pt={"90%"} />
                ))}
            </div>
        </div>
    );
}
