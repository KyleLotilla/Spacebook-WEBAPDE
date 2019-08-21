function loadRemoveBtn() {
	$(document).ready(function() {
		$(".cancel").click(function() {
			if (window.confirm("Are you sure to remove this from your favorites?"))
				removeFavorite($(this).attr("id"));
		});
	});
}
		
function removeFavorite(favoriteID) {
	$.ajax({
		type: "POST",
		url: "http://localhost:9090/removeFavorite/",
		data: JSON.stringify({favoriteID: favoriteID}),
		contentType: "application/json",
		success: function() {
			window.alert("Removed from favorites.");
			location.reload();
		}
	});
}