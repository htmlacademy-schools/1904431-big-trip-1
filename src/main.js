import {render, RenderPosition} from './render.js';
import TripTabsView from './view/site-menu-view.js';
import TripFilterView from './view/trip-filter-view.js';
import TripSortView from './view/trip-sort-view.js';
import EventItemAddView from './view/add-new-event-form.js';
import EventItemEditView from './view/trip-events-edit-form';
import TripEventItemView from './view/trip-events-item-view.js';
import EventListView from './view/events-list-view.js';
import {generateTripEvent} from './mock/events';

const Trip_Count = 20;

const tripEvents = Array.from({length: Trip_Count}, generateTripEvent);

const tripControlsNavigationElement = document.querySelector('.trip-controls__navigation');
const tripControlsFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const tripEventsListElement = new EventListView();

render(tripEventsElement, tripEventsListElement.element, RenderPosition.BEFOREEND);
render(tripControlsNavigationElement, new TripTabsView().element, RenderPosition.BEFOREEND);
render(tripControlsFiltersElement, new TripFilterView().element, RenderPosition.BEFOREEND);
render(tripEventsElement, new TripSortView().element, RenderPosition.AFTERBEGIN);
render(tripEventsListElement.element, new EventItemAddView(tripEvents[1]).element, RenderPosition.BEFOREEND);

const renderEvent = (eventListElement, event) => {
  const eventItemComponent = new TripEventItemView(event);
  const eventEditComponent = new EventItemEditView(event);

  const replaceItemToForm = () => {
    eventListElement.replaceChild(eventEditComponent.element, eventItemComponent.element);
  };
  const replaceFormToItem = () => {
    eventListElement.replaceChild(eventItemComponent.element, eventEditComponent.element);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToItem();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  eventItemComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceItemToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  eventEditComponent.element.querySelector('form').addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToItem();
    document.removeEventListener('keydown', onEscKeyDown);
  });

  render(eventListElement, eventItemComponent.element, RenderPosition.BEFOREEND);
};

for (let i = 1; i < Trip_Count; i++) {
  renderEvent(tripEventsListElement.element, tripEvents[i]);
}