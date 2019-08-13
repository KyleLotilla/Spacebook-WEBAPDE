function loadDatePicker(reservedDates) {
	var curDate = Date.now();
	$(document).ready(function () {
		$("#datePicker").datepicker({
			beforeShowDay: function (dateIndex) {
				if (dateIndex < curDate || inDateArray(reservedDates, dateIndex))
					return [false, "", "Reserved"];
				else
					return [true, "", "Available"];
			}
		});
		$("#datePicker").change(function() {
			$("#reserveSubmit").prop("disabled", false);
		});
	});
}

function getReservedDates(spaceID) {
	$.ajax ({
		url: "http://localhost:9090/reservedDates/" + spaceID,
		dataType: "json",
		success: loadDatePicker
	});
}

function inDateArray(dateArray, date){
	date = $.datepicker.formatDate("yy-mm-dd", date);
	for (var i = 0; i < dateArray.length; i++) {
		var dateIndex = $.datepicker.formatDate("yy-mm-dd", new Date(dateArray[i].date));
		if (dateIndex == date)
			return true;
	}
	return false;
}