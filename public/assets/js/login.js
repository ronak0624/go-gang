// jquery for username data and password

$(document).ready(function() {

    $('#loginButton').on("submit", function(event) {
        event.preventDefault();
        var userLogin = {
            userName: $("#inputUsername").val().trim(),
            password: $("#inputPassword").val().trim(),
        };
        console.log(userLogin);
    });
})