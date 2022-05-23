import check_line_syntax from "./check_line_syntax";

const compile =async (code)=>{
    const code_lines_array = code.split(';');
    const total_code_lines = code_lines_array.length;
    console.log(code_lines_array,total_code_lines)

    code_lines_array.every(async(line,line_number) => {

        const response =await  check_line_syntax(line,line_number);
        console.log(response,line_number)
        if (response.status==="valid"){

        }else{
            // stop compiling and display the details of error occured 
        }
    });
}

export default compile