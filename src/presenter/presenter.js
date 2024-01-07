import {UpdateType} from '../const.js';
import {remove, render} from '../framework/render.js';
import AdvantagesListView from '../view/advantages-list-view.js';
import CatalogueContainerView from '../view/catalogue-container-view.js';
import CatalogueListView from '../view/catalogue-list-view.js';
import CatalogueView from '../view/catalogue-view.js';
import FilterColorListView from '../view/filter-color-list-view.js';
import FilterReasonListView from '../view/filter-reason-list-view.js';
import HeroListView from '../view/hero-list-view.js';
import MissionListView from '../view/mission-list-view.js';
import SliderImageView from '../view/modal-slider-image.js';
import PopupView from '../view/popup-view.js';
import ShowMoreBtnView from '../view/show-more-btn-view.js';
import CataloguePresenter from './catalogue-presenter.js';

const FILM_COUNT_PER_STEP = 5;

export default class Presenter {
  #container = null;
  #catalogueModel = null;
  #flowersModel = null;
  #button = null;
  #flowersPresenter = new Map();
  #advantagesList = new AdvantagesListView();
  #heroList = new HeroListView();
  #missionList = new MissionListView();
  #filterReasonList = new FilterReasonListView();
  #filterColorList = new FilterColorListView();
  #renderedFilmCount = FILM_COUNT_PER_STEP;
  #catalogueView = new CatalogueView()
  #catalogueContainer = new CatalogueContainerView;
  #catalogueList = new CatalogueListView();
  #modalProduct = null;
  #popupComponent = null;
  #sliderComponent = null;

  constructor({container, catalogueModel, flowersModel, modalProduct}) {
    this.#container = container;
    this.#catalogueModel = catalogueModel;
    this.#flowersModel = flowersModel;
    this.#modalProduct = modalProduct;



    this.#catalogueModel.addObserver(this.#handleModelEvent)
    this.#flowersModel.addObserver(this.#handleModelEvent)
  }

  get catalogue () {
    return this.#flowersModel.flowers

  }

  #renderCatalogue (flowers) {
    const flowersPresenter = new CataloguePresenter({
      flowersContainer: this.#catalogueList.element,
      modalProduct: this.#modalProduct,
      model: this.catalogue,
      onClick: this.#handleModeChange
    });
    flowersPresenter.init(flowers, this.#flowersModel);
    this.#flowersPresenter.set(flowers.id, flowersPresenter);
  }

  #renderCatalogueContainer () {
    render(this.#catalogueView, this.#container)
    render(this.#catalogueContainer,this.#catalogueView.element)
    render(this.#catalogueList, this.#catalogueContainer.element)

  }

  #renderPopupList () {
    this.#sliderComponent = new SliderImageView({
      flowers: this.catalogue
    })
    render(this.#sliderComponent, this.#modalProduct);

    this.#popupComponent = new PopupView({
      flowers: this.catalogue,
    })

    render(this.#popupComponent, this.#modalProduct);
  }

  #renderMainList () {
    render(this.#heroList, this.#container)
    render(this.#missionList, this.#container)
    render(this.#advantagesList, this.#container)
    render(this.#filterReasonList, this.#container)
    render(this.#filterColorList, this.#container)
  }




  #renderShowMoreBtn () {
    if (this.catalogue.length > FILM_COUNT_PER_STEP) {
      this.#button = new ShowMoreBtnView({onClick: this.#handleLoadMoreButtonClick});
      render(this.#button, this.#catalogueContainer.element);
    }
  }

  #handleLoadMoreButtonClick = () => {
    this.catalogue
      .slice(this.#renderedFilmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP)
      .map((flowers) => this.#renderCatalogue(flowers));
    this.#renderedFilmCount += FILM_COUNT_PER_STEP;
    if (this.#renderedFilmCount >= this.catalogue.length) {
      remove(this.#button);
    }
  };

  #renderCatalogueList () {
    this.catalogue.slice(0, FILM_COUNT_PER_STEP).map((flowers) => {
      this.#renderCatalogue(flowers);
    });
  }

  #clearFlowersList() {
    this.#flowersPresenter.forEach((presenter) => presenter.destroy());
    this.#flowersPresenter.clear();
    remove(this.#button);
    this.#renderShowMoreBtn();
  }

  #renderPageFlowers () {
    this.#renderCatalogueList()
    this.#renderShowMoreBtn()
  }

  #handleModeChange = () => {
    this.#flowersPresenter.forEach((presenter) => presenter.resetView());
  };


  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#flowersPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearFlowersList();
        this.#renderPageFlowers();
        break;
      case UpdateType.INIT:
        this.#renderMainList();
        break;
    }
  };



  init (){
    this.#renderMainList();
    this.#renderCatalogueContainer();
    this.#renderCatalogueList();
    this.#renderShowMoreBtn();
    this.#renderPopupList ();
  }
}
