import AbstractView from './abstarct-view';

const createNoTripEventsTemplate = () => (
  `<p class="trip-events__msg">
    Click New Event to create your first point
    </p>`
);

export default class NoTripEventsView extends AbstractView {
 
  get template() {
    return createNoTripEventsTemplate();
  }
}
