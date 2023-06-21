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
    const text = getMeme().lines[0].txt
    elImg.src = `images/square/${meme.selectedImgId}.jpg`

    elImg.onload = () => {
        gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)

        // TODO: fix the blurry text

        gCtx.font = '30px Impact'
        gCtx.fillStyle = 'white'
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