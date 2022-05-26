import { moveLeft, moveRight } from "../components/simulator/simulator_functions";

export const move_to_left =(currentBitIndex,setCurrentStateShow,setCurrentBitIndex,local_currentBitIndex,bitsArray,local_bitsArray,local_searchingForBit)=>{
    return new Promise((resolve,reject)=>{
        setCurrentStateShow(`qSearching ${local_searchingForBit}`);
        var move_left_interval =setInterval(()=>{
            moveLeft(currentBitIndex,setCurrentBitIndex);
            local_currentBitIndex-=1;
            if (local_bitsArray[local_currentBitIndex]==="")
            {
                clearInterval(move_left_interval)
                setTimeout(()=>{
                    moveRight(local_bitsArray,currentBitIndex,setCurrentBitIndex)
                    local_currentBitIndex+=1;
                    resolve(local_currentBitIndex)
                },1000);
            }
        },1000);
    })
}
export const move_to_right =(currentBitIndex,setCurrentStateShow,setCurrentBitIndex,local_currentBitIndex,bitsArray,local_bitsArray,local_searchingForBit)=>{
    return new Promise((resolve,reject)=>{
        setCurrentStateShow(`qSearching ${local_searchingForBit}`);
        var move_left_interval =setInterval(()=>{
            
            moveRight(local_bitsArray,currentBitIndex,setCurrentBitIndex);
            local_currentBitIndex+=1;
            if (local_bitsArray[local_currentBitIndex]==="")
            {
                clearInterval(move_left_interval)
                setTimeout(()=>{
                    moveLeft(currentBitIndex,setCurrentBitIndex);
                    local_currentBitIndex-=1;
                    resolve(local_currentBitIndex)
                },1000);
            }
        },1000);
    })
}

export const mark_left_bit =(setQLeftState,local_currentBitIndex,bitsArray,local_bitsArray,setCurrentStateShow,setBitsArray)=>{
    return new Promise((resolve,reject)=>{
        setCurrentStateShow(bitsArray[local_currentBitIndex]==='1'?"qStore 1":'qStore 0');
        setQLeftState(bitsArray[local_currentBitIndex]);
        setBitsArray((prev) => {
            let state = [...prev];
            state[local_currentBitIndex] = "";
            return state;
          });
        let state = [...local_bitsArray];
        state[local_currentBitIndex] = "";
        local_bitsArray=state;
        setTimeout(()=>{
            resolve({local_bitsArray:local_bitsArray,bit_index:local_currentBitIndex,state:bitsArray[local_currentBitIndex]});
        },1000)
    })
}
export const mark_right_bit =(setQRightState,local_currentBitIndex,bitsArray,local_bitsArray,setCurrentStateShow,setBitsArray)=>{
    return new Promise((resolve,reject)=>{
        setCurrentStateShow(bitsArray[local_currentBitIndex]==='1'?"qStore 1":'qStore 0');
        setQRightState(bitsArray[local_currentBitIndex]);
        setBitsArray((prev) => {
            let state = [...prev];
            state[local_currentBitIndex] = "";
            return state;
          });
        let state = [...local_bitsArray];
        state[local_currentBitIndex] = "";
        local_bitsArray=state;
        setTimeout(()=>{
            resolve({local_bitsArray:local_bitsArray,bit_index:local_currentBitIndex,state:bitsArray[local_currentBitIndex]});
        },1000)
    })
}