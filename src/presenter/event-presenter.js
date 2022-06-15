import EventView from '../view/item-event-view.js';
import EditPoint from '../view/add-new-event-form.js';
import { UserAction, UpdateType } from '../const.js';
import { isDatesEqual } from '../utils/date-manipulation.js';
import { RenderPosition, render, replace, remove } from '../utils/render';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class EventPresenter {
  #eventListContainer = null;
  #changeData = null;
  #changeMode = null;

  #eventComponent = null;
  #eventEditComponent = null;

  #tripEvent = null;
  #mode = Mode.DEFAULT;

  constructor(eventListContainer, changeData, changeMode) {
    this.#eventListContainer = eventListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (tripEvent) => {
    this.#tripEvent = tripEvent;

    const prevEventComponent = this.#eventComponent;
    const prevEventEditComponent = this.#eventEditComponent;

    this.#eventComponent = new EventView(this.#tripEvent);
    this.#eventEditComponent = new EditPoint(this.#tripEvent);

    this.#eventComponent.setClickRollupHandler(this.#replaceEventToEditPoint);
    this.#eventEditComponent.setClickRollupHandler(this.#replaceEditPointToEvent);
    this.#eventEditComponent.setFormSubmitHadler(this.#handleFormSubmit);
    this.#eventComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#eventEditComponent.setDeleteClickHandler(this.#handleDeleteClick);

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this.#eventListContainer, this.#eventComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceEditPointToEvent();
    }
  }

  destroy = () => {
    remove(this.#eventComponent);
    remove(this.#eventEditComponent);
  }

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceEditPointToEvent();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  }

  #replaceEventToEditPoint = () => {
    replace(this.#eventEditComponent, this.#eventComponent);
    this.#changeMode();
    this.#mode = Mode.EDITING;
    document.addEventListener('keydown', this.#onEscKeyDown);
  }

  #replaceEditPointToEvent = () => {
    this.#eventEditComponent.reset(this.#tripEvent);
    replace(this.#eventComponent, this.#eventEditComponent);
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#mode = Mode.DEFAULT;
  }

  #handleFavoriteClick = () => {
    this.#changeData({ ...this.#tripEvent, favorite: !this.#tripEvent.favorite });
    this.#changeData(
      UserAction.UPDATE_EVENT,
      UpdateType.PATCH,
      { ...this.#tripEvent, favorite: !this.#tripEvent.favorite },
    );
  }

  #handleFormSubmit = (update) => {
    const isMinorUpdate =
      !isDatesEqual(this.#tripEvent.date.dataBeginEvent, update.date.dataBeginEvent) ||
      !isDatesEqual(this.#tripEvent.date.dataEndEvent, update.date.dataEndEvent);

    this.#changeData(
      UserAction.UPDATE_EVENT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      update,
    );
    this.#replaceEditPointToEvent();
  }

  #handleDeleteClick = (event) => {
    this.#changeData(
      UserAction.DELETE_EVENT,
      UpdateType.MINOR,
      event,
    );
  }
}
