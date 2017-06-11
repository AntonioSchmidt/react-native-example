import { LOAD_CHAPTER, LOAD_STORY } from './reducer';

export function loadChapter(number) {
    return async (dispatch, getState, { fetch }) => {
        const response = await fetch(`/1/stories/106766/chapters/${number}`);
        if (response.ok) {
            const json = await response.json();
            dispatch({
                type: LOAD_CHAPTER,
                payload: json.response.text,
            });
        }
    }
}
export function loadStory() {
    return async (dispatch, getState, { fetch }) => {
        const response = await fetch(`/1/stories/106766/chapters`);
        if (response.ok) {
            const json = await response.json();
            dispatch({
                type: LOAD_STORY,
                payload: json.count,
            });
        }
    }
}