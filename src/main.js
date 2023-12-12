// Импорт вендоров и утилит, не удаляйте его
import "./vendor";
import CatalogueApiService from './api-service/catalogue-api-service.js';
import CatalogueModel from './model/catalogue-model.js';
import { ImageSlider } from "./utils/image-slider";
import { iosVhFix } from "./utils/ios-vh-fix";
import { modals, initModals } from "./modals/init-modals";

const AUTHORIZATION = 'Basic hS2sfS44wcl1sa2j';
const END_POINT = 'https://grading.objects.pages.academy';

const catalogueModel = new CatalogueModel(
  {catalogueApiService: new CatalogueApiService(END_POINT, AUTHORIZATION)})

const wrapperElement = document.querySelector('.wrapper');
const mainElement = wrapperElement.querySelector('main')
const presenter = new Presenter({
  container: mainElement, catalogueModel
});

// Ваши импорты...
import Presenter from './presenter.js';


// Код для работы попапов, не удаляйте его
window.addEventListener("DOMContentLoaded", () => {
  iosVhFix();

  window.addEventListener("load", () => {
    // Инициализация слайдера
    const imageSlider = new ImageSlider(".image-slider");
    imageSlider.init();

    // Инициализация попапов
    initModals();
  });

  // Пример кода для открытия попапа
  document
    .querySelector(".element-which-is-open-popup")
    .addEventListener("click", () => modals.open("popup-data-attr"));

  // Код отработает, если разметка попапа уже отрисована в index.html

  // Если вы хотите рисовать разметку попапа под каждое "открытие",
  // то не забудьте перенесети в код addEventListener инициализацию слайдера

  // ------------

  // Ваш код...

});


presenter.init()
catalogueModel.init()
