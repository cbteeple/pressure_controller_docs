(function($) {

  /**
   * Copyright 2012, Digital Fusion
   * Licensed under the MIT license.
   * http://teamdf.com/jquery-plugins/license/
   *
   * @author Sam Sehnert
   * @desc A small plugin that checks whether elements are within
   *     the user visible viewport of a web browser.
   *     only accounts for vertical position, not horizontal.
   */

  $.fn.visible = function(partial) {
    
      var $t            = $(this),
          $w            = $(window),
          viewTop       = $w.scrollTop(),
          viewBottom    = viewTop + $w.height(),
          _top          = $t.offset().top,
          _bottom       = _top + $t.height(),
          compareTop    = partial === true ? _bottom : _top,
          compareBottom = partial === true ? _top : _bottom;
    
    return ((compareBottom <= viewBottom) && (compareTop >= viewTop));

  };
    
})(jQuery);



var modalTop = document.getElementById("modal");
var modalOverlay = document.getElementById("modal-overlay");
var modalClose = document.getElementById("modal-close");
var modalNext = document.getElementById("modal-next");
var modalPrev = document.getElementById("modal-prev");
var modalNextAux = document.getElementById("modal-next-aux");
var modalPrevAux = document.getElementById("modal-prev-aux");
var modalImg = document.getElementById("modal-img");
var modalImgLink = document.getElementById("modal-img-a");
var modalDes = document.getElementById("modal-description");
var imageClicked=null;
var currImage=null;
var page_imgs = document.getElementById("main-content").querySelectorAll("img:not(#modal-content)");


var openModal = function (img) {
    // When an image is clicked, put its source in the modal and display it
    // console.log("click open");
    // console.log(img.src);
    // img.classList.add('active-modal');
    imageClicked = img;

    if (modalOverlay.classList.contains('active')){
        modalImg.classList.add('transparent');
        modalDes.classList.add('transparent');
        setTimeout( function() {
            modalImg.src = img.src;
            modalDes.innerHTML = img.alt;
            modalImg.classList.remove('transparent');
            modalDes.classList.remove('transparent');
            },300);
    }
    else{
        modalImg.src = img.src;
        modalDes.innerHTML = img.alt;
    }

    


    if ( $(img).visible(true) ){
        modalImgLink.href= "javascript:void(0);"
    }
    else{
        modalImgLink.href= "#"+img.id;
    }


    modalOverlay.classList.add('active');
    setButtons(img);
    //modalOverlay.classList.add('add-bg');
}


var setButtons = function (img){

    var id_tmp = img.id;
    id_tmp = id_tmp.replace("image_", "");

    var idx = parseInt(id_tmp);

    if (idx>=page_imgs.length-1){
        //Hide the "next" button
        toggleNext(0);
    }
    else {
        //Show the "next" button
        toggleNext(1);
    }
    
    if((idx)<=0){
        togglePrev(0);
    }
    else {
        //Show the "next" button
        togglePrev(1);
    }
}




var closeModal = function () {
    modalOverlay.classList.remove('active');
    //modalOverlay.classList.remove('add-bg');

    if (imageClicked != null){
        imageClicked.classList.add('img-callout');
        imageCallout();
    }    
}

var imageCallout = function(){
    //console.log(imageClicked)
    if (imageClicked != null){
        if ($(imageClicked).visible(true)  ){
            setTimeout(function(){
                imageClicked.classList.remove('img-callout');
                imageClicked=null;
            },200)
        }
        else{
            setTimeout(function(){
                imageClicked.classList.remove('img-callout');
                imageClicked=null;
            },1300)

        }
    }
}


var nextImage = function () {

    if (imageClicked){
        var img_found;
        var next_img_idx;
        for (var i=0;i<page_imgs.length;i++){
            if (page_imgs[i].id == imageClicked.id){
                img_found = page_imgs[i];
                if ((i+1)>=0 & (i+1)<page_imgs.length){
                    openModal(page_imgs[i+1]);
                    //page_imgs[i+1].click();
                    //setButtons(i+1);
                }
                break
            }
        }
    }
}

var prevImage = function () {
    if (imageClicked){
        var img_found;
        var next_img_idx;
        for (i=0;i<page_imgs.length;i++){
            if (page_imgs[i].id == imageClicked.id){
                img_found = page_imgs[i];
                if ((i-1)>=0 & (i-1)<page_imgs.length){
                    openModal(page_imgs[i-1]);
                }
                break
            }
        }
    }
}

var toggleNext= function (state){
    if (state == 0){
        //modalNext.classList.add('modal-btn-hidden');
        modalNextAux.classList.add('modal-btn-hidden');  
    }
    else{
        //modalNext.classList.remove('modal-btn-hidden');
        modalNextAux.classList.remove('modal-btn-hidden'); 
    }
    
}

var togglePrev= function (state){
    if (state == 0){
        //modalPrev.classList.add('modal-btn-hidden');
        modalPrevAux.classList.add('modal-btn-hidden');  
    }
    else{
        //modalPrev.classList.remove('modal-btn-hidden');
        modalPrevAux.classList.remove('modal-btn-hidden'); 
    }
    
}


$('#modal').on('click', function(e) {
    if (e.target !== this & e.target.id !== 'modal-content')
      return;
    
    closeModal()
});


$('.img-callout').on('mouseover', function(e) {
    imageClicked.classList.remove('img-callout');
    imageClicked=null;
});



window.onload = function () {
    // Get all elements inside the page-content
    var page_imgs = document.getElementById("main-content").querySelectorAll("img:not(#modal-content)");
    // Add click opener to every image
    for (var i = 0; i < page_imgs.length; i++) {
        page_imgs[i].id="image_"+i;
        page_imgs[i].addEventListener('click', function () { openModal(this) });
        page_imgs[i].addEventListener("mouseover", function () { this.style.cursor = "zoom-in" })
    }
}

modalClose.addEventListener('click', closeModal);
//modalImg.addEventListener('click', closeModal);
//modalNext.addEventListener('click', nextImage);
//modalPrev.addEventListener('click', prevImage);
modalNextAux.addEventListener('click', nextImage);
modalPrevAux.addEventListener('click', prevImage);
modalImgLink.addEventListener('click', closeModal);





document.addEventListener('keyup', function (e) {
    // Close the image modal if ESC is pressed
    var key = e.key || e.keyCode;
    if (key == 'Escape' || key == 'Esc' || key == 27) {
        closeModal();
    }
    else if ((e.keyCode || e.which) == 39) {
        nextImage();
    }
    else if ((e.keyCode || e.which) == 37) {
        prevImage();
    }
}
)



