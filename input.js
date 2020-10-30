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
    render()
}

tableContainer.addEventListener('mousedown', e => {
    drag.mouse.down = true
    drag.mouse.start.x = e.pageX
    drag.mouse.start.y = e.pageY
    drag.start.x = g.x
    drag.start.y = g.y
    updateMouseMoving(e)
})

tableContainer.addEventListener('mousemove', e => {
    if (drag.mouse.down && !drag.boxFocus) {
        e.preventDefault()
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


document.addEventListener('mousewheel', e => {
    if (!drag.boxFocus) {
        let zoomChange = getZoomChange(e)
        g.zoom *= 1+zoomChange
        shiftToFitZoom(e, zoomChange)
        render()
        console.log(g.zoom)
    }
})

function getZoomChange(e) {
    let zoomChange = c.ZOOM_AMOUNT * Math.sign(e.wheelDelta)
    let newZoom = Math.min(c.MAX_ZOOM, Math.max(c.MIN_ZOOM, g.zoom * (1+zoomChange)))
    return newZoom / g.zoom - 1
}

function shiftToFitZoom(e, zoomChange) {
    let {x, y} = getMouseCoords(e)
    let mX = x * (1+zoomChange),
        mY = y * (1+zoomChange)
    let dX = mX - x,
        dY = mY - y
    g.x -= dX
    g.y -= dY
}

function getMouseCoords(e) {
    return {
        x: e.pageX - g.x,
        y: e.pageY - g.y,
    }
}