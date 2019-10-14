$(document).ready(function() {

    // $("#loginButton").on("click", "#loginForm", getLoginForm);
    // $("#signUpButton").on("click", "#signUpForm", getSignUpForm);

    // function getLoginForm(loadLoginForm) {
    //     $.get("auth/login", loadLoginForm)
    //         .then(loadLoginForm);
    // }

    // function getSignUpForm(loadSubmitForm) {
    //     $.get("auth/signUp", loadSubmitForm)
    //         .then(loadSubmitForm);
    // };

    $("#loginButton").click(function() {
        console.log("LOGIN BUTTON WORKING");
        window.location.search = "auth/login";
    });
    $("#signUpButton").click(function() {
        window.location.search = "auth/signUp";
    });
})