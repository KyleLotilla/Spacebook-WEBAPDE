function checkNotifications() {
    $(document).ready(function(){
        $.ajax({
            url: "http://localhost:9090/checkNotifcations",
            dataType: "json",
            success: function (data){
                if (data.numNotifications > 0)
                    $("#notificationBar").html("Notification (" + data.numNotifications + ")");
            }
        });
    });
}
