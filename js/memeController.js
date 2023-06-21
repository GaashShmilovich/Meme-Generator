'use strict'

let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.querySelector('#meme-canvas')
    gCtx = gElCanvas.getContext('2d')
    renderMeme()
}

function renderMeme() {
    const elImg = new Image()
    const text = getMeme().lines[0].txt
    elImg.src = 'images/square/1.jpg'

    elImg.onload = () => {
        gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)

        // TODO: fix the blurry text

        gCtx.font = '30px Impact'
        gCtx.fillStyle = 'white'
        // gCtx.strokeStyle = 'black'
        gCtx.textAlign = 'center'

        gCtx.fillText(text, gElCanvas.width / 2, 50)
        // gCtx.strokeText(text, gElCanvas.width / 2, 50)
    }

}