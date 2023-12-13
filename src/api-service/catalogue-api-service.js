import ApiService from '../framework/api-service.js';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class CatalogueApiService extends ApiService {

  get catalogue() {
    return this._load({url: 'flowers-shop/products'})
      .then(ApiService.parseResponse);
  }


  }


