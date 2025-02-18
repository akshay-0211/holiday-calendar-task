import React from "react";
import "./App.css";
import Calendar from "./Calendar";

function App() {
  return (
    <div className="App p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Holiday Calendar</h1>
      <Calendar />
    </div>
  );
}

export default App;
