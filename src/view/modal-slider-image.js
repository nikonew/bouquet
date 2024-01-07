import AbstractView from '../framework/view/abstract-view.js';

function createSliderTemplate (flowers) {
  const{previewImage, authorPhoto} = flowers;
  return `
  <div class="image-slider swiper modal-product__slider">
              <div class="image-slides-list swiper-wrapper">
                <div class="image-slides-list__item swiper-slide">
                  <div class="image-slide">
                    <picture>
                      <source type="image/webp" srcset="img/slides/slide-01.webp, img/slides/slide-01@2x.webp 2x"><img src=${previewImage} srcset="img/slides/slide-01@2x.jpg 2x" width="1274" height="1789" alt="">
                    </picture><span class="image-author image-slide__author">Автор  фотографии:  «${authorPhoto}»</span>
                  </div>
                </div>
                <div class="image-slides-list__item swiper-slide">
                  <div class="image-slide">
                    <picture>
                      <source type="image/webp" srcset="img/slides/slide-02.webp, img/slides/slide-02@2x.webp 2x"><img src="img/slides/slide-02.jpg" srcset="img/slides/slide-02@2x.jpg 2x" width="1274" height="1789" alt="">
                    </picture>
                  </div>
                </div>
                <div class="image-slides-list__item swiper-slide">
                  <div class="image-slide">
                    <picture>
                      <source type="image/webp" srcset="img/slides/slide-03.webp, img/slides/slide-03@2x.webp 2x"><img src="img/slides/slide-03.jpg" srcset="img/slides/slide-03@2x.jpg 2x" width="1274" height="1789" alt="">
                    </picture>
                  </div>
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
            </div>`
}

export default class SliderImageView extends AbstractView {
  #flowers = null;


  constructor({flowers}) {
    super();
    this.#flowers = flowers
  }

  get template () {
    return createSliderTemplate(this.#flowers)
  }
}
