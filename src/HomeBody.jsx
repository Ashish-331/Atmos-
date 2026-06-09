import "./HomeBody.css";
import { Link } from "react-router-dom";

import londonImg from "./assets/cities/London.jpg";
import parisImg from "./assets/cities/Paris.jpg";
import tokyoImg from "./assets/cities/Tokyo.jpg";
import dubaiImg from "./assets/cities/Dubai.jpg";
import mumbaiImg from "./assets/cities/Mumbai.jpg";
import sydneyImg from "./assets/cities/Sydney.jpg";
import patnaImg from "./assets/cities/Patna.jpeg";
import capeTownImg from "./assets/cities/CapeTown.jpg";

function HomeBody() {
  const cities = [
    { name: "London", image: londonImg },
    { name: "Paris", image: parisImg },
    { name: "Tokyo", image: tokyoImg },
    { name: "Dubai", image: dubaiImg },
    { name: "Mumbai", image: mumbaiImg },
    { name: "Sydney", image: sydneyImg },
    { name: "Cape Town", image: capeTownImg},
    { name: "Patna" ,image: patnaImg}
  ];

  return (
    <div className="HomeBody-Page">
        <div className="HomeBody-header">
          <h1>Popular Cities</h1>
          <p>
            Explore current weather conditions from major cities around the world.
          </p>
      </div>

      <div className="HomeBody-body">
        {cities.map(city => (
          <Link
            key={city.name}
            to="/location"
            state={{ city: city.name }}
            className="city-link"
          >
            <div
              className="Card"
              style={{
                backgroundImage: `url(${city.image})`
              }}
            >
              <h2>{city.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomeBody;