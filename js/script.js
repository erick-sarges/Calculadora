const previuosOperationText = document.querySelector("#calc-previous-operation");
const currentOperationText = document.querySelector("#calc-current-operation");
const buttons = document.querySelectorAll("#buttons-conteiner button");

class Calculator {
    constructor(previuosOperationText, currentOperationText){
        this.previuosOperationText = previuosOperationText
        this.currentOperationText =currentOperationText
        this.currentOperation = ""

    };
     
    // add digit to calculator screem
    addDigit(digit){
    // check if current operation already has a dot
        if(digit === "." && this.currentOperationText.innerText.includes(".")){
            return;
        }

        this.currentOperation = digit;
        this.updateScreen()
    };

    // Process all calcalutor operations
    processOperation(operation){
    //Check if current if empty
    if(this.currentOperationText.innerText === "" && operation !== "C"){
         // Change operation
        if(this.previuosOperationText.innerText !== ""){
           this.changeOperation(operation);
        }
        return;
    }



    // Get current and previous value
    let operationValue;
    const previous = +this.previuosOperationText.innerText.split(" ")[0];
    const current = +this.currentOperationText.innerText;

    switch(operation){

        case "+":
            operationValue = previous + current;
            this.updateScreen(operationValue,operation,current,previous);
            break;
        case "-":
            operationValue = previous - current;
            this.updateScreen(operationValue,operation,current,previous);
            break;
         case "/":
            operationValue = previous / current;
            this.updateScreen(operationValue,operation,current,previous);
            break;
         case "*":
            operationValue = previous * current;
            this.updateScreen(operationValue,operation,current,previous);
            break;
        case "DEL":
            this.processDelOperator();
             break;
        case "CE":
            this.processClearCurrentOperation();
            break;
        case "C":
            this.processClearAllOpearion();
            break;
        case "=":
            this.processEqualOperator();
            break;

        

        default:
            return;
        
    }

    };


    // Change values of the calculator screen
    updateScreen(operationValue = null, operation = null, current = null, previous = null)
    {
        // console.log(operationValue,operation,current,previous);

        if(operationValue === null){this.currentOperationText.innerText += this.currentOperation;
        }else{
            // Check if value is zero, if it is just add current value
            if(previous === 0){
                operationValue = current
            }
            // Add current value to previous 
            this.previuosOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }
    }


    // Change math operation
    changeOperation(operation){

        const mathOperation = ["*","/","+","-"];
        if(!mathOperation.includes(operation)){
            return;
        }

        this.previuosOperationText.innerText = this.previuosOperationText.innerText.slice(0, -1) + operation;
    }

    // Delete the last digit
    processDelOperator(){
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1)
    };

    // Clear current operation
    processClearCurrentOperation(){
        this.currentOperationText.innerText = "";


    }

    // Clear all opeartion
    processClearAllOpearion(){
    this.currentOperationText.innerText = "";
    this.previuosOperationText.innerText = "";

    }
    // Process an operation
    processEqualOperator(){
        const operation = previuosOperationText.innerText.split(" ")[1]
        this.processOperation(operation)
    }
};

const calc = new Calculator(previuosOperationText, currentOperationText);

buttons.forEach((btn)=>{

    btn.addEventListener('click', (e)=>{
        const value = e.target.innerText;

        if(+value >= 0 || value === "."){
           calc.addDigit(value);
        }else{
            calc.processOperation(value);
        }
    });
});

window.addEventListener("keydown", (e) => {
    const value = e.key

    if(+value >= 0 || value === ".") {
        calc.addDigit(value)
    } else {
        calc.processOperation(value)
    }

    if(value == "Enter") {
        calc.processOperation("=")
        calc.processEqualOperator()
    }
});
