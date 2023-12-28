import AbstractView from '../framework/view/abstract-view.js';

function createCatalogueList () {
  return `<ul class="catalogue__list"></ul>`
}

export default class CatalogueListView extends AbstractView{

  constructor() {
    super();
  }

  get template () {
    return createCatalogueList()
  }
}
