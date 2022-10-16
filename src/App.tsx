import React, { useState } from "react";
import "./App.css";
import Button from "./components/Button";
import Switch from "./components/Switch";

function App() {
  // sorry

  const [optionCount, setOptionCount] = useState(2);
  const [selection, setSelection] = useState(0);
  const bgColors = ["#fff", "#202020", "#c0d5fc", "#000", "#7da872"];
  const buttonColors = ["#999", "#eee", "#85a8ec", "#fff", "#275734"];
  const switchColors = [
    { armColor: "#ccc", ballColor: "#fff" },
    { armColor: "#18aef9", ballColor: "#fff" },
    { armColor: "#85a8ec", ballColor: "#c0d5fc" },
    { armColor: "#fff", ballColor: "#000" },
    { armColor: "#e6aecc", ballColor: "#C56c9d" },
  ];

  return (
    <div
      className="App"
      style={{ backgroundColor: bgColors[selection % bgColors.length] }}
    >
      <header className="App-header">
        <div className="row">
          <Button
            fillColor={buttonColors[selection % bgColors.length]}
            disabled={optionCount < 3}
            onClick={() => setOptionCount((prev) => prev - 1)}
          />
          <div className="switchContainer">
            <Switch
              optionCount={optionCount}
              colors={switchColors}
              onChange={(val) => {
                setSelection(val);
              }}
            />
          </div>
          <Button
            flipped
            fillColor={buttonColors[selection % bgColors.length]}
            onClick={() => setOptionCount((prev) => prev + 1)}
          />
        </div>
        <div
          className="funMessage"
          style={{
            opacity: optionCount > 30 ? 1 : 0,
            color: buttonColors[selection % bgColors.length],
          }}
        >
          wow, thats a lot of options!
        </div>
      </header>
    </div>
  );
}

export default App;
