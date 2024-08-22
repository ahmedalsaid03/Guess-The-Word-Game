let gameName = "Gamela Ahmed";
document.querySelector("h1").innerHTML = gameName;
document.title = gameName;
let dateNow = new Date().getFullYear();
document.querySelector("footer").innerHTML = `&copy; ${dateNow}  This game is gift to my princess Gamela`


// General variables
let numbersOfTries = 7;
let numbersOfLetters = 6;
let numberOfHints = 2;
let currentTry = 1;
let wordToGuess = "";
const words = ["Gamela","Alsaid","Delete","Button","	Desert","Coffee","	Circle","School"];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();

// Holded From Html 
const checkBtn = document.querySelector(".check");
const hintBtn = document.querySelector(".hint");
let messageArea = document.querySelector(`.message`)
document.querySelector(`.hint span`).innerHTML = numberOfHints;

// All Functions

function generateInputs() {
    let inputContainer = document.querySelector(`.inputs`);
    for (let i = 1; i <= numbersOfTries; i++) {
        const tryDiv = document.createElement("div");
        tryDiv.classList.add(`try-${i}`);
        tryDiv.innerHTML = `<span>Try ${i}</span>`;
        if (i !== currentTry) {
            tryDiv.classList.add("hidden")
        }
        for (let j = 1; j <= numbersOfLetters; j++) {
            const input = document.createElement("input");
            input.type = "text";
            input.id = `try-${i}-letter${j}`;
            input.setAttribute("maxlength", 1)
            tryDiv.appendChild(input);
        }
        inputContainer.appendChild(tryDiv);
    }
    inputContainer.children[0].children[1].focus();
    // Disable Inputs Except first
    const hiddenInputs = document.querySelectorAll(".hidden input")
    hiddenInputs.forEach((input) => input.disabled = true)

    // convert Inputs Value to UpperCase
    const allInputs = document.querySelectorAll("input")
    allInputs.forEach(function (input, index) {
        input.addEventListener("input", function () {
            this.value = this.value.toUpperCase();
            const nextInput = allInputs[index + 1];
            if (nextInput) nextInput.focus();
        })
        //  Right and Left Arrow Key
        input.addEventListener("keydown", function (event) {
            let currentIndex = Array.from(allInputs).indexOf(this);
            if (event.key === "ArrowRight") {
                ++currentIndex;
                if (currentIndex < allInputs.length) allInputs[currentIndex].focus();
            }
            if (event.key === "ArrowLeft") {
                --currentIndex;
                if (currentIndex >= 0) allInputs[currentIndex].focus();
            }

        })
    })

}
// console.log(wordToGuess)

function handleCheck(){
    let successGuess = true;
    for(let i = 1; i <= numbersOfLetters; i++)
        {
            const currentInput = document.querySelector(`#try-${currentTry}-letter${i}`);
            const userLetter = currentInput.value.toLowerCase();
            const wordToGuessLetter = wordToGuess[i - 1];
            if(userLetter === wordToGuessLetter){
                currentInput.classList.add(`in-place`);
            }
            else if(wordToGuess.includes(userLetter)&& userLetter !==""){
                currentInput.classList.add(`not-in-place`);
                successGuess = false;
            }
            else{
                currentInput.classList.add(`no`);
                successGuess = false;
            }
        } 

    if(successGuess){
        messageArea.innerHTML = `You Win The Word is <span>${wordToGuess}</span>`;
        let alltries = document.querySelectorAll(`.inputs > div`);
        alltries.forEach((tryDiv) => tryDiv.classList.add("hidden"))
        checkBtn.disabled = true;
        hintkBtn.disabled = true;
    }
    else{
        document.querySelector(`.try-${currentTry}`).classList.add("hidden");
        currentTryInputs = document.querySelectorAll(`.try-${currentTry} input`)
        currentTryInputs.forEach((input) => input.disabled = true)
        ++currentTry;
        const nextTryinputs = document.querySelectorAll(`.try-${currentTry} input`);
        nextTryinputs.forEach((input) => input.disabled = false)
        let ele = document.querySelector(`.try-${currentTry}`)
        if(ele){
            document.querySelector(`.try-${currentTry}`).classList.remove("hidden");
            ele.children[1].focus();
        }
        else{
            checkBtn.disabled = true;
            hintBtn.disabled = true;
            messageArea.innerHTML = `<p>You lose the word is <span>${wordToGuess}</span></p>`;
        }
    }
}

function hintAction()
{
    if(numberOfHints > 0) {
        numberOfHints--;
        document.querySelector(`.hint span`).innerHTML = numberOfHints;
    }
    if(numberOfHints === 0) hintBtn.disabled = true;

    const enableInputs = document.querySelectorAll(`input:not([disabled])`)
    const emptyEnabledInputs = Array.from(enableInputs).filter((input) => input.value === "");

    if(emptyEnabledInputs.length > 0){
        const randomIndex = Math.floor(Math.random() * emptyEnabledInputs.length);
        const randomInput = emptyEnabledInputs[randomIndex];
        const indexTofill = Array.from(enableInputs).indexOf(randomInput);
        if(indexTofill !== -1) randomInput.value = wordToGuess[indexTofill].toUpperCase();
    }
}

function handleBackSpace(event){
    if(event.key === "Backspace"){
        const enabledInputs = document.querySelectorAll(`input:not([disabled])`)
        const currentIndex = Array.from(enabledInputs).indexOf(document.activeElement)
        if(currentIndex > 0){
            const currentInput = enabledInputs[currentIndex];
            const prevInput = enabledInputs[currentIndex - 1];
            
            currentInput.value = "";
            prevInput.value = "";
            prevInput.focus();
        }
    }
    
}
// End Functions


checkBtn.addEventListener("click",handleCheck)
hintBtn.addEventListener("click",hintAction)
document.addEventListener("keydown",handleBackSpace)
window.onload = (generateInputs);