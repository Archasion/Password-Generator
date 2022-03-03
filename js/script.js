const letters = "abcdefghijklmnopqrstuvwxyz";
const capitalLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const specialCharacters = "!@#$%^&*()_+~}{[]?.-=";

$(document).ready(function () {
	$("#slider").on("input", function () {
		$("#password-length").text($("#slider").val());
	});

	$("#copy-password").click(function () {
		$("#password").select();
		navigator.clipboard.writeText($("#password").val());

		$("#copy-password").css("background", "var(--copied-color)");
		setTimeout(function () {
			$("#copy-password").css("background", "var(--accent-color)");
		}, 1000);
	});

	$("#password-length").keypress(function (event) {
		if ($("#password-length").text().length === 4 || event.which === 13) event.preventDefault();
		if (isNaN(String.fromCharCode(event.which)) || String.fromCharCode(event.which) === " ") {
			event.preventDefault();
		}
	});

	$("#password").keydown(function (event) {
		event.stopPropagation();
		event.preventDefault();
	});

	$("#password-length").focusout(function () {
		if (Number($("#password-length").text()) < 8) {
			$("#password-length").text("8");
			$("#slider").val("8");
		}
		$("#slider").val($("#password-length").text());
	});

	$(".option-button").click(function () {
		if ($(this).hasClass("active")) {
			$(this).css("background", "");
			$(this).find("span").css("color", "");
			$(this).removeClass("active");
		} else {
			$(this).css("background", "var(--accent-color)");
			$(this).find("span").css("color", "var(--text-color)");
			$(this).addClass("active");
		}
	});

	$("#generate-password").click(function () {
		const passwordLength = Number($("#password-length").text());
		let selectedCharacters = "";

		if ($("#letters").hasClass("active")) {
			selectedCharacters += letters;
		}

		if ($("#capitalize").hasClass("active")) {
			selectedCharacters += capitalLetters;
		}

		if ($("#symbols").hasClass("active")) {
			selectedCharacters += specialCharacters;
		}

		if ($("#numbers").hasClass("active")) {
			selectedCharacters += numbers;
		}

		selectedCharacters = [...selectedCharacters].sort(() => Math.random() - 0.5).join("");

		let password = "";
		for (i = 0; i < passwordLength; i++) {
			password += selectedCharacters.charAt(Math.floor(Math.random() * selectedCharacters.length));
		}

		$("#password").val(password);
	});
});
