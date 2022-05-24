import React, { useEffect, useState } from 'react';
import { mark_bit, mark_left_bit, mark_right_bit, move_to_left, move_to_right } from '../../algorithms/binary_palindrome';
import Simulator from '../../components/simulator/Simulator';
import { moveLeft, moveRight } from '../../components/simulator/simulator_functions';

function Initial(props) {

  const [currentStateShow, setCurrentStateShow] = useState("");
  const [bitsArray, setBitsArray] = useState([]);
  const [currentBitIndex, setCurrentBitIndex] = useState(0);

  const [qLeftState,setQLeftState] = useState(null);
  const [qRightState,setQRightState] = useState(null);

  const [sameState,setSameState] = useState(true);
  const [isPalindrome,setIsPalindrome] = useState(false);

  const check_palindrome = async() => {
    setIsPalindrome(false);
    let local_currentBitIndex = currentBitIndex;
    let local_bitsArray = bitsArray;
    let local_sameState=sameState;
    while (local_sameState){
      // go to left most
      console.log("inside same state",sameState)
      const move_to_left_response = await move_to_left(currentBitIndex,setCurrentStateShow,setCurrentBitIndex,local_currentBitIndex,bitsArray,local_bitsArray);
      local_currentBitIndex = await move_to_left_response;

      const mark_left_bit_response = await mark_left_bit(setQLeftState,local_currentBitIndex,bitsArray,local_bitsArray,setCurrentStateShow,setBitsArray);
      local_bitsArray = mark_left_bit_response.local_bitsArray;
      console.log("mark left",mark_left_bit_response);

      const move_to_right_response = await move_to_right(currentBitIndex,setCurrentStateShow,setCurrentBitIndex,local_currentBitIndex,bitsArray,local_bitsArray);
      local_currentBitIndex = await move_to_right_response;
      console.log("right",move_to_right_response)

      const mark_right_bit_response = await mark_right_bit(setQRightState,local_currentBitIndex,bitsArray,local_bitsArray,setCurrentStateShow,setBitsArray);
      local_bitsArray=mark_right_bit_response.local_bitsArray;
      console.log("mark right",mark_right_bit_response);

      if (mark_left_bit_response.state!==mark_right_bit_response.state){
        local_sameState=false;
        setCurrentStateShow("");
      }else if (mark_left_bit_response.bit_index===mark_right_bit_response.bit_index){
        setIsPalindrome(true);
        local_sameState=false;
        console.log("palindrome");
        setCurrentStateShow("");
      }

    }

  };
  useEffect(()=>{
    if (qLeftState!==null && qRightState!==null){
    if (qLeftState===qRightState){
      setQLeftState(null);
      setQRightState(null);
    }else{
      // 
      setSameState(false)
      console.log("not palindrome")
    }
  }
},[qLeftState,qRightState]);
  return (
    <div className='w-screen overflow-x-hidden flex flex-col items-center mt-28'>
      <Simulator currentStateShow={currentStateShow} bitsArray={bitsArray} setBitsArray={setBitsArray} currentBitIndex={currentBitIndex} setCurrentBitIndex={setCurrentBitIndex} />
      <button onClick={check_palindrome} className='bg-gray-600 text-white px-3 py-2 rounded-xl my-5'>
        play
      </button>
      {
        isPalindrome && 
        <p>Palindrome</p>
      }
      <div className='bg-black w-11/12 p-5 rounded-xl text-white'>

      </div>
    </div>
  );
}

export default Initial;