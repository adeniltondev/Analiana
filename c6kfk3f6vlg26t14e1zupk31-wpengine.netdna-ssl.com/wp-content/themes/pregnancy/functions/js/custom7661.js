jQuery.noConflict();
jQuery(document).ready(function($){
	
	"use strict";
	if( dttheme_urls.loadingbar === "enable") {
		Pace.on("done", function(){
			$(".loader").fadeOut(500);
			$(".pace").remove();
		});
	}
	
	// Section Height
	if( $('.vertical-align-middle').length ) {
		$('.vertical-align-middle').each(function(){
			$(this).css('height', $(this).height() );
		});
	}
	
	if( $('ul.dt-sc-tabs-vertical-frame').length ) {
		$('ul.dt-sc-tabs-vertical-frame').each(function(){
			$(this).css('min-height', $(this).height() );
		});
	}

	if( $('ul.dt-sc-tabs-vertical').length ) {
		$('ul.dt-sc-tabs-vertical').each(function(){
			$(this).css('min-height', $(this).height() );
		});
	}
	
	// <select>	
	$("select").each(function(){
		if($(this).css('display') != 'none') {
			$(this).wrap( '<div class="selection-box"></div>' );
		}
	});

	//To Top...
	$().UItoTop({ easingType: 'easeOutQuart' });

	$('.activity-type-tabs > ul >li:first').addClass('selected');
	$('.dir-form > .item-list-tabs > ul > li:first').addClass('selected');

	/*Menu */
	function megaMenu() {
		var screenWidth = $(window).width(),
		containerWidth = $("#header .container").width(),
		containerMinuScreen = (screenWidth - containerWidth)/2;
		
		if( containerWidth == screenWidth ){

			$("li.menu-item-megamenu-parent .megamenu-child-container").each(function(){

				var ParentLeftPosition = $(this).parent("li.menu-item-megamenu-parent").offset().left,
				MegaMenuChildContainerWidth = $(this).width();

				if( (ParentLeftPosition + MegaMenuChildContainerWidth) > screenWidth ){
					var SwMinuOffset = screenWidth - ParentLeftPosition;
					var marginFromLeft = MegaMenuChildContainerWidth - SwMinuOffset;
					var marginFromLeftActual = (marginFromLeft) + 25;
					var marginLeftFromScreen = "-"+marginFromLeftActual+"px";
					$(this).css('left',marginLeftFromScreen);
				}

			});
		} else {

			$("li.menu-item-megamenu-parent .megamenu-child-container").each(function(){
				var ParentLeftPosition = $(this).parent("li.menu-item-megamenu-parent").offset().left,
				MegaMenuChildContainerWidth = $(this).width();
				
				if( (ParentLeftPosition + MegaMenuChildContainerWidth) > containerWidth ){
					var marginFromLeft = ( ParentLeftPosition + MegaMenuChildContainerWidth ) - screenWidth;
					var marginLeftFromContainer = containerMinuScreen + marginFromLeft + 20;

					if( MegaMenuChildContainerWidth > containerWidth ){
						var MegaMinuContainer	= ( (MegaMenuChildContainerWidth - containerWidth)/2 ) + 10;
						var marginLeftFromContainerVal = marginLeftFromContainer - MegaMinuContainer;
						marginLeftFromContainerVal = "-"+marginLeftFromContainerVal+"px";
						$(this).css('left',marginLeftFromContainerVal);
					} else {
						marginLeftFromContainer = "-"+marginLeftFromContainer+"px";
						$(this).css('left',marginLeftFromContainer);
					}
				}

			});
		}
	}
	
	megaMenu();
	
	$(window).smartresize(function(){
		megaMenu();
	});

	//Menu Hover Animation...
	
	function menuHover() {
		
		$("li.menu-item-depth-0,li.menu-item-simple-parent ul li" ).hover(function(){
			//mouseover 
			if( $(this).find(".megamenu-child-container").length  ){
				$(this).find(".megamenu-child-container").stop().fadeIn('fast');
			} else {
				$(this).find("> ul.sub-menu").stop().fadeIn('fast');
			}
		
		},function(){
			//mouseout
			if( $(this).find(".megamenu-child-container").length ){
				$(this).find(".megamenu-child-container").stop(true, true).hide();
			} else {
				$(this).find('> ul.sub-menu').stop(true, true).hide(); 
			}
		});
	}//Menu Hover End
	
	$("div.dt-video-wrap").fitVids();

	var isMobile = (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i)) || (navigator.userAgent.match(/Android/i)) || (navigator.userAgent.match(/Blackberry/i)) || (navigator.userAgent.match(/Windows Phone/i) || navigator.platform.match(/(Mac|iPhone|iPod|iPad)/i) ) ? true : false;
	
	var currentWidth = window.innerWidth || document.documentElement.clientWidth;
	
	if(typeof dttheme_urls !== 'undefined') {
		
        if (dttheme_urls.nicescroll == "enable") {
            $("html").niceScroll({
                zindex: 999999,
                cursorborder: "1px solid #424242"
            });
        }
		
		
		//v
		//create a stick nav
		/*if(!isMobile && currentWidth > 767) {
			var headerH = 150;
			$(document).bind('ready scroll', function() {
				var docScroll = $(document).scrollTop();
				
				if( docScroll >= headerH && dttheme_urls.stickynav == "enable" ) {
					if (!$('#menu-container').hasClass('header-animate') ) {
						$('#menu-container').removeClass('fadet').addClass('header-animate').css({ top: '-255px' }).stop().animate({ top: 0 }, 500);
					}
				}else {
						$('#menu-container').removeClass('header-animate').removeAttr('style');
				}
			});
		}*/
		
		//Sticky Navigation
		if(! ($('body').hasClass('page-template-tpl-sidenavigation-php')) ) {
			if( isMobile && dttheme_urls.mobilestickynav == "enable" ) {
				$(dttheme_urls.stickyele).sticky({ topSpacing: 0 });
			}
			if( dttheme_urls.stickynav == "enable" && currentWidth > 767 ) {
				$(dttheme_urls.stickyele).sticky({ topSpacing: 0 });
			}
		}
		//v
		
    }

	
	//Mobile Menu
	$("#dt-menu-toggle").click(function( event ){
		event.preventDefault();
		
		var $menu = $("nav#main-menu").find("ul.menu:first");
		$menu.slideToggle(function(){
			$menu.css('overflow' , 'visible');
			$menu.toggleClass('menu-toggle-open');
		});
		
		var $right = $("nav#main-menu").find("ul.menu-right");
		if( $right.length ) {
			$right.slideToggle(function(){
				$right.css('overflow' , 'visible');
				$right.toggleClass('menu-toggle-open');
			});			
		}		
	});

	$(".dt-menu-expand").click(function(){
		if( $(this).hasClass("dt-mean-clicked") ){
			$(this).text("+");
			if( $(this).prev('ul').length ) {
				$(this).prev('ul').slideUp(300);
			} else {
				$(this).prev('.megamenu-child-container').find('ul:first').slideUp(300);
			}
		} else {
			$(this).text("-");
			if( $(this).prev('ul').length ) {
				$(this).prev('ul').slideDown(300);
			} else{
				$(this).prev('.megamenu-child-container').find('ul:first').slideDown(300);
			}
		}
		
		$(this).toggleClass("dt-mean-clicked");
		return false;
	});

	//if( !isMobile ){
		currentWidth = window.innerWidth || document.documentElement.clientWidth;
		if( currentWidth > 767 ){
			menuHover();
		}
	//}
	//Mobile Menu End	
	
	
	//v
		$('.dt-search-icon').on('click', function(event) {
			event.preventDefault();
			$('.search-container').addClass('open');
			$('.search-container > form > input[type="text"]').focus();
		});
		
		$('.search-container, .search-container button.close').on('click keyup', function(event) {
			if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
				$(this).removeClass('open');
			}
		});
	//v
	
	//Blog Template
	if( $(".apply-isotope").length ) {
		var $width = '';
		if( $(".blog-classic").length || $(".blog-grid").length ){
			$width = 30;
		}else{
			$width = 20;
		}
		$(".apply-isotope").isotope({itemSelector : '.column',transformsEnabled:false,masonry: { gutterWidth: $width} });
	}
	
	//Gallery Post Slider
    if( ($("ul.entry-gallery-post-slider").length) && ( $("ul.entry-gallery-post-slider li").length > 1 ) ){
	  	$("ul.entry-gallery-post-slider").bxSlider({auto:false, video:true, useCSS:false, pager:'', autoHover:true, adaptiveHeight:true});
    }

	//Portfolio single
	if( $(".dt-portfolio-single-slider").find("li").length > 1 ) {
		$(".dt-portfolio-single-slider").bxSlider({ auto:false, video:true, useCSS:false, pagerCustom: '#bx-pager', autoHover:true, adaptiveHeight:true, controls:false });
	}
	
	var $pphoto = $('a[data-gal^="prettyPhoto[gallery]"]');
	

	if ($pphoto.length) {
		$pphoto.prettyPhoto({
			hook:'data-gal',
			animation_speed:'normal',
			theme:'light_square',
			slideshow:3000,
			
			autoplay_slideshow: false,
			social_tools: false,
            deeplinking:false
       });		
	}
	
	$('.downcount').each(function(){
		var el = $(this);
		el.downCount({
			date	: el.attr('data-date'),
			offset	: el.attr('data-offset')
		});
	});

	$('.dt-sc-contact-details-on-map a.map-switch-icon').on( "click", function() {
		$('.dt-sc-map-overlay').toggle();
		return false;
	});

	$('.dt-sc-contact-details-on-map a.switch-icon').on( "click", function() {
		$('.dt-sc-map-overlay').toggle();
		$('.back-to-contact').toggle();
		return false;
	});

	$('.dt-sc-contact-details-on-map a.back-to-contact').on( "click", function() {
		$('.dt-sc-map-overlay').toggle();
		$(this).toggle();
		return false;
	});

	//Smart Resize Start
	$(window).smartresize(function(){
		//Blog Template
		if( $(".apply-isotope").length ) {
			var $width = '';
			if( $(".blog-classic").length || $(".blog-grid").length ){
				$width = 30;
			}else{
				$width = 20;
			}
			$(".apply-isotope").isotope({itemSelector : '.column',transformsEnabled:false,masonry: { gutterWidth: $width} });
		}

		//Portfolio Template
		if( $('.dt-sc-portfolio-container').length ) {
			var $width = $('.dt-sc-portfolio-container').hasClass("no-space") ? 0 : 20;
			$('.dt-sc-portfolio-container').css({overflow:'hidden'}).isotope({itemSelector : '.column',masonry: { gutterWidth: $width } });
		}		
	});
	
	
	// Window Load Start
	$(window).load(function(){

		var portfolioHeight = $('.dt-sc-portfolio-wrapper .portfolio:first').height();
		$('.icon-link-title').css('height', portfolioHeight+'px');	
		
		//Blog Template
		if( $(".apply-isotope").length ) {
			var $width = '';
			if( $(".blog-classic").length || $(".blog-grid").length ){
				$width = 30;
			}else{
				$width = 20;
			}
			//alert($width);
			$(".apply-isotope").isotope({itemSelector : '.column',transformsEnabled:false,masonry: { gutterWidth: $width} });
		}
		//Blog Template End
		
		//Portfolio Template : Sorting
		var $container = $('.dt-sc-portfolio-container');
		if( $container.length) {
			var $width = $container.hasClass("no-space") ? 0 : 20;
			
			$container.isotope({
				filter: '*',
				masonry: { gutterWidth: $width },
				animationOptions: { duration: 750, easing: 'linear', queue: false  }
			});
		}//Isotope End
		
		if($("div.dt-sc-portfolio-sorting").length){
			
			$("div.dt-sc-portfolio-sorting a").on('click',function(){
				$("div.dt-sc-portfolio-sorting a").removeClass("active-sort");
				var $width = $container.hasClass("no-space") ? 0 : 20;
				var selector = $(this).attr('data-filter');
				$(this).addClass("active-sort");

				$('.dt-sc-portfolio-container').isotope({
					filter: selector,
					masonry: { gutterWidth: $width },
					animationOptions: { duration:750, easing: 'linear',  queue: false }
				});

				return false;
			});
		}
		//Portfolio Template : Sorting End	
		
		/* Breadcrumb parallax section */
		if($(".dt-sc-breadcrumb-parallax").length) {
			$('.dt-sc-breadcrumb-parallax').each(function(){
				$(this).bind('inview', function (event, visible) {
					if(visible === true) {
						$(this).parallax("50%", 0.5);
					} else {
						$(this).css('background-position', '');
					}
				});
			});
		}	
		
	});

	$(".dt-like-this").click(function(){

		var el = jQuery(this);

		if( el.hasClass('liked') ) {
			return false;
		}

		var post = {
			action: 'pregnancy_like_love',
			post_id: el.attr('data-id')
		};

		$.post(dttheme_urls.ajaxurl, post, function(data){
			el.find('span').html(data);
			el.addClass('liked');
		});
		return false;
	});


	if($('body').hasClass('left-header-creative')) {
		$('#header-wrapper').simpleSidebar({
			opener: '#toggle-sidebar',
			wrapper: '#main',
			animation: {
				easing: "easeOutQuint"
			},
			sidebar: {
				align: 'left',
				width: 260
			},
			sbWrapper: {
				display: true
			}
		});
		
		$('#toggle-sidebar, div[data-simplesidebar="mask"]').click(function(){
			$('#toggle-sidebar').toggleClass('close-icon');
		});		
	}
});

