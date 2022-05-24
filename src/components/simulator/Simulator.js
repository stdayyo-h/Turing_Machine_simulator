import React, { useEffect, useRef, useState } from "react";
import { moveLeft, moveRight } from "./simulator_functions";

function Simulator({currentStateShow,bitsArray,setBitsArray,currentBitIndex,setCurrentBitIndex}) {

  const [bitsRefArray, setBitsRefArray] = useState([]);
  const [previousBitIndex, setPreviousBitIndex] = useState(0);
  const tapRef = useRef();
  const tapNeedleRef = useRef();

  useEffect(() => {
    (async () => {
      setCurrentBitIndex(100);
    })();
  }, []);

  useEffect(() => {
    setBitsArray(
      Array.apply(null, { length: 200 }).map(Function.call, () => "")
    );
    setBitsRefArray(
      Array.apply(null, { length: 200 }).map(Function.call, () =>
        React.createRef()
      )
    );
  }, []);

  useEffect(() => {
    document.body.addEventListener("keyup", handleKeyPress);

    return () => document.body.removeEventListener("keyup", handleKeyPress);
  }, [currentBitIndex, bitsArray]);

  useEffect(() => {
    if (currentBitIndex >= 0 && currentBitIndex <= 200) {
      document.getElementById(`bitId${currentBitIndex}`)?.focus();
    }
  }, [currentBitIndex]);

  useEffect(() => {
    bitsRefArray[currentBitIndex]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  }, [tapRef, bitsRefArray, currentBitIndex]);
  

  const handleBitChange = (e, index) => {
    setBitsArray((prev) => {
      let state = [...prev];
      if (
        (e.target.value === "0" ||
          e.target.value === "1" ||
          e.target.value === "" ||
          e.target.value === "/") &&
        index !== 0
      )
        state[index] = e.target.value;
      return state;
    });
  };


  const handleKeyPress = (e) => {
    e.preventDefault();
    let name = e.key;
    let code = e.code;
    name = name.toLowerCase();
    switch (name) {
      case "r":
      case "arrowright":
        setPreviousBitIndex(currentBitIndex);
        moveRight(bitsArray,currentBitIndex,setCurrentBitIndex);
        break;
      case "l":
      case "arrowleft":
        setPreviousBitIndex(currentBitIndex);
        moveLeft(currentBitIndex,setCurrentBitIndex);
        break;
    //   case "a":
    //     setPreviousBitIndex(currentBitIndex);
    //     add(currentBitIndex);
    //     break;
    //   case "d":
    //     setPreviousBitIndex(currentBitIndex);
    //     remove();
    //     break;
      default:
        break;
    }
  };

  // States
  // qRight1,qRight0,qLeft1,qLeft0,qSearchR1,qSearchL1,qSearchL0,qSearchL0

  return (
    <div className="flex w-full flex-col items-center justify-center bg-white">
      <div className="flex relative w-11/12 overflow-x-scroll scrollDiv flex-col min-w-screen pb-20  justify-center items-center">
        <div ref={tapRef} className="h-[60px] bg-gray-400 w-full ml-0 flex ">
          {bitsArray?.map((item, index) => (
            <div
              ref={bitsRefArray[index]}
              style={{
                minWidth: "60px",
              }}
              key={index}
              className={`h-[60px] w-[60px] border-r-2  border-white flex justify-center bg-gray-400 items-center ${
                index === 0 && "border-l"
              }`}
            >
              <input
                id={`bitId${index}`}
                type={"text"}
                onChange={(e) => handleBitChange(e, index)}
                className="w-full h-full bg-transparent text-center"
                value={item}
              />
            </div>
          ))}
        </div>
        <div className="text-white fixed w-full flex justify-center">
          <div
            ref={tapNeedleRef}
            className="transition ease-out duration-700 absolute rounded-t-full mt-4"
          >
            <img src="/images/pointer.png" alt="arrow" className="w-10" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <p className="bg-gray-600  p-5 mt-10 rounded-xl text-white">
          Current State : {currentStateShow}
        </p>
      </div>
      {/* <div className="bg-gray-600 w-11/12 p-5 mt-10 rounded-xl text-white">
        <p>KEYS</p>
        <p>{"R -> move right"}</p>
        <p>{"L -> move left"}</p>
        <p>{"A -> add new bit"}</p>
        <p>{"D -> remove current bit"}</p>
        <p>{"/ -> end bit"}</p>
      </div> */}
    </div>
  );
}

export default Simulator;
