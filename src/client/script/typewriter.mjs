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
      }, 250);
    }
  }
  // start the text animation
  typeWriter("Hello there!", 0);
});
