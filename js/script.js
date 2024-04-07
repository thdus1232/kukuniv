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
        // 2-1. 인덱스를 1 증가
        //      마지막 인덱스였다면 인덱스를 0으로 설정
        photoIndex++;
        photoIndex %= $bulletList.length;

        // 2-2. .bullets 요소 내의 a 요소에 "on" 클래스를 제거
        //      .인덱스에 위치한 a 요소에 "on" 클래스를 추가
        $bulletList.removeClass("on")
                    .eq(photoIndex).addClass("on");

        // 2-3. .image-List 요소를 #slide 요소의 너비만큼 왼쪽으로 천천히 이동
        $imageList.animate({left:"-100%"}, duration, function() { 
            // 2-4. .image-List 요소의 움직임이 끝나면
            // 2-5. .image-List 요소의 스타일 제거
            // 2-6. .image-List 요소의 첫 번째 자식 요소를
            //      .image-List 요소의 마지막 자식 요소의 위치로 이동
            $(this).removeAttr("style")
                        .children(":first").appendTo(this);
        });
    }

    // 1. bullet 기능을 위한 ul 요소를 생성
    // 1-1. 생성된 ul 요소의 class 속성에 'bullets' 생성
    // 1-2. .bullets 요소를 #slide 요소의 마지막 자식 요소로 추가
    $("<ul></ul>")
        .addClass("bullets")
        .appendTo("#slide");

    $imageList.children().each(function () {     
        // 1-3. .image-List 요소의 자식 요소의 수만큼 li 요소를 생성
        // 1-4. 생성된 li 요소에 a 요소를 추가
        // 1-5. 생성된 li 요소를 .bullets 요소의 자식 요소로 추가
        $("<li></li>")
            .append("<a href='#'></a>")
            .appendTo("#slide>.bullets");
    });

    let $bulletList = $("#slide > .bullets >li > a");
    $bulletList.eq(photoIndex).addClass("on");

    // 2. 일정 시간마다
    timerId = window.setInterval(nextImageSlide, delay);
    
// ----------------------------------------------------------------

    $bulletList.on("click", function(event) { 
        event.preventDefault();
        // 클릭한 요소의 인덱스
        let clickedIndex = $bulletList.index(this);

        // 클릭한 요소의 인덱스와 현재 활성화된 요소의 인덱스 차이
        // = 이동해야할 요소의 수
        let step = clickedIndex - photoIndex;

        if(step ==0) return;

        photoIndex = clickedIndex;
        $bulletList.removeClass("on").eq(photoIndex).addClass("on");

        // 이전/이후 방향을 구분하여 각 방향으로 슬라이드 이동
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
