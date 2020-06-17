if (typeof dttheme_urls === 'undefined') {
    var dttheme_urls = "";
}
$patterns = "";
var $rtl = dttheme_urls.isRTL;

for(var i=1; i<= 10; i++){
	$img = dttheme_urls.theme_base_url + "images/style-picker/pattern"+i+".jpg";
	$patterns += '<li>';
	$patterns += '<a id="pattern'+i+'"  href="" title="">';
	$patterns += '<img src="'+ $img +'" alt="pattern'+i+'" title="pattern'+i+'" width="30" height="30" />';
	$patterns += '</a>';
	$patterns += '</li>'; 
}

$color = ["blue","cyan","magenta","orange","pink","purple","red","skyblue","turquoise","wisteria"];
$colors = "";
for(var i=0; i<$color.length; i++){
	$img = dttheme_urls.theme_base_url + "/images/style-picker/"+$color[i]+".jpg";
	$colors += '<li>';
	$colors += '<a id="'+$color[i]+'" href="" title="">';
	$colors += '<img src="'+ $img +'" alt="color-'+$color[i]+'" title="color-'+$color[i]+'" width="30" height="30" />';
	$colors += '</a>';
	$colors += '</li>';
}

$str = '<!-- **DT Style Picker Wrapper** -->';
$str += '<div class="dt-style-picker-wrapper">';
$str += '	<a href="" title="" class="style-picker-ico"> <img src="'+ dttheme_urls.theme_base_url +'/images/style-picker/close.png" alt="Close" width="30" height="30" /> </a>';
$str += '	<div id="dt-style-picker">';
$str += '   	<h2> Select Your Skin </h2>';
/*$str += '       <h3> Choose your layout </h3>';
$str += '		<ul class="layout-picker">';
$str += '       	<li> <a id="fullwidth" href="" title="" class="selected"> <img src="' + dttheme_urls.theme_base_url + 'images/style-picker/fullwidth.jpg" alt="Fullwidth" width="71" height="49" /> </a> </li>';
$str += '		</ul>';
$str += '       <h3> Choose your Scheme </h3>';
$str += '		<ul class="scheme-picker">';
$str += '       	<li> <a id="light" href="" title="" class="selected"> <img src="' + dttheme_urls.theme_base_url + 'images/style-picker/light.png" alt="Light" width="41" height="11" /> </a> </li>';
$str += '       	<li> <a id="dark" href="" title=""> <img src="' + dttheme_urls.theme_base_url + 'images/style-picker/dark.png" alt="Dark" width="39" height="10" /> </a> </li>';
$str += '		</ul>';
$str += '		<div class="hr"> </div>';*/
/*$str += '		<div id="pattern-holder" style="display:none;">';
$str +='			<h3> Patterns for Boxed Layout </h3>';
$str += '			<ul class="pattern-picker">';
$str += 				$patterns;
$str += '			</ul>';
$str += '			<div class="hr"> </div>';
$str += '		</div>';
*/$str += '		<h3> Color scheme </h3>';
$str += '		<ul class="color-picker">';
$str += 		$colors;
$str += '		</ul>';
$str += '	</div>';
$str += '</div><!-- **DT Style Picker Wrapper - End** -->';

