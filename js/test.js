//  Setting Game Name

let gameName = "Guess The Word";
document.title = gameName ; 

document.querySelector("h1").innerHTML = gameName;
document.querySelector("footer").innerHTML = `${gameName} Game created by Ahmed Alsaid`

// Setting Game option

let numberOfTries = 6 ;
let numberOFLetters = 6 ;

let currentTry = 1;
let numberOfHints = 2;


// Manage Words
let wordToGuess = "";
const words = ["Create","Update","Delete","Master","Branch","Mainly","Elzero","School"];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();

let messageArea = document.querySelector(`.message`)

// manage hints 
document.querySelector(`.hint span`).innerHTML = numberOfHints;
const hintBtn = document.querySelector(`.hint`);
hintBtn.addEventListener("click",hintAction)

function generateInputs()
{
    const inputContainer = document.querySelector(".inputs") ;
    
    // create tries div
    for(let i = 1 ; i <= numberOfTries ; i++)
    {
       const tryDiv =  document.createElement("div");
       tryDiv.classList.add(`try-${i}`);
       tryDiv.innerHTML = `<span>Try ${i}<span>`;
    //    tryDiv.classList.add("form","form-control") // 

       if(i != 1)  tryDiv.classList.add("hidden") ;

    //    create inputs
        for(let j = 1 ; j <= numberOFLetters; j++)
        {
           const input =  document.createElement("input") ;
           input.type = "text";
           input.id = `try${i}-letter${j}`;
           input.setAttribute("maxlength","1");
           tryDiv.appendChild(input);
        }

       inputContainer.appendChild(tryDiv);
        
    }
    inputContainer.children[0].children[1].focus();
    //   Disable inputs except first
    const inputsInDisabledDiv = document.querySelectorAll(".hidden input");
    inputsInDisabledDiv.forEach((input)=>input.disabled= true)

    //navigation

    const inputs = document.querySelectorAll("input")
    // to Upper Case
    inputs.forEach(function(input,index){
        input.addEventListener("input",function(){
            this.value = this.value.toUpperCase();
            const nextInput = inputs[index + 1];
            if(nextInput) nextInput.focus();
          
        });


        input.addEventListener("keydown", function(event){
                const currentIndex = Array.from(inputs).indexOf(this);
                if(event.key === "ArrowRight")
                {
                    const nextInput = currentIndex + 1 ;
                
                if(nextInput < inputs.length) inputs[nextInput].focus();
                }
                if(event.key === "ArrowLeft")
                {
                    const PrevInput = currentIndex - 1 ;
                
                if(PrevInput >= 0) inputs[PrevInput].focus();
                }
        })

    });
}


const checkBtn = document.querySelector(".check") ; 
checkBtn.addEventListener("click", handleChecks)

console.log(wordToGuess)
function handleChecks()
{
    let successGuess = true;
    
    for(let i = 1 ; i <= numberOFLetters; i++)
    {
        const inputField = document.querySelector(`#try${currentTry}-letter${i}`)
        const letter = inputField.value.toLowerCase();
        console.log(letter)
        const actualLetter = wordToGuess[i - 1];

        // Game Logic
        if(letter === actualLetter)
        {
            inputField.classList.add("in-place");
        }
        else if(wordToGuess.includes(letter)&& letter !== "")
        {
            inputField.classList.add("not-in-place");
            successGuess = false ;
        }
        else{
            inputField.classList.add("no");
            successGuess = false ;
        };
    }

    // check if user win or lose
    if(successGuess){
        messageArea.innerHTML = `You Win The Word is <span>${wordToGuess}</span>`


        let alltries = document.querySelectorAll(`.inputs > div`);
        alltries.forEach((tryDiv) => tryDiv.classList.add("hidden")) 
        checkBtn.disabled = true;
        hintBtn.disabled = true;
    }
    else{
            document.querySelector(`.try-${currentTry}`).classList.add("hidden")
            const currentTryinputs = document.querySelectorAll(`.try-${currentTry} input`);
            currentTryinputs.forEach((input) => input.disabled = true ) 

            currentTry++;
            
            const nextTryinputs = document.querySelectorAll(`.try-${currentTry} input`);
            nextTryinputs.forEach(function(input){
                input.disabled = false;
            }) 
               
            let el =document.querySelector(`.try-${currentTry}`);
            if(el)
            {
                document.querySelector(`.try-${currentTry}`).classList.remove("hidden")
                el.children[1].focus();
            }
            else
            {
                checkBtn.disabled = true;
                hintBtn.disabled = true;
                messageArea.innerHTML = `You lose the word is <span>${wordToGuess}</span>`
            }

    }
}

function hintAction()
{
    if(numberOfHints > 0)
    {
        numberOfHints--;
        document.querySelector(`.hint span`).innerHTML = numberOfHints;
    }
    if(numberOfHints === 0)
    {
        hintBtn.disabled =true;
    }

    const enabledInputs = document.querySelectorAll(`input:not([disabled])`)
    const emptyEnabledInputs = Array.from(enabledInputs).filter((input)=> input.value ==="");
 

    if(emptyEnabledInputs.length > 0){
        const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
        const randomInput = emptyEnabledInputs[randomIndex] ;
        const indexToFill = Array.from(enabledInputs).indexOf(randomInput);
        if(indexToFill !== -1)
        {
            randomInput.value = wordToGuess[indexToFill].toUpperCase();
        }
    }

}
function handleBackSpace(event)
{
    if(event.key === "Backspace")
    {
        const inputs = document.querySelectorAll(`input:not([disabled])`);
        const currentIndex = Array.from(inputs).indexOf(document.activeElement)
        if(currentIndex > 0)
        {
            const currentInput = inputs[currentIndex];
            const prevInput = inputs[currentIndex - 1];
            currentInput.value = "";
            prevInput.value = "";
            prevInput.focus();
        }

    }
}
document.addEventListener("keydown",handleBackSpace)

window.onload = function(){
    generateInputs();
}   