$(document).ready(function () {

    $("#create-user-form").on("submit", function (event) {
        event.preventDefault();
        var newUser = {
            firstName: $("#inputFirst4").val(),
            lastName: $("#inputLast4").val(),
            DOB: $("#inputDOB4").val(),
            email: $("#inputEmailAddress").val(),
            username: $("#inputUsername").val(),
            city: $("#inputCity").val(),
            zipCode: $("#inputZip").val()
        }
        var userAnswers = {
            answer1: $(".answer-one").val(),
            answer2: $(".answer-two").val(),
            answer3: $(".answer-three").val()
        }

        console.log(newUser, userAnswers)
    })

});