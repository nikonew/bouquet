import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';

function popupTemplate(state) {
  const {title, description, price, inCart, images, authorPhoto} = state
  return `<div class="modal-product">
  <button class="btn-close modal-product__btn-close" type="button" data-close-modal aria-label="Закрыть">
    <svg width="55" height="56" aria-hidden="true">
      <use xlink:href="#icon-close-big"></use>
    </svg>
  </button>
  <svg class="modal-product__btn-close modal-product__loader" width="56" height="56" aria-hidden="true">
    <use xlink:href="#icon-loader"></use>
  </svg>
  <div class="image-slider swiper modal-product__slider">
    <div class="image-slides-list swiper-wrapper">
      <div class="image-slides-list__item swiper-slide">
      <div class="image-slide">
        <picture>
          <img src="${images}" style="max-width: 100%; max-height: 100%" width="1274" height="1789" alt="">
        </picture><span class="image-author image-slide__author">Автор  фотографии:  «${authorPhoto}»</span>
      </div>
    </div>
    <button class="btn-round btn-round--to-left image-slider__button image-slider__button--prev" type="button">
      <svg width="80" height="85" aria-hidden="true" focusable="false">
        <use xlink:href="#icon-round-button"></use>
      </svg>
    </button>
    <button class="btn-round btn-round--to-right image-slider__button image-slider__button--next" type="button">
      <svg width="80" height="85" aria-hidden="true" focusable="false">
        <use xlink:href="#icon-round-button"></use>
      </svg>
    </button>
  </div>
  <div class="product-description">
    <div class="product-description__header">
      <h3 class="title title--h2">${title}</h3><b class="price price--size-big">${price}<span>Р</span></b>
    </div>
    <p class="text text--size-40">${description}</p>
    <button class="btn btn--outlined btn--full-width product-description__button" type="button" data-focus>${inCart === 0 ? 'отложить' : 'отложено'}
    </button>
  </div>
</div>`;
}

export default class PopupView extends AbstractStatefulView {
  #handleCloseClick = null;
  #flowers = null;

  constructor({flowers, onCloseClick}) {
    super();
    this._setState(PopupView.parseFilmToState(flowers));
    this.#handleCloseClick = onCloseClick;
    this._restoreHandlers()
  }

  _restoreHandlers() {
    this.element.querySelector('button.modal-product__btn-close').addEventListener('click', (evt) => this.#closeClickHandler(evt));
  }

  get template () {
    return popupTemplate(this._state);
  }

  #closeClickHandler = () => {
    this.#handleCloseClick();
  };

  static parseFilmToState (flowers){
    return {...flowers,
      images: ["http://localhost:9000/static/bouquets/preview/christie-kim.png"],
      inCart: false,
  }

}
}
