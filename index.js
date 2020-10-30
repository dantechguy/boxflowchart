// constants
const c = {
    BOX_SIZE: 200,
    BOX_GAP_RATIO: 0.5,
    DEFAULT_ZOOM: 1,
    MIN_ZOOM: 0.5,
    MAX_ZOOM: 5,
    ZOOM_AMOUNT: 0.1,
}

// globals
const g = {
    zoom: c.DEFAULT_ZOOM,
    x: 0,
    y: 0,
    data: {},
    arrows: {}, // TODO: implement arrows
    screen: {
        width: 0,
        height: 0,
    }
}

g.data[[1,1]] = 'Welcome!'

function updateScreenSize() {
    g.screen.width = tableContainer.offsetWidth
    g.screen.height = tableContainer.offsetHeight
}

function dataHasCoords(coords) {
    return g.data.hasOwnProperty(coords)
}

updateScreenSize()
render()
