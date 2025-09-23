var headerHeight =  $("#header").outerHeight(),
    introHeight = $(window).height() - headerHeight;
$('#intro').height(introHeight);


$(document).ready(function() {

    var timelineBlock = $(".timeline_block"),
        timeline = $('.timeline'),
        timelineLine = $('.timeline_line'),
        lineProgress = $('.line_progress'),
        cardLogo = $('.card_logo_box'),
        timelineItem = $('.timeline_item');
    
    var windowOuterHeight = $(window).outerHeight(),
        window3_4 =  3*windowOuterHeight/4;
        posY = $(window).scrollTop(),
        oldPosY = -1;
    
    var timelineFlag = false,
        isIntroFlag = true;
    

    $(document).on('click', (e) => {
        if(e.target.id!='navbar-btn' && $('#navbar').hasClass('sidebar-active'))
            toggleSidebar();
        
    });
    
    $(window).on('scroll', () => {
        posY = $(window).scrollTop();
        updateFrame();
        updateIntroHeight();
    });

    $(window).on('resize', () => {
        introHeight = $(window).height() - headerHeight;
        $('#intro').height(introHeight);

        posY = $(window).scrollTop();
        updateFrame();
    });
    
    
    function updateFrame() {
        if(timelineFlag==false) requestAnimationFrame(updateWindow); 
        timelineFlag = true;
    }
    function updateWindow() {
        timelineFlag = false;
        if(posY !== oldPosY) oldPosY = posY; updateProgress();
    }

    function updateProgress() {
        
        timelineBlock.each(function() {
            
            var lastItemTop = $(this).find(timelineItem).last().find(cardLogo).offset().top,
            progressTop = $(this).find(lineProgress).offset().top,
            windowMid = posY - progressTop + window3_4;
            
            if(lastItemTop <= posY + window3_4) windowMid = lastItemTop - progressTop;
            $(this).find(lineProgress).css({height: windowMid + "px"});
    
            $(this).find(timelineItem).each( function() {
                var itemTop = $(this).find(cardLogo).offset().top;
                if(itemTop < posY + window3_4)
                    $(this).addClass('timeline_item_active');
                else $(this).removeClass('timeline_item_active');
            })

        });
    }


    function updateIntroHeight(){
        if (isIntroFlag==true && posY > introHeight) {
            isIntroFlag=false;
            $("#header").addClass("sticky");
            $('#intro').height(introHeight + headerHeight);
        }
        else if(isIntroFlag==false && posY < introHeight){
            isIntroFlag=true;
            $("#header").removeClass("sticky");
            $('#intro').height(introHeight);
        }
    }
    
    $('#navbar-btn').on('click', toggleSidebar);

    function toggleSidebar(){
        $('#navbar').toggleClass("sidebar-active");
        $('#navbar').toggleClass("sidebar-inactive");
    }

    $('.navbar-item').each(function (){
        $(this).on('click', (e) => {
            var offset = $($(this).attr('href')).offset();
            offset.top -= headerHeight;
            $('html, body').animate( {scrollTop: offset.top}, 1000);
        });
    });
});

function openInNewTab(url) {
    window.open(url, '_blank');
  }
  