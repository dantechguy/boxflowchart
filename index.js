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
}

g.data[[0,0]] = 'hey!!'

function dataHasCoords(coords) {
    return g.data.hasOwnProperty(coords)
}

render()