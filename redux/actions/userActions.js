import {setIsNotLoading} from './infoActions';
import {
    addToItemAttribute,
    fetchItem,
    forceFetchItem, getCache, removeFromItemAttribute,
    setItemAttribute, setItemAttributeIndex,
    subscribeFetchItem
} from "./cacheActions";
import {appUserItemType} from "../../../Constants";

export function forceFetchUserAttributes(variablesList, dataHandler) {
    return (dispatch, getStore) => {
        // Just overwrite all the user attributes because we want to process them again
        const userID = getStore().user.id;
        if (userID) {
            forceFetchItem(appUserItemType, userID, variablesList, (client) => {
                dispatch(setUser(client));
                dispatch(setIsNotLoading());
                if (dataHandler) { dataHandler(getStore().user);}
            })(dispatch, getStore);
        }
    }
}

/**
 * This function will only get the user attributes if they haven't been got before.
 * This assumes that you don't care about refreshing these attributes often. Will use the cache.
 * @param id
 * @param variablesList
 * @param dataHandler
 * @returns {Function}
 */
export function fetchUserAttributes(variablesList, dataHandler) {
    return (dispatch, getStore) => {
        const userID = getStore().user.id;
        if (userID) {
            dispatch(fetchItem(userID, appUserItemType, variablesList, (client) => {
                dispatch(setUser(client));
                dispatch(setIsNotLoading());
                if (dataHandler) { dataHandler(getStore().user); }
            }));
        }
    }
}
export function subscribeFetchUserAttributes(variablesList, dataHandler) {
    return (dispatch, getStore) => {
        const userID = getStore().user.id;
        if (userID) {
            dispatch(subscribeFetchItem(userID, appUserItemType, variablesList, (client) => {
                dispatch(setUser(client));
                dispatch(setIsNotLoading());
                if (dataHandler) { dataHandler(getStore().user); }
            }));
        }
    }
}
export function setUserAttribute(attributeName, attributeValue) {
    return (dispatch, getStore) => {
        const userID = getStore().user.id;
        if (userID) {
            dispatch(setItemAttribute(userID, attributeName, attributeValue));
            dispatch(updateUserFromCache());
            dispatch(setIsNotLoading());
        }
    }
}
export function setUserAttributeAtIndex(attributeName, index, attributeValue) {
    return (dispatch, getStore) => {
        const userID = getStore().user.id;
        if (userID) {
            dispatch(setItemAttributeIndex(userID, attributeName, index, attributeValue));
            dispatch(updateUserFromCache());
            dispatch(setIsNotLoading());
        }
    }
}
export function addToUserAttribute(attributeName, attributeValue) {
    return (dispatch, getStore) => {
        const userID = getStore().user.id;
        if (userID) {
            dispatch(addToItemAttribute(userID, attributeName, attributeValue));
            dispatch(updateUserFromCache());
            dispatch(setIsNotLoading());
        }
    }
}
export function removeFromUserAttribute(attributeName, attributeValue) {
    return (dispatch, getStore) => {
        const userID = getStore().user.id;
        if (userID) {
            dispatch(removeFromItemAttribute(userID, attributeName, attributeValue));
            dispatch(updateUserFromCache());
            dispatch(setIsNotLoading());
        }
    }
}
export function updateUserFromCache() {
    return (dispatch, getStore) => {
        const userID = getStore().user.id;
        if (userID) {
            dispatch(setUser(getCache(appUserItemType, getStore)[userID]));
        }
    }
}


export function setUser(user) {
    return {
        type: "SET_USER",
        payload: user
    };
}
export function forceSetUser(user) {
    return {
        type: "FORCE_SET_USER",
        payload: user
    };
}
export function clearUser() {
    return {
        type: 'CLEAR_USER'
    }
}