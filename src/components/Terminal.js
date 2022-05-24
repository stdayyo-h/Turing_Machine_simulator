import React, { useEffect, useState } from 'react'

const Terminal = ({ qLeftState, qRightState, cycle, history, setHistory }) => {

    useEffect(() => {
        console.log(qLeftState, qRightState)
        if (qRightState !== null || qLeftState !== null)
            setHistory((prevState) => {
                let state = [...prevState];
                state[cycle - 1] = { qLeftState, qRightState, cycle }
                return state;
            });
    }, [qRightState, qLeftState])

    console.log(history)
    return (
        <div className='bg-black w-11/12 p-5 rounded-xl text-white'>
            {history.map((item, index) => (
                item !== undefined &&
                <div className='w-full flex items-center'>
                    <p>cycle:{item?.cycle !== undefined && item.cycle}</p>
                    <p className='mr-5 ml-2 opacity-40'>||</p>
                    <p> {item?.qLeftState}</p>
                    <p>{item?.qLeftState !== null && "=="}</p>
                    <p>{item?.qRightState}</p>
                    <p>{item?.qRightState !== null && "?"}</p>
                    <p>{((item.qLeftState === null || item.qRightState === null) ? "" : ((item.qLeftState === item.qRightState)) ? "true" : "false")}</p>
                </div>
            ))}
        </div>
    )
}

export default Terminal