function loadFeatured() {
    $(document).ready(function(){
        $.ajax({
            url: "http://localhost:9090/featured",
            dataType: "text",
            success: function(featured){
                $("#featuredSpaces").html(featured);
            }
        });
    });
}