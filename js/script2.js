$(function(){ 
    $(".nav>ul>li").mouseover(function(){ 
        $(this).find(".sub").stop().slideDown();
    });
    $(".nav>ul>li").mouseout(function(){ 
        $(this).find(".sub").stop().slideUp();
    });
    // nav end

    $(".lnb_nav>ul>li").mouseover(function(){ 
        $(this).find(".lnb").stop().slideDown();
    });
    $(".lnb_nav>ul>li").mouseout(function(){ 
        $(this).find(".lnb").stop().slideUp();
    });
    // aside nav end
});