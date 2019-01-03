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

  var baseUrl = 'https://ceamovies.azurewebsites.net/api/'
  var accessKey = "C8B7F668-13FB-4229-B2C2-04FE53163E2A"
  $.ajax({
    url: baseUrl + 'actors',
    headers: {
      "x-chmura-cors": accessKey
    }
  }).then(function(response) {
    console.log(JSON.stringify(response));
  });


  $(".btn.btn-primary").click(function() {
    event.preventDefault();
    $.ajax({
      url: baseUrl + 'movies',
      headers: {
        "x-chmura-cors": accessKey
      }
    }).then(function(response) {
      console.log(JSON.stringify(response));
    });
  });
});
