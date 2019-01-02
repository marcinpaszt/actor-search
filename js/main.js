function typeEffect(element, speed) {
  var text = $(element).text();
  $(element).html("");

  var i = 0;
  var timer = setInterval(function() {
    if (i < text.length) {
      $(element).append(text.charAt(i));
      i++;
    } else {
      clearInterval(timer);
    }
  }, speed);
}

$(document).ready(function() {
  var speed = 50;
  var delay = $("h1").text().length * speed + speed;
  typeEffect($("h1"), speed);
  setTimeout(function() {
    $("p").css("display", "inline-block");
    typeEffect($("p"), speed);
  }, delay);
});

var keanuId = [{ actorId: "206", title: "Keanu Reeves" }];

var cageId = [{ actorId: "115", title: "Nicolas Cage" }];

var keanuMovies = ["102685", "111257", "234215", "133093"];
var cageMovies = ["119094", "113627", "435705", "117500"];

var keanuMoviesLength = keanuMovies.length;
for (var i = 0; i < keanuMoviesLength; i++) {
  console.log(keanuMovies[i]);
}

var cageMoviesLength = cageMovies.length;
for (var j = 0; i < cageMoviesLength; j++) {
  console.log(cageMovies[j]);
}

$(document).ready(function() {
  var Url = "http://www.omdbapi.com/?apikey=427cbef5";
  $(".btn").click(function() {
    $.ajax({
      url: Url,
      type: "GET",
      success: function(result) {
        console.log(result);
      },
      error: function(error) {
        console.log("Error ${error}");
      }
    });
  });
});
