import Observable from '../framework/observable.js';

const POSTERS = [
  'item-delicate-irises.png',
  'item-delicate-irises@2x.png',
];

export const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (array) =>
  array[getRandomInteger(0, array.length - 1)];

const flowers = [
  {
    "id": 1,
    "title": "Летнее настроение",
    "description": "Cочетание полевых и садовых цветов: розы, львиный зев, чертополох, тюльпаны и эустома",
    "type": "birthday",
    "color": "red",
    "price": 5800,
    "previewImage": `markup/img/content/items/${getRandomArrayElement(POSTERS)}`,
    "authorPhoto": "Christie Kim"
  },
  {
    "id": 1,
    "title": "Летнее настроение",
    "description": "Cочетание полевых и садовых цветов: розы, львиный зев, чертополох, тюльпаны и эустома",
    "type": "birthday",
    "color": "red",
    "price": 5800,
    'previewImage': `markup/img/content/items/${getRandomArrayElement(POSTERS)}`,
    "authorPhoto": "Christie Kim"
  }
]


const getRandomFlowers= () => (getRandomArrayElement(flowers));

const FILM_COUNT = 6;

export default class FlowersModel extends Observable {
  #flowers = Array.from({length: FILM_COUNT}, getRandomFlowers);


  get flowers() {
    return this.#flowers;
  }

  getBouquet (ids) {
    return this.#flowers.filter((bouquet) => ids.includes(bouquet.id));
  }

  updateFlowers (updateType, update) {
    const index = this.#flowers.findIndex((flower) => flower.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this.#flowers = [
      ...this.#flowers.slice(0, index),
      update,
      ...this.#flowers.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

}
