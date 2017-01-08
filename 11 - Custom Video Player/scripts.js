const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const toggle = player.querySelector('.toggle');
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.fullscreen')

console.log(fullscreen)

function togglePlay() {
    video[video.paused ? 'play' : 'pause']();
}

function updateButton() {
    toggle.textContent = this.paused ? '►' : '❚ ❚';
}

function rangeAdjust() {
    video[this.name] = this.value;
}

function changeProgress() {
    progressBar.style.flexBasis = `${100 * (video.currentTime / video.duration)}%`
}

function doScrub(e) {
    video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration
}

function doSkip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function toggleFullscreen() {
    if(!player.fullscreenEnabled) {
        player.webkitRequestFullscreen();
    }
    else {
        document.webkitExitFullscreen();
    }
}

toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', changeProgress);

ranges.forEach(range => range.addEventListener('change', rangeAdjust));
ranges.forEach(range => range.addEventListener('mousemove', rangeAdjust));

let mousedown = false;
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

progress.addEventListener('click', doScrub)
progress.addEventListener('mousemove', (e) => mousedown && doScrub(e))

skipButtons.forEach(skipButton => skipButton.addEventListener('click', doSkip));

fullscreen.addEventListener('click', toggleFullscreen)
