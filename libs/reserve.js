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
	date = date._d;
	date = date.toLocaleString("en-US", {hour12: false}).split(",");
	var mdy = date[0].split("/");
	var year = mdy[2];
	var month = mdy[0];
	var day = mdy[1];
	var formattedDate = new Date(year + "-" + month + "-" + day + "T00:00:00Z");

	var reservation = {spaceID: spaceID, date: formattedDate, locationName: locationName};
	
	$.ajax({
		type: "POST",
		url: "http://localhost:9090/reserveSpace/",
		data: JSON.stringify(reservation),
		contentType: "application/json",
		success: function () {
			location.replace("http://localhost:9090/reservationCreated/");
		}
	});
}
		