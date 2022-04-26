import {createTripSortTemplate} from '.view/trip-sort-view.js';
import {createTripFiltersTemplate} from '.view/trip-filter-view.js';
import {createSiteMenuTemlete} from './view/site-menu-view.js';
import {createAddEventItemTemplate} from './view/add-new-event-form';
import {createEditedEventItemTemplate} from './view/trip-events-edit-form';
import {createTripEventItemTemplate} from './view/trip-events-item.js';
import {createEventsListTemplate} from './view/events-list-view.js';
import {generateTripEvent} from './mock/events';
import {renderTemplate, RenderPosition} from './render.js';

const Trip_Count = 20;

const tripEvents = Array.from({length: Trip_Count}, generateTripEvent);

const TripControlsNavigationElement = document.querySelector('.trip-controls__navigation');
const TripControlsFiltersElement = document.querySelector('.trip-controls__filters');
const TripEventsElement = document.querySelector('.trip-events');

renderTemplate(TripEventsElement, createEventsListTemplate(), RenderPosition.BEFOREEND);

const TripEventsListElement = TripEventsElement.querySelector('.trip-events__list');

renderTemplate(TripControlsNavigationElement, createSiteMenuTemlete(), RenderPosition.BEFOREEND);
renderTemplate(TripControlsFiltersElement, createTripFiltersTemplate(), RenderPosition.BEFOREEND);
renderTemplate(TripEventsElement, createTripSortTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(TripEventsListElement, createTripEventEditTemplate(), RenderPosition.BEFOREEND);
renderTemplate(TripEventsListElement, createTripEventItemTemplate(), RenderPosition.BEFOREEND);
renderTemplate(TripEventsListElement, createEditedEventItemTemplate(tripEvents[1]), RenderPosition.AFTERBEGIN);
renderTemplate(TripEventsListElement, createAddEventItemTemplate(tripEvents[0]), RenderPosition.AFTERBEGIN);
for (let i = 2; i < TRIP_EVENTS_COUNT; i++) {

  renderTemplate(TripEventsListElement, createTripEventItemTemplate(tripEvents[i]), RenderPosition.BEFOREEND);
}