window.onload = () => {
    document.getElementById("parse-button").onclick = parse;
    document.getElementById("shuffle-button").onclick = shuffle;
};

const parse = () =>{
    let errorDiv = document.getElementById("error")
    errorDiv.innerHTML = "";
    
    try{
        
        let userInput = document.getElementById("user-input").value;
        let userInputObject = JSON.parse(userInput);
        console.log(userInputObject)
        
        if(userInputObject.color){
            document.getElementById("header").style.color = userInputObject.color;
        }
        if(userInputObject.backgroundColor){
            document.getElementById("header").style.backgroundColor = userInputObject.backgroundColor;
        }
        if(userInputObject.link && userInputObject.link.href && userInputObject.link.displayText){
            document.getElementById("external-link").href = userInputObject.link.href;
            document.getElementById("external-link-text").innerHTML = userInputObject.link.displayText;
        }


    }catch (error){
        let errorDiv = document.getElementById("error")
        errorDiv.innerHTML = error;
    }
}

const shuffle = () =>{
    const rnd = Math.floor(Math.random() * 91) + 5; 
    document.documentElement.style.setProperty("--split", rnd);

}



