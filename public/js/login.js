$(document).ready(function () {

    $("#login").on("submit", function (event) {
        event.preventDefault();

        //grabs the values from username and password
        var loginInfo = {
            username: $("#inputUsername").val().trim(),
            password: $("#inputPassword").val().trim()
        }
        //sending user loginInfo data 
        $.post("/auth/login", loginInfo).then(function (data) {
            console.log(data)
        })
        console.log(loginInfo)
    })

});