export class Settings {
    constructor() {
        this.isAudioEnabled = true;
        this.volume = 0.5;
    }
    
    toggleAudio() {
        this.isAudioEnabled = !this.isAudioEnabled;
    }
    
    setVolume(value) {
        this.volume = constrain(value, 0, 1);
    }
    
    saveSettings() {
        localStorage.setItem('gameSettings', JSON.stringify({
            isAudioEnabled: this.isAudioEnabled,
            volume: this.volume
        }));
    }
    
    loadSettings() {
        const savedSettings = localStorage.getItem('gameSettings');
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            this.isAudioEnabled = settings.isAudioEnabled;
            this.volume = settings.volume;
        }
    }
}