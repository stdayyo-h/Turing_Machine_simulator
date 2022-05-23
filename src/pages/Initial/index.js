import React, { useEffect, useRef, useState } from 'react';
import compile from '../../compiler';
import Stimulator from '../../components/Simulator';

function InitialPage(props) {

    const [code,setCode] = useState('');

    
    return (
        <div className='flex h-screen w-screen flex-col items-center justify-center bg-white'>
            <Stimulator />
            <form onSubmit={()=>compile(code)} className='bg-gray-600 w-11/12 mt-10 rounded-xl text-white'>
                <textarea onChange={(e)=>setCode(e.target.value)} placeholder='Enter the code here' className='p-5 w-full bg-transparent' />
            </form>
            <button className='mt-3 bg-gray-600 p-2 px-5 text-white rounded-xl' onClick={()=>compile(code)}>Run</button>
        </div>
    );
}

export default InitialPage;
