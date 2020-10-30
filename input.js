let drag = {
    boxFocus: false,
    mouse: {
        down: false,
        moving: false,
        prev: {
            x: 0,
            y: 0,
        },
        start: {
            x: 0,
            y: 0,
        }
    },
    start: {
        x: 0,
        y: 0,
    }
}

function inputText(e) {
    let textArea = e.target
    if (textArea.value === '')
        delete g.data[[textArea.parentNode.x, textArea.parentNode.y]]
    else
        g.data[[textArea.parentNode.x, textArea.parentNode.y]] = textArea.value
}

function boxFocus(e) {
    if (drag.mouse.moving) {
        e.target.blur()
    } else {
        drag.boxFocus = true
    }
}

function boxBlur(e) {
    drag.boxFocus = false
    // e.target.selectionStart = e.target.selectionEnd
    render()
}

tableContainer.addEventListener('mousedown', e => {
    updateMouseMoving(e)
    if (drag.mouse.moving)
        e.preventDefault()
    drag.mouse.down = true
    drag.mouse.start.x = e.pageX
    drag.mouse.start.y = e.pageY
    drag.start.x = g.x
    drag.start.y = g.y
})

tableContainer.addEventListener('mousemove', e => {
    // e.preventDefault()
    if (drag.mouse.down && !drag.boxFocus) {
        g.x = drag.start.x + (e.pageX-drag.mouse.start.x)
        g.y = drag.start.y + (e.pageY-drag.mouse.start.y)
        render()
    }
    updateMouseMoving(e)
})

function updateMouseMoving(e) {
    drag.mouse.moving = e.pageX !== drag.mouse.prev.x || e.pageY !== drag.mouse.prev.y
    drag.mouse.prev.x = e.pageX
    drag.mouse.prev.y = e.pageY
}


table.addEventListener('mouseup', e => {
    e.preventDefault()
    drag.mouse.down = false
})