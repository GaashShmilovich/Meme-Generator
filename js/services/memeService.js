'use strict'

let gMeme = {

    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: '',
            x: 150,
            y: 50,
            size: 20,
            color: 'white',
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

function doUploadImg(imgDataUrl, onSuccess) {

    const formData = new FormData()
    formData.append('img', imgDataUrl)


    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {

        if (XHR.readyState !== XMLHttpRequest.DONE) return

        if (XHR.status !== 200) return console.error('Error uploading image')
        const { responseText: url } = XHR

        console.log('Got back live url:', url)
        onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
        console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
}






