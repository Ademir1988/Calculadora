const previousOperationText = document.querySelector('#previous-operation')
const currentOperationText = document.querySelector('#current-operation')
const buttons = document.querySelectorAll('#buttons-container button')

class Calculator{
    constructor(previousOperationText, currentOperationText){
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ''
    }
    // adicionar tela de cálculo de dígitos
    addDigit(digit) {
        // verifique se a operação atual já tem um ponto
        if(digit === '.' && this.currentOperationText.innerText.includes('.')){
            return
        }
        this.currentOperation = digit
        this.updateScreem()
    }

    // processar todas as operações da calculadora

    processOperation(operation){
        console.log(operation)
    //verifique se a operação atual está vazio
    if(this.currentOperationText.innerText === "" && operation !== "C"){
        // change operation
        if(this.previousOperationText.innerText !== ""){
            this.changeOperation(operation)
        }
        return
    }

    //Obter valor atual e anterior
    let operationValue
    const previus = +this.previousOperationText.innerText.split(" ")[0]
    const current = +this.currentOperationText.innerText
    
    switch(operation){
        case '+':
            operationValue = previus + current
            this.updateScreem(operationValue, operation, current, previus)
        break

        case '-':
            operationValue = previus - current
            this.updateScreem(operationValue, operation, current, previus)
        break

        case '/':
            operationValue = previus / current
            this.updateScreem(operationValue, operation, current, previus)
        break

        case '*':
            operationValue = previus * current
            this.updateScreem(operationValue, operation, current, previus)
        break

        case 'DEL':
            this.processDelOperator()            
        break

        case 'CE':
            this.processClearCurrentOperation()            
        break

        case 'C':
            this.processClearOperation()            
        break

        case '=':
            this.processEqualOperator()            
        break

        default:
        return
    }    


    }

    //Alterar valores da tela da calculadora
    updateScreem(operationValue = null, operation = null, current = null, previus = null){
        
        console.log(operationValue, operation, current, previus )

        if(operationValue === null){
            this.currentOperationText.innerText += this.currentOperation
        }else{
            //Verifique se o valor é zero, se é apenas o valor atual
            if(previus === 0){
                operationValue = current
            }
            //Adicionar valor atual ao anterior

            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = ''
        }
    }

    //trocar operação matemática
    changeOperation(operation){

        const matchOperation = ['*', '/', '+', '-']

        if(!matchOperation.includes(operation)){
           return 
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation
    }
    // Deleta o último digito
    processDelOperator(){
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0,-1)
    }
    // Limpar operação atual
    processClearCurrentOperation(){
        this.currentOperationText.innerText = ""
    }
    //Limpar todas as operações
    processClearOperation(){
        this.currentOperationText.innerText = ""
        this.previousOperationText.innerText = "" 
    }
    //Verifica uma operação
    processEqualOperator(){
        const operation = previousOperationText.innerText.split(" ")[1]

        this.processOperation(operation)

    }

}

const calc = new Calculator(previousOperationText, currentOperationText)

buttons.forEach((btn)=>{
    btn.addEventListener('click', (e)=>{
        const value = e.target.innerText
        
        if(+value >=0 || value ==='.'){
            calc.addDigit(value)
        }else{
            calc.processOperation(value)
        }
    })
})