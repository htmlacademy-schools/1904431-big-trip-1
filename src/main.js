import {renderTemplate, RenderPosition} from './render.js';
import {createTripTabsTemplate} from './view/site-menu-view.js';
import {createTripFiltersTemplate} from './view/trip-filter-view.js';
import {createTripSortTemplate} from './view/trip-sort-view.js';
import {createAddEventItemTemplate} from './view/add-new-event-form.js';
import {createEditedEventItemTemplate} from './view/trip-events-edit-form';
import {createTripEventsItemTemplate} from './view/trip-events-item-view.js';
import {createEventsListTemplate} from './view/events-list-view.js';
import {generateTripEvent} from './mock/events';

const Trip_Count = 20;

const tripEvents = Array.from({length: Trip_Count}, generateTripEvent);

const TripControlsNavigationElement = document.querySelector('.trip-controls__navigation');
const TripControlsFiltersElement = document.querySelector('.trip-controls__filters');
const TripEventsElement = document.querySelector('.trip-events');

renderTemplate(TripEventsElement, createEventsListTemplate(), RenderPosition.BEFOREEND);

const TripEventsListElement = TripEventsElement.querySelector('.trip-events__list');

renderTemplate(TripControlsNavigationElement, createTripTabsTemplate(), RenderPosition.BEFOREEND);
renderTemplate(TripControlsFiltersElement, createTripFiltersTemplate(), RenderPosition.BEFOREEND);
renderTemplate(TripEventsElement, createTripSortTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(TripEventsListElement, createEditedEventItemTemplate(tripEvents[1]), RenderPosition.AFTERBEGIN);
renderTemplate(TripEventsListElement, createAddEventItemTemplate(tripEvents[0]), RenderPosition.AFTERBEGIN);
for (let i = 2; i < Trip_Count; i++) {
  renderTemplate(TripEventsListElement, createTripEventsItemTemplate(tripEvents[i]), RenderPosition.BEFOREEND);
}
