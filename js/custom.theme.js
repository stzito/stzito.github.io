var JS_PATH = "js";

(function($){

    "use strict"; 
	
	var themeData                    = [];
	var parallaxImages               = [];
	
	//window
	themeData.win                    = $(window);
	themeData.winHeight              = themeData.win.height();
	themeData.winScrollTop           = themeData.win.scrollTop();
	themeData.winHash                = window.location.hash.replace('#', '');
	themeData.stateObject            = {};
	
	//document
	themeData.doc                    = $(document);
	themeData.docHeight              = themeData.doc.height();

	//ID A~Z
	themeData.backTop                = $('#back-top');
	themeData.footer                 = $('#footer');
	themeData.headerWrap             = $('#header');
	themeData.header                 = $('#header-main');
	themeData.MenuOverPanel          = $('#mobile-panel');
	themeData.MenuOverTrigger        = $('#navi-trigger');
	themeData.jplayer                = $('#jquery_jplayer');
	themeData.logo                   = $('.navi-logo'); 
	themeData.navi                   = $('#navi'); 
	themeData.container              = $('#wrap');
	themeData.WrapOurter             = $('#wrap-outer');
	themeData.searchOpen             = $('.search-top-btn-class');
	themeData.socialHeader           = $('#social-header-out'); 
	themeData.contentWrap            = $('#content_wrap');
	themeData.TopsliderTrggleDown    = $('#ux-slider-down');

	//tag
	themeData.body                   = $('body');
	
	//tag class
	themeData.carousel               = $('.owl-carousel');
	themeData.uxResponsive           = $('body.responsive-ux');
	themeData.headerNaviMenu         = themeData.header.find('#navi ul.menu');
	themeData.galleryCollage         = $('section.Collage');
	
	//class
	themeData.audioUnit              = $('.audio-unit');
	themeData.pageLoading            = $('.page-loading'); 
	themeData.lightboxPhotoSwipe     = $('.lightbox-photoswipe');
	themeData.Menu                   = $('.menu');
	themeData.pagenumsDefault        = $('.pagenums-default'); 
	themeData.tooltip                = $('.tool-tip');
	themeData.searchForm             = $('.search-overlay-form');
	themeData.titlecon               = $('.title-wrap-con');
	themeData.isotope                = $('.container-masonry');
	themeData.isotope_filter         = themeData.isotope.find('.filters');
	
	themeData.videoFace              = $('.blog-unit-img-wrap, .archive-item');
	themeData.videoOverlay           = $('.video-overlay');
	
	themeData.blogPagenumsTwitter    = $('.blog-list .pagenums.page_twitter a');
	themeData.blogPagenumsSelect     = $('.blog-list .pagenums .select_pagination, .magzine-list .pagenums .select_pagination');
	
	themeData.listLayout             = $('.list-layout');
	themeData.singleGalleryFilled    = $('.single-gallery-wrap-inn[data-style="filled"]');
	themeData.singleGalleryListWrap  = $('.ux-portfolio-ajaxed-list-wrap');
	themeData.singleGalleryList      = $('.ux-portfolio-ajaxed-list');
	
	//define
	themeData.globalFootHeight       = 0;
	themeData.itemParallax           = [];
	
	var footer_visible = false;
	var resizeTimer = null;
	
	//condition
	themeData.isResponsive = function(){
		if(themeData.uxResponsive.length){
			return true;
		}else{
			return false;
		} 
	}
	
	var switchWidth = 767;
	
	
	themeData.isMobile = function(){
		if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || themeData.win.width() < switchWidth){
			return true; 
		}else{
			return false;
		}
	}

	var ios = navigator.userAgent.match(/(iPod|iPhone|iPad)/);

	function get_browser(){
	    var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []; 
	    if(/trident/i.test(M[1])){
	        tem=/\brv[ :]+(\d+)/g.exec(ua) || []; 
	        return {name:'IE',version:(tem[1]||'')};
	        }   
	    if(M[1]==='Chrome'){
	        tem=ua.match(/\bOPR\/(\d+)/)
	        if(tem!=null)   {return {name:'Opera', version:tem[1]};}
	        }   
	    M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
	    if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
	    return {
	      name: M[0],
	      version: M[1]
	    };
	}

	var ux_browser = get_browser();

	themeData.body.addClass(ux_browser.name + ux_browser.version);
	
	//Resign Velocity custom aniamtion effect - for menu icon
	$.Velocity.RegisterEffect("scaleXin", {
	    defaultDuration: 100,
	    calls: [
	        [ { scaleX: 1.333 } ] 
	    ]
	});


	//Function 

	// Top slider Triggle Down Click
	themeData.TopsliderTrggleDownFn = function(){

		var _border = 0;

		if ($('.border10px').length) {
			_border = 20;
		} else if ($('.border20px').length) {
			_border = 40;
		} else if ($('.border30px').length) {
			_border = 60;
		} else if ($('.border40px').length) {
			_border = 80;
		}

		var _win_real_h = themeData.win.height() - _border;

		themeData.TopsliderTrggleDown.on({'touchstart click': function(){ 
			$('html, body').animate({scrollTop:_win_real_h}, 400);
		}});
	}

	//Calc Fullscreen wrap / slider Height  
	themeData.fnFullscreenWrapHeight = function(){ 
		if (!Modernizr.cssvhunit) {
			if($('.fullscreen-wrap').length) {
				$('.fullscreen-wrap').each(function(){
					$(this).css('height',themeData.win.height());
				});
			}
		}
	}

	// Top slider
	themeData.carouselFn = function(carouselWrap){

		carouselWrap.each(function(){

			var 
			_carousel 	= $(this),
			_margin   	= $(this).data('margin'),
			_center   	= $(this).data('center'),
			_item    	= $(this).data('item'),
			_autoW   	= $(this).data('autowidth'),
			_slideby  	= $(this).data('slideby'),
			_auto    	= $(this).data('auto'),
			_showdot  	= $(this).data('showdot'),
			_shownav  	= $(this).data('nav'),
			_animateIn 	= $(this).data('animatein'),
			_animateOut = $(this).data('animateout'),
			_loop		= $(this).data('loop'),
			_lazyLoad   = $(this).data('lazy');
 
				setTimeout(function(){
					if(_lazyLoad){

						if(themeData.body.hasClass('single-portfolio-fullwidth-slider')){
							_carousel.on('refreshed.owl.carousel', function (e) {
								_carousel.find('.owl-item').each(function(){ 
									if($(this).hasClass('cloned')){
										var data_src = $(this).find('img').data('src');
										$(this).find('img').attr('src', data_src);
									}
								});
							});
						}

					}
					_carousel.owlCarousel({
					    margin: _margin,
					    loop: _loop,
					    autoWidth:_autoW,
					    center: _center,
					    animateIn: _animateIn,
					    animateOut: _animateOut,
					    slideSpeed : 300,
			            paginationSpeed : 400,
					    items: _item,
					    autoplay: _auto,
					    responsiveClass:true,
					    navText:["",""],
					    slideBy:_slideby,
					    dots:_showdot, 
					    nav:_shownav,
					    responsive:{
					        0:{
					            items:_item,
					            nav:_shownav
					        },
					        480:{
					            items:_item,
					            nav:_shownav
					        },
					        769:{
					            items:_item,
					            nav:_shownav 
					        }
					    }
					});

					if(themeData.body.hasClass('single-portfolio-fullscreen-slider')){
						_carousel.on('mousewheel', '.owl-stage', function (e) {
							if(themeData.win.scrollTop() == 0){
							    if (e.deltaY>0) {
							        _carousel.trigger('prev.owl');
							    } else {
							        _carousel.trigger('next.owl');
							    }
							    e.preventDefault();
							}
						}); 
					}

					if(_lazyLoad){
						_carousel.on('translated.owl.carousel', function(event){
							if(Number(_item) > 1){
								var current_items = $(event.target).find('.owl-item.active, .owl-item.cloned');
								current_items.each(function(){
                                    var current_item = $(this);
									var current_item_img = current_item.find('img');
									var current_item_img_bg = current_item_img.attr('data-src');
									
									if(current_item_img_bg){
										current_item_img.addClass('lazy-loaded').attr('src', current_item_img_bg);
										current_item_img.removeAttr('data-src');
									}
                                });
							}else{
								var current_item = $(event.target).find('.owl-item.active');
								var current_item_img = current_item.find('.carousel-img-wrap');
								var current_item_img_bg = current_item_img.attr('data-bg');
								
								if(current_item_img_bg){
									current_item_img.addClass('lazy-loaded').css('background-image', 'url("' +current_item_img_bg+ '")');
									current_item_img.removeAttr('data-bg');
								}
							}
						})
					}

				},10)


		});
	}

	//Search show
	themeData.fnSerchShow = function(){

		var 
		_search_btn = themeData.searchOpen.find('.fa-search'),
		_search_form = _search_btn.siblings('form');

		_search_btn.click(function(){

			if(_search_form.hasClass('search_top_form_shown')){
				_search_form.removeClass('search_top_form_shown');
				_search_form.find('.search_top_form_text').blur();
				$('.menu-panel-bottom-right').css('opacity','1');
			} else {
				_search_form.addClass('search_top_form_shown');
				_search_form.find('.search_top_form_text').focus();
				$('.menu-panel-bottom-right').css('opacity','0');
			}
			return false;
			 
		});

	}

	//Responsive Mobile Menu function
	themeData.fnResponsiveMenu = function(){ 
						
		if(themeData.win.width() > switchWidth) {
			themeData.body.removeClass('ux-mobile');
		} else {
			themeData.body.addClass('ux-mobile');
		}
		
		themeData.win.resize(function(){
			
			if(themeData.win.width() > switchWidth) {
				themeData.body.removeClass('ux-mobile');
			} else {
				themeData.body.addClass('ux-mobile');
			}

		});

		if(themeData.MenuOverTrigger.length){
			themeData.MenuOverTrigger.velocity("transition.fadeIn");

			themeData.MenuOverTrigger.hover(function(){
				$('.navi-trigger-hamberg-line').velocity("scaleXin", { stagger: 100 });
			},function(){
				$('.navi-trigger-hamberg-line').velocity({ scaleX : 1 });
			});
		}

		if($('#woocomerce-cart-side').length) {
			$('#woocomerce-cart-side').velocity("transition.fadeIn");
		}

		var $post_logo_color = false;

		if(themeData.body.hasClass('light-logo')){
			$post_logo_color = 'light-logo';
		} else if(themeData.body.hasClass('dark-logo')){
			$post_logo_color = 'dark-logo';
		}  

		themeData.MenuOverTrigger.click(function(){

			if(themeData.body.is('.show_mobile_menu')){

				setTimeout(function() {
					if(themeData.body.hasClass('show_mobile_menu')) {
						themeData.body.removeClass('show_mobile_menu');
					}

					setTimeout(function() { 
						themeData.body.addClass($post_logo_color);
					},1000);
					
					if($('#navi-wrap .sub-menu').length) {
						$('#navi-wrap .sub-menu').velocity("transition.fadeOut");
						$('#navi-wrap .sub-menu').siblings('a').css('display','inline-block');
						$('#navi-wrap > ul > li').velocity("transition.fadeIn"); 
					}

					if(themeData.footer.length) { 
						if(!footer_visible) {
							setTimeout(function() {
								themeData.footer.css('visibility','visible');
							},200);
							footer_visible = true;
						}
					}
				},10);

			}else{

				setTimeout(function() {
					if(!themeData.body.hasClass('show_mobile_menu')) {
						if(themeData.win.scrollTop() > 1){
							$('html, body').animate({scrollTop:0}, 200,function(){
								themeData.body.addClass('show_mobile_menu');
							});
						} else {
							themeData.body.addClass('show_mobile_menu');
						}
					}

					setTimeout(function() { 
						if(themeData.body.hasClass('light-logo')){
							themeData.body.removeClass('light-logo');
						}
						if(themeData.body.hasClass('dark-logo')){
							themeData.body.removeClass('dark-logo');
						}
					},1000);

					if(themeData.footer.length) {
						if(footer_visible) {
							themeData.footer.css('visibility','hidden');
							footer_visible = false;
						}
					}
				},10); 
			}
			return false;
        });

        window.addEventListener('scroll', function() {

			if(themeData.body.is('.show_mobile_menu')){
				if(themeData.win.scrollTop() > 200){
					setTimeout(function() { 
						themeData.body.addClass($post_logo_color);
					},1000);
					setTimeout(function() {
						themeData.body.removeClass('show_mobile_menu');
						if(themeData.footer.length) { 
							if(!footer_visible) {
								setTimeout(function() {
									themeData.footer.css('visibility','visible');
								},200);
								footer_visible = true;
							}
						}
						if($('#navi-wrap .sub-menu').length) {
							$('#navi-wrap .sub-menu').velocity("transition.fadeOut");
							$('#navi-wrap .sub-menu').siblings('a').css('display','inline-block');
							$('#navi-wrap > ul > li').velocity("transition.fadeIn"); 
						}
					},10);
				}
			} 
        }, false);

		if(themeData.navi.length) {
			themeData.fnSubMenu();
		}
	
    }

    //Back top
	themeData.fnBackTop = function(){
		
		themeData.win.find('img').imagesLoaded(function(){

			themeData.win.scroll(function(){

				if(themeData.win.scrollTop() > 200){
					if(!themeData.backTop.hasClass('backtop-shown')) {
					 	themeData.backTop.addClass('backtop-shown');
					}
				} else {
					if(themeData.backTop.hasClass('backtop-shown')) {
					 	themeData.backTop.removeClass('backtop-shown');
					}
				}
			});

			var BacktopBottom = themeData.footer.find('.footer-info').height() - 50;

		});

	}

    //Video cover title show & hide
	themeData.fnVideocoverTitle = function(){
		
		themeData.win.scroll(function(){
			themeData.winScrollTop = themeData.win.scrollTop();
			if(themeData.winScrollTop > 100){
				if(!themeData.titlecon.hasClass('witle-wrap-con-shown')) {
				 	themeData.titlecon.addClass('witle-wrap-con-shown');
				}
				
			}else{
				if(themeData.titlecon.hasClass('witle-wrap-con-shown')) {
					themeData.titlecon.removeClass('witle-wrap-con-shown');
				}
				
			}
		});
	}
	//audio player function
	themeData.fnJplayerCall = function(){
		if(themeData.jplayer.length){
			themeData.jplayer.jPlayer({
				ready: function(){
					$(this).jPlayer("setMedia", {
						mp3:""
					});
				},
				swfPath: JS_PATH,
				supplied: "mp3",
				wmode: "window"
			});
			
			$('.audiobutton').each(function(){
                themeData.fnAudioPlay($(this));
            });
		}
	}
	
	//call player play
	themeData.fnAudioPlay = function(el){
		el.click(function(){
			var thisID = $(this).attr("id");
			if($(this).hasClass('pause')){
				$('.audiobutton').removeClass('play').addClass('pause');
				$(this).removeClass('pause').addClass('play');
				themeData.jplayer.jPlayer("setMedia", {
					mp3: $(this).attr("rel")
				});
				themeData.jplayer.jPlayer("play");
				themeData.jplayer.bind($.jPlayer.event.ended, function(event) {
					$('#'+thisID).removeClass('play').addClass('pause');
				});
			}else if($(this).hasClass('play')){
				$(this).removeClass('play').addClass('pause');
				themeData.jplayer.jPlayer("stop");
			}
		});
	}
	
	//video face
	themeData.fnVideoFace = function(arrayVideo){
		arrayVideo.each(function(){
			var videoFace = [];
			var videoOverlay = [];
			
			videoFace.item = $(this);
			videoFace.playBtn = videoFace.item.find('.blog-unit-video-play');
			videoFace.videoWrap = videoFace.item.find('.video-wrap');
			videoFace.videoIframe = videoFace.videoWrap.find('iframe');
			
			videoOverlay.item = themeData.videoOverlay;
			videoOverlay.videoWrap = videoOverlay.item.find('.video-wrap');
			videoOverlay.close = videoOverlay.item.find('.video-close');
			
			videoFace.playBtn.click(function(){
				var src = videoFace.videoIframe.attr('data-src').replace('autoplay=0', 'autoplay=1');
				videoFace.videoIframe.attr('src', src);
				videoOverlay.close.before(videoFace.videoWrap.removeClass('hidden').attr('style', 'height:100%;padding-bottom:0px;'));
				videoOverlay.item.addClass('video-slidedown'); 
				return false;
			});
			
			videoOverlay.close.click(function(){
				videoOverlay.item.removeClass('video-slidedown');
				videoOverlay.item.find('.video-wrap').remove(); 
				return false;
			});
		});
	}
	
	//Module Load Ajax
	themeData.fnModuleLoad = function(data, container){
		$.post(AJAX_M, {
			'mode': 'module',
			'data': data
		}).done(function(content){ 
			var newElems = $(content); 
			switch(data['mode']){
				case 'pagenums': 
					var this_pagenums = container.find('a[data-post=\"'+data["module_post"]+'\"][data-paged=\"'+data["paged"]+'\"]');
					
					this_pagenums.text(data["paged"]);
					$('html,body').animate({
						scrollTop: container.parent().offset().top - 80
					},
					1000); 
	
					container.parent().find('section').remove();
					container.before(newElems);
				break;
				case 'twitter': 
					var this_twitter = container.find('a[data-post=\"'+data["module_post"]+'\"]');
					var pagination_text = this_twitter.parent('.page_twitter').data('pagetext');
	
					this_twitter.attr('data-paged',Number(data['paged']) + 1).text(pagination_text).removeClass('tw-style-loading');
	
					if(data['paged'] == this_twitter.data('count')){
						this_twitter.fadeOut(300);
						this_twitter.parent('.page_twitter').css('margin-top','0');
					}
	
					container.before(newElems);
				break;
			}
			
			//Fadein theitems of next page 
			newElems.animate({opacity:1}, 1000); 
			
			//gallery
			themeData.gallerycarousel = $('.blog-gallery-carousel');
			if(themeData.gallerycarousel.length){
				themeData.fnGalleryCarousel();
			}
			
			if(newElems.find('.audio_player_list').length){	
	
				//Audio player
				themeData.fnJplayerCall();
				themeData.jplayer.jPlayer("stop");
				themeData.audioPlayClick(newElems);
				themeData.audioPauseClick(newElems);
			
			}
			
			//Video play
			if(newElems.find('.blog-unit-video-play').length){
				themeData.fnVideoFace(newElems.find('.blog-unit-img-wrap'));
				themeData.fnVideoFace(newElems.find('.archive-item'));
			}
	
			//gallery list
			if(newElems.find('.Collage').length){
				$('.Collage').imagesLoaded(function(){ 
					$('.Collage').collagePlus({
						'fadeSpeed'     : 2000,
						'targetHeight'  : 200
					});
				});
			}
			
			//call carousel
			if(newElems.find('.owl-carousel').length){
				themeData.carouselFn(newElems.find('.owl-carousel'));
			}
	
		});
	}
	
	//gallery collage
	themeData.fnGalleryCollage = function(collageWrap){
		collageWrap.collagePlus({
			'fadeSpeed'     : 2000,
			'targetHeight'  : 200
		});
	}
	 
	
	//List Layout Height
	themeData.fnListLayoutHeight = function(){
		themeData.listLayout.find('.list-layout-col2, .list-layout-col3, .list-layout-col4').each(function(){
			var layoutGetmin = new Array();
			var changeColWidthSum = 0;
			var base = 1;
			var lastWidthSum = 0;
			var colItems = $(this).find('.list-layout-item');
			var colWidth = $(this).width();
			var colCount = colItems.length;
			var colGap = Number(themeData.listLayout.data('gap'));

			colItems.each(function(){
				
				var thisWidth = $(this).width();
				
                layoutGetmin.push(Number($(this).find('img').attr('height')));
				if(colWidth != thisWidth){
					colWidth = colWidth - colGap;
				}
            }); 
			
			var itemHeight = eval("Math.min("+layoutGetmin.toString()+")");
			colItems.each(function(index){
				var imgWidth = parseFloat(Number($(this).find('img').attr('width')));
				var imgHeight = parseFloat(Number($(this).find('img').attr('height')));
				var imgBase = itemHeight / imgHeight;
				
				imgWidth = imgWidth * imgBase;
				imgHeight = itemHeight;
				
				changeColWidthSum = changeColWidthSum + imgWidth;
			});
			
			base = colWidth / changeColWidthSum;
			
			colItems.each(function(){
				var imgWidth = parseFloat(Number($(this).find('img').attr('width')));
				var imgHeight = parseFloat(Number($(this).find('img').attr('height')));
				var imgBase = itemHeight / imgHeight;
				var thisWidth = $(this).width();
				
				imgWidth = (imgWidth * imgBase) * base; 
				imgHeight = itemHeight * base;
				
				if(colWidth != thisWidth){
					$(this).css('width', 'auto');
					
					$(this).find('.ux-lazyload-wrap').css({
						'width': imgWidth,
						'height': imgHeight,
						'overflow': 'hidden'
					});
					
					$(this).find('img').css({
						'width': '100%',
						'height': 'auto'
					});
					
					lastWidthSum = lastWidthSum + imgWidth;
					if(Math.round(lastWidthSum) > colWidth){
						$(this).find('.ux-lazyload-wrap').width(imgWidth - (lastWidthSum - colWidth));
					}else if(Math.round(lastWidthSum) == colWidth){
						$(this).find('.ux-lazyload-wrap').css({
							'width': imgWidth - 1
						});
					}
				}else{
					$(this).find('.ux-lazyload-wrap').css({
						'width': 'auto',
						'height': 'auto',
						'overflow': 'hidden'
					});
				}
			});
		});
	}

	//Isotope
	themeData.isotopelist = function(){

		themeData.isotope.each(function(){

			var _this_wrap 	  = $(this),
				_this 		  = $(this).find('.masonry-list'),
				_this_wrap_st = $(this).scrollTop(),
				_this_wrap_pt = $(this).attr('data-template');

			if(_this.hasClass('grid-list')) {

				if(_this_wrap.data('spacer') == '0') {
					themeData.isotopelistResize(_this, _this_wrap);
				}

				var $iso_list =  _this.isotope({
					itemSelector: '.grid-item',
					layoutMode: 'packery',
					layoutMode: 'fitRows'
				});


			} else {

				if(_this.hasClass('masonry-grid')) {
					themeData.isotopelistResize(_this, _this_wrap);
				}

				var $iso_list =  _this.isotope({ 
					itemSelector: '.grid-item',
					layoutMode: 'packery' 
					
				}); 
			}

			if(_this_wrap.find('.filters').length) {
				var _filters = _this_wrap.find('.filters');
				_filters.find('a').on( 'click', function() {
					var filterValue = $( this ).attr('data-filter');
					$iso_list.isotope({ filter: filterValue }); 
					jQuery(this).parent().parent().find('li').removeClass('active');
					jQuery(this).parent().addClass('active');
					setTimeout(function() {
						$(window).lazyLoadXT();
						$iso_list.find('.grid-item-inside').addClass('grid-show'); 
					}, 50);
					return false;
				});

				if(_this_wrap.find('.grid-item-cate-a').length) {
					$('.grid-item-cate-a').each(function(){
						$(this).on( 'click', function() {
							var filterValue = $( this ).attr('data-filter');
							$iso_list.isotope({ filter: filterValue });
							_filters.find('li').removeClass('active');
							_filters.find('[data-filter="'+filterValue+'"]').parent().addClass('active');
							setTimeout(function() {
								$(window).lazyLoadXT();
								$iso_list.find('.grid-item-inside').addClass('grid-show'); 
							}, 50);
							return false;
						});
					});
				} 
			}
			
			//call page load more
			if(_this_wrap.find('.ux-page-load-more').length){
				var loadBtn = _this_wrap.find('.ux-page-load-more');
				var postID = loadBtn.attr('data-pageid');
				var postMAX = loadBtn.attr('data-max');
				var pageText = loadBtn.parent().attr('data-pagetext');
				var loadingText = loadBtn.parent().attr('data-loadingtext');

				loadBtn.click(function(){
					var paged = loadBtn.attr('data-paged');
					var filters = _this_wrap.find('.filters');
					var filterActive = filters.find('li.active');
					var filterValue = filterActive.find('> a').attr('data-filter');
					var catID = filterActive.find('> a').attr('data-catid');
					var postCount = Number(filterActive.find('.filter-num').text());
					
					if(filterValue == '*'){
						catID = 0;
					}
					
					var post__not_in = [];
					$iso_list.find('section').each(function(){
						var section_postid = $(this).attr('data-postid');
						if(filterValue != '*'){
							if($(this).is(filterValue)){
								post__not_in.push(section_postid);
							}
						}else{
							post__not_in.push(section_postid);
						}
					});
					
					loadBtn.text(loadingText);

					if(!_this.hasClass('loading-more')){
						_this.addClass('loading-more');
						$.post(ajaxurl, {
							'action': 'airtheme_interface_page_ajax_filter',
							'cat_id': catID,
							'post_id': postID,
							'post__not_in': post__not_in
						}).done(function(content){
							$iso_list.isotope('insert', $(content));
							if(_this.hasClass('masonry-grid')) {
								themeData.isotopelistResize(_this, _this_wrap);
								$iso_list.isotope('layout');
							}
							
							loadBtn.text(pageText);
							_this.removeClass('loading-more');
							
							var thisPostCount = $iso_list.find('section').length;
							if(filterValue != '*'){
								thisPostCount = $iso_list.find('section' +filterValue).length;
							}
							//console.log(thisPostCount); console.log(postCount);
							if(thisPostCount >= postCount){
								loadBtn.parent().hide();
							}else{
								loadBtn.parent().show();	
							}
							
							setTimeout(function() {
								$(window).lazyLoadXT();
								$iso_list.find('.grid-item-inside').addClass('grid-show');
							}, 50);
						});
					}
					
					return false;
				});
			}
			
			//call infiniti scroll
			if(_this.hasClass('infiniti-scroll')){
				var postID = _this.attr('data-pageid');
				var postMAX = _this.attr('data-max');
				
				var waypoints = _this.waypoint({
					handler: function(direction){
						var paged = _this.attr('data-paged');
						var filters = _this_wrap.find('.filters');
						var filterActive = filters.find('li.active');
						var filterValue = filterActive.find('> a').attr('data-filter');
						var catID = filterActive.find('> a').attr('data-catid');
						var postCount = Number(filterActive.find('.filter-num').text());
						
						var post__not_in = [];
						$iso_list.find('section').each(function(){
							var section_postid = $(this).attr('data-postid');
							if(filterValue != '*'){
								if($(this).is(filterValue)){
									post__not_in.push(section_postid);
								}
							}else{
								post__not_in.push(section_postid);
							}
						});
						
						if(!_this.hasClass('infiniti-scrolling')){
							_this.addClass('infiniti-scrolling');
							$.post(ajaxurl, {
								'action': 'airtheme_interface_page_ajax_filter',
								'cat_id': catID,
								'post_id': postID,
								'post__not_in': post__not_in
							}).done(function(content){
								$iso_list.isotope('insert', $(content));
								if(_this.hasClass('masonry-grid')) {
									themeData.isotopelistResize(_this, _this_wrap);
									
									$iso_list.isotope('layout');
								}
								
								_this.removeClass('infiniti-scrolling');
								
								setTimeout(function() {
									$(window).lazyLoadXT();
									$iso_list.find('.grid-item-inside').addClass('grid-show');
								}, 50);

							});
						}
					},
					offset: 'bottom-in-view'
				})
			}
			
			if(_this_wrap.find('.filters').length) {
				 
				if(_this_wrap.find('.grid-item-cate-a').length) {
					$('.grid-item-cate-a').each(function(){
						$(this).on( 'click', function() {
							var filterValue = $( this ).attr('data-filter');
							$iso_list.isotope({ filter: filterValue });
							_filters.find('li').removeClass('active');
							_filters.find('[data-filter="'+filterValue+'"]').parent().addClass('active');
							return false;
						});
					});
				} 
			}

			if(_this.hasClass('masonry-grid')) {
				themeData.win.on( 'resize', function () {
					themeData.isotopelistResize(_this, _this_wrap);
				}).resize(); 
			}

		});
	} 
	
	themeData.isotopelistResize = function(_this, _this_wrap){
		var winWidth   = window.innerWidth,
			ListWidth  = _this.width(),
			GridSpacer = _this_wrap.data('spacer'),
			columnNumb = _this_wrap.data('col'),
			GridWith   = Math.floor(ListWidth / columnNumb);    

		if (winWidth >= 768) { 

			_this.find('.grid-item').each(function () { 
				$('.grid-item').css({ 
					width : GridWith * 1 - GridSpacer + 'px',
					height : GridWith * 0.75 - GridSpacer + 'px',
					margin : GridSpacer * 0.5 + 'px' 
				});
				$('.grid-item .ux-lazyload-wrap').css(
					"padding-top", ((GridWith * 0.75 - GridSpacer)/(GridWith * 1 - GridSpacer)) * 100 + '%'
				); 
				$('.grid-item.grid-item-big').css({ 
					width : GridWith * 2 - GridSpacer + 'px',
					height : GridWith * 1.5 - GridSpacer + 'px',
					margin : GridSpacer * 0.5 + 'px' 
				});
				$('.grid-item.grid-item-big .ux-lazyload-wrap').css(
					"padding-top", ((GridWith * 1.5 - GridSpacer)/(GridWith * 2 - GridSpacer)) * 100 + '%'
				); 
				$('.grid-item.grid-item-long').css({ 
					width : GridWith * 2 - GridSpacer + 'px',
					height : GridWith * 0.75 - GridSpacer + 'px',
					margin : GridSpacer * 0.5 + 'px' 
				});
				$('.grid-item.grid-item-long .ux-lazyload-wrap').css(
					"padding-top", ((GridWith * 0.75 - GridSpacer)/(GridWith * 2 - GridSpacer)) * 100 + '%'
				); 
				$('.grid-item.grid-item-tall').css({ 
					width : GridWith * 1 - GridSpacer + 'px',
					height : GridWith * 1.5 - GridSpacer + 'px',
					margin : GridSpacer * 0.5 + 'px' 
				});
				$('.grid-item.grid-item-tall .ux-lazyload-wrap').css(
					"padding-top", ((GridWith * 1.5 - GridSpacer)/(GridWith * 1 - GridSpacer)) * 100 + '%'
				); 

			});

		} else {
			
			GridWith = Math.floor(ListWidth / 1);

			_this.find('.grid-item.grid-item-small').each(function () { 
				$('.grid-item').css({ 
					width : GridWith * 1 - GridSpacer + 'px',
					height : GridWith * 0.75 - GridSpacer + 'px',
					margin : GridSpacer * 0.5 + 'px' 
				});
				$('.grid-item .ux-lazyload-wrap').css(
					"padding-top", ((GridWith * 0.75 - GridSpacer)/(GridWith * 1 - GridSpacer)) * 100 + '%'
				); 
				$('.grid-item.grid-item-big').css({ 
					width : GridWith * 1 - GridSpacer + 'px',
					height : GridWith * 0.75 - GridSpacer + 'px',
					margin : GridSpacer * 0.5 + 'px' 
				});
				$('.grid-item.grid-item-big .ux-lazyload-wrap').css(
					"padding-top", ((GridWith * 0.75 - GridSpacer)/(GridWith * 1 - GridSpacer)) * 100 + '%'
				); 
				$('.grid-item.grid-item-long').css({ 
					width : GridWith * 1 - GridSpacer + 'px',
					height : GridWith * 0.375 - GridSpacer + 'px',
					margin : GridSpacer * 0.5 + 'px' 
				});
				$('.grid-item.grid-item-long .ux-lazyload-wrap').css(
					"padding-top", ((GridWith * 0.75 - GridSpacer)/(GridWith * 2 - GridSpacer)) * 100 + '%'
				); 
				$('.grid-item.gird-item-tall').css({ 
					width : GridWith * 1 - GridSpacer + 'px',
					height : GridWith * 1.5 - GridSpacer + 'px',
					margin : GridSpacer * 0.5 + 'px' 
				});
				$('.grid-item.gird-item-tall .ux-lazyload-wrap').css(
					"padding-top", ((GridWith * 1.5 - GridSpacer)/(GridWith * 1 - GridSpacer)) * 100 + '%'
				); 

			});	
		}
	}

	// Header & Filter sticky

	themeData.header_sticky = function(){ 

		var lastScrollTop = 0, delta = 5;

		themeData.win.bind('scroll', function() {

			var st = $(this).scrollTop();
			
			if(Math.abs(lastScrollTop - st) <= delta) return; 

			if (st > lastScrollTop){
				//scroll down
				if(themeData.body.hasClass('header-scrolled')){
					themeData.body.removeClass('header-scrolled');
				}
				if(!themeData.body.hasClass('header-scrolling') && st > 0 ){
					themeData.body.addClass('header-scrolling');
				}

			} else {
				//scroll up
				if( st > 10 ){
					if(!themeData.body.hasClass('header-scrolled')){
						themeData.body.addClass('header-scrolled');
					}
				} else {
					if(themeData.body.hasClass('header-scrolled')){
						themeData.body.removeClass('header-scrolled');
					}
				}
				if(themeData.body.hasClass('header-scrolling')){
					themeData.body.removeClass('header-scrolling');
				}

			}

			lastScrollTop = st;
		});

	}
	
	//Single Gallery Filled
	themeData.fnSingleGalleryFilled = function(){
		var singleCol2TextWrap = $('.single-col2-text-wrap');
		var singleCol2GalleryWrap = $('.single-col2-gallery-wrap');
		var singleCol2GalleryWrapLeft = singleCol2GalleryWrap.css('padding-left');
		var singleCol2GalleryWrapRight = singleCol2GalleryWrap.css('padding-right');
		var singleGalleryWrapInn = $('.single-gallery-wrap-inn');
		var singleArticle = themeData.contentWrap.find('> article');
		var singleArticleLeft = singleArticle.css('margin-left');
		var singleArticleRight = singleArticle.css('margin-right');
		
		if(singleCol2TextWrap.is('.pull-right')){
			$('.single-gallery-wrap-inn').css('margin-left', '0px').velocity({ opacity : 1 });
			var singleGalleryLeft = Number(singleArticleLeft.replace('px', '')) + Number(singleCol2GalleryWrapLeft.replace('px', ''));
			singleGalleryWrapInn.css({
				'margin-left': '-' + singleGalleryLeft + 'px'
			});
		}else{
			$('.single-gallery-wrap-inn').css('margin-right', '0px').velocity({ opacity : 1 });
			var singleGalleryRight = Number(singleArticleRight.replace('px', '')) + Number(singleCol2GalleryWrapRight.replace('px', ''));
			singleGalleryWrapInn.css({
				'margin-right': '-' + singleGalleryRight + 'px'
			});
			
		}
		
		themeData.fnListLayoutHeight();
	}
	
	//fix Lazy with filter
	if(themeData.isotope_filter.length) {
		$.lazyLoadXT.updateEvent+=' layoutComplete';
	}

	//Sub Menu
	themeData.fnSetMenuLevel = function(index, el){
		if(el){
			el.each(function(i){
				$(this).addClass('level-' +index);
				if($(this).hasClass('menu-item-has-children')){
					themeData.fnSetMenuLevel(index + 1, $(this).find('> .sub-menu > li'));
				}
			});
		}
	}

	themeData.fnSubMenu = function() {
		themeData.NaviWrapMobile = $('#menu-panel .menu');
		themeData.fnSetMenuLevel(1, themeData.NaviWrapMobile.find('> li'));
		
		themeData.NaviWrapMobile.find('li').each(function(index){
			var _this = $(this),
			    _this_link = _this.find('> a');
			
			if(_this.hasClass('menu-item-has-children')){

				_this.find('> .sub-menu').prepend('<li class="menu-item-back"><a href="#" class="menu-item-back-a archive-arrow"><span class="archive-arrow-inn"></span></a></li>');
				_this_link.append('<span class="submenu-icon"></span>');
				
				_this_link.click(function(){
					themeData.NaviWrapMobile.find('li').velocity("transition.slideLeftOut",200, function() {
					    _this_link.hide();
				        _this_link.next().velocity("transition.slideLeftIn", 100);
				        _this_link.next().children().velocity("transition.slideLeftIn", 100);
				        _this_link.parents('.menu-item').velocity("transition.slideLeftIn", 100);
					    
					}); 
						return false;
				});
				
				_this.find('> .sub-menu > .menu-item-back > a').click(function(){
					var sub_menu = $(this).parent().parent();
					var parent_item = sub_menu.parent();
					var parent_item_link = parent_item.find('> a');
					
					if(parent_item.not('.level-1')){ 
						sub_menu.velocity("transition.fadeOut",1, function(){
							parent_item.parent().children().velocity("transition.slideLeftIn", 300);
							parent_item_link.velocity("transition.fadeIn", 300);
						});
					} 
						
					return false;
				});
			}else{
				_this_link.click(function(){

					if(!Modernizr.touchevents){
						if(!$(this).parent().hasClass('current-menu-anchor')){
							themeData.fnPageLoadingEvent($(this));
							return false;
						}
					} else {
						if(!$(this).parent().hasClass('current-menu-anchor')&& !$(this).parent().hasClass('menu-item-has-children')){
							themeData.fnPageLoadingEvent($(this));
							return false;
						}
					}
					
				});
			}
			
		});
    	
    };

    //Footer fixed
    themeData.fnFooterFixed = function(){

    	var foot_height = themeData.footer.find('.footer-info').outerHeight(); 
    	if(themeData.footer.find('.widget_footer').length) {
    		foot_height = foot_height + themeData.footer.find('.widget_footer').outerHeight();
    	}

    	if( themeData.win.width() > switchWidth){
			themeData.container.css('margin-bottom', foot_height);
			themeData.footer.css('position', 'fixed');
		} else {
			themeData.container.css({'margin-bottom': '0'});
			themeData.footer.css({ 'position': 'relative'});
		}

    };

    themeData.fnFooterAnima = function(){

    	themeData.container.find('#content_wrap').waypoint(function(direction) {
			if (direction === 'down') { 
				themeData.footer.find('.footer-info').velocity("transition.slideUpIn"); 
				footer_visible = true;
			}
			this.destroy();
		},{
			offset: "bottom-in-view"
		});
    }

    // List Animation Queue
    var itemQueue = []
	var itemDelay = 150
	var queueTimer

    function fnListItemQueue () {
		if (queueTimer) return  
		queueTimer = window.setInterval(function () {
			if (itemQueue.length) {
				$(itemQueue.shift()).addClass('grid-show');
				fnListItemQueue();
			}
			else {
				window.clearInterval(queueTimer);
				queueTimer = null;
			}
		}, itemDelay);
	}
	
	// Main Scrolled Animation
	themeData.fnMainAnima = function(){

		if($('.grid-item-inside').length) {
			$('.grid-item-inside').waypoint(function (direction) {
				itemQueue.push(this.element);
				fnListItemQueue();
			}, {
				offset: '100%'
			});
			
			$('.grid-item-inside').each(function(index, element) {
				if($(this).parent().offset().top < (themeData.winScrollTop + themeData.winHeight)){
					var lazyload = $(this).find('.ux-lazyload-bgimg');
					var lazyload_bgimg = lazyload.data('bg');
					if(lazyload_bgimg) {	
						lazyload.addClass('lazy-loaded').css('background-image', 'url("' +lazyload_bgimg+ '")');
					}
					itemQueue.push($(this));
					fnListItemQueue();
				}
            });
			
		}

		if($('.pagenums .tw-style-a').length) {
    		var _tw_loadmore_btn = $('.pagenums .tw-style-a');
    		_tw_loadmore_btn.waypoint(function(direction) { 
				if (direction === 'down') { 
					_tw_loadmore_btn.velocity('transition.slideUpBigIn'); 
				}
				this.destroy();
			},{
				offset: '90%'
			});
    	}

    	if($('.archive-item').length) {
    		$('.archive-item').each(function(){
    			var _this = $(this);
    			_this.waypoint(function(direction) { 
					if (direction === 'down') { 
						_this.find('.archive-arrow').velocity('transition.slideLeftBigIn');
					}
					this.destroy();
				},{
					offset: 'bottom-in-view'
				});
    		});
    		
    	}
	}

    // Single Post Scrolled Animation
    themeData.fnSingleAnima = function(){
		
    	if($('.blog-unit-meta-bottom').length) {
    		var _meta_bottom = $('.blog-unit-meta-bottom');
    		_meta_bottom.waypoint(function(direction) { 
				if (direction === 'down') { 
					_meta_bottom.find('.arrow-prev').velocity('transition.slideLeftBigIn');
					_meta_bottom.find('.arrow-next').velocity('transition.slideRightBigIn');
				}
				this.destroy();
			},{
				offset: '80%'
			});
    	}

    	if($('.social-bar').length) {
    		var _social_bar = $('.social-bar');
    		_social_bar.waypoint(function(direction) { 
				if (direction === 'down') { 
					_social_bar.find('.fa').velocity('transition.expandIn', { stagger: 160 }); 
				}
				this.destroy();
			},{
				offset: '70%'
			});
    	}

    }

	//page loading event
	themeData.fnPageLoadingEvent = function(el){
		var _url = el.attr('href');
		if(_url){
			themeData.pageLoading.addClass('visible');
			setTimeout(function(){
				window.location.href = _url;
			}, 400);
			
		}
	}

	//Portfolio link open item
	themeData.fnPortfolioGoUrl = function(){
		$('.grid-item-open-url').each(function(){
			var _this = $(this);
			var _this_url = _this.attr('href');
			_this.siblings('.grid-item-con-text').click(function(){
				setTimeout(function(){
					window.location.href = _this_url;
				}, 10);
				return false;
			});
		});
	}
	
	//document ready
	themeData.doc.ready(function(){ 

		// Run Scroll Animation
		themeData.fnSingleAnima();

		//call menu
		if(themeData.isResponsive()){
			themeData.win.find('img').imagesLoaded(function(){ 
				themeData.fnResponsiveMenu();
			}); 
		} 

		//Call Isotope
		if(themeData.isotope.length){

			themeData.isotopelist();
			$('.masonry-list').isotope('on', 'layoutComplete', function() {
	            $(window).trigger('layoutComplete');
	        });
		}

		//Call audio player
		themeData.fnJplayerCall();

		//Lazy offset Y
		$.extend($.lazyLoadXT, {
			  edgeY:  300 
		});

		if($('.pagenums').length) {
			$('.pagenums').each(function(){
				if ($(this).is(':empty')){
					$(this).hide();
				}
			});
		}

		themeData.fnFullscreenWrapHeight();
		$(window).bind('resize', themeData.fnFullscreenWrapHeight);


		//Pageone navi
		if($('.anchor-in-current-page').length){
			if(themeData.WrapOurter.hasClass('enbale-onepage')) {
				themeData.Menu.onePageNav({
					currentClass: 'current',
					filter: ':not(.external)'
				});
			}
		}
		
		//Pagenumber re-layout
		if(themeData.pagenumsDefault.length) {
			themeData.pagenumsDefault.each(function(){
				if($(this).find('.prev').length && $(this).find('.next').length){
					$(this).find('.next').after($(this).find('.prev'));
				}
			});
		}
		
		//Pagination - twitter style
		if(themeData.blogPagenumsTwitter.length){
			themeData.blogPagenumsTwitter.each(function(){
				var twitterLink = [];
				
				twitterLink.item = $(this);
				twitterLink.moduleID = twitterLink.item.data('module');
				twitterLink.modulePost = twitterLink.item.data('post');
				twitterLink.postID = twitterLink.item.data('postid');
				twitterLink.paged = twitterLink.item.data('paged');
				
				twitterLink.item.click(function(){
					twitterLink.item.html('<span>Loading...</span>');
					
					twitterLink.item.addClass('tw-style-loading');
					twitterLink.paged = twitterLink.item.attr('data-paged');

					var ajax_data = {
						'module_id'   : twitterLink.moduleID,
						'module_post' : twitterLink.modulePost,
						'post_id'     : twitterLink.postID,
						'paged'       : twitterLink.paged,
						'mode'        : 'twitter'
					}
					
					themeData.fnModuleLoad(ajax_data, twitterLink.item.parents('.pagenums'));
					return false;
				});
			})
			
		}

		//call video popup
		if(themeData.videoFace.length){
			themeData.fnVideoFace(themeData.videoFace);
		}
		
		//Call Portfolio link open item
		if($('.grid-item-open-url').length) {
			themeData.fnPortfolioGoUrl();
		}

		//Page Loading
		if(themeData.pageLoading.length){
			
			//Logo
			$('#logo a,.carousel-des-wrap-tit-a').click(function(){
				themeData.fnPageLoadingEvent($(this));
				return false;
			});

			//Navi, WPML 
			$('.wpml-language-flags a,#navi li:not(.menu-item-has-children) a ').click(function(){
				themeData.fnPageLoadingEvent($(this));
				return false;
			});
			

			//blog, post 
			$('.grid-item-mask-link:not(.lightbox-item),.grid-item-tit-a, .title-wrap a, .page-numbers,.archive-grid-item a,.arrow-item').click(function(){
				themeData.fnPageLoadingEvent($(this));
				return false;
			});
			
			//gallery navi
			$('.single .gallery-navi-post a').click(function(){
				themeData.fnPageLoadingEvent($(this));
				return false;
			});
		
			//slide template / archive unit
			$('.disable-scroll-a,.search-result-unit-tit a,.subscribe-link-a,.article-meta-unit a,.blog-unit-more-a').click(function(){
				themeData.fnPageLoadingEvent($(this));
				return false;
			});
		
			//sidebar widget
			$('.widget_archive a, .widget_recent_entries a, .widget_search a, .widget_pages a, .widget_nav_menu a, .widget_tag_cloud a, .widget_calendar a, .widget_text a, .widget_meta a, .widget_categories a, .widget_recent_comments a, .widget_tag_cloud a').click(function(){
				themeData.fnPageLoadingEvent($(this));
				return false;
			});
		
			/** Module*/
			$('.moudle .blog-bigimage a,.moudle .iterlock-caption a, .moudle .tab-content a, .moudle .accordion-inner a, .moudle .blog-item a, .moudle .isotope a, .moudle .ux-btn, .moudle .post-carousel-item a, .moudle .caroufredsel_wrapper:not(.portfolio-caroufredsel) a').click(function(){
				if($(this).is('.lightbox')||$(this).is('.tw-style-a')||$(this).is('.lightbox-item')){}else if($(this).is('.liquid_list_image')){}else if($(this).is('.ajax-permalink')){}else{
					themeData.fnPageLoadingEvent($(this));
					return false;
				}
			});

			//Porfolio template
			$('.related-post-unit a,.tags-wrap a').click(function(){	
				themeData.fnPageLoadingEvent($(this));
				return false;
			});
		
		}

	});
	
	//win load
	themeData.win.load(function(){

		if(themeData.listLayout.length && !themeData.singleGalleryFilled.length){
			themeData.fnListLayoutHeight();
			themeData.win.bind('resize', themeData.fnListLayoutHeight);
		}
		
		if(themeData.singleGalleryFilled.length){
			themeData.fnSingleGalleryFilled();
		}
		
		setTimeout(function(){
			themeData.pageLoading.removeClass('visible'); 
		},10);

		if($('#header').length) {
			themeData.header_sticky();
		}

		//Call Sticky sidebar in gallery post
		if($(".sticky_column").length) {
			$(".sticky_column").stick_in_parent();
		}

		//Call down button in gallery post
		if(themeData.TopsliderTrggleDown.length){
			themeData.TopsliderTrggleDownFn();
		}

		//Footer fixed
		if(themeData.footer.length) {
			themeData.fnFooterFixed();
			themeData.fnFooterAnima();
			themeData.win.on("debouncedresize", themeData.fnFooterFixed);
		}

		//Call Lightbox 
		if(themeData.lightboxPhotoSwipe.length){
			fnInitPhotoSwipeFromDOM('.lightbox-photoswipe');
		}

		//Call top silder
		if(themeData.carousel.length) {
			themeData.carouselFn(themeData.carousel);
		}
		
		//Call Tip
		if(themeData.tooltip.length){
			themeData.tooltip.tooltip();
		}

		// Back top 
		if(themeData.backTop.length){
			themeData.backTop.on({'touchstart click': function(){ 
				$('html, body').animate({scrollTop:0}, 1200);
			}});
		}

		//Call Search
		if(themeData.searchOpen.length){
			themeData.fnSerchShow();
		}

		themeData.body.removeClass("preload");
		
		if(themeData.galleryCollage.length) {
			themeData.win.find('img').imagesLoaded(function(){ 
				themeData.fnGalleryCollage(themeData.galleryCollage); 
			});
		}

		if(themeData.body.hasClass('with-video-cover')) {
			themeData.fnVideocoverTitle();
		}

		if(themeData.backTop.length) {
			themeData.fnBackTop();
		}
		
		
		// Run Main  Scroll Animation
		themeData.fnMainAnima();

	});
	
	
	//win resize
	themeData.win.resize(function(){
		if(themeData.galleryCollage.length){
			$('.Collage .Image_Wrapper').css("opacity", 0);
			if (resizeTimer) clearTimeout(resizeTimer);
			resizeTimer = setTimeout(function(){
				themeData.fnGalleryCollage(themeData.galleryCollage)
			}, 200);
		}
		
		if(themeData.singleGalleryFilled.length){
			themeData.fnSingleGalleryFilled();
		}
		
	});

	window.onpageshow = function(event) {
	    if (event.persisted) {
	        window.location.reload() 
	    }
	};
	
})(jQuery);

