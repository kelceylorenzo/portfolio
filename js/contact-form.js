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

		$('#name-feedback').text('');
		$('#email-feedback').text('');
		$('#message-feedback').text('');
		$('#form-name').removeClass('error');
		$('#form-email').removeClass('error');
		$('#form-message').removeClass('error');

		$('#form-submit')
			.text('Sending...')
			.removeClass('btn-black btn-black-outline')
			.addClass('btn-color');
		var name = trimWhiteSpace($('#form-name').val());
		var email = trimWhiteSpace($('#form-email').val());
		var subject = trimWhiteSpace($('#form-subject').val());
		var message = trimWhiteSpace($('#form-message').val());

		function trimWhiteSpace(string) {
			return string.replace(/^\s+|\s+$/gm, '');
		}

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
					$('#name-feedback').text('');
					$('#email-feedback').text('');
					$('#message-feedback').text('');
					$('#form-name').addClass('success');
					$('#form-email').addClass('success');
					$('#form-message').addClass('success');
					if ($('#form-subject').val() !== '') {
						$('#form-subject').addClass('success');
					}
					$('#form-submit')
						.text('Sent!')
						.removeClass('btn-color')
						.addClass('btn-black-outline');
				}
			});
		} else {
			$('.errorContent').fadeIn(1000);
			$('.successContent').fadeOut(500);

			var nameCheck = $('#form-name').val();
			if (trimWhiteSpace(nameCheck) === '') {
				$('#name-feedback').text('Please enter your name.');
				$('#form-name').addClass('error');
				$('#form-name').val('');
			}

			var emailCheck = $('#form-email').val();
			if (trimWhiteSpace(emailCheck) === '') {
				$('#form-email').val('');
			}
			if (!validEmail(emailCheck)) {
				$('#email-feedback').text('Please enter a valid e-mail.');
				$('#form-email').addClass('error');
			}

			var messageCheck = $('#form-message').val();
			if (trimWhiteSpace(messageCheck) === '') {
				$('#message-feedback').text('Please enter a message.');
				$('#form-message').addClass('error');
				$('#form-message').val('');
			}

			var subjectCheck = $('#form-subject').val();
			if (trimWhiteSpace(subjectCheck) === '') {
				$('#form-subject').val('');
			}

			$('#form-submit')
				.text('Send Message')
				.removeClass('btn-color')
				.addClass('btn-black');
		}
		return false;
	});
})(jQuery);
