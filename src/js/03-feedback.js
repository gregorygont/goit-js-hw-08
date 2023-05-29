import throttle from 'lodash.throttle';

const LOCAL_KEY = 'feedback-form-state';
// Задаем константу LOCAL_KEY со значением 'feedback-form-state', которая будет использоваться в качестве 
// ключа для сохранения и извлечения данных из локального хранилища.

const form = document.querySelector('.feedback-form');
// Получаем ссылку на форму, выбирая элемент с классом .feedback-form с помощью метода querySelector 
// и присваиваем переменной form.

form.addEventListener('input', throttle(onInputData, 500));
form.addEventListener('submit', onFormSubmit);
//Добавляем обработчики событий: на событие input формы, используя функцию throttle с задержкой 500 миллисекунд 
// для вызова функции onInputData, и на событие submit формы, вызывающее функцию onFormSubmit.

let dataForm = JSON.parse(localStorage.getItem(LOCAL_KEY)) || {};
const { email, message } = form.elements;
reloadPage();
//Инициализируем переменную dataForm путем парсинга JSON-данных, полученных из локального хранилища 
//с помощью метода localStorage.getItem(). Если данных нет или происходит ошибка при парсинге, 
//переменной dataForm присваивается пустой объект.
// Извлекаются элементы email и message из коллекции elements формы и присваиваются переменным email и 
// message соответственно.
// Вызывается функция reloadPage(), которая заполняет поля формы значениями из объекта dataForm, если такой объект существует.


function onInputData(e) {
  dataForm = { email: email.value, message: message.value };
  localStorage.setItem(LOCAL_KEY, JSON.stringify(dataForm));
}
// Функция onInputData вызывается при событии input на любом поле формы. 
// Она обновляет объект dataForm текущими значениями полей email и message и сохраняет обновленный объект 
// в локальное хранилище с помощью метода localStorage.setItem().

function reloadPage() {
  if (dataForm) {
    email.value = dataForm.email || '';
    message.value = dataForm.message || '';
  }
}
//Функция reloadPage проверяет, существует ли объект dataForm, и заполняет поля email и message 
// соответствующими значениями. Если значение отсутствует, поля остаются пустыми.

function onFormSubmit(e) {
  e.preventDefault();
  console.log({ email: email.value, message: message.value });

  if (email.value === '' || message.value === '') {
    return alert('Please fill in all the fields!');
  }

  localStorage.removeItem(LOCAL_KEY);
  e.currentTarget.reset();
  dataForm = {};
}

//Функция onFormSubmit вызывается при отправке формы. Она предотвращает стандартное поведение отправки формы, 
//выводит значения email и message в консоль. Затем она проверяет, заполнены ли оба поля. 
//Если хотя бы одно поле не заполнено, выводится предупреждение с помощью функции alert. 
//Если оба поля заполнены, функция удаляет сохраненные данные из локального хранилища с помощью метода 
//localStorage.removeItem(), сбрасывает форму с помощью метода reset() и устанавливает переменную dataForm в 
//пустой объект.








