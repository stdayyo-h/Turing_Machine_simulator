import { keywords } from "../keywords/keywords";
import is_variable from "./is_variable";

const check_line_syntax = async(line,line_number)=>{
    const code_words_array = line.split(' ');
    let status="";
    let error_details="";
    let previous_is_keyword="false";
    let previous_is_variable="false";
    code_words_array.every((word,word_number)=>{
        console.log(word,"word")
        const is_keyword =  keywords.includes(word);
        const is_variable_response =  is_variable(word);

        if (is_keyword===true && previous_is_keyword==="false"){
            status="valid";
            previous_is_keyword="true"
        }
        else if(is_keyword===true && previous_is_keyword==="true"){
            previous_is_keyword="false";
            status="compile_error";
            error_details=`occued at line ${line_number+1} at ${word}`;
            return false;
        }
        else if (is_variable_response.status==="valid" && previous_is_variable ==="false"){
            previous_is_keyword="false";
            previous_is_variable="true"
        }
        else if (is_variable_response.status==="valid" && previous_is_variable==="true"){
            previous_is_keyword="false"
            status="compile_error";
            error_details=`occued at line ${line_number+1} at ${word}`;
            previous_is_variable="false"
            return false;
        }else{
            previous_is_keyword="false"
            status="compile_error";
            error_details=`occued at line ${line_number+1} at ${word}`;
            previous_is_variable="false"
            return false;
        }
        return true;
    });
    return {status:status,error_details:error_details}

}

export default check_line_syntax;