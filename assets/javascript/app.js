var topic = ["In Living Color", "Wayne's World", "Clueless", "Fresh Prince", "90210", "The Chronic", "Fanny Packs", "Mother Love Bone", "Michael Jordan", "Pulp Fiction", "My So Called Life", "Clerks", "Scrunchies", "Seinfeld", "TLC"]

function createButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < topic.length; i++) {
        var b = $("<button>");
        b.addClass("gifButton");
        b.attr("data-name", topic[i]);
        b.text(topic[i]);
        $("#buttons-view").append(b);
    }
}

function showGifs() {
    var gifName = $(this).attr("data-name");
    console.log(gifName);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gifName + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");
            var rating = $("<p>").text("Rating: " + results[i].rating.toUpperCase());
            var title = $("<p>").text("Title: " + results[i].title.toUpperCase());
            var image = $("<img>").attr("src", results[i].images.fixed_height_still.url);
            image.attr("data-still", ("src", results[i].images.fixed_height_still.url));
            image.attr("data-animate", ("src", results[i].images.fixed_height.url));
            image.attr("data-state", "still");
            image.addClass("giphy");
            gifDiv.append(image);
            gifDiv.append(rating);
            gifDiv.append(title);
            $("#gifCollection").prepend(gifDiv);
        }
        $(".giphy").on("click", function (event) {
            event.preventDefault();
            var state = $(this).attr("data-state");
            console.log(state);

            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            }
            else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        })
    })
}

$("#add-gif").on("click", function (event) {
    event.preventDefault();
    var newGif = $("#search-input").val().trim();
    if (topic.indexOf(newGif) < 0) topic.push(newGif);
    createButtons();
})

$(".giphy").on("click", function (event) {
    event.preventDefault();
    var state = $(this).attr("data-state", "still");
    console.log(state);

    if (state === "still") {
        $(this).attr("src", results[i].images.fixed_height.url);
        $(this).attr("data-state", "animate");
    }
    else {
        $(this).attr("src", results[i].images.fixed_height_still.url);
        $(this).attr("data-state", "still");
    }
})

$(document).on("click", ".gifButton", showGifs);
createButtons();