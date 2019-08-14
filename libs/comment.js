function setUpComment(spaceID) {
    $(document).ready(function(){
        $("#userCommentSubmit").click(function(){
            $("userCommentSubmit").prop("disabled", true);
            var comment = $("#userComment").val();
            if (/S/.test(comment))
                window.alert("Enter a comment");
            else
                postComment(spaceID, comment);
            $("userCommentSubmit").prop("disabled", false);
        });
    });
}

function postComment(spaceID, comment) {
    $.ajax({
        type: "POST",
        url: "http://localhost:9090/commentSpace/" + spaceID,
        data: JSON.stringify({comment: comment}),
        contentType: "application/json",
        success: function () {
            location.reload();
        }
    });
}