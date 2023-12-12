import {render} from './framework/render.js';
import AdvantagesList from './view/advantages-list.js';
import CatalogueList from './view/catalogue-list.js';
import FilterColorList from './view/filter-color-list.js';
import FilterReasonList from './view/filter-reason-list.js';
import HeroList from './view/hero-list.js';
import MissionList from './view/mission-list.js';

export default class Presenter {
  #container = null;
  #catalogueModel = null;
  #advantagesList = new AdvantagesList;
  #heroList = new HeroList();
  #missionList = new MissionList;
  #filterReasonList = new FilterReasonList;
  #filterColorList = new FilterColorList;
  #catalogueList = new CatalogueList;

  constructor({container, catalogueModel}) {
    this.#container = container;
    this.#catalogueModel = catalogueModel;
    console.log(this.#catalogueModel)


    this.#catalogueModel.addObserver(this.#handleModelEvent)
  }

  init (){
    this.#renderMainList()
  }

  #renderMainList () {
    render(this.#heroList, this.#container)
    render(this.#missionList, this.#container)
    render(this.#advantagesList, this.#container)
    render(this.#filterReasonList, this.#container)
    render(this.#filterColorList, this.#container)
    render(this.#catalogueList, this.#container)
  }


  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case updateType.INIT:
        this.#renderMainList();
        break;
    }
  };
}
