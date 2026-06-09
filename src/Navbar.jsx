import  {Link } from "react-router-dom"
import "./Navbar.css";

function Navbar()
{

  return (
    <>
    <div className="Navbar">
      <Link to="/">Home</Link>
      <Link to="/About">About</Link>
    </div>
    </>

  );
}

export default Navbar;