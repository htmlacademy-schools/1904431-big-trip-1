import AbstractView from './abstarct-view';

const createEventsListTemplate = () => ('<ul class="trip-events__list"></ul>');

export default class EventListView extends AbstractView {

  get template() {
    return createEventsListTemplate();
  }
}