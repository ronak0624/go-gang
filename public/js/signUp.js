$(document).ready(function () {

    $("#create-user-form").on("submit", function (event) {
        event.preventDefault();
        console.log("im working")
        var newUser = {
            firstName: $("#inputFirst4").val().trim(),
            lastName: $("#inputLast4").val().trim(),
            DOB: $("#inputDOB4").val()
        }
        var userAnswers = {
            answer1: $("#exampleFormControlTextarea1").val().trim(),
            answer2: $("#exampleFormControlTextarea2").val().trim(),
            answer3: $("#exampleFormControlTextarea3").val().trim()
        }

        $.post("/auth/signUp", newUser, userAnswers).then(function (data) {

        })
        console.log(newUser, userAnswers);
    })
});