// Heavily inspired by https://css-tricks.com/snippets/css/typewriter-effect/

document.addEventListener("DOMContentLoaded", function (event) {
  // type one text in the typwriter
  // keeps calling itself until the text is finished
  function typeWriter(text, i) {
    // check if text isn't finished yet
    if (i < text.length) {
      // add next character to h1
      document.querySelector(".greeting").innerHTML = text.substring(0, i + 1);

      // wait for a while and call this function again for next character
      setTimeout(function () {
        typeWriter(text, i + 1);
      }, 200);
    }
  }

  // From https://stackoverflow.com/questions/29785294/check-if-current-time-is-between-two-given-times-in-javascript
  function currentTimeBetween(startTime, endTime) {
    // var startTime = "15:10:10";
    // var endTime = "22:30:00";
    let currentDate = new Date();

    let startDate = new Date(currentDate.getTime());
    startDate.setHours(startTime.split(":")[0]);
    startDate.setMinutes(startTime.split(":")[1]);
    startDate.setSeconds(startTime.split(":")[2]);

    let endDate = new Date(currentDate.getTime());
    endDate.setHours(endTime.split(":")[0]);
    endDate.setMinutes(endTime.split(":")[1]);
    endDate.setSeconds(endTime.split(":")[2]);

    return startDate <= currentDate && currentDate <= endDate;
  }

  let greeting;
  if (currentTimeBetween("00:00:00", "4:59:59")) {
    greeting = "Good evening!";
  } else if (currentTimeBetween("5:00:00", "11:59:59")) {
    greeting = "Good morning!";
  } else if (currentTimeBetween("12:00:00", "17:59:59")) {
    greeting = "Good afternoon!";
  } else if (currentTimeBetween("18:00:00", "23:59:59")) {
    greeting = "Good evening!";
  } else {
    greeting = "Hello there!";
  }
  typeWriter(greeting, 0);
});
