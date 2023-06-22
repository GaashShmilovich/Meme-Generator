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
    elImg.src = `images/square/${meme.selectedImgId}.jpg`

    elImg.onload = () => {

        gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)

        meme.lines.forEach((line, idx) => {

            const fontSize = line.size

            gCtx.font = `${fontSize}px Impact`
            gCtx.fillStyle = line.color
            gCtx.strokeStyle = 'black'
            gCtx.textAlign = 'center'
            gCtx.lineWidth = 2

            gCtx.fillText(line.txt, line.x, line.y)
            gCtx.strokeText(line.txt, line.x, line.y)

            if (idx === meme.selectedLineIdx) {

                const rectWidth = gElCanvas.width - 15
                const rectHeight = fontSize + 8
                const rectPosX = gElCanvas.width / 2
                const rectPoxY = line.y - fontSize

                gCtx.beginPath()
                gCtx.rect(rectPosX - rectWidth / 2, rectPoxY, rectWidth, rectHeight)
                gCtx.strokeStyle = 'white'
                gCtx.lineWidth = 1
                gCtx.stroke()
            }

        })
    }
}

function addLine() {

    const meme = getMeme()
    const line2 =
    {
        txt: '',
        size: 20,
        color: 'white',
        x: 150,
        y: 250
    }
    if (meme.lines.length > 1) return
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

function onSwitchLine() {

    switchLine()
    renderMeme()
}
