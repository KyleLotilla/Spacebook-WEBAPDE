/*function loadDatePicker(reservedDates) {
	var curDate = Date.now();
	$(document).ready(function () {
		$("#datePicker").datepicker({
			beforeShowDay: function (dateIndex) {
				console.log(inDateArray(reservedDates, dateIndex));
				if (dateIndex < curDate || inDateArray(reservedDates, dateIndex))
					return {enabled: false, classes: "reservedCell", tooltip: "Reserved"};
				else
					return {enabled: true, classes: "availableCell", tooltip: "Available"};
			},
			format: "yyyy-mm-dd"
		});
		$("#datePicker").on("changeDate", function() {
			$("#reserveSubmit").prop("disabled", false);
		});
	});
}*/

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
			disabledDates: reservedDates
		});

		$("#datePicker").on("change.datetimepicker", function(){
			$("#reserveSubmit").prop("disabled", false);
		});
	});
}

/*function inDateArray(dateArray, date){
	dateArray.forEach(function(dateIndex){
		dateIndex = new Date(dateIndex.date);
		if (dateIndex.getMonth() == date.getMonth() && dateIndex.getDate() == date.getDate() && dateIndex.getFullYear() == date.getFullYear())
			return true;
	});
	return false;
}*/