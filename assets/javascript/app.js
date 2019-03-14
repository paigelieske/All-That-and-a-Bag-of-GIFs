var topics = ["Wayne's World", "Clueless", "Fresh Prince", "SNL"];

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
            var p = $("<p>").text("Rating: " + results[i].rating.toUpperCase());
            var image = $("<img>").attr("src", results[i].images.fixed_height_still.url);
            gifDiv.append(image);
            gifDiv.append(p);
            $("#gifCollection").prepend(gifDiv);
        }
    })
}

function createButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < topics.length; i++) {
        var b = $("<button>");
        b.addClass("gif");
        b.attr("data-name", topics[i]);
        b.text(topics[i]);
        $("#buttons-view").append(b);
    }
}

$(document).on("click", ".gif", showGifs);
createButtons();