import { placeReducer } from 'redux-in-place';

export const LOAD_CHAPTER = 'loadChapter';
export const LOAD_STORY = 'loadStory';


const reducer = (state = {}, action) => ({
    [LOAD_CHAPTER]: {
        ...state,
        currentChapter: action.payload
    },
    [LOAD_STORY]: {
        ...state,
        numberOfChapters: action.payload
    },
}[action.type] || state);

export default placeReducer('Story', reducer);