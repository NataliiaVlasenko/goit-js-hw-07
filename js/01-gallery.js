import { galleryItems } from "./gallery-items.js";

// import * as basicLightbox from 'basiclightbox'

console.log(galleryItems);

//1
const parentRef = document.querySelector(".gallery");
const markup = createImagesMarkup(galleryItems);

parentRef.insertAdjacentHTML("beforeend", markup);

function createImagesMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
    <div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>
        `;
    })
    .join("");
}

//2

parentRef.addEventListener("click", onPicClick);


let LargeImgRef = "";

function onPicClick(event) {
  event.preventDefault();

  if (event.target.nodeName !== "IMG") {
    return;
  }

  // console.log(event.target.nodeName, "code below if");

  //3
  LargeImgRef = event.target.dataset.source;

  const modal = basicLightbox.create(
    `
       
       <img src="${LargeImgRef}"/>
          `,

    {
      onShow: () => window.addEventListener("keydown", onEscKeyPress),
      onClose: () => window.removeEventListener("keydown", onEscKeyPress),
    }
  );

  modal.show();

  function onEscKeyPress(evt) {
    if (evt.code === "Escape") {
      modal.close();
    }
  }
}
