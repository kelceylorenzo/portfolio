(function($) {
	'use strict';

	$('#contact').validate({
		errorPlacement: function() {
			return false; // suppresses error message text
		}
	});

	/* =================================
    ===  CONTACT FORM               ====
    =================================== */
	$('#form-submit').on('click', function(e) {
		e.preventDefault();
		$('#form-submit')
			.text('Sending...')
			.removeClass('btn-black btn-white')
			.addClass('btn-color');
		var name = $('#form-name').val();
		var email = $('#form-email').val();
		var subject = $('#form-subject').val();
		var message = $('#form-message').val();

		function validEmail(emailAddress) {
			var pattern = new RegExp(
				/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i
			);
			return pattern.test(emailAddress);
		}

		if (validEmail(email) && message.length > 1 && name.length > 1) {
			$.ajax({
				type: 'POST',
				url: 'php_mailer/mail_handler.php',
				dataType: 'JSON',
				data: {
					'form-name': name,
					'form-email': email,
					'form-subject': subject,
					'form-message': message
				},
				success: function() {
					$('.successContent').fadeIn(1000);
					$('.errorContent').fadeOut(500);
					$('#form-name').val('');
					$('#form-email').val('');
					$('#form-subject').val('');
					$('#form-message').val('');
					$('#form-submit')
						.text('Sent')
						.removeClass('btn-color')
						.addClass('btn-white');
				}
			});
		} else {
			$('.errorContent').fadeIn(1000);
			$('.successContent').fadeOut(500);
			$('#form-submit')
				.text('Send Message')
				.removeClass('btn-color')
				.addClass('btn-black');
		}
		return false;
	});
})(jQuery);
