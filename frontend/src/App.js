import './App.css';
import Nav from "./Nav";
import Footer from "./Footer";
import Home from './pages/Home';
import Graph from "./pages/Graph";
import History from "./pages/History";
import Map from "./pages/Map";
// import "./pages/";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/graph" element={<Graph />} />
        <Route path="/history" element={<History />} />
        {/* <Route exact path="/map" render={() => {window.location.href="C:/flask/frontend/src/pages/Mapping/index.html"}} /> */}
        {/* <Route path="C:/flask/frontend/src/pages/Mapping/index.html" /> */}
        <Route path="/map" element={<Map />}/> 
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
