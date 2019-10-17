// Getting jQuery references to the post body, title, form, and author select
var titleInput = $("#title");
var bodyInput = $("#body");
var locationInput = $("#location");
var dateInput = $("#date");
var categoryInput = $("#category");
var cmsForm = $("#cms");
var userSelect = $("#user");
// Adding an event listener for when the form is submitted
cmsForm.on("submit", handleFormSubmit);
// Gets the part of the url that comes after the "?" (which we have if we're updating a post)
var url = window.location.search;
var postId;
var userId;
// Sets a flag for whether or not we're updating a post to be false initially
var updating = false;

// If we have this section in our url, we pull out the post id from the url
// In '?post_id=1', postId is 1
if (url.indexOf("?Post_id=") !== -1) {
    postId = url.split("=")[1];
    getPostData(postId, "Post");
}
// Otherwise if we have an author_id in our url, preset the author select box to be our Author
else if (url.indexOf("?User_id=") !== -1) {
    userId = url.split("=")[1];
}


// A function for handling what happens when the form to create a new post is submitted
function handleFormSubmit(event) {
    event.preventDefault();
    console.log("FORM SUBMITTED");
    // Constructing a newPost object to hand to the database
    var newPost = {
        title: titleInput.val().trim(),
        body: bodyInput.val().trim(),
        location: locationInput.val().trim(),
        category: categoryInput.val().trim(),
        date: dateInput.val().trim()
    }
    
    $.ajax({
        url: "/createPost",
        method: "POST",
        data: newPost
    }).then(function (res) {
        console.log(res);
    });
}