jQuery(document).ready(function($){
	$("body > div.wrapper").before($str);
	$picker_container = $("div.dt-style-picker-wrapper");

	//Applying Cookies
	if($rtl == true) {
		if ( $.cookie('control-open') === '1' ) {
			$picker_container.animate({right: 0});
			$('a.style-picker-ico').removeClass('control-open');
		} else {
			$picker_container.animate( { right: -230 } );
			$('a.style-picker-ico').addClass('control-open');
		}
	} else {
		if ( $.cookie('control-open') === '1' ) {
			$picker_container.animate({left: 0});
			$('a.style-picker-ico').removeClass('control-open');
		} else {
			$picker_container.animate( { left: -230 } );
			$('a.style-picker-ico').addClass('control-open');
		}
	}

	//Check Cookies in diffent pages and do the following things
	if($.cookie("pregnancytheme_skin")!= null){
		$href = $("link[id='skin-css']").attr("href");
		$href = $href.substr(0,$href.lastIndexOf("/"));
		$href = $href.substr(0,$href.lastIndexOf("/"))+"/"+$.cookie("pregnancytheme_skin")+"/style.css";
		$("link[id='skin-css']").attr("href",$href);
		$("ul.color-picker a[id='"+$.cookie("pregnancytheme_skin")+"']").addClass("selected");
		
		$("header #logo").find(".normal_logo").attr("src", dttheme_urls.theme_base_url + "/css/skins/" + $.cookie("pregnancytheme_skin") + "/images/logo.png");
		$("header #logo").find(".retina_logo").attr("src", dttheme_urls.theme_base_url + "/css/skins/" + $.cookie("pregnancytheme_skin") + "/images/logo@2x.png");
		
	}else{
		$("ul.color-picker a:first").addClass("selected");
	}

	//Apply Layout
	if($.cookie("pregnancytheme_layout") == "boxed"){
		$("ul.layout-picker li a").removeAttr("class");
		$("ul.layout-picker li a[id='"+$.cookie("pregnancytheme_layout")+"']").addClass("selected");
		$("div#pattern-holder").removeAttr("style");

		$i = ($.cookie("pregnancytheme_pattern")) ? $.cookie("pregnancytheme_pattern")  : 'pattern1';
		$img = dttheme_urls.theme_base_url + "images/patterns/"+$i+".jpg";
		$('body').css('background-image', 'url('+$img+')').addClass('boxed');;
		$("ul.pattern-picker a[id="+$.cookie("pregnancytheme_pattern")+"]").addClass('selected');
	}

	if($.cookie("pregnancytheme_scheme") != null){
		$("ul.scheme-picker li a").removeAttr("class");
		if( $.cookie("pregnancytheme_scheme") === "dark" ) {
			$("<link id='light-dark-css' href='"+ dttheme_urls.theme_base_url +"dark/dark-skin.css' rel='stylesheet' media='all' />").insertBefore($('#skin-css'));
			$("ul.scheme-picker a:last").addClass('selected');
		}
		else if( $.cookie("pregnancytheme_scheme") === "light" ) {
			$('#light-dark-css').remove();
			$("ul.scheme-picker a:first").addClass('selected');
		}
	}
	//Applying Cookies End

	//Picker On/Off
	$("a.style-picker-ico").click(function(e){
		$this = $(this);
		if($rtl == true) {
			if($this.hasClass('control-open')){
				$picker_container.animate({right: 0},function(){$this.removeClass('control-open');});
				$.cookie('control-open', 1, { path: '/' });	
			}else{
				$picker_container.animate({right: -227},function(){$this.addClass('control-open');});
				$.cookie('control-open', 0, { path: '/' });
			}
		} else {
			if($this.hasClass('control-open')){
				$picker_container.animate({left: 0},function(){$this.removeClass('control-open');});
				$.cookie('control-open', 1, { path: '/' });	
			}else{
				$picker_container.animate({left: -227},function(){$this.addClass('control-open');});
				$.cookie('control-open', 0, { path: '/' });
			}
		}
		e.preventDefault();
	});//Picker On/Off end

	//Layout Picker
	$("ul.layout-picker a").click(function(e){
		$this = $(this);
		$("ul.layout-picker a").removeAttr("class");
		$this.addClass("selected");
		$.cookie("pregnancytheme_layout", $this.attr("id"));

		if( $.cookie("pregnancytheme_layout") === "boxed") {
			$("body").addClass("boxed");
			$("div#pattern-holder").slideDown();
			
			if( $.cookie("pregnancytheme_pattern") == null ){
				$("ul.pattern-picker a:first").addClass('selected');
				$.cookie("pregnancytheme_pattern","pattern1",{ path: '/' });
			}else{
				$("ul.pattern-picker a[id="+$.cookie("pregnancytheme_pattern")+"]").addClass('selected');
				$img = dttheme_urls.theme_base_url + "images/patterns/"+$.cookie("pregnancytheme_pattern")+".jpg";
				$('body').css('background-image', 'url('+$img+')');
			}
		} else {
			$("body").removeAttr("style").removeClass("boxed");
			$("div#pattern-holder").slideUp();
			$("ul.pattern-picker a").removeAttr("class");
		}
		window.location.href = location.href;
		e.preventDefault();
	});//Layout Picker End

	//Scheme Picker
	$("ul.scheme-picker a").click(function(e){
		$this = $(this);
		$("ul.scheme-picker a").removeAttr("class");
		$this.addClass("selected");
		$.cookie("pregnancytheme_scheme", $this.attr("id"), { path: '/' });
		if( $.cookie("pregnancytheme_scheme") === "dark" ) {
			$("<link id='light-dark-css' href='"+ dttheme_urls.theme_base_url +"dark/dark-skin.css' rel='stylesheet' media='all' />").insertBefore($('#skin-css'));
		}
		else if( $.cookie("pregnancytheme_scheme") === "light" ) {
			$('#light-dark-css').remove();
		}
		e.preventDefault();
	});//Scheme Picker End

	//Pattern Picker
	$("ul.pattern-picker a").click(function(e){
		if($.cookie("pregnancytheme_layout") == "boxed"){
			$this = $(this);
			$("ul.pattern-picker a").removeAttr("class");
			$this.addClass("selected");
			$.cookie("pregnancytheme_pattern", $this.attr("id"), { path: '/' });
			$img = dttheme_urls.theme_base_url + "images/patterns/"+$.cookie("pregnancytheme_pattern")+".jpg";
			$('body').css('background-image', 'url('+$img+')');
		}
		e.preventDefault();
	});//Pattern Picker End

	//Color Picker
	$("ul.color-picker a").click(function(e){
		var $this = $(this);
		$("ul.color-picker a").removeAttr("class");
		$this.addClass("selected");
		$.cookie("pregnancytheme_skin", $this.attr("id"), { path: '/' });
		var $href = $("link[id='skin-css']").attr("href");
		$href = $href.substr(0,$href.lastIndexOf("/"));
		$href = $href.substr(0,$href.lastIndexOf("/"))+"/"+$this.attr("id")+"/style.css";
		$("link[id='skin-css']").attr("href",$href);
		
		$("header #logo").find(".normal_logo").attr("src", dttheme_urls.theme_base_url + "/css/skins/" + $this.attr("id") + "/images/logo.png");
		$("header #logo").find(".retina_logo").attr("src", dttheme_urls.theme_base_url + "/css/skins/" + $this.attr("id") + "/images/logo@2x.png");
		
		e.preventDefault();
	});//Color Picker End

});