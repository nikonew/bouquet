import AbstractView from '../framework/view/abstract-view.js';

function createCatalogueContainer () {
  return `<div class="container">
          </div>`
}


export default class CatalogueContainerView extends AbstractView {

  constructor() {
    super();
  }

  get template () {
    return createCatalogueContainer()
  }
}
