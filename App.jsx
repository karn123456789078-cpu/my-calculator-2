import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");

  const [history, setHistory] = useState(() => {
  const saved = localStorage.getItem("history");
  return saved ? JSON.parse(saved) : [];
});

  const handleClick = (value) => {
    setInput(input + value);
  };

  const calculate = () => {
  try {
    const result = eval(input).toString();

    setHistory((prev) => [
      `${input} = ${result}`,
      ...prev.slice(0, 4),
    ]);

    setInput(result);
  } catch {
    setInput("Error");
  }
};

  const clear = () => {
    setInput("");
  };

  const backspace = () => {
  setInput(input.slice(0, -1));
};

const expression = input.replace(/%/g, "/100");
const result = eval(expression).toString();

   useEffect(() => {
  const handleKeyDown = (e) => {
    const key = e.key;

    if (!isNaN(key) || key === ".") {
      handleClick(key);
    }

    if (["+", "-", "*", "/"].includes(key)) {
      handleClick(key);
    }

    if (key === "Enter") {
      calculate();
    }

    if (key === "Backspace") {
      setInput((prev) => prev.slice(0, -1));
    }

    if (key === "Escape") {
      clear();
    }
  };

  window.addEventListener("keydown", handleKeyDown);

 
  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [input]);

   const clearHistory = () => {
  setHistory([]);
  localStorage.removeItem("history");
};

<div className="history">
  {history.map((item, index) => (
    <div key={index}>{item}</div>
  ))}
</div>

  return (
    <div className="calculator">
      <div className="display">{input || "0"}</div>

     <div className="buttons">
  <button className="top-btn" onClick={clear}>AC</button>
  <button className="top-btn" onClick={backspace}>⌫</button>
  <button className="top-btn" onClick={() => handleClick("%")}>%</button>
  <button className="operator" onClick={() => handleClick("/")}>÷</button>

  <button onClick={() => handleClick("7")}>7</button>
  <button onClick={() => handleClick("8")}>8</button>
  <button onClick={() => handleClick("9")}>9</button>
  <button className="operator" onClick={() => handleClick("*")}>×</button>

  <button onClick={() => handleClick("4")}>4</button>
  <button onClick={() => handleClick("5")}>5</button>
  <button onClick={() => handleClick("6")}>6</button>
  <button className="operator" onClick={() => handleClick("-")}>−</button>

  <button onClick={() => handleClick("1")}>1</button>
  <button onClick={() => handleClick("2")}>2</button>
  <button onClick={() => handleClick("3")}>3</button>
  <button className="operator" onClick={() => handleClick("+")}>+</button>

  <button className="zero" onClick={() => handleClick("0")}>0</button>
  <button onClick={() => handleClick(".")}>.</button>
  <button className="equal" onClick={calculate}>=</button>
</div>
      </div>
  );
}

export default App;