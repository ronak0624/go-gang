$(document).ready(function () {

    $("#create-user-form").on("submit", function (event) {
        event.preventDefault();
        console.log("im working")
        var newUser = {
            name: $("#inputFirst4").val().trim() + " " + $("#inputLast4").val().trim(),
            DOB: $("#inputDOB4").val(),
            question1: $("#exampleFormControlSelect1").val(),
            answer1: $("#exampleFormControlTextarea1").val().trim(),
            question2: $("#exampleFormControlSelect1").val(),
            answer2: $("#exampleFormControlTextarea2").val().trim(),
            answer3: $("#exampleFormControlTextarea3").val().trim(),
            question3: $("#exampleFormControlSelect1").val()
        }

        $.post("/auth/signUp", newUser).then(function (data) {
            console.log(data)
        })
        // console.log(newUser);
    })
});