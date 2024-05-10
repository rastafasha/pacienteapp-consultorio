var current = 0;
var imagenes = new Array();

$(document).ready(function() {
    var numImages = 7;
    if (numImages <= 3) {
        $('.right-arrow').css('display', 'none');
        $('.left-arrow').css('display', 'none');
    }

    $('.left-arrow').on('click', function() {
        if (current > 0) {
            current = current - 1;
        } else {
            current = numImages - 3;
        }

        $(".carrusel").animate({ "left": -($('#product_' + current).position().left) }, 600);

        return false;
    });

    $('.left-arrow').on('hover', function() {
        $(this).css('opacity', '0.5');
    }, function() {
        $(this).css('opacity', '1');
    });

    $('.right-arrow').on('hover', function() {
        $(this).css('opacity', '0.5');
    }, function() {
        $(this).css('opacity', '1');
    });

    $('.right-arrow').on('click', function() {
        if (numImages > current + 3) {
            current = current + 1;
        } else {
            current = 0;
        }

        $(".carrusel").animate({ "left": -($('#product_' + current).position().left) }, 600);

        return false;
    });
});




var current = 0;
var imagenes = new Array();

$(document).ready(function() {
    var numImages = 7;
    if (numImages <= 3) {
        $('.right-arrow1').css('display', 'none');
        $('.left-arrow1').css('display', 'none');
    }

    $('.left-arrow1').on('click', function() {
        if (current > 0) {
            current = current - 1;
        } else {
            current = numImages - 3;
        }

        $(".carrusel1").animate({ "left": -($('#product1_' + current).position().left) }, 600);

        return false;
    });

    $('.left-arrow1').on('hover', function() {
        $(this).css('opacity', '0.5');
    }, function() {
        $(this).css('opacity', '1');
    });

    $('.right-arrow1').on('hover', function() {
        $(this).css('opacity', '0.5');
    }, function() {
        $(this).css('opacity', '1');
    });

    $('.right-arrow1').on('click', function() {
        if (numImages > current + 3) {
            current = current + 1;
        } else {
            current = 0;
        }

        $(".carrusel1").animate({ "left": -($('#product1_' + current).position().left) }, 600);

        return false;
    });
});