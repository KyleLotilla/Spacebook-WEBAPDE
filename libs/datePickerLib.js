function getReservedDates(spaceID) {
	$.ajax ({
		url: "http://localhost:9090/reservedDates/" + spaceID,
		dataType: "json",
		success: loadDatePicker
	});
}

function loadDatePicker(reservedDates) {
	var curDate = new Date(Date.now());
	reservedDates.forEach(function(date, i){
		reservedDates[i] = date.date;
	});
	reservedDates.push(curDate);
	$(document).ready(function(){
		$("#datePicker").datetimepicker({
			minDate: curDate,
			format: 'MM/DD/YYYY',
			disabledDates: reservedDates,
			ignoreReadonly: true,
			useCurrent: false
		});

		$("#datePicker").on("change.datetimepicker", function(){
			$("#reserveSubmit").prop("disabled", false);
		});
	});
}