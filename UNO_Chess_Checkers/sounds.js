// Звуковые эффекты для игры Zortum
class GameSounds {
    constructor() {
        this.sounds = {};
        this.enabled = true;
        this.volume = 0.5;
        this.initializeSounds();
    }

    initializeSounds() {
        // Создаем звуковые эффекты с помощью Web Audio API
        this.createSound('move', this.generateMoveSound());
        this.createSound('capture', this.generateCaptureSound());
        this.createSound('card', this.generateCardSound());
        this.createSound('dice', this.generateDiceSound());
        this.createSound('coin', this.generateCoinSound());
        this.createSound('victory', this.generateVictorySound());
        this.createSound('error', this.generateErrorSound());
        this.createSound('select', this.generateSelectSound());
        this.createSound('shuffle', this.generateShuffleSound());
        this.createSound('special', this.generateSpecialSound());
    }

    createSound(name, audioBuffer) {
        this.sounds[name] = audioBuffer;
    }

    playSound(name) {
        if (!this.enabled || !this.sounds[name]) return;

        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const source = audioContext.createBufferSource();
            const gainNode = audioContext.createGain();
            
            source.buffer = this.sounds[name];
            gainNode.gain.value = this.volume;
            
            source.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            source.start(0);
        } catch (error) {
            console.log('Звук не может быть воспроизведен:', error);
        }
    }

    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
    }

    toggleSound() {
        this.enabled = !this.enabled;
        return this.enabled;
    }

    // Генерация звуковых эффектов
    generateMoveSound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const buffer = audioContext.createBuffer(1, 44100 * 0.1, 44100);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < buffer.length; i++) {
            const t = i / buffer.length;
            data[i] = Math.sin(2 * Math.PI * 440 * t) * Math.exp(-t * 5) * 0.3;
        }
        
        return buffer;
    }

    generateCaptureSound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const buffer = audioContext.createBuffer(1, 44100 * 0.2, 44100);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < buffer.length; i++) {
            const t = i / buffer.length;
            data[i] = Math.sin(2 * Math.PI * 200 * t) * Math.exp(-t * 3) * 0.5;
        }
        
        return buffer;
    }

    generateCardSound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const buffer = audioContext.createBuffer(1, 44100 * 0.15, 44100);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < buffer.length; i++) {
            const t = i / buffer.length;
            data[i] = Math.sin(2 * Math.PI * 800 * t) * Math.exp(-t * 4) * 0.4;
        }
        
        return buffer;
    }

    generateDiceSound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const buffer = audioContext.createBuffer(1, 44100 * 0.3, 44100);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < buffer.length; i++) {
            const t = i / buffer.length;
            data[i] = Math.sin(2 * Math.PI * 300 * t) * Math.exp(-t * 2) * 0.6;
        }
        
        return buffer;
    }

    generateCoinSound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const buffer = audioContext.createBuffer(1, 44100 * 0.25, 44100);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < buffer.length; i++) {
            const t = i / buffer.length;
            data[i] = Math.sin(2 * Math.PI * 600 * t) * Math.exp(-t * 3) * 0.4;
        }
        
        return buffer;
    }

    generateVictorySound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const buffer = audioContext.createBuffer(1, 44100 * 0.5, 44100);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < buffer.length; i++) {
            const t = i / buffer.length;
            const frequency = 440 + 220 * t; // Восходящий тон
            data[i] = Math.sin(2 * Math.PI * frequency * t) * Math.exp(-t * 2) * 0.7;
        }
        
        return buffer;
    }

    generateErrorSound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const buffer = audioContext.createBuffer(1, 44100 * 0.1, 44100);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < buffer.length; i++) {
            const t = i / buffer.length;
            data[i] = Math.sin(2 * Math.PI * 150 * t) * Math.exp(-t * 8) * 0.5;
        }
        
        return buffer;
    }

    generateSelectSound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const buffer = audioContext.createBuffer(1, 44100 * 0.05, 44100);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < buffer.length; i++) {
            const t = i / buffer.length;
            data[i] = Math.sin(2 * Math.PI * 1000 * t) * Math.exp(-t * 10) * 0.3;
        }
        
        return buffer;
    }

    generateShuffleSound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const buffer = audioContext.createBuffer(1, 44100 * 0.4, 44100);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < buffer.length; i++) {
            const t = i / buffer.length;
            const frequency = 400 + Math.random() * 200;
            data[i] = Math.sin(2 * Math.PI * frequency * t) * Math.exp(-t * 1.5) * 0.4;
        }
        
        return buffer;
    }

    generateSpecialSound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const buffer = audioContext.createBuffer(1, 44100 * 0.35, 44100);
        const data = buffer.getChannelData(0);
        
        for (let i = 0; i < buffer.length; i++) {
            const t = i / buffer.length;
            const frequency = 500 + 300 * Math.sin(t * Math.PI * 4);
            data[i] = Math.sin(2 * Math.PI * frequency * t) * Math.exp(-t * 2) * 0.6;
        }
        
        return buffer;
    }

    // Методы для воспроизведения конкретных звуков
    playMove() {
        this.playSound('move');
    }

    playCapture() {
        this.playSound('capture');
    }

    playCard() {
        this.playSound('card');
    }

    playDice() {
        this.playSound('dice');
    }

    playCoin() {
        this.playSound('coin');
    }

    playVictory() {
        this.playSound('victory');
    }

    playError() {
        this.playSound('error');
    }

    playSelect() {
        this.playSound('select');
    }

    playShuffle() {
        this.playSound('shuffle');
    }

    playSpecial() {
        this.playSound('special');
    }

    // Метод для создания звукового интерфейса
    createSoundControls() {
        const soundPanel = document.createElement('div');
        soundPanel.className = 'sound-panel';
        soundPanel.innerHTML = `
            <h3>🔊 Звук</h3>
            <div class="sound-controls">
                <button id="toggleSound" class="btn">🔊</button>
                <input type="range" id="volumeSlider" min="0" max="100" value="50" class="volume-slider">
                <span id="volumeValue">50%</span>
            </div>
        `;

        // Обработчики событий
        const toggleBtn = soundPanel.querySelector('#toggleSound');
        const volumeSlider = soundPanel.querySelector('#volumeSlider');
        const volumeValue = soundPanel.querySelector('#volumeValue');

        toggleBtn.addEventListener('click', () => {
            this.enabled = !this.enabled;
            toggleBtn.textContent = this.enabled ? '🔊' : '🔇';
        });

        volumeSlider.addEventListener('input', (e) => {
            const volume = e.target.value / 100;
            this.setVolume(volume);
            volumeValue.textContent = `${e.target.value}%`;
        });

        return soundPanel;
    }
}

// Экспорт для использования в основном файле
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GameSounds;
} 