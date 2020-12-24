/**
 * Добавление нуля в счетчике времени
 * @param {number} n - минуты
 */
export const addZero = n => n < 10 ? '0' + n : n;