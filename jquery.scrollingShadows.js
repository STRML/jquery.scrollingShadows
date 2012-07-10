/**
 * jQuery Scrolling Shadows plugin.
 *
 * Creates an overlay on top of a given scrolling div. The div must have overflow-y set to auto or scroll.
 * The given 'innerBoxSelector' is the selector for finding the scrollable content.
 *
 * Example usage:
 *
 * $("#viewport").scrollingShadows(".longTextBox");
 *
 * --4/30/12 STRML
 */

(function ($) {
  $.fn.scrollingShadows = function(innerBoxSelector){
    // Scrolling is for ballers only
    if(!($.browser.webkit || $.browser.mozilla))
      return;  // Sorry bros but you've gotta be modern to run this puppy

    var parent = this;
    var innerBox = parent.children(innerBoxSelector);

    parent.siblings(".scrollShadows-overlay").remove();
    parent.unbind("scroll");
    var overlay = $("<span>").addClass("scrollShadows-overlay");
    overlay.css({
        top: parent.position().top + "px",
        height: parent.height() + "px",
        width: parent.width() + "px"
    });


    parent.after(overlay);

    var scrollHandler = function(e){
        // Don't do shadows if there's no scrolling happening
        if(innerBox.height() <= parent.height())
            return;

        var scrollTop = $(this).scrollTop();

        if(scrollTop === 0){
            overlay.addClass("top");
            overlay.removeClass("bottom middle");
        } else if (scrollTop >= (innerBox.height() - parent.height())){
            overlay.addClass("bottom");
            overlay.removeClass("top middle");
        } else {
            overlay.addClass("middle");
            overlay.removeClass("top bottom");
        }
    };

    var throttledScrollHandler = $.throttle(20, scrollHandler);
    parent.scroll(throttledScrollHandler);
    parent.scroll(); // kickoff
  };
})(jQuery);

/*
 * jQuery throttle / debounce - v1.1 - 3/7/2010
 * http://benalman.com/projects/jquery-throttle-debounce-plugin/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function(b,c){var $=b.jQuery||b.Cowboy||(b.Cowboy={}),a;$.throttle=a=function(e,f,j,i){var h,d=0;if(typeof f!=="boolean"){i=j;j=f;f=c}function g(){var o=this,m=+new Date()-d,n=arguments;function l(){d=+new Date();j.apply(o,n)}function k(){h=c}if(i&&!h){l()}h&&clearTimeout(h);if(i===c&&m>e){l()}else{if(f!==true){h=setTimeout(i?k:l,i===c?e-m:e)}}}if($.guid){g.guid=j.guid=j.guid||$.guid++}return g};$.debounce=function(d,e,f){return f===c?a(d,e,false):a(d,f,e!==false)}})(this);