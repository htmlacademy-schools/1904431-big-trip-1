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
  #tripPointsElement = null;
#tripSortComponent = new TripSortView();
#noTripPointComponent = new NoTripEventsView();
#tripEventsListElement = new EventListView();

#points = [];

#pointPresenter = new Map();

#currentSortForm = SortForm.SORT_DAY;
#sourcedTripPoints = [];

constructor(mainElement) {
  this.#mainElement = mainElement;

  this.#tripPointsElement = this.#mainElement.querySelector('.trip-events');
}

init = (points) => {
  this.#points = [...points];
  this.#sourcedTripPoints = [...points];
  this.#renderMain();
}

#renderNoTasks = () => {
  render(this.#tripPointsElement, this.#noTripPointComponent, RenderPosition.BEFOREEND);
}
#renderTripEventsListElement = () => {
  render(this.#tripPointsElement, this.#tripEventsListElement, RenderPosition.BEFOREEND);
}
#handleModeChange = () => {
  this.#pointPresenter.forEach((presenter) => presenter.resetView());
}

#handlePointChange = (updatedPoint) => {
  this.#points = updateItem(this.#points, updatedPoint);
  this.#sourcedTripPoints = updateItem(this.#sourcedTripPoints, updatedPoint);
  this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
}

#sortTasks = (SortForm) => {
  switch (SortForm) {
    case SortForm.SORT_DAY:
      this.#points.sort(sortTaskDay);
      break;
    case SortForm.SORT_TIME:
      this.#points.sort(sortTaskDuration);
      break;
    case SortForm.SORT_PRICE:
      this.#points.sort(sortTaskPrice);
      break;
    default:
      this.#points = [...this.#sourcedTripPoints];
  }

  this.#currentSortForm = SortForm;
}

#handleSortTypeChange = (SortForm) => {
  if (this.#currentSortForm === SortForm) {
    return;
  }

  this.#sortTasks(SortForm);
  this.#clearPointList();
  this.#renderTripEventsList();
}

#renderSort = () => {
  render(this.#tripPointsElement, this.#tripSortComponent, RenderPosition.AFTERBEGIN);
  this.#tripSortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
}

#renderTripEvent = (tripPoint) => {
  const pointPresenter = new PointPresenter(this.#tripEventsListElement, this.#handlePointChange, this.#handleModeChange);
  pointPresenter.init(tripPoint);
  this.#pointPresenter.set(tripPoint.id, pointPresenter);
};
#renderTripEventsList = () => {
  for (let i = 0; i < this.#points.length; i++) {
    this.#renderTripEvent(this.#points[i]);
  }
}
#renderMain = () => {
  if (this.#points.length === 0) {
    this.#renderNoTasks();
  } else {
    this.#renderSort();
    this.#renderTripEventsListElement();
    this.#sortTasks(this.#currentSortForm);
    this.#renderTripEventsList();
  }
}

#clearPointList = () => {
  this.#pointPresenter.forEach((presenter) => presenter.destroy());
  this.#pointPresenter.clear();
}
}