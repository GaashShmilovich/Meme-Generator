'use strict'

function onInit() {
    let elGallery = document.querySelector('.main-gallery')
    let elSelectedImg = document.querySelector('.main-editor')
    elGallery.style.display = 'block'
    elSelectedImg.style.display = 'none'
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
    let elGallery = document.querySelector('.main-gallery')
    let elSelectedImg = document.querySelector('.main-editor')
    elGallery.style.display = 'none'
    elSelectedImg.style.display = 'block'
    setMemeImg(imgIdx)
    renderMeme()
}

const hamburger = document.querySelector('.hamburger')
const mainNav = document.querySelector('.main-nav')

hamburger.addEventListener("click", () => {
    mainNav.classList.toggle('active')
})