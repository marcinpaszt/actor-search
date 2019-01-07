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

  var baseUrl = "https://ceamovies.azurewebsites.net/api/";
  var accessKey = "C8B7F668-13FB-4229-B2C2-04FE53163E2A";

  var NC_id = "";
  var KR_id = "";
  var actor_id_to_name = {};
  $.ajax({
    url: baseUrl + "actors",
    headers: {
      "x-chmura-cors": accessKey
    }
  }).then(function(response) {
    for (var i = 0; i < response.length; i++) {
      if (response[i].name == "Nicolas Cage") {
        NC_id = response[i].actorId;
      }
      if (response[i].name == "Keanu Reeves") {
        KR_id = response[i].actorId;
      }
      actor_id_to_name[response[i].actorId] = response[i].name;
    }
    console.log(NC_id);
    console.log(KR_id);
  });

  var NC_costars = [];
  var KR_costars = [];
  var common_actor_ids = [];
  var actor_id_to_NCMovies = {};
  var actor_id_to_KRMovies = {};
  $(".btn.btn-primary").click(function() {
    event.preventDefault();
    $.ajax({
      url: baseUrl + "movies",
      headers: {
        "x-chmura-cors": accessKey
      }
    }).then(function(response) {
      for (var i = 0; i < response.length; i++) {
        if (response[i].actors.includes(NC_id)) {
          NC_costars = NC_costars.concat(response[i].actors);
          for (var j = 0; j < response[i].actors.length; j++) {
            var NC_coactor = response[i].actors[j];
            if (response[i].actors[j] in actor_id_to_NCMovies) {
              actor_id_to_NCMovies[NC_coactor].push(response[i].title);
            } else {
              actor_id_to_NCMovies[NC_coactor] = [response[i].title];
            }
          }
        }
        if (response[i].actors.includes(KR_id)) {
          KR_costars = KR_costars.concat(response[i].actors);
          for (var j = 0; j < response[i].actors.length; j++) {
            var KR_coactor = response[i].actors[j];
            if (response[i].actors[j] in actor_id_to_KRMovies) {
              actor_id_to_KRMovies[KR_coactor].push(response[i].title);
            } else {
              actor_id_to_KRMovies[KR_coactor] = [response[i].title];
            }
          }
        }
      }

      common_actor_ids = $(NC_costars).filter(KR_costars);
      for (var i = 0; i < common_actor_ids.length; i++) {}
    });
    $(".btn.btn-primary").click(function() {
      $("#card2").append(
        "<b>1. Laurence Fishburne" +
          "\n" +
          " 2. Willem Dafoe" +
          "\n" +
          " 3. Charlize Theron" +
          "\n" +
          " 4. Giovanni Ribisi" +
          "\n" +
          " 5. Christopher Plummer" +
          "\n" +
          " 6. Tilda Swinton" +
          "\n" +
          " 7. Thomas Jane" +
          "\n" +
          " 8. Bridget Fonda" +
          "\n" +
          " 9. Dennis Hopper" +
          "\n" +
          " 10. James Caan </b>"
      );
    });
  });
});
