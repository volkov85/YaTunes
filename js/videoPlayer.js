export const videoPlayerInit = () => {
    const videoPlayer = document.querySelector('.video-player');
    const videoButtonPlay = document.querySelector('.video-button__play');
    const videoButtonStop = document.querySelector('.video-button__stop');
    const videoTimePassed = document.querySelector('.video-time__passed');
    const videoProgress = document.querySelector('.video-progress');
    const videoTimeTotal = document.querySelector('.video-time__total');
    const videoVolume = document.querySelector('.video-volume');
    const videoVolumeOff = document.querySelector('.video-volume-off');
    const videoVolumeDown = document.querySelector('.video-volume-down');
    const videoVolumeUp = document.querySelector('.video-volume-up');
    const videoFullscreen = document.querySelector('.video-fullscreen');

    videoFullscreen.addEventListener('click', () => {
        videoPlayer.requestFullscreen();
    });

    /**
     * Переключение иконочного шрифта на кнопке играть/пауза
     */    
    const toggleIcon = () => {
        if (videoPlayer.paused) {
            videoButtonPlay.classList.remove('fa-pause');
            videoButtonPlay.classList.add('fa-play');
        } else {
            videoButtonPlay.classList.add('fa-pause');
            videoButtonPlay.classList.remove('fa-play');
        }
    };

    /**
     * Воспроизведение/остановка видео
     */    
    const togglePlay = (event) => {
        event.preventDefault();
        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
    }

    /**
     * Остановка видео и сброс на начало ролика
     */  
    const stopPlay = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    }

    /**
     * Добавление нуля в счетчике времени
     * @param {number} n - минуты
     */
    const addZero = n => n < 10 ? '0' + n : n;

    /**
     * Функция изменения громкости проигрывания
     */
    const changeValue = () => {
        const valueVolume = videoVolume.value;

        videoPlayer.volume = valueVolume / 100;
    }

    videoPlayer.addEventListener('click', togglePlay);
    videoButtonPlay.addEventListener('click', togglePlay);

    videoPlayer.addEventListener('play', toggleIcon);
    videoPlayer.addEventListener('pause', toggleIcon);

    videoButtonStop.addEventListener('click', stopPlay);

    /**
     * Обновление счетчика времени (текущий тайминг и полное время ролика)
     */  
    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime;
        const duration = videoPlayer.duration;

        videoProgress.value = (currentTime / duration) * 100;

        let minutePassed = Math.floor(currentTime / 60);
        let secondsPassed = Math.floor(currentTime % 60);

        let minuteTotal = Math.floor(duration / 60);
        let secondsTotal = Math.floor(duration % 60);

        videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
        videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`;
    });

    /**
     * Перемотка ролика через изменение положения бегунка
     */  
    videoProgress.addEventListener('input', () => {
        const duration = videoPlayer.duration;
        const value = videoProgress.value;

        videoPlayer.currentTime = (value * duration) / 100;
    });

    /**
     * Отключение звука и возврат в обратное положение
     */  
    videoVolumeOff.addEventListener('click', () => {
        const valueVolume = videoVolume.value;

        if (videoPlayer.volume != 0) {
            videoPlayer.volume = 0;
        } else {
            videoPlayer.volume = valueVolume / 100;
        }
    });

    videoVolumeDown.addEventListener('click', () => {
        videoPlayer.volume = 0;
        videoVolume.value = 0;
    });

    videoVolumeUp.addEventListener('click', () => {
        videoPlayer.volume = 1;
        videoVolume.value = 100;
    });

    /**
     * Изменение громкости через изменение положения бегунка
     */  
    videoVolume.addEventListener('input', changeValue);

    // videoPlayer.addEventListener('volumechange', () => {
    //     videoVolume.value = Math.round(videoPlayer.volume * 100);
    // });

    changeValue();
};