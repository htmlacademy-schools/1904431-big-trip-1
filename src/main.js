import {render, RenderPosition} from './utils/render.js';
import TripTabsView from './view/site-menu-view.js';
import TripFilterView from './view/trip-filter-view.js';
import {generateTripEvent} from './mock/events';
import TripPresenter from './presenter/trip-presenter.js';

const Trip_Count = 7;

const tripEvents = Array.from({length: Trip_Count}, generateTripEvent);

const pageMainElement = document.querySelector('.page-body');

const tripControlsNavigationElement = document.querySelector('.trip-controls__navigation');
const tripControlsFiltersElement = document.querySelector('.trip-controls__filters');

render(tripControlsNavigationElement, new TripTabsView(), RenderPosition.BEFOREEND);
render(tripControlsFiltersElement, new TripFilterView(), RenderPosition.BEFOREEND);

const tripPresenter = new TripPresenter (pageMainElement);
tripPresenter.init(tripEvents);