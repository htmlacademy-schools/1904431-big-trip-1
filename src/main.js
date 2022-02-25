import {createTripSortTemplate} from '.view/trip-sort-view.js';
import {createTripFiltersTemplate} from '.view/trip-filter-view.js';
import {createSiteMenuTemlete} from './view/site-menu-view.js';
import {createTripEventEditTemplate} from './view/trip-events-edit.js';
import {createTripEventItemTemplate} from './view/trip-events-item.js';
import {renderTemplate, RenderPosition} from './render.js';

const TripControlsNavigationElement = document.querySelector('.trip-controls__navigation');
const TripControlsFiltersElement = document.querySelector('.trip-controls__filters');
const TripEventsElement = document.querySelector('.trip-events');


renderTemplate(TripControlsNavigationElement, createSiteMenuTemlete(), RenderPosition.BEFOREEND);
renderTemplate(TripControlsFiltersElement, createTripFiltersTemplate(), RenderPosition.BEFOREEND);
renderTemplate(TripEventsElement, createTripSortTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(TripEventsListElement, createTripEventEditTemplate(), RenderPosition.BEFOREEND);
renderTemplate(TripEventsListElement, createTripEventItemTemplate(), RenderPosition.BEFOREEND);
