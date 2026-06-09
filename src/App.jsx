import {useState} from "react"
import {Routes,Route,Link} from "react-router-dom";
import './App.css'
import Block from "./Block.jsx"
import Description from "./Description.jsx";
import About from "./About.jsx"
import HomeBody from "./HomeBody.jsx"
import Navbar from "./Navbar.jsx"
import Day1 from "./Forecast/Day1.jsx"
function Home()
{
  const[inp,setInp]=useState("");
  const[city,setCity]=useState("");
  function clickHandler() {
    const cityName = inp
      .trim()
      .toLowerCase()
      .split(" ")
      .map(
        word =>
          word.charAt(0).toUpperCase() +
          word.slice(1)
      )
      .join(" ");
  
    setCity(cityName);
  }
  return(
    <>
    <div className="search">
      <div className="logo">
      </div>
      <div className="search-box">
        <input className="search-bar" type="text" placeholder="Search Bar" value={inp}  onChange={(e)=>setInp(e.target.value)}/>
        <button className="search-icon" onClick={clickHandler}></button>

     </div>
     {city && <Block className="block" name={city}/> }
      </div>
      <div className="home-body">
        <HomeBody/>
      </div>
    </>
  )

}
function App() {

 return(
   <>
      <Navbar/>
      
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/location" element={<Description/>}/>
        <Route path="/About" element={<About/>}/>
        <Route path="/Forecast/Day1" element={<Day1/>}/>
      </Routes>
   </>
 )
}

export default App
