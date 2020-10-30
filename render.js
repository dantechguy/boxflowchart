let boxes = []
let table = document.getElementById('table')
let tableContainer = document.getElementById('table-container')


function render() {
    createBoxes()
    updateBoxSizeVariable()
    updateTableOffset()
    updateBoxContent()
}

function updateBoxContent() {
    let x, y, textArea
    boxes.forEach((boxRow, row) => {
        boxRow.forEach((box, col) => {
            x = col - Math.floor(g.x / boxAndGapSize())
            y = row - Math.floor(g.y / boxAndGapSize())
            box.x = x
            box.y = y
            textArea = box.firstChild
            if (dataHasCoords([x, y])) {
                textArea.value = g.data[[x, y]]
                textArea.classList.remove('empty')
            } else {
                textArea.value = ''
                textArea.classList.add('empty')
            }
        })
    })
}




function updateTableOffset() {
    table.style.left = mod(g.x, boxAndGapSize()) - boxAndGapSize() + 'px'
    table.style.top = mod(g.y, boxAndGapSize()) - boxAndGapSize() + 'px'
}

function mod(n, m) {
    return ((n % m) + m) % m;
}



function updateBoxSizeVariable() {
    document.body.style.setProperty('--box-size', c.BOX_SIZE*g.zoom + 'px')
    document.body.style.setProperty('--box-gap', c.BOX_GAP_RATIO*c.BOX_SIZE*g.zoom + 'px')
}




function createBoxes() {
    let currentRows = boxes.length
    let currentCols = boxes.length ? boxes[0].length : 0

    let neededRows = Math.ceil(screenSize().height / boxAndGapSize()) + 1
    let neededCols = Math.ceil(screenSize().width / boxAndGapSize()) + 1

    let changeInRows = neededRows - currentRows
    let changeInCols = neededCols - currentCols

    for (let i=0; i<changeInRows; i++) {
        createBoxRow()
    }
    for (let i=0; i<-changeInRows; i++) {
        deleteBoxRow()
    }
    for (let i=0; i<changeInCols; i++) {
        createBoxCol()
    }
    for (let i=0; i<-changeInCols; i++) {
        deleteBoxCol()
    }
}

function deleteBoxRow() {
    boxes.pop()
    table.removeChild(table.lastChild)
}

function createBoxRow() {
    boxes.push([])
    let cols = boxes.length ? boxes[0].length : 0,
        tableRow = document.createElement('tr'),
        tableCell
    for (let i=0; i<cols; i++) {
        tableCell = createTableCell()
        boxes[boxes.length-1].push(tableCell)
        tableRow.appendChild(tableCell)
    }
    table.appendChild(tableRow)
}

function deleteBoxCol() {
    let rows = boxes.length
    boxes.forEach((row, i) => {
        row.pop()
        table.children[i].removeChild(table.children[i].lastChild)
    })
}

function createBoxCol() {
    let rows = boxes.length,
        tableCell
    boxes.forEach((row, i) => {
        tableCell = createTableCell()
        row.push(tableCell)
        table.children[i].appendChild(tableCell)
    })
}

function createTableCell() {
    let tableCell = document.createElement('td')
    let textArea = document.createElement('textarea')
    textArea.classList.add('box')
    textArea.oninput = inputText
    textArea.onfocus = boxFocus
    textArea.onblur = boxBlur
    tableCell.appendChild(textArea)
    return tableCell
}

function screenSize() {
    return {
        width: tableContainer.offsetWidth,
        height: tableContainer.offsetHeight,
    }
}

function boxAndGapSize() {
    return c.BOX_SIZE*g.zoom*(1+c.BOX_GAP_RATIO)
}