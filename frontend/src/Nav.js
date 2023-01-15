import React from "react";
import "./App.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <Link
        style={{
          color: "white",
          textDecoration: "none"
        }}
        to="/home"
      >
        <span className="Title">YIELD MONITORING SYSTEM</span>
      </Link>
      <ul className="nav-links">
        <Link
          style={{
            color: "white",
            textDecoration: "none",
            marginTop: "10px",
            marginRight: "40px"
          }}
          to="/home"
        >
          <li>Home</li>
        </Link>
        <Link
        style={{
            color: "white",
            textDecoration: "none",
            marginTop: "10px",
            marginRight: "40px"
        }}
        to="/graph"
        >
        <li>Graph</li>
        </Link>
        <Link
        style={{ 
            color: "white", 
            textDecoration: "none", 
            marginTop: "10px",
            marginRight: "40px"
        }}
        to="/history"
        >
        <li>History</li>
        </Link>
        <Link
          style={{
            color: "white",
            textDecoration: "none",
            marginTop: "10px",
            marginRight: "40px"
          }}
          to="/map"
        >
          <li>Map</li>
        </Link>
        
      </ul>
    </nav>
  );
}

export default Nav;