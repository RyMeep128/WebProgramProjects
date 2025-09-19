


window.onload = () => {
    

    document.getElementById("parse-button").onclick = parse;
};

const parse = () =>{
    let errorDiv = document.getElementById("error")
        errorDiv.innerHTML = "";
    try{
        
        let userInput = document.getElementById("user-input").value;
        let userInputObject = JSON.parse(userInput);
        console.log(userInputObject)
    
        document.getElementById("text-wall").style.color = userInputObject.color;
    }catch (error){
        let errorDiv = document.getElementById("error")
        errorDiv.innerHTML = error;
    }
}


