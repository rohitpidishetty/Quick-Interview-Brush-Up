import React, { useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Context } from './Context';

const JSX_Component1 = React.memo(({ name }) => {
  console.log(name);
  return <p>Hello {name}</p>;
});

function App() {
  const { state, dispatch } = useContext(Context);
  const [number, setNumber] = useState(0);
  const [name, setName] = useState("Rohit");
  const [val, setVal] = useState(0);
  const [bigNum, setBigNum] = useState(30_000_000);


  const fn = useCallback(() => {
    console.log("Ren")
    var val = [];
    for (var i = 0; i < bigNum; i++) {
      val.push(i);
    }
    return val.length;
  }, [bigNum]);

  useEffect(() => {
    var v = fn();
    setVal(v);
  }, [bigNum]);



  function debounce(searchCall, delay) {
    let timer;
    return  (text) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        searchCall(text);
      }, delay);
    };
  }

  const search = useMemo(() => {
    function searchCall(text) {
      console.log("API Call:", text);
    }
    return debounce(searchCall, 500);
  }, []);

  return (
    <div className="App">
      {/* Preventing Component re-renders unnecessarily */}
      <JSX_Component1 name={name} />
      <p>{number}</p>
      <p>{val}</p>
      <p>{state.name} {state.number}</p>
      <button onClick={() => { setNumber(number => number + 1) }}>Increment</button>
      <button onClick={() => { setName("Acharya") }}>Change name</button>
      <button onClick={() => { setBigNum(bigNum * 2) }}>Change big num</button>
      <button onClick={() => dispatch({ type: "inc" })}>+</button>
      <button onClick={() => dispatch({ type: "dec" })}>-</button>
      <input placeholder='Search' onChange={(e) => search(e.target.value)} />
    </div>
  );
}

export default App;
