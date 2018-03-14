//ready event - allows java script to run as soon as DOM Document Object Model is loaded
$(document).ready(function(){
//created variable names (topics) array of how i feel while coding
    var topics = ["yes", "no", "what", "how","facepalm", "crying", "WTF", "wow", "high five", "smh", "sleepy",
                     "happy gifs"];

    function displayImg(){
//empty display-images div so i can change or append them
        $("#display-images").empty();
//since the dom is ready i need to get attributes and display them to the DOM with help from the API & JSON        
        var input = $(this).attr("data-name");
        var limit = 10;
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=" + limit + "&api_key=tfO2nJKmPyqhvKrvFtlSGcfU0etAmlX9";   
//GET info via ajax call
        $.ajax({
            url: queryURL, 
            method: "GET"
        }).done(function(response) {
//create a loop to get selected data image
            for(var j = 0; j < limit; j++) {    

                var displayDiv = $("<div>");
                displayDiv.addClass("holder");
            
                var image = $("<img>");
                image.attr("src", response.data[j].images.original_still.url);
                image.attr("data-still", response.data[j].images.original_still.url);
                image.attr("data-animate", response.data[j].images.original.url);
                image.attr("data-state", "still");
                image.attr("class", "gif");
                displayDiv.append(image);
//create variables for ratings
                var rating = response.data[j].rating;
                console.log(response);
                var pRating = $("<p>").text("Rating: " + rating);
                displayDiv.append(pRating)
//append images
                $("#display-images").append(displayDiv);
            }
        });
    }
//creates buttons with topics array data
    function renderButtons(){ 
//empty button value when refreshed so they don't repeat
        $("#display-buttons").empty();

        for (var i = 0; i < topics.length; i++){

            var newButton = $("<button>") 
            newButton.attr("class", "btn btn-default");
            newButton.attr("id", "input")  
            newButton.attr("data-name", topics[i]); 
            newButton.text(topics[i]); 
            $("#display-buttons").append(newButton); 
        }
    }
//if else if to change image state
    function imageChangeState() {          

        var state = $(this).attr("data-state");
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");

        if(state == "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        }

        else if(state == "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }   
    }

    $("#submitPress").on("click", function(){

        var input = $("#user-input").val().trim();
        form.reset();
        topics.push(input);
//show buttons on load                
        renderButtons();

        return false;
    })

    renderButtons();
//on click of the document input and display image
    $(document).on("click", "#input", displayImg);
    $(document).on("click", ".gif", imageChangeState);
});