import {addZero} from './supScript.js';

export const musicPlayerInit = () => {
    const audio = document.querySelector('.audio');
    const audioImg = document.querySelector('.audio-img');
    const audioHeader = document.querySelector('.audio-header');
    const audioPlayer = document.querySelector('.audio-player');
    const audioNavigation = document.querySelector('.audio-navigation');
    const audioButtonPlay = document.querySelector('.audio-button__play');
    const audioProgress = document.querySelector('.audio-progress');
    const audioProgressTiming = document.querySelector('.audio-progress__timing');
    const audioTimePassed = document.querySelector('.audio-time__passed');
    const audioTimeTotal = document.querySelector('.audio-time__total');
    const musicVolume = document.querySelector('.music-volume');
    
    const playlist = ['hello', 'flow', 'speed'];

    let trackIndex = 0;

    /**
     * Функция проигрывания/паузы трека
     */
    const loadTrack = () => {
        const isPlayed = audioPlayer.paused;
        const track = playlist[trackIndex];
        audioImg.src = `./audio/${track}.jpg`;
        audioHeader.textContent = track.toUpperCase();
        audioPlayer.src = `./audio/${track}.mp3`;

        if (isPlayed) {
            audioPlayer.pause();
        } else {
            audioPlayer.play();
        }
    };

    /**
     * Функция загрузки следующего трека
     */
    const nextTrack = () => {
        if (trackIndex === playlist.length - 1) {
            trackIndex = 0;
        } else {
            trackIndex++;
        }
        loadTrack();
    };

    /**
     * Функция загрузки предыдущего трека
     */
    const prevTrack = () => {
        if (trackIndex !== 0) {
            trackIndex--;
        } else {
            trackIndex = playlist.length - 1;
        }
        loadTrack();
    };

    /**
     * Функция меняет иконку плей/пауза
     */
    const changeIconMusic = () => {
        audio.classList.toggle('play');
        audioButtonPlay.classList.toggle('fa-play');
        audioButtonPlay.classList.toggle('fa-pause');
    };

    /**
     * Функция изменения громкости проигрывания
     */
    const changeValue = () => {
        const valueVolume = musicVolume.value;
        audioPlayer.volume = valueVolume / 100;
    }

    /**
     * Событие для запуска трека через делегирование на все кнопки
     */  
    audioNavigation.addEventListener('click', event => {
        const target = event.target;

        if (target.classList.contains('audio-button__play')) {
            changeIconMusic();

            if (audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }
            loadTrack();
        }

        if (target.classList.contains('audio-button__prev')) {
            prevTrack();
        }

        if (target.classList.contains('audio-button__next')) {
            nextTrack();
        }
    });

    /**
     * Событие для запуска следующего трека по окончании текущего
     */  
    audioPlayer.addEventListener('ended', () => {
        nextTrack();
        audioPlayer.play();
    });

    /**
     * Событие для вывода текущего тайминга трека и общего времени
     */  
    audioPlayer.addEventListener('timeupdate', () => {
        const duration = audioPlayer.duration;
        const currentTime = audioPlayer.currentTime;
        const progress = (currentTime / duration) * 100;
        const minutesPassed = Math.floor(currentTime / 60) || '0';
        const secondsPassed = Math.floor(currentTime % 60) || '0';
        const minutesTotal = Math.floor(duration / 60) || '0';
        const secondsTotal = Math.floor(duration % 60) || '0';

        audioProgressTiming.style.width = progress + '%';
        audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
        audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;
    });

    /**
     * Событие для прогресс бара, перемотка трека
     */  
    audioProgress.addEventListener('click', event => {
        const x = event.offsetX;
        const allWidth = audioProgress.clientWidth;
        const progress = (x / allWidth) * audioPlayer.duration;

        audioPlayer.currentTime = progress;
    });

    /**
     * Изменение громкости через изменение положения бегунка
     */  
    musicVolume.addEventListener('input', changeValue);

    changeValue();

    /**
     * Метод для остановки проигрывания трека и смены иконок
     */  
    musicPlayerInit.stop = () => {
        audioPlayer.pause();
        audio.classList.remove('play');
        audioButtonPlay.classList.remove('fa-pause');
        audioButtonPlay.classList.add('fa-play');
    };
};