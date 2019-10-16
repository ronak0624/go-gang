$(document).ready(function () {

    $("#create-user-form").on("submit", function (event) {
        event.preventDefault();
        console.log("im working")
        var newUser = {
            name: $("#inputFirst4").val().trim() + " " + $("#inputLast4").val().trim(),
            username: $("#inputUsername").val().trim(),
            password: $("#inputPassword").val().trim(),
            DOB: $("#inputDOB4").val().trim(),
            q1: $("#exampleFormControlSelect1").val(),
            a1: $("#exampleFormControlTextarea1").val().trim(),
            q2: $("#exampleFormControlSelect2").val(),
            a2: $("#exampleFormControlTextarea2").val().trim(),
            q3: $("#exampleFormControlSelect3").val(),
            a3: $("#exampleFormControlTextarea3").val().trim()
        }

        $.post("/auth/signUp", newUser).then(function (data) {
            console.log(data)
            window.location.href = "/auth/login"
        })
        // console.log(newUser);
    })
});