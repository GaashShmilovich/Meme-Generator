'use strict'

function onInit() {
    renderGallery()
    init()
}

function renderGallery() {
    let elContainer = document.querySelector('.gallery-container')
    strHTMLs = ''
    const images = getImgs()

    var strHTMLs = images.map(img => `
    <img src="images/square/${img.id}.jpg" alt="" onclick="onImgSelect(${img.id})">`)
    elContainer.innerHTML = strHTMLs.join('')

}

function onImgSelect(imgIdx) {
    setMemeImg(imgIdx)
    renderMeme()
}