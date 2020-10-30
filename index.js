// constants
const c = {
    BOX_START_SIZE: 200,
    BOX_MIN_SIZE: 60,
    BOX_MAX_SIZE: 1000,
    BOX_GAP_RATIO: 0.5,
    ZOOM_AMOUNT: 20,
}

// globals
const g = {
    boxSize: c.BOX_START_SIZE,
    x: 0,
    y: 0,
    data: {},
}

g.data[[0,0]] = 'hey!!'

function dataHasCoords(coords) {
    return g.data.hasOwnProperty(coords)
}

render()