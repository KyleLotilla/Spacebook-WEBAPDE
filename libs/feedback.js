function loadFeedback(spaceID) {
    $(document).ready(function(){
        $.ajax({
            url: "http://localhost:9090/feedback/" + spaceID,
            dataType: "text",
            success: function(feedback){
                $("#feedback").html(feedback);
            }
        });
    });
}

function loadFeedbackInput(spaceID) {
    $(document).ready(function(){
        $.ajax({
            url: "http://localhost:9090/feedbackInput/" + spaceID,
            dataType: "text",
            success: function(feedbackInput){
                $("#feedbackInput").html(feedbackInput);
            }
        });
    });
}