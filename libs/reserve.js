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
	date = date.toLocaleString("en-US", {hour12: false}).replace(/\u200E/g, '').split(" ");
	date = date[0];
	if (date.indexOf(",") != -1)
		date = date.substring(0, date.indexOf(","));

	var mdy = date.split("/");
	var year = parseInt(mdy[2]);
	var month = parseInt(mdy[0]);
	var day = parseInt(mdy[1]);

	var reservation = {spaceID: spaceID, year: year, month: month, day: day, locationName: locationName};
	
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
		