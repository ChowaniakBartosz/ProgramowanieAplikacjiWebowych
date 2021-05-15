var channel1 = [];
var clapAudio = document.querySelector('[data-sound="clap"]');
var playChannel1Btn = document.querySelector('#playChannel1');
document.body.addEventListener('keypress', onKeyDown);
playChannel1Btn.addEventListener('click', onPlayChannel1);
function onKeyDown(ev) {
    var key = ev.key;
    var time = ev.timeStamp;
    channel1.push({
        key: key,
        time: time
    });
    playSound(key);
    console.log(channel1);
}
function playSound(key) {
    clapAudio.currentTime = 0;
    clapAudio.play();
}
function onPlayChannel1() {
    playChannel();
}
function playChannel() {
    var prevTime = 0;
    channel1.forEach(function (sound) {
        var timeout = sound.time - prevTime;
        setTimeout(function () { return playSound(sound.key); }, timeout);
    });
}
