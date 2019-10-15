$(document).ready(function (event) {
    event.preventDefault();

    $("#login").on("submit", function(event){
        event.preventDefault();
        //grabs the values from username and password
        var loginInfo = {
            userName:$("#username").val(),
            password:$("#password").val()
        }
        //sending user loginInfo data 
     $.post("/api/login",loginInfo).then(function(data){
        console.log(data)
     })
    })

});