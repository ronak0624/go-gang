$(document).ready(function() {
    // Getting jQuery references to the post body, title, form, and author select
    var bodyInput = $("#body");
    var titleInput = $("#title");
    var stampInput = $("#stamp");
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
    if (url.indexOf("?post_id=") !== -1) {
      postId = url.split("=")[1];
      getPostData(postId, "post");
    }
    // Otherwise if we have an author_id in our url, preset the author select box to be our Author
    else if (url.indexOf("?user_id=") !== -1) {
      userId = url.split("=")[1];
    }
  
    // Getting the authors, and their posts
    getUsers();
  
    // A function for handling what happens when the form to create a new post is submitted
    function handleFormSubmit(event) {
      event.preventDefault();
      console.log("submitted")
      // Wont submit the post if we are missing a body, title, or author
      //if (!titleInput.val().trim() || !bodyInput.val().trim() || !userSelect.val()) {
       // return;
     // }
      // Constructing a newPost object to hand to the database
      var newPost = {
        title: titleInput
          .val()
          .trim(),
        body: bodyInput
          .val()
          .trim(),
        UserId: userSelect.val()
      };
  
      // If we're updating a post run updatePost to update a post
      // Otherwise run submitPost to create a whole new post
      if (updating) {
        newPost.id = postId;
        updatePost(newPost);
      }
      else {
        submitPost(newPost);
      }
    }
  
    // Submits a new post and brings user to blog page upon completion
    function submitPost(post) {
      console.log("posting")
        $.post("/api/posts", post, function() {
            $(document).ready(function() {
                /* global moment */  
              
                // blogContainer holds all of our posts
                var blogContainer = $(".blog-container");
                var postCategorySelect = $("#category");
                // Click events for the edit and delete buttons
                $(document).on("click", "button.delete", handlePostDelete);
                $(document).on("click", "button.edit", handlePostEdit);
                // Variable to hold our posts
                var posts;
              
                // The code below handles the case where we want to get blog posts for a specific author
                // Looks for a query param in the url for author_id
                var url = window.location.search;
                var authorId;
                if (url.indexOf("?author_id=") !== -1) {
                  authorId = url.split("=")[1];
                  getPosts(authorId);
                }
                // If there's no authorId we just get all posts as usual
                else {
                  getPosts();
                }
              
              
                // This function grabs posts from the database and updates the view
                function getPosts(author) {
                  authorId = author || "";
                  if (authorId) {
                    authorId = "/?author_id=" + authorId;
                  }
                  $.get("/api/posts" + authorId, function(data) {
                    console.log("Posts", data);
                    posts = data;
                    if (!posts || !posts.length) {
                      displayEmpty(author);
                    }
                    else {
                      initializeRows();
                    }
                  });
                }
              
                // This function does an API call to delete posts
                function deletePost(id) {
                  $.ajax({
                    method: "DELETE",
                    url: "/api/posts/" + id
                  })
                    .then(function() {
                      getPosts(postCategorySelect.val());
                    });
                }
              
                // InitializeRows handles appending all of our constructed post HTML inside blogContainer
                function initializeRows() {
                  blogContainer.empty();
                  var postsToAdd = [];
                  for (var i = 0; i < posts.length; i++) {
                    postsToAdd.push(createNewRow(posts[i]));
                  }
                  blogContainer.append(postsToAdd);
                }
              
                // This function constructs a post's HTML
                function createNewRow(post) {
                  var formattedDate = new Date(post.createdAt);
                  formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
                  var newPostCard = $("<div>");
                  newPostCard.addClass("card");
                  var newPostCardHeading = $("<div>");
                  newPostCardHeading.addClass("card-header");
                  var deleteBtn = $("<button>");
                  deleteBtn.text("x");
                  deleteBtn.addClass("delete btn btn-danger");
                  var editBtn = $("<button>");
                  editBtn.text("EDIT");
                  editBtn.addClass("edit btn btn-info");
                  var newPostTitle = $("<h2>");
                  var newPostDate = $("<small>");
                  var newPostAuthor = $("<h5>");
                  newPostAuthor.text("Written by: " + post.Author.name);
                  newPostAuthor.css({
                    float: "right",
                    color: "blue",
                    "margin-top":
                    "-10px"
                  });
                  var newPostCardBody = $("<div>");
                  newPostCardBody.addClass("card-body");
                  var newPostBody = $("<p>");
                  newPostTitle.text(post.title + " ");
                  newPostBody.text(post.body);
                  newPostDate.text(formattedDate);
                  newPostTitle.append(newPostDate);
                  newPostCardHeading.append(deleteBtn);
                  newPostCardHeading.append(editBtn);
                  newPostCardHeading.append(newPostTitle);
                  newPostCardHeading.append(newPostAuthor);
                  newPostCardBody.append(newPostBody);
                  newPostCard.append(newPostCardHeading);
                  newPostCard.append(newPostCardBody);
                  newPostCard.data("post", post);
                  return newPostCard;
                }
              
                // This function figures out which post we want to delete and then calls deletePost
                function handlePostDelete() {
                  var currentPost = $(this)
                    .parent()
                    .parent()
                    .data("post");
                  deletePost(currentPost.id);
                }
              
                // This function figures out which post we want to edit and takes it to the appropriate url
                function handlePostEdit() {
                  var currentPost = $(this)
                    .parent()
                    .parent()
                    .data("post");
                  window.location.href = "/cms?post_id=" + currentPost.id;
                }
              
                // This function displays a message when there are no posts
                function displayEmpty(id) {
                  var query = window.location.search;
                  var partial = "";
                  if (id) {
                    partial = " for Author #" + id;
                  }
                  blogContainer.empty();
                  var messageH2 = $("<h2>");
                  messageH2.css({ "text-align": "center", "margin-top": "50px" });
                  messageH2.html("No posts yet" + partial + ", navigate <a href='/cms" + query +
                  "'>here</a> in order to get started.");
                  blogContainer.append(messageH2);
                }
              
              });
              
      });
    }
  
    // Gets post data for the current post if we're editing, or if we're adding to an author's existing posts
    function getPostData(id, type) {
      var queryUrl;
      switch (type) {
      case "post":
        queryUrl = "/api/posts/" + id;
        break;
      case "user":
        queryUrl = "/api/users/" + id;
        break;
      default:
        return;
      }
      $.get(queryUrl, function(data) {
        if (data) {
          console.log(data.UserId || data.id);
          // If this post exists, prefill our cms forms with its data
          titleInput.val(data.title);
          bodyInput.val(data.body);
          userId = data.UserId || data.id;
          // If we have a post with this id, set a flag for us to know to update the post
          // when we hit submit
          updating = true;
        }
      });
    }
  
    // A function to get Authors and then render our list of Authors
    function getUsers() {
      $.get("/auth/users", renderUserList);
    }
    // Function to either render a list of authors, or if there are none, direct the user to the page
    // to create an author first
    function renderUserList(data) {
      if (!data.length) {
        window.location.href = "/users";
      }
      $(".hidden").removeClass("hidden");
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createUserRow(data[i]));
      }
      userSelect.empty();
      console.log(rowsToAdd);
      console.log(userSelect);
      userSelect.append(rowsToAdd);
      userSelect.val(userId);
    }
  
    // Creates the author options in the dropdown
    function createUserRow(user) {
      var listOption = $("<option>");
      listOption.attr("value", user.id);
      listOption.text(user.name);
      return listOption;
    }
  
    // Update a given post, bring user to the blog page when done
    function updatePost(post) {
      $.ajax({
        method: "PUT",
        url: "/api/posts",
        data: post
      })
        .then(function() {
          window.location.href = "/blog";
        });
    }
  });
