import React, { useEffect, useState } from 'react';
import { mark_bit, mark_left_bit, mark_right_bit, move_to_left, move_to_right } from '../../algorithms/binary_palindrome';
import Simulator from '../../components/simulator/Simulator';
import { moveLeft, moveRight } from '../../components/simulator/simulator_functions';
import Terminal from '../../components/Terminal';

function Initial(props) {

    const [currentStateShow, setCurrentStateShow] = useState("");
    const [bitsArray, setBitsArray] = useState([]);
    const [currentBitIndex, setCurrentBitIndex] = useState(0);

    const [leftMostBitIndex, setLeftMostBitIndex] = useState(100);
    const [RightMostBitIndex, setRightMostBitIndex] = useState(100);

    const [qLeftState, setQLeftState] = useState(null);
    const [qRightState, setQRightState] = useState(null);

    const [sameState, setSameState] = useState(true);
    const [isPalindrome, setIsPalindrome] = useState(false);

    const [cycle, setCycle] = useState(0);

    const [message, setMessage] = useState("");
    const [history, setHistory] = useState([]);

    const check_palindrome = async () => {
        setHistory([]);
        setIsPalindrome(false);
        setMessage("");
        setSameState(true);


        let local_currentBitIndex = currentBitIndex;
        let local_bitsArray = bitsArray;
        let local_sameState = true;
        let local_searchingForBit="";
        while (local_sameState) {

            setCycle((cycle) => cycle + 1);

            const move_to_left_response = await move_to_left(currentBitIndex, setCurrentStateShow, setCurrentBitIndex, local_currentBitIndex, bitsArray, local_bitsArray,local_searchingForBit);
            local_currentBitIndex = await move_to_left_response;

            const mark_left_bit_response = await mark_left_bit(setQLeftState, local_currentBitIndex, bitsArray, local_bitsArray, setCurrentStateShow, setBitsArray);
            local_bitsArray = mark_left_bit_response.local_bitsArray;
            local_searchingForBit = mark_left_bit_response.state;

            const move_to_right_response = await move_to_right(currentBitIndex, setCurrentStateShow, setCurrentBitIndex, local_currentBitIndex, bitsArray, local_bitsArray,local_searchingForBit);
            local_currentBitIndex = await move_to_right_response;

            const mark_right_bit_response = await mark_right_bit(setQRightState, local_currentBitIndex, bitsArray, local_bitsArray, setCurrentStateShow, setBitsArray);
            local_bitsArray = mark_right_bit_response.local_bitsArray;
            local_searchingForBit = "";


            if (mark_left_bit_response.state !== mark_right_bit_response.state) {
                local_sameState = false;
                setCurrentStateShow("");
                setMessage("Not a palindrome");
            } else if (mark_left_bit_response.bit_index === mark_right_bit_response.bit_index) {
                setIsPalindrome(true);
                setMessage("Is a Palindrome");
                local_sameState = false;
                setCurrentStateShow("");
            }

        }

    };
    useEffect(() => {
        if (qLeftState !== null && qRightState !== null) {
            if (qLeftState === qRightState) {
                setQLeftState(null);
                setQRightState(null);
            } else {
                // 
                setSameState(false)
            }
        }
    }, [qLeftState, qRightState]);

    useEffect(() => {
        if (currentBitIndex > RightMostBitIndex)
            setRightMostBitIndex(currentBitIndex);
        if (currentBitIndex < leftMostBitIndex)
            setLeftMostBitIndex(currentBitIndex)
    }, [currentBitIndex]);
    return (
        <div className='font-press-start items-center bg-covnpm er w-screen h-screen text-gray-200 overflow-x-hidden bg-gray-800'>
        <img className='absolute z-0 top-0 left-0 min-w-[200vw] h-screen' src={"/images/bg.png"} />
        <div className='w-screen flex flex-col overflow-x-hidden '>
            <div className='w-full relative flex flex-col justify-center items-center h-64'>
                <p className='text-4xl '>TURING MACHINE</p>
                <p className='font-bold text-sm'>*to check binary palindrome</p>
            </div>
            <Simulator currentStateShow={currentStateShow} bitsArray={bitsArray} setBitsArray={setBitsArray} currentBitIndex={currentBitIndex} setCurrentBitIndex={setCurrentBitIndex} />
        </div>
            <div className='flex flex-col items-center'>
            <button onClick={check_palindrome} className='bg-gray-600 text-white px-9 relative justify-center uppercase py-2 rounded-md my-5 '>
                play
            </button>            
            {message && message.length > 0 &&
                <p className='uppercase font-semibold z-20'>{message}</p>
            }
            <div className='w-1/2 z-20 rounded-bl-md lg:w-3/4 bg-black text-gray-500'>
                <Terminal history={history} setHistory={setHistory} qLeftState={qLeftState} qRightState={qRightState} cycle={cycle} />
                    <p className='ml-6'>-------------</p>
                    <p className='px-3 pb-2 m-0 uppercase text-sm font-semibold'>State : {currentStateShow}</p>
            </div>
        </div>
        </div>
    );
}

export default Initial;