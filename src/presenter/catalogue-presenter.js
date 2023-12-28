import {remove, render, RenderPosition, replace} from '../framework/render.js';
import CataloguePopupPresenter from './popup-presenter.js';
import {ImageSlider} from '../utils/image-slider.js';
import CatalogueItemView from '../view/catalogue-item-view.js';
import PopupView from '../view/popup-view.js';
import { modals } from '../modals/init-modals';

export default class CataloguePresenter {
  #flowers = null;
  #flowersContainer = null;
  #flowersComponent = null;
  #handleModeChange = null;
  #modalAnchor = null;
  #cataloguePopupPresenter = null;
  #model = null;

  constructor({flowersContainer, onClick, modalAnchor, model}) {
    this.#flowersContainer = flowersContainer;
    this.#handleModeChange = onClick;
    this.#modalAnchor = modalAnchor;
    this.#model = model;
  }


  init(flowers) {
    this.#flowers = flowers;

    this.#cataloguePopupPresenter = new CataloguePopupPresenter({
      flowers: this.#flowers,
      containerModal: this.#modalAnchor
    });

    const prevFlowersComponent = this.#flowersComponent;
    this.#flowersComponent = new CatalogueItemView({
      flowers: this.#flowers,
      onClickPopup: this.#handleClick
    });

    if (prevFlowersComponent === null) {
      render(this.#flowersComponent, this.#flowersContainer);
      return;
    }

    if (this.#flowersContainer.contains(prevFlowersComponent.element)) {
      replace(this.#flowersComponent, prevFlowersComponent);
    }

    remove(prevFlowersComponent);
  }

  destroy() {
    remove(this.#flowersComponent);
  }
#handleClick(index) {
  const fullFlowersData = this.#model.getBouquet(index.id);
    this.#cataloguePopupPresenter.showPopup(fullFlowersData);
}

}
