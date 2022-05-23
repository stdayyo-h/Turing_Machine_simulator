import { createContext, useState } from "react";

export const BitStateContext = createContext();

export const BitStateContextProvider = (props)=>{
    const [q1State,setQ1State] = useState();
    const [q2State,setQ2State] = useState();

    return (
        <BitStateContext.Provider
            value={{
                q1:[q1State,setQ1State],
                q2:[q2State,setQ2State]
            }}
        >
            {props.children}
        </BitStateContext.Provider>
    )
}