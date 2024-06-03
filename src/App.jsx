import { useCallback, useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "1234567890";
    }
    if (charAllowed) {
      str += "~!@#$%^&*()[]{};:/";
    }

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyToClipBoard = useCallback(() => {
    passwordRef.current?.select();
    // passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="card-container card p-2">
        <h1 className="heading">Password Generator</h1>
        <div className="card">
          <input
            className="input-box"
            value={password}
            type="text"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyToClipBoard} className="btn">
            Copy Text
          </button>
        </div>

        <div className="card-elements">
          <div className="element">
            <input
              type="range"
              id="range"
              min={6}
              max={100}
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor="range">Length: {length}</label>
          </div>

          <div className="element">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="number"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="number">Numbers</label>
          </div>

          <div className="element">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="char"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="char">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
