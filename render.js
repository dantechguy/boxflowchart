let boxes = []
let table = document.getElementById('table')
let tableContainer = document.getElementById('table-container')


function render(forceContentUpdate = false) {
    requestAnimationFrame(() => {
        createBoxes()
        updateBoxSizeVariable()
        updateTableOffset()
        tryUpdateBoxContent(forceContentUpdate)
    })
}

function tryUpdateBoxContent(forceContentUpdate = false) {
    let tableBoxX = Math.floor(g.x / boxAndGapSize()),
        tableBoxY = Math.floor(g.y / boxAndGapSize())
    if (forceContentUpdate
        || table.prevBoxX !== tableBoxX
        || table.prevBoxY !== tableBoxY)
        updateAllBoxContent()
    table.prevBoxX = tableBoxX
    table.prevBoxY = tableBoxY
}

function updateAllBoxContent() {
    boxes.forEach((boxRow, row) => {
        boxRow.forEach((box, col) => {
            box.updateContent({col: col, row: row})
        })
    })
}


function updateTableOffset() {
    let x = mod(g.x, boxAndGapSize()) - boxAndGapSize() + 'px',
        y = mod(g.y, boxAndGapSize()) - boxAndGapSize() + 'px'
    table.style.transform = `translate(${x}, ${y})`
    // table.style.left =
    // table.style.top = mod(g.y, boxAndGapSize()) - boxAndGapSize() + 'px'
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

    let neededRows = Math.ceil(g.screen.height / boxAndGapSize()) + 1
    let neededCols = Math.ceil(g.screen.width / boxAndGapSize()) + 1

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
    tableCell.updateContent = updateBoxContent
    return tableCell
}

function updateBoxContent({col, row}) {
    let x, y, textArea, text
    x = col - Math.floor(g.x / boxAndGapSize())
    y = row - Math.floor(g.y / boxAndGapSize())
    this.x = x
    this.y = y
    textArea = this.firstChild
    text = g.data[[x, y]] || ''
    textArea.value = text
    if (text === this.prevText) {}
    else if (textArea.value === '')
        textArea.classList.add('empty')
    else
        textArea.classList.remove('empty')
    this.prevText = text
}

function boxAndGapSize() {
    return c.BOX_SIZE*g.zoom*(1+c.BOX_GAP_RATIO)
}