const win = require('electron').remote.getCurrentWindow();

var windowButtons = document.createElement('div');
windowButtons.id = 'window-buttons';

var minButton = document.createElement('div');
minButton.id = 'min-button';
minButton.className = 'window-button';
minButton.innerHTML = '<span>&#xE921;</span>';

var maxButton = document.createElement('div');
maxButton.id = 'max-button';
maxButton.className = 'window-button';
maxButton.innerHTML = '<span>&#xE922;</span>';

var restoreButton = document.createElement('div');
restoreButton.id = 'restore-button';
restoreButton.className = 'window-button';
restoreButton.innerHTML = '<span>&#xE923;</span>';

var closeButton = document.createElement('div');
closeButton.id = 'close-button';
closeButton.className = 'window-button';
closeButton.innerHTML = '<span>&#xE8BB;</span>';

windowButtons.appendChild(minButton);
windowButtons.appendChild(maxButton);
windowButtons.appendChild(restoreButton);
windowButtons.appendChild(closeButton);

minButton.addEventListener('click', e => win.minimize());
maxButton.addEventListener('click', e => {
  win.maximize();
  toggleMaxRestore();
});
restoreButton.addEventListener('click', e => {
  win.unmaximize();
  toggleMaxRestore();
});

toggleMaxRestore();
win.on('maximize', toggleMaxRestore);
win.on('unmaximize', toggleMaxRestore);

closeButton.addEventListener('click', e => win.close());

document.getElementById('right-content').appendChild(windowButtons);

function toggleMaxRestore() {
  if (win.isMaximized()) {
    maxButton.style.display = 'none';
    restoreButton.style.display = 'flex';
  } else {
    maxButton.style.display = 'flex';
    restoreButton.style.display = 'none';
  }
}