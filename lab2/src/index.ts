const amountOfChannels = 3;

// Interfaces
interface ISound {
    key: string,
    time: number
}

interface ISoundEl {
    element: HTMLAudioElement,
    key: string
}

class Drums {
    // Property that contains an array of audio alements
    sounds: Array<HTMLAudioElement> = [];

    constructor() {
        // Gets all audio elements and puts them at the end of an array
        document.querySelectorAll('audio').forEach((item) => {
            this.sounds.push(item);
        })

        // Creates drum buttons for each audio element
        new DrumsUI(this.sounds);
    }
}

// Creates buttons and channels
class DrumsUI {
    channels: ISound[][] = [[]];
    sounds: ISoundEl[] = [];
    soundButtons: HTMLButtonElement[] = [];
    channelElements: {
        playButton: HTMLButtonElement,
        recordButton: HTMLButtonElement,
        progressBar: HTMLSpanElement
    }[] = [];

    // Property that contains channel that we record on
    activeChannel: number = null;

    constructor(sounds: HTMLAudioElement[]) {
        // Maps all audio elements with appropriate key binds
        this.sounds = sounds.map((element) => ({
            element,
            key: element.dataset.key
        }));

        // Handle keypress, runs onKeyDown function
        document.body.addEventListener('keypress', (event) => this.onKeyDown(event));

        // Renders button for every sound in the array
        this.renderButtons(sounds);

        // Creates audio channels
        this.createChannels();
    }

    renderButtons(sounds: HTMLAudioElement[]) {
        const drumsButtonsSection = document.getElementById('buttons');

        // Create button for each sound in the array
        sounds.forEach(item => {
            const button = document.createElement('button');
            
            button.innerText = `${item.dataset.key}`;
            
            // each button plays the sound on mouse click
            button.addEventListener('click', (event) => this.onClick(item.dataset.key, event));
            
            // Adds drum button intro array of available buttons
            this.soundButtons.push(button);
            // Renders button at the end of buttons section
            drumsButtonsSection.appendChild(button);
        });
    }

    // When key is clicked pushes clicked key and timestamp at the end of the channel + plays the sound
    onClick(key: string, event: MouseEvent) {
        const timestamp = event.timeStamp;
        if (this.activeChannel !== null) {
            this.channels[this.activeChannel].push({
                key: key,
                time: timestamp
            });
        }
        this.playSound(key);
    }

    // When key is pressed pushes pressed key and timestamp at the end of the channel + plays the sound
    onKeyDown(event: KeyboardEvent) {
        const key = event.key;
        const timestamp = event.timeStamp;

        if (this.activeChannel !== null) {
            this.channels[this.activeChannel].push({
                key: key,
                time: timestamp
            });
        }

        this.playSound(key);
    }

    // Plays sound that corresponds with the provided key value
    playSound(key: string) {
        if (key) {
            // Looks in the sounds array for element with provided key value
            const audioElement = this.sounds.find((item) => item.key === key).element;

            audioElement.currentTime = 0;

            // Builtin HTMLAudioElement function - play()
            audioElement.play();
        }
    }

    // Renders channels
    createChannels() {
        const channelsSection = document.getElementById('channels');

        // Renders provided amount of channels
        for (let channel = 0; channel < amountOfChannels; channel++) {
            const channelContainer = document.createElement('div');
            channelContainer.classList.add("channelContainer"); // Adds channelContainer class

            // Appends record button
            const recordButton = document.createElement('button');
            recordButton.className = `recordButton`;
            recordButton.addEventListener('click', (event) => this.recordOnChannel(channel, event));
            channelContainer.appendChild(recordButton);

            // Appends play button
            const playButton = document.createElement('button');
            playButton.className = `playButton`;
            playButton.disabled = true;
            playButton.addEventListener('click', (event) => this.playStopButtonClick(channel));
            channelContainer.appendChild(playButton);

            // Appends progress bar 
            const progressBar = document.createElement('div'); // just a container
            progressBar.className = `progressBar`;
            const progressBarCurrent = document.createElement('span'); // actual progress bar

            // When animation has ended
            progressBarCurrent.addEventListener('animationend', () => {
                // Clears current progress at the end
                progressBarCurrent.style.animation = null;
                // Enables play button
                this.channelElements[channel].playButton.disabled = false;
            })

            // Appends progressBarCurrent in progressbar (container)
            progressBar.appendChild(progressBarCurrent);
            // Appends progressBar in channelContainer
            channelContainer.appendChild(progressBar);

            // Pushes current channel elements to an array
            this.channelElements.push({
                playButton: playButton,
                recordButton: recordButton,
                progressBar: progressBarCurrent
            });

            // Add container at the end of channelsSection
            channelsSection.appendChild(channelContainer);
        }
    }

    // Records sounds on a channel
    recordOnChannel(channel: number, event: MouseEvent) {

        this.channels[channel] = [{
            time: event.timeStamp,
            key: null
        }];

        this.activeChannel = channel;

        // Disable record button when it is already in use
        this.channelElements.forEach(item => {
            item.recordButton.disabled = true;
        })

        // Disable play button when you're recording
        this.channelElements[channel].playButton.disabled = false;
        // When you record play button is a stop button
        this.channelElements[channel].playButton.classList.add('stopButton');
    }


    playStopButtonClick(channelIndex: number) {
        // Play button stops recording when recording is done
        if (this.activeChannel === channelIndex) {
            this.stopRecording(channelIndex);
        }
        else {
            const channel = this.channels[channelIndex];
            let firstTimestamp = channel[0].time;
            
            // Play recorded channel
            this.playChannel(channelIndex);

            // Play each sound in the right timestamp
            channel.forEach((sound: ISound) => {
                const time = sound.time - firstTimestamp; // gets timestamp of each sound
                setTimeout(() => {
                    this.playSound(sound.key);
                }, time);
            })
        }
    }

    // Stops recording
    stopRecording(channelIndex: number) {
        const channel = this.channels[channelIndex];
        const recordingTime = channel[channel.length - 1].time - channel[0].time; // last element - first element = total time

        // Stop button becomes play button again
        this.channelElements[channelIndex].playButton.classList.remove('stopButton');


        this.channelElements[channelIndex].progressBar.parentElement.querySelectorAll('time').forEach(item => item.remove());

        // Re-enables record button
        this.channelElements.forEach(item => {
            item.recordButton.disabled = false;
        })

        // If there's any sound recorded...
        if (recordingTime) {
            // For each sound...
            channel.forEach((sound: ISound) => {
                // Create element on progress bar
                const timeMoment = document.createElement('time');
                // Put this element in the right width (value in percents)
                const percentageTime = (sound.time - channel[0].time) / recordingTime * 100;
                timeMoment.className = "timeMoment"; // Adding class to style element
                timeMoment.style.left = `${percentageTime}%`; // Shifts element to the right, as it has 'position: absolute'
                this.channelElements[channelIndex].progressBar.parentElement.appendChild(timeMoment); // Appends element at the end
            })
        } else {
            this.channelElements[channelIndex].playButton.disabled = true;
        }
        this.activeChannel = null;
    }

    playChannel(channelIndex: number) {
        // Disables play button
        this.channelElements[channelIndex].playButton.disabled = true;

        const channel = this.channels[channelIndex]; // current channel

        let firstTimestamp = channel[0].time;
        const recordingTime = `${(channel[channel.length - 1].time - firstTimestamp).toFixed()}ms`; // Time = Last timestamp - first timestamp
        
        // animate progress bar
        this.channelElements[channelIndex].progressBar.style.animation = `progressBarAnim ${recordingTime} forwards linear`;
    }
}

const drums = new Drums();