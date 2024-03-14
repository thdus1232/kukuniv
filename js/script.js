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

    $(".tab>li").click(function(){
        var i = $(this).index();
        console.log(i)

        $(".tab>li").removeClass('active')
        $(this).addClass('active')

        $(".c").hide();
        $(".c").eq(i).show();
        return false;
    });
    // notice end

    // news
    let $slide = $("#news");
    let delay2 = 2500;
    let duration2 = 800;
    let $posterList = $slide.children("ul");

    function nextPosterSlide() {
        // 2. ul 요소를 포스터 한 장의 너비(#slide 요소의 너비/3)만큼
        //    왼쪽으로 천천히 이동
        $posterList.css({
            transitionDuration : duration2 +"ms",
            left:"-25%"
        });
        // 3. ul 요소의 움직임이 끝나면
        window.setTimeout(function(){
        // 3-1. ul 요소의 스타일을 제거
        // 3-2. ul 요소의 첫 번째 자식 요소를
        //      ul 요소의 마지막 자식 요소의 위치로 이동
            $posterList.removeAttr("style")
                        .children(":first").appendTo($posterList);
        }, duration2);
    }

    // 1. 일정 시간마다
    timerId=window.setInterval(nextPosterSlide,delay2);
    
    $slide.hover(
    // 4. #slide 요소의 영역에 마우스 커서가 들어가면
    function() {
        // 4-1. ul 요소가 움직이지 않도록 한다.
        window.clearInterval(timerId);
    },
    // 5. #slide 요소의 영역에서 마우스 커서가 나오면
    function() {
        // 5-1. ul 요소가 다시 움직이도록 한다.
        timerId=window.setInterval(nextPosterSlide,delay2);
    }
    );

    // 01.18.추가 밑에는.
    $("#next").on("click", function(){ 
        // 클릭 이벤트에 의한 슬라이드 이동과
        // 타이머에 의한 슬라이드 이동이
        // 바로 수행되는 경우가 생기기 때문에
        // → 타이머를 해제한 다음 이미지 슬라이드를 진행하고
        //   다시 타이머를 등록함으로써 이미지가 보여질 시간을 제공한다.
        window.clearInterval(timerId);
        timerId = window.setInterval(nextPosterSlide, delay2);
        
        nextPosterSlide();
    });

    // 5. #prev 요소를 클릭하면
    // 5-1. ul 요소의 마지막 자식 요소를
    //      ul 요소의 첫 번째 자식 요소의 위치로 이동
    // 5-2. ul 요소를 #slide 요소의 너비만큼 왼쪽으로 이동
    // 5-3. ul 요소를 원래 위치로 천천히 이동
    $("#prev").on("click", function(){ 
        window.clearInterval(timerId);
        timerId = window.setInterval(prevPosterSlide,delay2);

        prevPosterSlide();
    });

    
    // family site

    // nav랑 똑같이 생각하기. 클릭하면 서브 메뉴 나타나기.
    let $dropdownMenus = $(".site > ul > li > ul");
    let duration3 = 200;
    // 1. #nav 하위 요소인 a 요소를 클릭했을 때
    $(".site > ul > li > a").on("click", function() { 
        // 클릭한 요소의 드롭 다운 메뉴
        let $dropdown = $(this).next(".site > ul > li > ul");

        if(!$dropdown.length) return;

        /*
        // 2. 클릭한 요소의 드롭 다운 메뉴가 숨겨진 상태면
        if($dropdown.is(":hidden")) {
            // 3. 보여지고 있는 드롭 다운 메뉴를 숨기고
            $dropdownMenus.filter(":visible").slideUp();
            // 4. 클릭한 요소의 드롭 다운 메뉴를 보이도록 한다.
            $dropdown.slideDown();
        }
        // 5. 클릭한 요소의 드롭 다운 메뉴가 보여지는 상태이면
        else {
            // 6. 클릭한 요소의 드롭 다운 메뉴를 숨긴다.
            $dropdown.slideUp();
        }
        */

        if($dropdown.is(":hidden")) {
            $dropdownMenus.filter(":visible").slideUp(duration3);
        }
        
        $dropdown.slideToggle(duration3);

    });
});
