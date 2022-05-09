(function ($) {
	'use strict';

	$('.navbar-collapse a').click(function () {
		$(".navbar-collapse").collapse('hide');
	});

	// PRELOADER TIMEOUT
	setTimeout(() => {
		$('#preloader').fadeOut(300);
	}, 8000);

	// WINDOW ONLOAD
	window.onload = function () {
		$('#preloader').fadeOut(300);
		// CAPTCHA VALIDATION
		if ( window.location.pathname == '/' ){
			validateCaptcha();
		}
	}
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
function validateCaptcha(){
	setInterval(() => {
		if(document.forms["contact-form"] != undefined) {
			let recaptcha = document.forms["contact-form"]["g-recaptcha-response"];
			if (recaptcha != undefined && recaptcha != null) {
				recaptcha.required = true;
				recaptcha.oninvalid = function (e) {
					alert("Please check the box, \"I'm not a robot\" in the reCaptcha below.");
				}
			}
		}
	}, 5000);
}