const channel1: any[] = [];
const clapAudio: HTMLAudioElement = document.querySelector('[data-sound="clap"]');

const playChannel1Btn: HTMLButtonElement = document.querySelector('#playChannel1');

document.body.addEventListener('keypress', onKeyDown);
playChannel1Btn.addEventListener('click', onPlayChannel1);

function onKeyDown(ev: KeyboardEvent): void {

    const key = ev.key;
    const time = ev.timeStamp;

    channel1.push({
        key,
        time
    });

    playSound(key);
    console.log(channel1);
}

function playSound(key: string) {
    
    clapAudio.currentTime = 0;
    clapAudio.play();
}

function onPlayChannel1(): void {
    playChannel();
}

function playChannel(): void {
    let prevTime = 0;
    channel1.forEach(sound => {
        const timeout = sound.time - prevTime;
        setTimeout(() => playSound(sound.key), timeout);
    });
}