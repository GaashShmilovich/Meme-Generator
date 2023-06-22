'use strict'

let gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'bla',
            size: 20,
            color: 'white'
        },
        // {
        //     txt: 'bla',
        //     size: 20,
        //     color: 'white'
        // }
    ]
}


function getMeme() {
    return gMeme
}

function setMemeImg(imgId) {
    const meme = getMeme()
    meme.selectedImgId = imgId
}

function setLineTxt(text, lineIdx = gCurrLineIdx) {
    const meme = getMeme()
    meme.lines[lineIdx].txt = text
}



