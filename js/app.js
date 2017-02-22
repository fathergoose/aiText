var ta = document.querySelector('textarea');
var main = document.querySelector('#main');
var in1 = document.querySelector('#one');

window.addEventListener('keydown', function (event) {
  switch (event.which) {
    case 8: // backspace
      main.innerText = main.innerText.slice(0, -1)
      break;
    case 16: // shift
      // do nothing with shift
      break;
    default:
      main.innerText += event.key;
  }
      
})