(function() {

	function toggleOverlay() {
		if( classie.has( overlay, 'open' ) ) {
			classie.remove( overlay, 'open' );
			classie.add( overlay, 'close' );
			var onEndTransitionFn = function( ev ) {
				if( support.transitions ) {
					if( ev.propertyName !== 'visibility' ) return;
					this.removeEventListener( transEndEventName, onEndTransitionFn );
				}
				classie.remove( overlay, 'close' );
			};
			if( support.transitions ) {
				overlay.addEventListener( transEndEventName, onEndTransitionFn );
			}
			else {
				onEndTransitionFn();
			}
		}
		else if( !classie.has( overlay, 'close' ) ) {
			classie.add( overlay, 'open' );
		}
	}
	
	if(jQuery('div.overlay.overlay-hugeinc').length) {
	
		var triggerBttn = document.getElementById( 'trigger-overlay' ),
			overlay = document.querySelector( 'div.overlay' ),
			closeBttn = overlay.querySelector( 'div.overlay-close' );
			transEndEventNames = {
				'WebkitTransition': 'webkitTransitionEnd',
				'MozTransition': 'transitionend',
				'OTransition': 'oTransitionEnd',
				'msTransition': 'MSTransitionEnd',
				'transition': 'transitionend'
			},
			transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
			support = { transitions : Modernizr.csstransitions };
			
		triggerBttn.addEventListener( 'click', toggleOverlay );
		closeBttn.addEventListener( 'click', toggleOverlay );
	}
	
})();