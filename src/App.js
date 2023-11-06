import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./Pages/Home";
import Chartgrapg from "./Pages/Chartgrapg";
import DonutChart from "./Pages/DonutChart";
import Sidebar from "./Components/Sidebar";

function App() {
  return (
    <div className="App">
      <Router>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/chart' element={<Chartgrapg/>}/>
              <Route path='/charts' element={<DonutChart/>}/>
              <Route path='/sidebar' element={<Sidebar/>}/>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
