$(document).ready(function () {

    $("#create-user").on("submit", function (event) {
        event.preventDefault();
        var newUser = {
            firstName: $("#inputFirst4").val().trim(),
            lastName: $("#inputLast4").val().trim(),
            DOB: $("#inputDOB4").val(),
            email: $("#inputEmailAddress").val().trim(),
            username: $("#inputUsername").val().trim(),
            city: $("#inputCity").val().trim(),
            zipCode: $("#inputZip").val().trim()
        }
        var userAnswers = {
            answer1: $(".answer-one").val().trim(),
            answer2: $(".answer-two").val().trim(),
            answer3: $(".answer-three").val().trim()
        }
        $.post("/api/signUp", newUser, userAnswers).then(function (data) {
            console.log(data)
        })
        console.log(newUser, userAnswers);
    })
});