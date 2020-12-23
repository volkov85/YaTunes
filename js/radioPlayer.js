export const radioPlayerInit = () => {
    const radio = document.querySelector('.radio');
    const radioCoverImg = document.querySelector('.radio-cover__img');
    const radioHeaderBig = document.querySelector('.radio-header__big');
    const radioNavigation = document.querySelector('.radio-navigation');
    const radioItem = document.querySelectorAll('.radio-item');
    const radioStop = document.querySelector('.radio-stop');
    const radioVolume = document.querySelector('.radio-volume');

    const audio = new Audio();
    audio.type = 'audio/aac';

    radioStop.disabled = true;

    /**
     * Функция меняет иконку плей/пауза
     */
    const changeIconPlay = () => {
        if (audio.paused) {
            radio.classList.remove('play');
            radioStop.classList.add('fa-play');
            radioStop.classList.remove('fa-stop');
        } else {
            radio.classList.add('play');
            radioStop.classList.add('fa-stop');
            radioStop.classList.remove('fa-play');
        }
    };

    /**
     * Функция добавляет серую обводку активному радио
     */
    const selectItem = elem => {
        radioItem.forEach(item => item.classList.remove('select'));
        elem.classList.add('select');
    }

    /**
     * Функция изменения громкости проигрывания
     */
    const changeRadioVolume = () => {
        const valueVolume = radioVolume.value;

        audio.volume = valueVolume / 100;
    }

    /**
     * Смена радиостанций и названия/картинки к ним
     */
    radioNavigation.addEventListener('change', event => {
        const target = event.target;
        const parent = target.closest('.radio-item');

        selectItem(parent);

        const title = parent.querySelector('.radio-name').textContent;
        radioHeaderBig.textContent = title;

        const urlImg = parent.querySelector('.radio-img').src;
        radioCoverImg.src = urlImg;

        radioStop.disabled = false;
        audio.src = target.dataset.radioStantion;
        audio.play();
        changeIconPlay();
    });

    /**
     * Остановка проигрывания и вызов функции смены иконки
     */
    radioStop.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        changeIconPlay();
    });

    /**
     * Изменение громкости через изменение положения бегунка
     */  
    radioVolume.addEventListener('input', changeRadioVolume);

    changeRadioVolume();
};