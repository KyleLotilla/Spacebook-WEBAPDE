function showRating(id, rating) {
    $(document).ready(function(){
        $("#" + id).rateYo({
            readOnly: true,
            rating: rating,
            starWidth: "40px"
        });
    });
}

function setUpRating(accountRating, spaceID) {
    $(document).ready(function(){
        $("#userRating").rateYo({
            rating: accountRating,
            fullStar: true,
            starWidth: "40px",
            onChange: function(rating, starRating){
                if (rating == 0)
                    $("#userRating").rateYo("option", "rating", accountRating);
            }
        });

        $("#userRatingSubmit").click(function(){
            $("#userRatingSubmit").prop("disabled", true);
            if ($("#userRating").rateYo("option", "rating") == 0) {
                window.alert("Please Input a Rating");
                $("#userRatingSubmit").prop("disabled", false);
            }
            else
                postRating(spaceID);
        });
    });
}

function postRating(spaceID){
    $.ajax({
        type: "POST",
        url: "http://localhost:9090/rateSpace/" + spaceID,
        data: JSON.stringify({rating: $("#userRating").rateYo("option", "rating")}),
        contentType: "application/json",
        success: function () {
            location.reload();
        }
    });
}