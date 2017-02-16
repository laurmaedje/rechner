const electron = require('electron')
const {remote} = electron

document.getElementById('input').realtext = ''

// All Buttons
buttons = document.querySelectorAll('th')
for (i = 0; i < buttons.length; i++) {
    button = buttons[i]
    prepareButton(button, button.attributes['func'].value)
}

// Button Callbacks
function prepareButton(button, func) {
    button.addEventListener('click', () => {       
        if (func[0] != '_') {
            writeText(func)
        } else {
            performOperation(func)
        }
    })
}

// Key Callbacks
window.addEventListener('keydown', (event) => {
    key = event.key

    switch(key) {
        case 'Backspace':
            performOperation('_backspace')
            break
        case 'Enter':
            performOperation('_calc')
            break
        default:
            if (key.length === 1 && key.match(/^[,a-z0-9\*/\)\(+=.-]+$/i)) {
                writeText(key)
            }
            if (event.keyCode == 220) {
                writeText('^')
            }
            break
    }
})

// Operation 
function performOperation(func) {
    input = document.getElementById('input')
    output =  document.getElementById('output')
    switch(func) {
        case '_delete':
            input.textContent = ''
            output.textContent = '0'
            break
        case '_backspace':
            input.textContent = input.textContent.trim()                                 
            input.textContent = input.textContent.slice(0,-1)                            
            break
        case '_inv':
            console.log('inverse buttons')        
            break
        case '_parens':
            input.textContent = '(' + input.textContent + ')'
            break
        case '_calc':
            output.textContent = calc(input.textContent)
            break
    }

    try_calc(input.textContent)
}

// Key
function writeText(str) {
    input = document.getElementById('input')    

    if (str.match(/[A-Z]/)) {
        str = str.toLowerCase()
    }

    str = str.replace('*', ' × ')
    str = str.replace('/', ' ÷ ')
    str = str.replace('+', ' + ')
    str = str.replace('-', ' - ')
    str = str.replace(',', '.')
    
    input.textContent += str

    input.textContent = input.textContent.replace('pi', 'π')

    try_calc(input.textContent)    
}

function try_calc(str) {
    intermediate_result = calc(str)
    if (intermediate_result != 'Error') {
        output.textContent = intermediate_result
    }
}

// Calculate
function calc(str) {
    str = str.replace(/×/g, '*')
    str = str.replace(/÷/g, '/')
    str = str.replace(/π/g, 'pi')

    result = remote.getGlobal('evaluate')(str);
    if (result == null) {
        return 'Error'
    } else {
        return result.toString()
    }
}