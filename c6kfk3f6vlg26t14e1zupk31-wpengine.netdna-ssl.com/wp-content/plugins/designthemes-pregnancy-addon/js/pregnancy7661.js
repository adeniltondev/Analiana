jQuery.noConflict();
jQuery(document).ready(function($){

	/* bmi calculation */
	$('form[name="frmbmi"]').submit(function(){
		var This = $(this);
		var fet = This.find('input[name="txtfeet"]').val();
		var inc = This.find('input[name="txtinches"]').val();
		var tinc = ( parseInt(fet) * 12 ) + parseInt(inc);
			
		var lbs = This.find('input[name="txtlbs"]').val();
			
		var bmi = ( parseFloat(lbs) / (tinc * tinc) ) * 703;
			
		This.find('input[name="txtbmi"]').val(parseFloat(bmi).toFixed(1));
		return false;
	});

	/* bmi class */
	if($('.fancyInline').length > 0) {
		var str = $('.fancyInline').attr('href');
		str = str.substr(0, 4);
		if(str !== 'http') {
			$('.fancyInline').fancybox({
				scrolling: 'no',
				width: 'auto',
				height: 'auto'
			});
		}
	}
	
	//video section
	$(function() {
		// open in fullscreen
		$('#fullscreen-video-section').click(function() { 
			$('.play-button').fullscreen();
			return false;
		});

	});
	
	//Doctor filter
	$('div.dt-sc-doctors-sorting > a').click(function(e){
		$("div.dt-sc-doctors-sorting > a").removeClass("active-sort");
		$(this).addClass("active-sort");
		doctor_filter();
		e.preventDefault();
	});

	$("select[name=department-filter]").change(function(){
		doctor_filter();
	});

	function doctor_filter() {
		var $data = {
			'action' : 'dt_sc_filter_doctors',
			'data'	: { 
				'title': $('div.dt-sc-doctors-sorting > a.active-sort').html(),
				'tax': $("select[name=department-filter]").val(),
				'column' : $('div.dt-sc-doctors-container').data('column')
			}
		};

		jQuery.ajax({
			url: dttheme_urls.ajaxurl,
			data: $data,
			beforeSend: function() {
				$("div.dt-sc-doctors-container").html('<div class="dt-sc-loading"></div>');
			},
			success: function( response ) {
				$("div.dt-sc-doctors-container").html(response).fadeIn();	
			}
		});
	}
});