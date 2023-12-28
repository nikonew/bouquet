import {UpdateType} from '../const.js';
import Observable from '../framework/observable.js';

export default class CatalogueModel extends Observable {
  #catalogueApiService = null;
  #catalogue = [];

  constructor({catalogueApiService}) {
    super();
    this.#catalogueApiService = catalogueApiService;
  }


  async init() {
    try {
      this.#catalogue = await this.#catalogueApiService.catalogue;
    } catch(err) {
      this.#catalogue = [];
    }

    this._notify(UpdateType.INIT, this.#catalogue);
  }

}

