import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

const galleryContainer = document.querySelector('.gallery');
const itemsMarkup = createGalleryItemsMarkup(galleryItems);
galleryContainer.insertAdjacentHTML('beforeend', itemsMarkup);

// rendered items
function createGalleryItemsMarkup(items) {
  return items.map(({ preview, original, description }) => {
    return `
  <a class="gallery__item" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      alt="${description}"
    />
  </a>
`
  }).join('');
}

// use library SimpleLightbox
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt', captionPosition: 'bottom', captionDelay: 250
});

// Определяем объект lightbox типа SimpleLightbox, который инициализируется с селектором '.gallery a' 
// (элементы <a> внутри контейнера .gallery). При инициализации lightbox задаем опции, 
// такие как captionsData (данные для подписей - берутся из атрибута alt изображений), 
// captionPosition (положение подписи - снизу), и captionDelay (задержка перед появлением подписи - 250 миллисекунд).