'use strict'

let gElCanvas
let gCtx
let gIsDragging = false
let gDragStartPos
let gLineDraggedIdx

function init() {

    gElCanvas = document.querySelector('#meme-canvas')
    gCtx = gElCanvas.getContext('2d')
    renderMeme()
    eventListeners()
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
            const text = line.txt
            const rectPaddingX = 10
            const rectPaddingY = 5
            const rectPosY = line.y - fontSize - rectPaddingY

            gCtx.font = `${fontSize}px Impact`
            gCtx.fillStyle = line.color
            gCtx.strokeStyle = 'black'
            gCtx.textAlign = 'center'
            gCtx.lineWidth = 2

            const textWidth = gCtx.measureText(text).width
            const rectWidth = textWidth + rectPaddingX * 2
            const rectHeight = fontSize + rectPaddingY * 2
            const frameWidth = Math.min(rectWidth, gElCanvas.width - 20)
            const framePosX = Math.max(line.x - frameWidth / 2, 0)

            gCtx.fillText(text, line.x, line.y)
            gCtx.strokeText(text, line.x, line.y)

            if (idx === meme.selectedLineIdx) {

                gCtx.beginPath()
                gCtx.rect(framePosX, rectPosY, frameWidth, rectHeight)
                gCtx.strokeStyle = 'white'
                gCtx.lineWidth = 1
                gCtx.stroke()
            }
        })
    }
}

function eventListeners() {

    gElCanvas.addEventListener('mousedown', onDragStart)
    gElCanvas.addEventListener('mousemove', onDrag)
    gElCanvas.addEventListener('mouseup', onDragEnd)
    gElCanvas.addEventListener('click', onCanvasClick)
}

function onCanvasClick(ev) {

    const { offsetX, offsetY } = ev
    const meme = getMeme()
    let isTextClicked = false

    meme.lines.forEach((line, idx) => {

        const fontSize = line.size
        const rectWidth = gElCanvas.width - 15
        const rectHeight = fontSize + 8
        const rectPosX = gElCanvas.width / 2
        const rectPosY = line.y - fontSize

        if (
            offsetX >= rectPosX - rectWidth / 2 &&
            offsetX <= rectPosX + rectWidth / 2 &&
            offsetY >= rectPosY &&
            offsetY <= rectPosY + rectHeight
        ) {
            isTextClicked = true
            meme.selectedLineIdx = idx
        }
    })

    if (!isTextClicked) {
        meme.selectedLineIdx = -1
    }
    renderMeme()
}

function onDragStart(ev) {

    const { offsetX, offsetY } = ev
    const meme = getMeme()
    let isTextClicked = false


    meme.lines.forEach((line, idx) => {

        const fontSize = line.size
        const tempCanvas = document.createElement('canvas')
        const tempCtx = tempCanvas.getContext('2d')
        tempCtx.font = `${fontSize}px Arial`
        const textWidth = tempCtx.measureText(line.txt).width
        const textHeight = fontSize

        const rectWidth = textWidth + 15
        const rectHeight = textHeight + 8
        const rectPosX = line.x - rectWidth / 2
        const rectPosY = line.y - rectHeight / 2

        if (
            offsetX >= rectPosX &&
            offsetX <= rectPosX + rectWidth &&
            offsetY >= rectPosY &&
            offsetY <= rectPosY + rectHeight
        ) {
            gIsDragging = true
            gDragStartPos = { x: offsetX, y: offsetY }
            gLineDraggedIdx = idx
            isTextClicked = true
            meme.selectedLineIdx = idx
        }
        if (!isTextClicked) {
            meme.selectedLineIdx = -1
        }
    })
}

function onDrag(ev) {

    if (!gIsDragging) return

    const { offsetX, offsetY } = ev
    const dx = offsetX - gDragStartPos.x
    const dy = offsetY - gDragStartPos.y

    const meme = getMeme()
    const line = meme.lines[gLineDraggedIdx]
    line.x += dx
    line.y += dy

    gDragStartPos = { x: offsetX, y: offsetY }
    renderMeme()
}

function onDragEnd() {

    gIsDragging = false
}

function addLine() {

    let textInput = document.getElementById('enter-text')
    textInput.value = ''
    const meme = getMeme()
    let line =
    {
        txt: '',
        size: 20,
        color: 'white',
        x: 150,
        y: 250,
        isDrag: false
    }

    if (meme.selectedLineIdx >= 1) line.y = 160
    meme.lines.push(line)
    switchLine()
    renderMeme()
}

function onTextChange(ev) {

    setLineTxt(ev.target.value)
    renderMeme()
}

function downloadCanvas(elLink) {

    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-meme'
}

function pickColor() {

    const meme = getMeme()
    let lineIdx = meme.selectedLineIdx
    var colorPick = document.getElementById("pick-color").value

    renderMeme()
    return meme.lines[lineIdx].color = colorPick
}

function increaseFont() {

    const meme = getMeme()
    let lineIdx = meme.selectedLineIdx

    meme.lines[lineIdx].size += 3
    renderMeme()
}

function decreaseFont() {

    const meme = getMeme()
    let lineIdx = meme.selectedLineIdx

    meme.lines[lineIdx].size -= 3
    renderMeme()
}

function onDeleteLine() {
    const meme = getMeme()
    if (!meme.lines.length) return
    meme.lines.splice(meme.selectedLineIdx, 1)
    let textInput = document.getElementById('enter-text')
    textInput.value = ''
    if (meme.lines.length === 1) {
        meme.selectedLineIdx = 0
    }
    renderMeme()
}

function onSwitchLine() {
    const meme = getMeme()
    let textInput = document.getElementById('enter-text')

    switchLine()
    textInput.value = (!textInput.value) ? '' : meme.lines[meme.selectedLineIdx].txt
    renderMeme()
}

function onUploadImg() {

    const imgDataUrl = gElCanvas.toDataURL('image/jpeg')

    function onSuccess(uploadedImgUrl) {

        const url = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
    }
    doUploadImg(imgDataUrl, onSuccess)
}

function alignLeft() {

    const meme = getMeme()
    let lineIdx = meme.selectedLineIdx

    meme.lines[lineIdx].x = 100
    renderMeme()
}

function alignRight() {

    const meme = getMeme()
    let lineIdx = meme.selectedLineIdx

    meme.lines[lineIdx].x = 200
    renderMeme()
}

function alignCenter() {

    const meme = getMeme()
    let lineIdx = meme.selectedLineIdx

    meme.lines[lineIdx].x = 150
    renderMeme()
}




