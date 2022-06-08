import TripEventItemView from "../view/trip-events-item-view";
import EventItemEditView from "../view/trip-events-edit-form";
import {render,RenderPosition, replace, remove} from "../utils/render.js";

const Mode = {
    DEFAULT: 'DEFAULT',
    EDITING: 'EDITING',

};

export default class PointPresenter {
    #tripEventsListElement = null;
    #changeData = null;
    #changeMode = null;

    #eventItemComponent = null;
    #eventEditComponent = null;

    #tripEvent = null;
    #mode = Mode.DEFAULT;

    constructor(tripEventsListElement, changeData, changeMode) {
        this.#tripEventsListElement = tripEventsListElement;
        this.#changeData = changeData;
        this.#changeMode = changeMode;
    }

    init = (tripEvent) => {
        this.#tripEvent = tripEvent;

        const prevEventItemComponent = this.#eventItemComponent;
        const prevEventEditComponent = this.#eventEditComponent;

        this.#eventItemComponent = new TripEventItemView(tripEvent);
        this.#eventEditComponent = new EventItemEditView(tripEvent);

        this.#eventItemComponent.setEditClickHandler(this.#handleEditClick);
        this.#eventItemComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
        this.#eventEditComponent.setRollupClickHandler(this.#handleRollupClick);
        this.#eventEditComponent.setFormSubmitHandler(this.#handleFormSubmit);

        if (prevEventItemComponent === null || prevEventEditComponent === null) {
            render(this.#tripEventsListElement, this.#eventItemComponent, RenderPosition.BEFOREEND);
            return;

        }

        if (this.#mode === Mode.DEFAULT) {
            replace(this.#eventItemComponent, prevEventItemComponent);
        }

        if(this.#mode === Mode.EDITING) {
            replace(this.#eventEditComponent, prevEventEditComponent);
        }

        remove(prevEventItemComponent);
        remove(prevEventEditComponent);
    }

    destroy = () => {
        remove(this.#eventItemComponent);
        remove(this.#eventEditComponent);

    }

    restView = () => {
        if (this.#mode !== Mode.DEFAULT) {
            this.#replaceFormToItem();
        }
    }

    #replaceItemToForm = () => {
        replace(this.#eventEditComponent, this.#eventItemComponent);
        document.addEventListener('keydown', this.#escKeyDownHandler);
        this.#changeMode();
        this.#mode = Mode.EDITING;
    }

    #replaceFormToItem = () => {
        replace(this.#eventItemComponent, this.#eventEditComponent);
        document.removeEventListener('keydown', this.#escKeyDownHandler);
        this.#mode = Mode.DEFAULT;
    }

    #escKeyDownHandler = (event) => {
        if(event.key === 'Escape' || event.key === 'Esc') {
            event.preventDefault();
            this.#replaceFormToItem();
        }

    };

    #handleEditClick = () => {
        this.#replaceItemToForm();
    };

    #handleRollupClick = () => {
        this.#replaceFormToItem();
    };

    #handleFavoriteClick = () => {
        this.#changeData({...this.#tripEvent, isFavorite: !this.#tripEvent.isFavorite});
    }

    #handleFormSubmit =(point) => {
        this.#changeData(point);
        this.#replaceFormToItem();
    };
}