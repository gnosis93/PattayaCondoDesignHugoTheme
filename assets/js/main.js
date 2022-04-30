(function ($) {
	'use strict';
	$('.navbar-collapse a').click(function () {
		$(".navbar-collapse").collapse('hide');
	});

	// WINDOW ONLOAD
	window.onload = function () {
		// INIT AOS
		//initAOS();
		//checkPosition();

		// CAPTCHA VALIDATION
		var recaptcha = document.forms["contact-form"]["g-recaptcha-response"];
		if (recaptcha != undefined && recaptcha != null) {
			recaptcha.required = true;
			recaptcha.oninvalid = function (e) {
				alert("Please check the box, \"I'm not a robot\" in the reCaptcha below.");
			}
		}
	}

	// WINDOW ORIENTATION CHANGE
	window.onorientationchange = function() { 
        switch(window.orientation) { 
			case 0:
				document.getElementById('lightbox').style.marginTop = "60px";
				reopenGallery();
				break;
			case 90:
			case -90: 
				document.getElementById('lightbox').style.marginTop = "0px"; 
				reopenGallery();
				break;
		} 
    };
})(jQuery);

function copyURL(permalink, id) {
	navigator.clipboard.writeText(permalink);
	document.getElementById(id).innerHTML =
		`<div class="alert alert-success fade-in" role="alert">
	<i class="fas fa-clipboard-check"></i>&nbsp;
	URL copied to clipboard!
  	</div>`;
	setTimeout(() => {
		document.getElementById(id).innerHTML = "";
	}, 3000);
}

function showDescription(type, id) {
	document.getElementById(type + '-' + id + '-sub').classList.add('invisible');
	document.getElementById(type + '-' + id + '-des').classList.remove('invisible');
}
function hideDescription(type, id) {
	document.getElementById(type + '-' + id + '-sub').classList.remove('invisible');
	document.getElementById(type + '-' + id + '-des').classList.add('invisible');
	let element = document.getElementById(type + '-' + id);
	if (element != null && element != undefined) {
		element.scrollIntoView({ behavior: "smooth", block: "center" });
	}
}

function reopenGallery(){
	let lightbox = document.getElementById("lightbox").style.display;
	if (lightbox != 'none'){
		let url = document.getElementsByClassName('lb-image')[0].getAttribute('src');
		//$('.lb-close')[0].click();
		$('#resize-lb')[0].click();
		setTimeout(() => {
			$('a[href^="'+ url +'"]')[0].click();
		}, 1000);
	}
}