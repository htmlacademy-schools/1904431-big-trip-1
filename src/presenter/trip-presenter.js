import {render, RenderPosition} from '../utils/render.js';
import EventListView from '../view/events-list-view';
import NoTripEventsView from '../view/no-trip-events';
import TripSortView from '../view/trip-sort-view';
import PointPresenter from './point-presrnter';
import {updateItem} from '../utils/ordinary';

export default class TripPresenter {
    #mainElement = null;
    #tripEventsElement = null;

    #tripSortComponent = new TripSortView();
    #noTripEventsComponent = new NoTripEventsView();
    #tripEventsListElement = new EventListView();

    #tripEvents = [];
    #pointPresenter = new Map();
    constructor(mainElement){
        this.#mainElement = mainElement;
        this.#tripEventsElement = this.#mainElement.querySelector('.trip-events');
    }

    init = (tripEvents) => {
        this.#tripEvents = [...tripEvents];
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
    }

    #renderSort = () => {
        render(this.#tripEventsElement, this.#tripSortComponent, RenderPosition.AFTERBEGIN);
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
            this.#renderTripEventsList();
        }
    }
    
    #clearTaskList = () => {
        this.#pointPresenter.forEach((presenter) => presenter.destroy());
        this.#pointPresenter.clear();
      }
}