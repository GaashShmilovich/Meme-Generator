'use strict'

let gImgs = []

function getImgs() {
    let images = gImgs
    return images
}
_createImgs()
function _createImgs() {
    for (let i = 0; i < 18; i++) {
        const id = (i + 1)
        const img = {
            id: id,
            url: `images/square/${id}.jpg`,
            keywords: []
        }
        gImgs.push(img)
    }
}

