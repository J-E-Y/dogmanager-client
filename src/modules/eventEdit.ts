export interface EventEditState {
  eventTitle: string;
  startDate: string;
  endDate: string;
  pageImage: File | null | Blob;
  bannerImage: File | null | Blob;
  buttonImage: File | null | Blob;
  buttonUrl: string;
  detailPageUrl: string;
  isChecked: boolean;
}
//! type
export const CHANGE_EVENT_TITLE = 'eventEdit/CHANGE_EVENT_TITLE';
export const CHANGE_START_DATE = 'eventEdit/CHANGE_START_DATE';
export const CHANGE_END_DATE = 'eventEdit/CHANGE_END_DATE';
export const CHANGE_PAGE_IMAGE = 'eventEdit/CHANGE_PAGE_IMAGE';
export const CHANGE_BANNER_IMAGE = 'eventEdit/CHANGE_BANNER_IMAGE';
export const CHANGE_BUTTON_IMAGE = 'eventEdit/CHANGE_BUTTON_IMAGE';
export const CHANGE_BUTTON_URL = 'eventEdit/CHANGE_BUTTON_URL';
export const CHANGE_PAGE_URL = 'eventEdit/CHANGE_PAGE_URL';
export const CHANGE_ISCHECKED = 'eventEdit/CHANGE_isChecked';

interface ChangeEventTitleAction {
  type: typeof CHANGE_EVENT_TITLE;
  meta: { input: string };
}

interface ChangeStartDateAction {
  type: typeof CHANGE_START_DATE;
  meta: { input: string };
}

interface ChangeEndDateAction {
  type: typeof CHANGE_END_DATE;
  meta: { input: string };
}

interface ChangePageImageAction {
  type: typeof CHANGE_PAGE_IMAGE;
  meta: { input: File };
}
interface ChangeBannerImageAction {
  type: typeof CHANGE_BANNER_IMAGE;
  meta: { input: File };
}
interface ChangeButtonImageAction {
  type: typeof CHANGE_BUTTON_IMAGE;
  meta: { input: File };
}
interface ChangeButtonUrlAction {
  type: typeof CHANGE_BUTTON_URL;
  meta: { input: string };
}

interface ChangePageUrlAction {
  type: typeof CHANGE_PAGE_URL;
  meta: { input: string };
}
interface ChangeIsCheckedAction {
  type: typeof CHANGE_ISCHECKED;
  meta: { input: boolean };
}

export type EevntEditActionTypes =
  | ChangeEventTitleAction
  | ChangeStartDateAction
  | ChangeEndDateAction
  | ChangePageImageAction
  | ChangeBannerImageAction
  | ChangeButtonImageAction
  | ChangeButtonUrlAction
  | ChangePageUrlAction
  | ChangeIsCheckedAction;

//! actions
function changeEventTitle(input: string): object {
  return {
    type: CHANGE_EVENT_TITLE,
    meta: { input },
  };
}
function changeStartData(input: string): object {
  return {
    type: CHANGE_START_DATE,
    meta: { input },
  };
}
function changeEndDate(input: string): object {
  return {
    type: CHANGE_END_DATE,
    meta: { input },
  };
}
function changePageImage(input: File): object {
  return {
    type: CHANGE_PAGE_IMAGE,
    meta: { input },
  };
}
function changeBannerImage(input: File): object {
  return {
    type: CHANGE_BANNER_IMAGE,
    meta: { input },
  };
}
function changeButtonImage(input: File): object {
  return {
    type: CHANGE_BUTTON_IMAGE,
    meta: { input },
  };
}

function changeButtonUrl(input: string): object {
  return {
    type: CHANGE_BUTTON_URL,
    meta: { input },
  };
}

function changePageUrl(input: string): object {
  return {
    type: CHANGE_PAGE_URL,
    meta: { input },
  };
}
function changeIsChecked(input: boolean): object {
  return {
    type: CHANGE_ISCHECKED,
    meta: { input },
  };
}

export const actionCreators = {
  changeEventTitle,
  changeStartData,
  changeEndDate,
  changePageImage,
  changeBannerImage,
  changeButtonImage,
  changeButtonUrl,
  changePageUrl,
  changeIsChecked,
};

const initialState: EventEditState = {
  eventTitle: '',
  startDate: '',
  endDate: '',
  pageImage: null,
  bannerImage: null,
  buttonImage: null,
  buttonUrl: '',
  detailPageUrl: '',
  isChecked: false,
};
//! reducers
export function eventEditReducer(
  state = initialState,
  action: EevntEditActionTypes,
): EventEditState {
  switch (action.type) {
    case CHANGE_EVENT_TITLE:
      return {
        ...state,
        eventTitle: action.meta.input,
      };
    case CHANGE_START_DATE:
      return {
        ...state,
        startDate: action.meta.input,
      };
    case CHANGE_END_DATE:
      return {
        ...state,
        endDate: action.meta.input,
      };
    case CHANGE_PAGE_IMAGE:
      return {
        ...state,
        pageImage: action.meta.input,
      };
    case CHANGE_BANNER_IMAGE:
      return {
        ...state,
        bannerImage: action.meta.input,
      };
    case CHANGE_BUTTON_IMAGE:
      return {
        ...state,
        buttonImage: action.meta.input,
      };
    case CHANGE_BUTTON_URL:
      return {
        ...state,
        buttonUrl: action.meta.input,
      };
    case CHANGE_PAGE_URL:
      return {
        ...state,
        detailPageUrl: action.meta.input,
      };
    case CHANGE_ISCHECKED:
      return {
        ...state,
        isChecked: action.meta.input,
      };
    default:
      return state;
  }
}
