import {radioPlayerInit} from './radioPlayer.js';
import {musicPlayerInit} from './musicPlayer.js';
import {videoPlayerInit} from './videoPlayer.js';

const playerBtn = document.querySelectorAll('.player-btn');
const playerBlock = document.querySelectorAll('.player-block');
const temp = document.querySelector('.temp');

/**
 * Скрытие заголовка, блоков с плеерами и возврат кнопок в исходное состояние
 */
const deactivationPlayer = () => {
    temp.style.display = 'none';
    playerBtn.forEach(item => item.classList.remove('active'));
    playerBlock.forEach(item => item.classList.remove('active'));
};

/**
 * Деактивация плееров и отображение блока с плеером при клике на кнопку
 * @param {Object} playBnt - коллекция всех кнопок
 * @param {Object} playBlock - коллекция всех блоков с плеерами
 */
const activationPlayer = (playBnt, playBlock) => {
    playBnt.forEach((btn, i) => btn.addEventListener('click', () => {
        deactivationPlayer();
        btn.classList.add('active');
        playBlock[i].classList.add('active');
    }));
};

radioPlayerInit();
musicPlayerInit();
videoPlayerInit();
activationPlayer(playerBtn, playerBlock);