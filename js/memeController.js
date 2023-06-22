'use strict'

let gElCanvas
let gCtx

function init() {
    gElCanvas = document.querySelector('#meme-canvas')
    gCtx = gElCanvas.getContext('2d')
    renderMeme()
}

function renderMeme() {
    const elImg = new Image()
    const meme = getMeme()
    const text = meme.lines[0].txt
    elImg.src = `images/square/${meme.selectedImgId}.jpg`

    elImg.onload = () => {
        gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)

        // TODO: fix the blurry text

        gCtx.font = `${meme.lines[0].size}px Impact`
        gCtx.fillStyle = meme.lines[0].color
        gCtx.strokeStyle = 'black'
        gCtx.textAlign = 'center'
        gCtx.lineWidth = 2

        gCtx.fillText(text, gElCanvas.width / 2, 50)
        gCtx.strokeText(text, gElCanvas.width / 2, 50)
    }

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