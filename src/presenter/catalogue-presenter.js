import {remove, render, replace} from '../framework/render.js';
import {modals} from '../modals/init-modals.js';
import {isEscapeKey} from '../util.js';
import CatalogueItemView from '../view/catalogue-item-view.js';


const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class CataloguePresenter {
  #flowers = null;
  #flowersContainer = null;
  #flowersComponent = null;
  #handleModeChange = null;
  #modalProduct = null;
  #model = null;
  #popupComponent = null;
  #mode = Mode.DEFAULT;

  constructor({flowersContainer, onClick, modalProduct, model}) {
    this.#flowersContainer = flowersContainer;
    this.#handleModeChange = onClick;
    this.#modalProduct = modalProduct;
    this.#model = model;
  }


  init(flowers) {
    this.#flowers = flowers;

    const prevFlowersComponent = this.#flowersComponent;
    this.#flowersComponent = new CatalogueItemView({
      flowers: this.#flowers,
      onClickPopup: this.#handleClick
    });


    if (prevFlowersComponent === null) {
      render(this.#flowersComponent, this.#flowersContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#flowersComponent, prevFlowersComponent);
    }


    remove(prevFlowersComponent);

  }

  destroy() {
    remove(this.#flowersComponent);
    remove(this.#popupComponent);
  }

  #replaceFormToCard() {
    document.querySelector(".catalogue__item")
      document.addEventListener("click", () => modals.open("popup-data-attr"));
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToCard();
    }
  }

  #escKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#replaceFormToCard();
    }
  };

  #handleClick = () => {
    this.#replaceFormToCard();
  };

}
