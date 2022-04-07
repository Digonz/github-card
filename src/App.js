import * as React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Landing from "./views/Landing";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Landing />} />
      </Routes>
    </div>
  );
}

export default App;
