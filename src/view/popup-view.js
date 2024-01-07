import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';


function popupTemplate(state) {
  const {title, description, price, inCart} = state
  console.log(state)
  return `
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

  constructor({flowers}) {
    super();
    this._setState(PopupView.parseFilmToState(flowers));
    this._restoreHandlers()
  }

  _restoreHandlers() {
  }

  get template () {
    return popupTemplate(this._state);
  }

  static parseFilmToState (flowers){
    return {...flowers,
      inCart: false,
  }

}
}
