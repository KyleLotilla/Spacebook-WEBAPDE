function setUpReserve(spaceID, locationName) {
	$(document).ready(function(){
		$("#reserveSubmit").click(function() {
			$("#reserveSubmit").prop("disabled", true);
			$("#datePicker").prop("disabled", true);
			reserveSpace(spaceID, locationName);
		});
	});
}

function reserveSpace (spaceID, locationName) {
	var date = $("#datePicker").datetimepicker("viewDate");
	var reservation = {spaceID: spaceID, date: date, locationName: locationName};
	
	$.ajax({
		type: "POST",
		url: "http://localhost:9090/reserveSpace/",
		data: JSON.stringify(reservation),
		contentType: "application/json",
		success: function () {
			//location.replace("http://localhost:9090/reservationCreated/");
		}
	});
}
		