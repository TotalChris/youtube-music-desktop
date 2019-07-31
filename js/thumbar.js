const { ipcRenderer } = require('electron');

ipcRenderer.on('thumbar-previous', (e, args) => {
  if (e) console.error(e);

  var previousButton = document.getElementsByClassName('previous-button')[0];
  
  if (previousButton.style.visibility != 'hidden') {
    previousButton.click();
  }
});

ipcRenderer.on('thumbar-play', (e, args) => {
  if (e) console.error(e);

  var previousButton = document.getElementById('play-pause-button');
  
  if (previousButton.style.visibility != 'hidden') {
    previousButton.click();
  }

  ipcRenderer.send('togglePlayPause', previousButton.title);
});

ipcRenderer.on('thumbar-next', (e, args) => {
  if (e) console.error(e);

  var previousButton = document.getElementsByClassName('next-button')[0];
  
  if (previousButton.style.visibility != 'hidden') {
    previousButton.click();
  }

  ipcRenderer.send('togglePlayPause');
});