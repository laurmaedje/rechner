const electron = require('electron')
const { remote } = electron

let input = document.getElementById('input')    
let output = document.getElementById('output')    
let tokens = []

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
            tokens.push(func)
        } else {
            performOperation(func)
        }
        setText()
        calc(false)
    })
}

// Key Callbacks
window.addEventListener('keydown', (event) => {
    key = event.key

    switch (key) {
        case 'Backspace':
            performOperation('_backspace')
            break
        case 'Enter':
            performOperation('_calc')
            break
        default:
            if (key.length === 1 && key.match(/^[,sctlr0-9\*/\)\(+=.-]+$/i)) {
                text = key.replace('s', 'sin(').replace('c', 'cos(').replace('t', 'tan(')
                          .replace('l', 'ln(').replace('r', 'sqrt(')

                tokens.push(text)
            }
            if (event.keyCode == 220) {
                tokens.push('^')
            }
    }

    setText()
    calc(false)
})

// Operation 
function performOperation(func) {
    switch (func) {
        case '_delete':
            tokens = []
            output.textContent = '0'
            break
        case '_backspace':
            tokens.pop()
            break
        case '_parens':
            tokens = (['('].concat(tokens)).concat([')'])
            break
        case '_calc':
            calc(true)
            break
    }
}

function setText() {
    str = ""
    for (token of tokens) {
        tokstr = token.replace('pi', 'π').replace('*', ' × ').replace('/', ' ÷ ')
            .replace('+', ' + ').replace('-', ' - ')
        str += tokstr
    }

    input.textContent = str
}

function calc(writeError) {
    str = ""
    for (token of tokens) {
        str += token
    }

    result = remote.getGlobal('evaluate')(str);
    if (result == null && writeError) {
        output.textContent = 'Error'
    } else {
        output.textContent = result.toString()
    }
}