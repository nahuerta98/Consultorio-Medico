let openDropBox = function(){
    let 
        otherLinks = $('.box-menu .link-icon'),
        actionDrop = $('.box-menu .dropAct'),
        boxDrop    = $('.box-menu .dropMenu');
    
    
    otherLinks.click(function(){
        boxDrop.removeClass("open");
        actionDrop.removeClass("active");
    });
    
    actionDrop.click(function(){
        let index = actionDrop.index($(this));
        boxDrop.removeClass("open");
        boxDrop.eq(index).addClass("open");
        $(this).addClass("active");
    });

}