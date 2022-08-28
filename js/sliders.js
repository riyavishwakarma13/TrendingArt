const $ = jQuery;

const initTopClientCarousel = () => {
    $('#top-10').each( function () {
        $(this).slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: false,
            autoplaySpeed: 1500,
            dots: false,
            
            autoplay: true,
            responsive: [
                {
                    breakpoint: 1199,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        spaceBetween:100,
                        infinite: true,
                        arrows: false,
                        dots: false
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        spaceBetween:100,
    
                        infinite: true,
                        arrows: false,
                        dots: false
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        spaceBetween:100,
                        arrows: false,
                        dots: false
                    }
                }
            ]
        });
    });
}
const initLatestClientCarousel = () => {
    $('#top-latest').each( function () {
        $(this).slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: false,
            autoplaySpeed: 1500,
            dots: false,
            
            autoplay: true,
            responsive: [
                {
                    breakpoint: 1199,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        spaceBetween:100,
                        infinite: true,
                        arrows: false,
                        dots: false
                    }
                },
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1,
                        spaceBetween:100,
    
                        infinite: true,
                        arrows: false,
                        dots: false
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        spaceBetween:100,
                        arrows: false,
                        dots: false
                    }
                }
            ]
        });
    });
}


