import AbstractView from '../framework/view/abstract-view.js';

function createCatalogue () {
  return `<div class="catalogue" data-items="catalogue"></div>`
}

export default class CatalogueView extends AbstractView {

  constructor() {
    super();
  }

  get template () {
    return createCatalogue()
  }
}
