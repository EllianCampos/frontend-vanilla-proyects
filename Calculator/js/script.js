const screen = document.getElementById('screen')
const secundaryScreen = document.getElementById('secundaryScreen')
const btn_singChange = document.getElementById('btn_singChange')
const btn_root = document.getElementById('btn_root')
const btn_exponent = document.getElementById('btn_exponent')
const btn_percentaje = document.getElementById('btn_percentaje')
const btn_clear = document.getElementById('btn_clear')
const btn_seven = document.getElementById('btn_seven')
const btn_eight = document.getElementById('btn_eight')
const btn_nine = document.getElementById('btn_nine')
const btn_division = document.getElementById('btn_division')
const btn_backspace = document.getElementById('btn_backspace')
const btn_four = document.getElementById('btn_four')
const btn_five = document.getElementById('btn_five')
const btn_six = document.getElementById('btn_six')
const btn_multiplication = document.getElementById('btn_multiplication')
const btn_equality = document.getElementById('btn_equality')
const btn_one = document.getElementById('btn_one')
const btn_two = document.getElementById('btn_two')
const btn_three = document.getElementById('btn_three')
const btn_subtract = document.getElementById('btn_subtract')
const btn_dot = document.getElementById('btn_dot')
const btn_zero = document.getElementById('btn_zero')
const btn_tripleZero = document.getElementById('btn_tripleZero')
const btn_add = document.getElementById('btn_add')

// Evitar que se recargue la pagina
const form = document.getElementById('form')
form.addEventListener('click', (e) => {
    e.preventDefault()
})

const themeSwitcher = document.querySelector('.themeSwitcher').querySelector('img')
themeSwitcher.addEventListener('click', () => {
    const body = document.querySelector('body')
    if (themeSwitcher.src.match('light_mode')) {
        themeSwitcher.src = 'assets/icons/dark_mode.svg'
        body.classList.add('darkMode')
    }else{
        themeSwitcher.src = 'assets/icons/light_mode.svg'
        body.classList.remove('darkMode')
    }
})

btn_one.addEventListener('click', () => {
    screen.value += 1;
})

btn_two.addEventListener('click', () => {
    screen.value += 2
})

btn_three.addEventListener('click', () => {
    screen.value += 3
})

btn_four.addEventListener('click', () => {
    screen.value += 4
})

btn_five.addEventListener('click', () => {
    screen.value += 5
})

btn_six.addEventListener('click', () => {
    screen.value += 6
})

btn_seven.addEventListener('click', () => {
    screen.value += 7
})

btn_eight.addEventListener('click', () => {
    screen.value += 8
})

btn_nine.addEventListener('click', () => {
    screen.value += 9
})

btn_zero.addEventListener('click', () => {
    screen.value += 0
})

btn_tripleZero.addEventListener('click', () => {
    screen.value += 0
    screen.value += 0
    screen.value += 0
})

btn_clear.addEventListener('click', () => {
    clear()
})

btn_backspace.addEventListener('click', () => {
    backspace()
})

btn_singChange.addEventListener('click', () => {
    screen.value *= -1
})

btn_root.addEventListener('click', () => {
    screen.value = Math.sqrt(screen.value)
})

btn_exponent.addEventListener('click', () => {
    screen.value = Math.pow(screen.value, 2)
})

btn_percentaje.addEventListener('click', () => {
    percentaje()
})

btn_add.addEventListener('click', () => {
    calculate('add')
})

btn_subtract.addEventListener('click', () => {
    calculate('substract')
})

btn_multiplication.addEventListener('click', () => {
    calculate('multiplication')
})

btn_division.addEventListener('click', () => {
    calculate('division')
})

btn_equality.addEventListener('click', () => {
    equals()
})

const body = document.querySelector('body')
body.addEventListener('keyup', (e) => {  
    switch (e.key) {
        case '0': screen.value += 0; break
        case '1': screen.value += 1; break
        case '2': screen.value += 2; break
        case '3': screen.value += 3; break
        case '4': screen.value += 4; break
        case '5': screen.value += 5; break
        case '6': screen.value += 6; break
        case '7': screen.value += 7; break
        case '8': screen.value += 8; break
        case '9': screen.value += 9; break 
        case 'Backspace': backspace(); break 
        case 'Enter': equals(); break
        case 'Escape': clear(); break
        case 'c': clear(); break          
        // case '+': calculate(add); break 
        // case '-': calculate(substract); break
        default:
            break;
    } 
    
    // if (e.key.add) console.log('mas')

    // if (e.key == '-') console.log('menos')


    // console.log(e.key)
})










