const is_variable = (word)=>{
    const character_array = word.split("");

    let status="";
    let error_details="";
    
    console.log(character_array,"array")
    if (character_array[0] && (character_array[0].toUpperCase() !== character_array[0].toLowerCase() || character_array[0].codePointAt(0) > 127 )){
        console.log("here if")
        status="valid";
        error_details="";
    }else{
        status="compile_error";
        error_details=`invalid variable ${word}`;
    }

    return {status:status,error_details:error_details}

}

export default is_variable