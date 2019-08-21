function setUpFavorite(spaceID, locationName) {
    $(document).ready(function(){
        $("#favorite").click(function() {
            $("#favorite").prop("disabled", true);
            addtoFavorites(spaceID, locationName);
        });
    });
}

function addtoFavorites (spaceID, locationName) {
	var favorite = {spaceID: spaceID, locationName: locationName};
	
	$.ajax({
		type: "POST",
		url: "http://localhost:9090/addFavorite/",
		data: JSON.stringify(favorite),
		contentType: "application/json",
		success: function () {
			alert("Added to Favorites!");
		}
	});
}