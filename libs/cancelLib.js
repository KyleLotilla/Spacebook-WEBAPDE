function loadCancelBtn() {
	$(document).ready(function() {
		$(".cancel").click(function() {
			if (window.confirm("Are you sure to want to cancel this reservation?"))
				cancelReservation($(this).attr("id"));
		});
	});
}
		
function cancelReservation(reservationID) {
	$.ajax({
		type: "POST",
		url: "http://localhost:9090/cancelReservation/",
		data: JSON.stringify({reservationID: reservationID}),
		contentType: "application/json",
		success: function() {
			window.alert("Reservation Successfully Canceled");
			location.reload();
		}
	});
}