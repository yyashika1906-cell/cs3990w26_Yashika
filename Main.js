let score = 0;
let gameActive = false;

function addScore(n) {
  score += n;

  if (score < 0) score = 0;
  let stars = "";

  for (let i = 0; i < score; i++) {
    stars += '<i class="fa-solid fa-star star-icon"></i>';
  }

  $("#stars").html(stars);
}

// Big gradient message under "Your Score:" (only used for special cases, e.g. bear with 0 score)
function showBigMessage(text) {
  $("#big-message").stop(true, true).text(text).fadeIn(400);
  setTimeout(function () {
    $("#big-message").fadeOut(600);
  }, 2500);
}

// Small inline tag next to the timer
function showMessage(text, type) {
  $("#message-box").stop(true, true)
    .removeClass("success error info")
    .addClass(type).text(text).fadeIn(400);

  setTimeout(function () {
    $("#message-box").fadeOut(600);
  }, 2500);
}

function endGame() {
  if (!gameActive) return;
  gameActive = false;
  stopTimer();

  // Reset all tiles to blank (un-flipped, no content) but keep them on the board
  $("#game-board .tile").each(function () {
    $(this).removeClass("flipped done");
    $(this).find(".card-front").empty();
    $(this).find(".card-back").empty();
  });

  // Show Game Over message as the big gradient text under the score (persistent)
  $("#big-message").stop(true, true).text("Game Over!").fadeIn(400);
}

$(function () {
  $("#start-btn").on("click", function () {
    stopTimer();
    score = 0;
    gameActive = true;
    addScore(0);
    $("#game-over").remove();
    $("#big-message").hide().empty();
    $("#score-section").show();
    $("#timer-section").show();

    let allCards = arrShuffle(
      questions.map(function (q) { return { type: "quiz", data: q }; })
        .concat(assets.map(function (a) { return { type: "asset", data: a }; }))
    );

    let $board = $("#game-board").empty().show();

    allCards.forEach(function (item) {
      let card = new Card(item.data);

      let $tile = $("<div>").addClass("tile");


      let $front = $("<div>").addClass("card-front");
      let $back = $("<div>").addClass("card-back");
      $tile.append($front).append($back);
      card.element = $tile;

      $tile.on("click", function (e) {
        if (card.isDone) {
          showMessage("card->DONE", "info");
          return;
        }
        if ($(e.target).closest(".card-back").length) return;

        if (!gameActive) return;
        $tile.addClass("flipped");
        card.show($back);

        if (!card.isQuiz) {
          card.isDone = true;

          if (card.data.value === "fa-gem") {
            showMessage("+1 Star", "success");
            addScore(1);
          } else if (card.data.value === "fa-paw") {
            // If player has no stars to lose, show the "debts" big message
            if (score === 0) {
              showBigMessage("You just started & already with debts!");
            }
            showMessage("-1 Star!", "error");
            addScore(-1);
          } else if (card.data.value === "fa-xmark") {
            showMessage("You can do nothing! Just watching your timer!", "error");
            setTimeout(endGame, 1500);
          }
          $tile.addClass("done");
          
          $tile.find(".card-front").html("<span class='done-text'>DONE</span>");
        }
      });

      $board.append($tile);
    });

    let duration = allCards.length * 2;
    startTimer(duration, function (t) {
      $("#timer-text").text(t + " secs.");
    }, endGame);
  });
});