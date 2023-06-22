'use strict'

let gElCanvas
let gCtx
var gCurrLineIdx = 0


function init() {
    gElCanvas = document.querySelector('#meme-canvas')
    gCtx = gElCanvas.getContext('2d')
    renderMeme()
}


function renderMeme() {
    const elImg = new Image()
    const meme = getMeme()
    const text1 = meme.lines[0].txt
    const text2 = meme.lines[gCurrLineIdx].txt
    elImg.src = `images/square/${meme.selectedImgId}.jpg`

    elImg.onload = () => {
        gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)

        // TODO: fix the blurry text

        gCtx.font = `${meme.lines[gCurrLineIdx].size}px Impact`
        gCtx.fillStyle = meme.lines[gCurrLineIdx].color
        gCtx.strokeStyle = 'black'
        gCtx.textAlign = 'center'
        gCtx.lineWidth = 2

        gCtx.fillText(text1, gElCanvas.width / 2, 50)
        gCtx.strokeText(text1, gElCanvas.width / 2, 50)

        gCtx.fillText(text2, gElCanvas.width / 2, 250)
        gCtx.strokeText(text2, gElCanvas.width / 2, 250)
    }

}

function addLine() {
    const meme = getMeme()
    const line2 =
    {
        txt: 'bla',
        size: 20,
        color: 'white'
    }
    meme.lines.push(line2)
    renderMeme()
}

function onTextChange(ev) {
    setLineTxt(ev.target.value)
    renderMeme()
}

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-img'
}


function pickColor() {
    const meme = getMeme()
    var colorPick = document.getElementById("pick-color").value

    renderMeme()
    return meme.lines[0].color = colorPick

}

function increaseFont() {
    const meme = getMeme()
    meme.lines[0].size += 3
    renderMeme()
}

function decreaseFont() {
    const meme = getMeme()
    meme.lines[0].size -= 3
    renderMeme()
}


console.log('switchLine()', switchLine())

function switchLine() {
    gCurrLineIdx = 1
    if (gCurrLineIdx = 1) {
        gCurrLineIdx = 0
    }
    return gCurrLineIdx
}
