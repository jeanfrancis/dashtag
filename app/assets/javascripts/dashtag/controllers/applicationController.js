"use strict";

var dashtag = dashtag || {}

dashtag.applicationController = function(spec) {
  var that = {};
  var newPostContent = "";
  var active = false;
  var dateHelper = spec.dateHelper;
  var ajaxService = spec.ajaxService;
  var masonryService = spec.masonryService

  var renderPostsForTop = function() {
    if(!active) {
      if($(window).scrollTop() === 0 && newPostContent.length != 0) {
        active = true;
        $('#posts-list').prepend(newPostContent);
        masonryService.layOutMasonry();
        newPostContent = [];
        dateHelper.replaceTimestamps($(".time-of-post"));
        active = false;
      }
    }
  };

  that.setupRenderPost = function() {
    $(ajaxService).on("new-posts", function(e, rawPostData){
      newPostContent = rawPostData
      renderPostsForTop();
    })

    $(window).scroll(function() {
      renderPostsForTop();
    });
  };

  that.setupScroll = function () {
    $('#up').on('click', function(e){

      var target= $('#hashtag-anchor');
      $('html, body').stop().animate({
          scrollTop: target.offset().top
      }, 750);
    });
  };

  that.setupLoadOlderPosts = function() {
    var nextPostModels = [];

    $("#load-posts-btn").on("click", function(){
      ajaxService.getNextPosts();
      $(ajaxService).on("next-posts", function(e, rawPostData){
        $('#posts-list').append(rawPostData);
        dateHelper.replaceTimestamps($(".time-of-post"));
        masonryService.layOutMasonry();
      });

      $(ajaxService).on("next-posts:notmodified", function(){
        $("#loading").empty();
        $("#load-posts-btn").text("There are no more posts!");
      });
    });
  };

  return that;
}
