var scrollPage = {};
$(function(){
    //初始化轮播参数
    initScrollParams();
    //添加上一页下一页 页数圆点 点击事件
    scrollPage.banner.on('click', '.prev', function(e){
        prevScroll();
    }).on('click', '.next', function(e){
        nextScroll();
    }).on('click', '.banner-dots span', function(e){
        if($(this).hasClass('active')) return;
        var i = $(this).index();
        scrollPage.index = i;
        showScroll(i);
    });

    //添加鼠标指针穿过元素时停止滚动  离开元素时开始滚动
    scrollPage.banner.on('mouseenter', function(e){
        if(scrollPage.timer) clearInterval(scrollPage.timer);
    }).on('mouseleave', function(e){
        autoPlayScroll();
    });
})
//初始化轮播参数
function initScrollParams(){
    scrollPage.banner = $('.g-banner');
    scrollPage.slides = scrollPage.banner.find('.banner-slide');
    scrollPage.dotContainer = scrollPage.banner.find('.banner-dots');
    scrollPage.dotTpl = '';
    scrollPage.total = scrollPage.slides.length;
    scrollPage.index = -1;
    scrollPage.duration = 500;
    scrollPage.interval = 5000;
    scrollPage.timer = null;
    scrollPage.dotTpl = '<span></span>';
    scrollPage.dots = scrollPage.dotContainer.find('span');
    scrollPage.banner.find('.banner-anchor').removeAttr('style');
    nextScroll();
    if(scrollPage.total == 1){
        autoPlayScroll();
        $('.banner-anchor').remove();   
    }else{
        $.each(scrollPage.slides, function(i, el){
            scrollPage.dotContainer.append(scrollPage.dotTpl);
        });
    }

}
//显示相应的轮播图
function showScroll(i){
    var cur = scrollPage.slides.filter('.slide-active');
    scrollPage.slides.stop(true, true);
    cur.removeClass('slide-active').fadeOut(600);
    scrollPage.slides.eq(i).addClass('slide-active').fadeIn(800);
    scrollPage.dots && scrollPage.dots.removeClass('active').eq(i).addClass('active');
}
//自动播放轮播图
function autoPlayScroll(){
    if(scrollPage.timer) clearInterval(scrollPage.timer);
    scrollPage.timer = setInterval(function(){
        nextScroll();
    }, scrollPage.interval);
}
//上一个轮播图
function prevScroll(){
    scrollPage.index--;
    scrollPage.index = scrollPage.index < 0 ? scrollPage.total - 1 : scrollPage.index;
    showScroll(scrollPage.index);
}
//下一个轮播图
function nextScroll(){
    scrollPage.index++;
    scrollPage.index = scrollPage.index > scrollPage.total - 1 ? 0 : scrollPage.index;
    showScroll(scrollPage.index);
}
