'use strict'

let gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            size: 20,
            color: 'red'
        }]
}

let gCurrLineIdx = setMemeImg(gMeme.selectedImgId)

function getMeme() {
    return gMeme
}

function setMemeImg(imgIdx) {
    gMeme.selectedImgId = imgIdx
}

function setLineTxt(text, lineIdx = gCurrLineIdx) {
    gMeme.lines[lineIdx].txt = text
}



