"use strict";

var dashtag = dashtag || {}

dashtag.main = function() {
  var that = {};
	var dateHelper = dashtag.dateHelper();
	var masonryService = dashtag.masonryService();
  var ajaxService = dashtag.ajaxService();
	var applicationController = dashtag.applicationController({
																														dateHelper : dateHelper,
																														ajaxService : ajaxService,
																														masonryService: masonryService});

 	that.run = function(){
 		masonryService.layOutMasonry();

	  dateHelper.replaceTimestamps($(".time-of-post"));

	  applicationController.setupScroll();

	  ajaxService.setup();

	  applicationController.setupRenderPost();

	  applicationController.setupLoadOlderPosts();
 	}
  return that;
}


