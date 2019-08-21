function setUpLogin() {
	$(document).ready(function() {
		$("#errorMsg").hide();
		$("#submit").click(function() {
			$("#submit").prop("disabled", true);
			login($("#username").val(), $("#password").val());
		});
	});
}

function login(username, password) {
	$.ajax({
		type: "POST",
		url: "http://localhost:9090/loginUser",
		data: JSON.stringify({username: username, password: password}),
		contentType: "application/json",
		dataType: "json",
		success: function(err) {
			if (err.msg != null) {
				$("#submit").prop("disabled", false);
				$("#errorMsg").html(err.msg).fadeTo(2000, 500).slideUp(500, function() {
					$("#errorMsg").slideUp(500);
				  });
			}
			else
				location.replace("http://localhost:9090/home");
		}
	});
}