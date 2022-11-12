const previuosOperationText = document.querySelector("#calc-previous-operation");
const currentOperationText = document.querySelector("#calc-current-operation");
const buttons = document.querySelectorAll("#buttons-conteiner button");

class Calculator {
    constructor(previuosOperationText, currentOperationText){
        this.previuosOperationText = previuosOperationText
        this.currentOperationText =currentOperationText
        this.currentOperation = ""

    };
};

const calc = new Calculator(previuosOperationText, currentOperationText);

buttons.forEach((btn)=>{

    btn.addEventListener('click', (e)=>{
        const value = e.target.innerText;

        if(+value >= 0 || value === "."){
            console.log(value)
        }else{
            console.log("Op:" + value)
        }
    });
});

