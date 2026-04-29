import React, { useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Context } from './Context';
import axios from 'axios';

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

  function toBase64(buffer) {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength
    for (let i = 0; i < len; i++)
      binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  }

  function setImage(img) {
    console.log(img);
    const blob = new Blob([img], { type: "image/png" });
    const binFile = new FileReader();
    binFile.onload = async (e) => {
      const res = new Uint8Array(e.target.result);
      console.log(res);

      const id = "upload_0";

      for (var i = 0; i < res.length; i += 1000) {
        const buffer = res.subarray(i, Math.max(1000, res.length));
        try {

          const res = await axios.post("http://localhost:8080/image/reader", {
            id: id,
            buffer: toBase64(buffer)
          }, {
            withCredentials: true
          });

          console.log(res.data)
        } catch (err) {
          if (err) {
            console.log(err);
          }
        }
      }


      // Completed

      try {

        const res = await axios.post("http://localhost:8080/image/completed?signal=1&id=" + id, {
          withCredentials: true
        });
      } catch (err) {
        if (err) {
          console.log(err);
        }
      }

    };

    binFile.readAsArrayBuffer(img);
  }


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
    return (text) => {
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
      <input onChange={(e) => setImage(e.target.files[0])} type='file' accept='image/png' />
    </div>
  );
}

export default App;
