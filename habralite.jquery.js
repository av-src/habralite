$(function() {
/* Return human-friendly declension of provided numbers */
function declOfNum(number, titles) {
    cases = [2, 0, 1, 1, 1, 2];
    return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}
/* Create a button ( span.buttons > a.button ) */
function createBtn (className, value) {
    className = className || '';
    value = value || 'Button';

    return $('<span class="buttons"><a href="#" class="'+className+' button">'+value+'</a></span>');
}
/* Reply's button event handler */
function commentsBtnClick (event) {
    event.preventDefault();
    $(this).parents('.comment_item').children('.reply_comments').toggle();
}

/* C-style Main() =) */
(function(){
    /* Sets of {NodeList} elements to operate with */
    /* Hide all images and nested replies by default */
    var allReplies = $('.reply_comments').hide();
    var sidebarImgs = $('.sidebar_right > .banner_300x500, .sidebar_right > #htmlblock_placeholder').hide();
    var contentImgs = $('.content img, .message img').hide();

    /* Add button to toggle images visibility */
    var newImgBtn = createBtn('habraimage', '◄ Показать изображения');
        newImgBtn.on('click', function (event) {event.preventDefault(); contentImgs.toggle();});
    /* Make buton fixed */
        newImgBtn.css({'position':'fixed', 'right': '6%', 'z-index': '1'});
    $('.main_menu').append(newImgBtn);

    /* Add buttons to toggle comments visibility */
    $(document).on('click', '.hidereplies', commentsBtnClick);

    $('.comments_list > .comment_item').each(function(k,comment){
        var replies = $(comment).find('.reply_comments .comment_body');
        if (replies.length > 0) {
            var combody = $(comment).find('.comment_body').first();
            var replylink = $(combody).find('.reply').first();
            if(combody) {
                var newBtn = createBtn('hidereplies', replies.length + declOfNum(replies.length, [' ответ', ' ответа', ' ответов']));
                replylink.append(newBtn);
            }
        }
    });
    /* Fix layout */
    $('.reply').css({'margin-bottom': '1em'});
})();
});
