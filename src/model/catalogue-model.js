import {UpdateType} from '../const.js';
import Observable from '../framework/observable.js';

export default class CatalogueModel extends Observable {
  #catalogueApiService = null;
  #catalogue = [];

  constructor({catalogueApiService}) {
    super();
    this.#catalogueApiService = catalogueApiService;
  }

  get catalogue() {
    return this.#catalogue;
  }

  async init() {
    try {
      this.#catalogue = await this.#catalogueApiService.catalogue;
    } catch(err) {
      this.#catalogue = [];
    }

    this._notify(UpdateType.INIT, this.#catalogue);
  }

  async updateCatalogue(updateType, update) {
    const index = this.#catalogue.findIndex((catalogue) => catalogue.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    try {
      const response = await this.#catalogueApiService.updateCatalogue(update);
      const updatedCatalogue = this.#catalogue(response);
      this.#catalogue = [
        ...this.#catalogue.slice(0, index),
        updatedCatalogue,
        ...this.#catalogue.slice(index + 1),
      ];
      this._notify(updateType, updatedCatalogue);
    } catch (err) {
      throw new Error('Can\'t update catalogue');
    }
  }
}

