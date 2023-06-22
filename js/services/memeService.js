'use strict'

let gMeme = {

    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: 20,
            color: 'white',
            x: 150,
            y: 50
        },
    ]
}

function getMeme() {

    return gMeme
}

function setMemeImg(imgId) {

    const meme = getMeme()
    meme.selectedImgId = imgId
}

function setLineTxt(text, lineIdx) {

    const meme = getMeme()
    lineIdx = meme.selectedLineIdx
    meme.lines[lineIdx].txt = text
}

function switchLine() {

    const meme = getMeme()
    if (meme.selectedLineIdx === 1) return meme.selectedLineIdx = 0
    else meme.selectedLineIdx = 1
}



