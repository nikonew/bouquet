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

  async updateCatalogue(catalogue) {
    const response = await this._load({
      url: `flowers-shop/products${catalogue.id}`,
      method: Method.PUT,
      body: JSON.stringify(catalogue),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }
  }


