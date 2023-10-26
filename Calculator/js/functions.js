// VARIABLES GLOBALES
let fisrt, second, results
let iteration = 1
let op

const calculate = (operation) =>{
    op = operation
    if (screen.value != ''){
        if (iteration == 2){
            second = screen.value

            switch (operation) {
                case 'add': results = parseInt(fisrt) + parseInt(second); break;        
                case 'substract': results = fisrt - second; break;        
                case 'multiplication': results = fisrt * second; break;        
                case 'division': results = fisrt / second; break;        
                default: alert('error 98'); break;
            }

            screen.value = results
            secundaryScreen.value = ''
            iteration = 1

        }else if (iteration == 1){
            fisrt = screen.value
            second = 0
            screen.value = ''
            secundaryScreen.value = ''

            switch (operation) {
                case 'add': secundaryScreen.value = fisrt + ' + '; break;        
                case 'substract': secundaryScreen.value = fisrt + ' - '; break;        
                case 'multiplication': secundaryScreen.value = fisrt + ' * '; break;        
                case 'division': secundaryScreen.value = fisrt + ' / '; break;        
                default: alert('error 99'); break;
            } 

            iteration = 2
        }
    }       
}

const equals = () => {
    if (screen.value != ''){
        second = screen.value

        switch (op) {
            case 'add': 
                results = parseInt(fisrt) + parseInt(second)
                secundaryScreen.value = fisrt + ' + ' + second + ' = '
                break;        

            case 'substract':    
                results = fisrt - second
                secundaryScreen.value = fisrt + ' - ' + second + ' = '
                break;    

            case 'multiplication':  
                results = fisrt * second
                secundaryScreen.value = fisrt + ' * ' + second + ' = '
                break;  

            case 'division': 
                results = fisrt / second
                secundaryScreen.value = fisrt + ' / ' + second + ' = '
                break;       

            default: alert('error 99'); break;
        }

        screen.value = results
        iteration = 1
    }
}

const backspace = () => {
    let number = screen.value.toString()
    screen.value = number.slice(0,number.length-1)   
}

const percentaje = () => {
    // alert('percentaje')

    if (screen.value != '' && secundaryScreen.value == '') {
        // En caso de ingrese primero un porcentaje
        screen.value /= 100
    }else if(screen.value != ''){
        second = screen.value
        results = (second / 100) * fisrt

        switch (op) {
            case 'add': 
                results += parseInt(results) + parseInt(fisrt)
                secundaryScreen.value = fisrt + ' + ' + second + '% ='
                break;        

            case 'substract':    
                results = fisrt - results
                secundaryScreen.value = fisrt + ' - ' + second + '% ='
                break;    

            case 'multiplication':  
                secundaryScreen.value = fisrt + ' * ' + second + '% ='
                break;  

            case 'division': 
                break;       

            default: alert('error 99'); break;
        }
        screen.value = results
    }


}

const clear = () => {
    screen.value = ''
    secundaryScreen.value = ''
    fisrt = 0
    second = 0 
    results = 0
    iteration = 1
}

