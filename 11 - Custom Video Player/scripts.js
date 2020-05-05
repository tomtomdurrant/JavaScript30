// Get Elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Build Functions
const togglePlay = () => {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};

const updateButton = (e) => {
  const icon = e.type === 'pause' ? '►' : 'pause';
  toggle.textContent = icon;
};

const skip = (e) => {
  console.log(e.target.dataset);
  video.currentTime += Number.parseFloat(e.target.dataset.skip);
};

const handleRangeUpdate = (e) => {
  video[e.target.name] = e.target.value;
  console.log(e.target.name);
  console.log(e.target.value);
};

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

const scrub = (e) => {
  console.log(e);
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
};

// Hook up event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', handleProgress);
skipButtons.forEach((button) => {
  button.addEventListener('click', skip);
});
ranges.forEach((range) => {
  range.addEventListener('change', handleRangeUpdate);
});

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));
