import React, { useEffect, useState } from 'react';
import "./initial.css";

function InitialPage(props) {
    const [bitsArray,setBitsArray] = useState(['/','']);
    const [currentBitIndex,setCurrentBitIndex] = useState(1);

    const handleBitChange = (e,index)=>{
        setBitsArray((prev)=>{
            let state = [...prev]
            if ((e.target.value==='0' || e.target.value==='1' || e.target.value==='' || e.target.value==='/') && index!==0)
            state[index] = e.target.value
            return state;
        })
        
    }

    const moveRight = ()=>{
        if (bitsArray.length>currentBitIndex)
            setCurrentBitIndex((prev)=>prev+1);
    };

    const moveLeft = ()=>{
        if (currentBitIndex>1)
            setCurrentBitIndex((prev)=>prev-1);
    };

    const add = ()=>{
        if (bitsArray[bitsArray.length-1] !=='/'){
            setBitsArray((prev)=>{
                let state = [...prev]
                state.splice(currentBitIndex+1,0,'');
                return state
            });
            moveRight();
        }
    }

    const remove = async()=>{
        if (currentBitIndex>1 || (bitsArray.length>3 && currentBitIndex>=1)){
            setBitsArray((prev)=>{
                let state = [...prev]
                state.splice(currentBitIndex,1);
                return state
            });
            moveLeft()
        }
    }

    const handleKeyPress = (e)=>{
        e.preventDefault()
        let name = e.key;
        let code = e.code;
        name = name.toLowerCase()
        switch(name){
            case 'r':
                moveRight();
                break;
            case 'l':
                moveLeft();
                break;
            case 'a':
                add(currentBitIndex);
                break;
            case 'd':
                remove()
                break;
            default:
                break
        }
    }

    useEffect(()=>{
        document.body.addEventListener('keyup',handleKeyPress);

        return ()=> document.body.removeEventListener('keyup',handleKeyPress)
    },[currentBitIndex,bitsArray]);

    useEffect(()=>{
        if (currentBitIndex>=1){
            document.getElementById(`bitId${currentBitIndex}`)?.focus()
        }
        else{
            setCurrentBitIndex(1)
        }
    },[currentBitIndex])
    console.log("states",currentBitIndex,bitsArray[-1])

    return (
        <div className='flex h-screen w-screen flex-col items-center justify-center bg-black'>
            <div className='min-w-screen h-14 bg-gray-400 w-screen flex'>
                {
                    bitsArray.map((item,index)=>(
                        <div key={index} className='h-full w-14 border-r  border-black flex justify-center items-center'>
                            <input id={`bitId${index}`} type={"text"} onChange={(e)=>handleBitChange(e,index)} className='w-full h-full bg-transparent text-center'  value={item} />
                        </div>
                    ))
                }
            </div>
            <div className='bg-gray-600 w-11/12 p-5 mt-10 rounded-xl text-white'>
                <p>KEYS</p>
                <p>{'R -> move right'}</p>
                <p>{'L -> move left'}</p>
                <p>{'A -> add new bit'}</p>
                <p>{'D -> remove current bit'}</p>
                <p>{'/ -> end bit'}</p>
            </div>
        </div>
    );
}

export default InitialPage;