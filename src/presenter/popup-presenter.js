import {render, RenderPosition} from '../framework/render.js';
import {modals} from '../modals/init-modals.js';
import {isEscapeKey} from '../util.js';
import {ImageSlider} from '../utils/image-slider.js';
import PopupView from '../view/popup-view.js';


export default class CataloguePopupPresenter {
  #popupView = null;
  #flowers = null;
  #modalAnchor = null;

  constructor({flowers, containerModal}) {
    this.#flowers = flowers
    this.#modalAnchor = containerModal;
  }


  showPopup() {
    this.#popupView = new PopupView({
      flowers: this.#flowers,
      onCloseClick: this.#closePopupClickHandler
    })
    render(this.#popupView, this.#modalAnchor, RenderPosition.BEFOREEND)
    document
      .querySelector(".element-which-is-open-popup")
      .addEventListener("click", () => modals.open("popup-data-attr"));
    const imageSlider = new ImageSlider('.image-slider');
    imageSlider.init();
    document.body.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #closePopup() {
    document.body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #closePopupClickHandler() {
    this.#closePopup()
  }

  #escKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      this.#closePopup();
    }
  };

}
