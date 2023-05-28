import Player from '@vimeo/player';
import throttle from 'lodash.throttle'; // импорт функции throttle из пакета lodash.throttle.

const CURRENT_TIME_KEY = 'videoplayer-current-time'; // задается константа CURRENT_TIME_KEY со значением 'videoplayer-current-time'

const iframe = document.querySelector('iframe'); // получаем ссылку на iframe элемент на текущей странице.
const player = new Player(iframe, {
  loop: true,
  fullscreen: true,
  quality: '1080p',
});
// Создаем новый объект player типа Player с использованием полученного iframe и опциями, такими как 
// loop (зацикливание воспроизведения), fullscreen (полноэкранный режим) и quality (качество видео).

const getCurrentTime = function (currentTime) {
  const seconds = currentTime.seconds;
  localStorage.setItem(CURRENT_TIME_KEY, JSON.stringify(seconds));
};
// Определяем функцию getCurrentTime, которая принимает текущее время видео и
// сохраняет его в локальном хранилище под ключом CURRENT_TIME_KEY.

player.on('timeupdate', throttle(getCurrentTime, 1000));

// Устанавливается обработчик события timeupdate для объекта player, который вызывает функцию getCurrentTime 
// с использованием throttle для ограничения частоты вызовов до одного раза в секунду.

player.setCurrentTime(JSON.parse(localStorage.getItem(CURRENT_TIME_KEY)) || 0);

// Устанавливаем текущее время воспроизведения видео, используя значение из локального хранилища 
// под ключом CURRENT_TIME_KEY. Если значение отсутствует, устанавливается значение 0.

player
  .setColor('#d8e0ff')
  .then(function (color) {
    console.log('The new color value: #D8E0FF');
  })
  .catch(function (error) {
    console.log('An error occurred while setting the color');
  });

  // Вызывается метод setColor объекта player, который устанавливает цвет видеоплеера в '#d8e0ff'. 
  // Этот метод возвращает промис, который затем обрабатывается с помощью методов then и catch. 
  // В случае успешного выполнения промиса выводится сообщение в консоль с новым значением цвета. 
  // В случае ошибки выводится сообщение об ошибке в консоль.
