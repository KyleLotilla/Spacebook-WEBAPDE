function setUpRegister() {
    $(document).ready(function(){
        $("#registerSubmit").click(function(){
            $.ajax({
                type: "POST",
                url: "http://localhost:9090/registerAccount",
                data: JSON.stringify({
                    username: $("#username").val(),
                    password: $("#password").val(),
                    email: $("#email").val()
                }),
                contentType: "application/json",
                success: function(){
                    alert("Signup successful! Check your email for verification.");
                    location.replace("http://localhost:9090/login");
                    console.log("AXENETTE");
                }
            });
        });
    });
}