//Lazy offset Y
jQuery.extend(jQuery.lazyLoadXT, {
	  edgeY:  500 
});

function fnInitPhotoSwipeFromDOM(gallerySelector){
    var parseThumbnailElements = function(el){
		var thumbElements = jQuery(el).find('[data-lightbox=\"true\"]'),
			numNodes = thumbElements.length,
			items = [],
			figureEl,
			linkEl,
			size,
			type,
			item;

		for(var i = 0; i < numNodes; i++){

			figureEl = thumbElements[i]; // <figure> element

			// include only element nodes 
			if(figureEl.nodeType !== 1){
				continue;
			}

			//linkEl = figureEl.children[0]; // <a> element
			linkEl = jQuery(figureEl).find('.lightbox-item');

			size = linkEl.attr('data-size').split('x');
			type = linkEl.attr('data-type');

			// create slide object
			if(type == 'video'){
				item = {
					html: linkEl.find('> div').html()
				}
			}else{
				item = {
					src: linkEl.attr('href'),
					w: parseInt(size[0], 10),
					h: parseInt(size[1], 10)
				};
			}

			if(figureEl.children.length > 0){
				// <figcaption> content
				item.title = linkEl.attr('title'); 
			}

			if(linkEl.find('img').length > 0){
				// <img> thumbnail element, retrieving thumbnail url
				item.msrc = linkEl.find('img').attr('src');
			} 

			item.el = figureEl; // save link to element for getThumbBoundsFn
			items.push(item);
		}

		return items;
	};

	// find nearest parent element
	var closest = function closest(el, fn){
		return el && (fn(el) ? el : closest(el.parentNode, fn));
	};

	// triggers when user clicks on thumbnail
	var onThumbnailsClick = function(e){
		e = e || window.event;
		e.preventDefault ? e.preventDefault() : e.returnValue = false;

		var eTarget = e.target || e.srcElement;

		// find root element of slide
		var clickedListItem = closest(eTarget, function(el){
			if(el.tagName){
				return (el.hasAttribute('data-lightbox') && el.getAttribute('data-lightbox') === 'true'); 
			}
		});

		if(!clickedListItem){
			return;
		}

		// find index of clicked item by looping through all child nodes
		// alternatively, you may define index via data- attribute
		var clickedGallery = jQuery(clickedListItem).parents('.lightbox-photoswipe'),
			childNodes = clickedGallery.find('[data-lightbox=\"true\"]'),
			numChildNodes = childNodes.length,
			nodeIndex = 0,
			index;

		for (var i = 0; i < numChildNodes; i++){
			if(childNodes[i].nodeType !== 1){ 
				continue; 
			}

			if(childNodes[i] === clickedListItem){
				index = nodeIndex;
				break;
			}
			nodeIndex++;
		}
		
		if(index >= 0){
			// open PhotoSwipe if valid index found
			openPhotoSwipe(index, clickedGallery[0]);
		}
		return false;
	};

	// parse picture index and gallery index from URL (#&pid=1&gid=2)
	var photoswipeParseHash = function(){
		var hash = window.location.hash.substring(1),
		params = {};

		if(hash.length < 5) {
			return params;
		}

		var vars = hash.split('&');
		for (var i = 0; i < vars.length; i++) {
			if(!vars[i]) {
				continue;
			}
			var pair = vars[i].split('=');  
			if(pair.length < 2) {
				continue;
			}           
			params[pair[0]] = pair[1];
		}

		if(params.gid) {
			params.gid = parseInt(params.gid, 10);
		}

		if(!params.hasOwnProperty('pid')) {
			return params;
		}
		params.pid = parseInt(params.pid, 10);
		return params;
	};

	var openPhotoSwipe = function(index, galleryElement, disableAnimation, fromURL){
		var pswpElement = document.querySelectorAll('.pswp')[0],
			gallery,
			options,
			items;

		items = parseThumbnailElements(galleryElement);

		// define options (if needed)
		options = {
			index: index,

			// define gallery index (for URL)
			galleryUID: galleryElement.getAttribute('data-pswp-uid'),

			showHideOpacity:true,

			getThumbBoundsFn: function(index) {
				// See Options -> getThumbBoundsFn section of documentation for more info
				var thumbnail = items[index].el.getElementsByTagName('img')[0], // find thumbnail
					pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
					rect = thumbnail.getBoundingClientRect(); 

				return {x:rect.left, y:rect.top + pageYScroll, w:rect.width};
			},
			
			addCaptionHTMLFn: function(item, captionEl, isFake) {
				if(!item.title) {
					captionEl.children[0].innerText = '';
					return false;
				}
				captionEl.children[0].innerHTML = item.title;
				return true;
			}
		};
        
        if(fromURL) {
            if(options.galleryPIDs) {
                // parse real index when custom PIDs are used 
                // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
                for(var j = 0; j < items.length; j++) {
                    if(items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }

        // exit if index not found
        if( isNaN(options.index) ) {
            return;
        }

        var radios = document.getElementsByName('gallery-style');
        for (var i = 0, length = radios.length; i < length; i++) {
            if (radios[i].checked) {
                if(radios[i].id == 'radio-all-controls') {

                } else if(radios[i].id == 'radio-minimal-black') {
                    options.mainClass = 'pswp--minimal--dark';
                    options.barsSize = {top:0,bottom:0};
                    options.captionEl = false;
                    options.fullscreenEl = false;
                    options.shareEl = false;
                    options.bgOpacity = 0.85;
                    options.tapToClose = true;
                    options.tapToToggleControls = false;
                }
                break;
            }
        }

		if(disableAnimation) {
			options.showAnimationDuration = 0;
		}

		// Pass data to PhotoSwipe and initialize it
		gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
		gallery.init();
	};

	// loop through all gallery elements and bind events
	var galleryElements = document.querySelectorAll(gallerySelector);
	
	for(var i = 0, l = galleryElements.length; i < l; i++){
		galleryElements[i].setAttribute('data-pswp-uid', i+1);
		galleryElements[i].onclick = onThumbnailsClick;
	}

	// Parse URL and open gallery if it contains #&pid=3&gid=1
	var hashData = photoswipeParseHash();
	if(hashData.pid > 0 && hashData.gid > 0) {
		openPhotoSwipe( hashData.pid - 1 ,  galleryElements[ hashData.gid - 1 ], true, true );
	}
}