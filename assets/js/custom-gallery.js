(function () {
    'use strict';
    var galleries;
    var currentGalleryImages;
    var currentImageIndex;
    var imageContainer;
    var currentImageUrl;
    var preloadedImages = 0;
    initCustomGallery();
    function initCustomGallery() {
        galleries = document.querySelectorAll('[id=custom-gallery]');
        createContainer();
        if (galleries.length > 0) {
            galleries.forEach((gallery) => {
                let images = gallery.getElementsByClassName('custom-gallery-item');
                if (images.length > 0) {
                    for (const image of images) {
                        if (!image.classList.contains("hidden")) {
                            image.addEventListener('click', showGallery, false);
                            image.currentImg = image;
                            image.imgList = images;
                        }
                    }
                }
            });
        }
    };
    function showGallery(evt) {
        toggleControls(true);
        showLoading();
        currentImageUrl = evt.currentTarget.currentImg.dataset.src;
        currentGalleryImages = evt.currentTarget.imgList;
        currentImageIndex = [...currentGalleryImages].indexOf(evt.currentTarget.currentImg);
        preloadImagesAndOpen();

    }
    function toggleControls(hide) {
        document.getElementById('custom-gallery-counter').style.visibility = hide ? 'hidden' : 'visible';
        document.getElementById('custom-gallery-nav-l').style.visibility = hide ? 'hidden' : 'visible';
        document.getElementById('custom-gallery-nav-r').style.visibility = hide ? 'hidden' : 'visible';
        if (!hide) {
            setCounter();
        }
    }
    function preloadImagesAndOpen(){
        preloadedImages = 0;
        for (let i = 0; i < currentGalleryImages.length; i++) {
            var tmpImage = new Image();
            tmpImage.addEventListener("load", preloadProcess, true);
            tmpImage.src = currentGalleryImages[i].dataset.src;
        }
    }
    function preloadProcess(){
        preloadedImages++;
        if (preloadedImages == currentGalleryImages.length) {
            showImage(currentImageUrl);
            toggleControls(false);
        }
    }
    function closeGallery() {
        document.getElementById('custom-gallery-container').style.display = "none";
    }
    function previousImage() {
        if (currentImageIndex > 0) {
            showLoading(true);
            currentImageIndex--;
            setCounter();
            showImage(currentGalleryImages[currentImageIndex].dataset.src);
        }
    }
    function nextImage() {
        showLoading(true);
        currentImageIndex = (currentImageIndex < currentGalleryImages.length - 1) ? currentImageIndex + 1 : 0;
        setCounter();
        showImage(currentGalleryImages[currentImageIndex].dataset.src);
    }
    function showLoading(prevNext = false) {
        imageContainer.innerHTML = "<img src='/images/loading.gif'>";
        if (!prevNext) {
            document.getElementById('custom-gallery-container').style.display = "block";
        }
    }
    function setCounter(){
        document.getElementById('custom-gallery-counter').innerText = `
        ${currentImageIndex + 1} / ${currentGalleryImages.length}`;
    }
    function showImage(url) {
        imageContainer.innerHTML =`
        <img src="/images/loading.gif">
        <img src="${url}">`;
    }
    function createContainer() {
        let existingElement = document.getElementById('custom-gallery-container');
        if (existingElement == null || existingElement == undefined) {
            let galleryElement = document.createElement("div");
            galleryElement.setAttribute("id", "custom-gallery-container");
            let imageElement = document.createElement("div");
            imageElement.setAttribute("id", "custom-gallery-image");
            galleryElement.appendChild(imageElement);
            let closeButton = document.createElement("div");
            closeButton.setAttribute("id", "custom-gallery-close");
            closeButton.innerHTML = "<img src='/images/close.png' alt='&times;'>";
            galleryElement.appendChild(closeButton);
            let counter = document.createElement("div");
            counter.setAttribute("id", "custom-gallery-counter");
            galleryElement.appendChild(counter);
            let navButtonL = document.createElement("div");
            navButtonL.setAttribute("id", "custom-gallery-nav-l");
            navButtonL.innerHTML = "<img src='/images/prev.png' alt='&lsaquo;'>";
            galleryElement.appendChild(navButtonL);
            let navButtonR = document.createElement("div");
            navButtonR.setAttribute("id", "custom-gallery-nav-r");
            navButtonR.innerHTML = "<img src='/images/next.png' alt='&rsaquo;'>";
            galleryElement.appendChild(navButtonR);
            document.body.appendChild(galleryElement);
            document.getElementById('custom-gallery-close').addEventListener('click', closeGallery);
            document.getElementById('custom-gallery-nav-l').addEventListener('click', previousImage);
            document.getElementById('custom-gallery-nav-r').addEventListener('click', nextImage);
            imageContainer = document.getElementById('custom-gallery-image');
        }
    }
})();