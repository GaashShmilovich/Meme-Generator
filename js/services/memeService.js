'use strict'
let gImgs
let gMeme

function getMeme() {
    gImgs = createImg()
    return gMeme = createMeme()
}

function createMeme() {
    return gMeme = {
        selectedImgId: gImgs[0].id,
        selectedLineIdx: 0,
        lines: [
            {
                txt: 'I sometimes eat Falafel',
                size: 20,
                color: 'red'
            }]
    }
}

function createImg() {
    return gImgs = [
        {
            id: 1,
            url: `images/square/1.jpg`,
            keywords: ['trump']
        }
    ]
}

function setLineTxt(elText) {


}


