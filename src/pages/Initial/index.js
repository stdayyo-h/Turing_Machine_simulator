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
        while (local_sameState) {
            // go to left most
            setCycle((cycle) => cycle + 1);

            const move_to_left_response = await move_to_left(currentBitIndex, setCurrentStateShow, setCurrentBitIndex, local_currentBitIndex, bitsArray, local_bitsArray);
            local_currentBitIndex = await move_to_left_response;

            const mark_left_bit_response = await mark_left_bit(setQLeftState, local_currentBitIndex, bitsArray, local_bitsArray, setCurrentStateShow, setBitsArray);
            local_bitsArray = mark_left_bit_response.local_bitsArray;

            const move_to_right_response = await move_to_right(currentBitIndex, setCurrentStateShow, setCurrentBitIndex, local_currentBitIndex, bitsArray, local_bitsArray);
            local_currentBitIndex = await move_to_right_response;

            const mark_right_bit_response = await mark_right_bit(setQRightState, local_currentBitIndex, bitsArray, local_bitsArray, setCurrentStateShow, setBitsArray);
            local_bitsArray = mark_right_bit_response.local_bitsArray;

            if (mark_left_bit_response.state !== mark_right_bit_response.state) {
                local_sameState = false;
                setCurrentStateShow("");
                setMessage("Not palindrome");
            } else if (mark_left_bit_response.bit_index === mark_right_bit_response.bit_index) {
                setIsPalindrome(true);
                setMessage("Palindrome");
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
        <div className='w-screen overflow-x-hidden flex flex-col items-center mt-28'>
            <Simulator currentStateShow={currentStateShow} bitsArray={bitsArray} setBitsArray={setBitsArray} currentBitIndex={currentBitIndex} setCurrentBitIndex={setCurrentBitIndex} />
            {message && message.length > 0 &&
                <p>{message}</p>
            }
            <button onClick={check_palindrome} className='bg-gray-600 text-white px-3 py-2 rounded-xl my-5'>
                play
            </button>
            {
                isPalindrome &&
                <p>Palindrome</p>
            }
            <Terminal history={history} setHistory={setHistory} qLeftState={qLeftState} qRightState={qRightState} cycle={cycle} />
        </div>
    );
}

export default Initial;