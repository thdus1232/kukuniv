$(function(){
    $(".nav>ul>li").mouseover(function(){ 
        $(this).find(".sub").stop().slideDown();
    });
    $(".nav>ul>li").mouseout(function(){ 
        $(this).find(".sub").stop().slideUp();
    });
    // nav end

    // slide start
    let $imageList = $("#slide>.image-List");
    let delay = 6000;
    let duration = 1200;
    let timerId = 0;
    let photoIndex = 0;

    function nextImageSlide() { 
        photoIndex++;
        photoIndex %= $bulletList.length;

        $bulletList.removeClass("on")
                    .eq(photoIndex).addClass("on");

        $imageList.animate({left:"-100%"}, duration, function() { 
            $(this).removeAttr("style")
                        .children(":first").appendTo(this);
        });
    }

    $("<ul></ul>")
        .addClass("bullets")
        .appendTo("#slide");

    $imageList.children().each(function () {     
        $("<li></li>")
            .append("<a href='#'></a>")
            .appendTo("#slide>.bullets");
    });

    let $bulletList = $("#slide > .bullets >li > a");
    $bulletList.eq(photoIndex).addClass("on");

    timerId = window.setInterval(nextImageSlide, delay);
    
// bullet
    $bulletList.on("click", function(event) { 
        event.preventDefault();
        let clickedIndex = $bulletList.index(this);
        let step = clickedIndex - photoIndex;

        if(step ==0) return;

        photoIndex = clickedIndex;
        $bulletList.removeClass("on").eq(photoIndex).addClass("on");

        if(step>0){
            $imageList.animate({left:-step*100+"%"}, duration, function() {
                $(this).removeAttr("style")
                            .children(":lt("+step+")")
                            .appendTo(this)
            });
        } 
        else {
            $imageList
                .prepend($imageList.children(":gt("+(step-1)+")"))
                .css({left:step*100 +"%"})
                .animate({left:0}, duration); 
        }
    });
    // slide end

    $(".tab>li").mouseover(function(){
        var i = $(this).index();
        console.log(i)

        $(".tab>li").removeClass("active")
        $(this).addClass("active")

        $(".c").hide();
        $(".c").eq(i).show();
        return false;
    });
    // notice end

    // news
    let $slide = $("#news");
    let $posterList = $slide.children("ul");

    function nextPosterSlide() {
        $posterList.css({
            transitionDuration : 800 +"ms",
            left:"-25%"
        });
        window.setTimeout(function(){
            $posterList.removeAttr("style")
                        .children(":first").appendTo($posterList);
        }, 800);
        
    }
    function prevPosterSlide() {
        $posterList.css("transitionDuration", "800ms");
        $posterList.animate({left: "-=25%"},800,
            function(){
                $posterList.children(":last").detach().prependTo($posterList);
            }
        );
    }

    timerId=window.setInterval(nextPosterSlide,2500);
    
    $slide.hover(
        function() {
            window.clearInterval(timerId);
        },
        function() {
            timerId=window.setInterval(nextPosterSlide,2500);
        }
    );

    $("#next").on("click", function(){ 
        window.clearInterval(timerId);
        timerId = window.setInterval(nextPosterSlide, 2500);
        
        nextPosterSlide();
    });

    $("#prev").on("click", function(){ 
        window.clearInterval(timerId);
        timerId = window.setInterval(prevPosterSlide,2500);

        prevPosterSlide();
    });

    // family site
    let $dropdownMenus = $(".site > ul > li > ul");
    let duration3 = 200;
    $(".site > ul > li > a").on("click", function() { 
        let $dropdown = $(this).next(".site > ul > li > ul");

        if(!$dropdown.length) return;

        if($dropdown.is(":hidden")) {
            $dropdownMenus.filter(":visible").slideUp(duration3);
        }
        
        $dropdown.slideToggle(duration3);
    });
});
