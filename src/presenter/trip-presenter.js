import {render, RenderPosition} from '../utils/render.js';
import EventListView from '../view/events-list-view';
import NoTripEventsView from '../view/no-trip-events';
import TripSortView from '../view/trip-sort-view';
import PointPresenter from './point-presrnter';
import {updateItem} from '../utils/ordinary';
import { SortForm } from '../utils/ordinary';
import { sortTaskDay, sortTaskDuration, sortTaskPrice } from '../utils/sorting.js';

export default class TripPresenter {
    #mainElement = null;
    #tripEventsElement = null;

    #tripSortComponent = new TripSortView();
    #noTripEventsComponent = new NoTripEventsView();
    #tripEventsListElement = new EventListView();

    #tripEvents = [];
    #pointPresenter = new Map();
    #currentSortForm = SortForm.SORT_DAY;
    #sourcedTripEvents = [];
    constructor(mainElement){
        this.#mainElement = mainElement;
        this.#tripEventsElement = this.#mainElement.querySelector('.trip-events');
    }

    init = (tripEvents) => {
        this.#tripEvents = [...tripEvents];
        this.#sourcedTripEvents = [...tripEvents];
        this.#renderMain();
    }

    #renderNoTasks = () => {
        render(this.#tripEventsElement, this.#noTripEventsComponent, RenderPosition.BEFOREEND);
    }

    #renderTripEventsListElement = () => {
        render(this.#tripEventsElement, this.#tripEventsListElement, RenderPosition.BEFOREEND);
    }

    #handleModeChange = () => {
        this.#pointPresenter.forEach((presenter) => presenter.restView());
    }

    #handlePointChange = (updatePoint) => {
        this.#tripEvents = updateItem(this.#tripEvents, updatePoint);
        this.#pointPresenter.get(updatePoint.id).init(updatePoint);
        this.#sourcedTripEvents = updateItem(this.#sourcedTripEvents, updatePoint);
    }

    #renderSort = () => {
        render(this.#tripEventsElement, this.#tripSortComponent, RenderPosition.AFTERBEGIN);

        this.#tripSortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #sortTasks = (sortForm) => {
    switch (sortForm) {
      case SortForm.SORT_DAY:
        this.#tripEvents.sort(sortTaskDay);
        break;
      case SortForm.SORT_TIME:
        this.#tripEvents.sort(sortTaskDuration);
        break;
      case SortForm.SORT_PRICE:
        this.#tripEvents.sort(sortTaskPrice);
        break;
      default:
        this.#tripEvents = [...this.#sourcedTripEvents];
    }
    this.#currentSortForm = sortForm;
  }

  #handleSortTypeChange = (sortForm) => {
    if (this.#currentSortForm === sortForm) {
      return;
    }
    this.#sortTasks(sortForm);
    this.#clearTaskList();
    this.#renderTripEventsList();
    }

    #renderTripEvent = (point) => {
        const pointPresenter = new PointPresenter(this.#tripEventsListElement, this.#handlePointChange, this.#handleModeChange);
        pointPresenter.init(point);
        this.#pointPresenter.set(point.id, pointPresenter);
    };

    #renderTripEventsList = () => {
        for (let i = 0; i < this.#tripEvents.length; i++) {
            this.#renderTripEvent(this.#tripEvents[i]);
        }
    }

    #renderMain = () => {
        if (this.#tripEvents.length === 0) {
            this.#renderNoTasks();
        }
        else{
            this.#renderSort();
            this.#renderTripEventsListElement();
            this.#sortTasks(this.#currentSortForm);
            this.#renderTripEventsList();
        }
    }
    
    #clearTaskList = () => {
        this.#pointPresenter.forEach((presenter) => presenter.destroy());
        this.#pointPresenter.clear();
      }
}