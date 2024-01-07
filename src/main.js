// Импорт вендоров и утилит, не удаляйте его
import "./vendor";
import FlowersModel from './model/flowers-model.js';
import { ImageSlider } from "./utils/image-slider";
import { iosVhFix } from "./utils/ios-vh-fix";
import { modals, initModals } from "./modals/init-modals";


// Ваши импорты...
import Presenter from './presenter/presenter.js';
import CatalogueApiService from './api-service/catalogue-api-service.js';
import CatalogueModel from './model/catalogue-model.js';


// Код для работы попапов, не удаляйте его
window.addEventListener("DOMContentLoaded", async () => {
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
  const AUTHORIZATION = 'Basic hS2sfS44wcl1sa2j';
  const END_POINT = 'https://grading.objects.pages.academy';

  const catalogueModel = new CatalogueModel(
    {catalogueApiService: new CatalogueApiService(END_POINT, AUTHORIZATION)})
  const flowersModel = new FlowersModel()


  const modalWrapper = document.querySelector('.modal__wrapper');
  const modalContent = modalWrapper.querySelector('.modal__content');
  const modalProduct = modalContent.querySelector('.modal-product')
  const wrapperElement = document.querySelector('.wrapper');
  const mainElement = wrapperElement.querySelector('main')
  const presenter = new Presenter({
    container: mainElement, catalogueModel, flowersModel, modalProduct
  });

presenter.init()


});




