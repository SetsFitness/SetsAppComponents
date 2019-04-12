import React, { useState, useEffect } from 'react'
import { List, Message, Visibility } from 'semantic-ui-react';
import ClientCard, {ClientCardInfo} from "../cards/ClientCard";
import { connect } from "react-redux";
import {fetchItem, fetchItems} from "../../redux/actions/cacheActions";
import Spinner from "../props/Spinner";
import {getItemTypeFromID, switchReturnItemType} from "../../logic/ItemType";
import TrainerCard, {TrainerCardInfo} from "../cards/TrainerCard";
import EventCard from "../cards/EventCard";
import ChallengeCard, {ChallengeCardInfo} from "../cards/ChallengeCard";
import PostCard from "../cards/PostCard";
import {shuffleArray} from "../../logic/ArrayHelper";

// TODO Test the new "visibility" fetch system!
// TODO USING VISIBILITY WITH A MODAL DOESN'T WORK?
// TODO ALSO OFTEN ONE PERSON IS MISSING for some reason?

/*
For a BatchFetch, we use the accepted
 */
const numFetch = 10000000;

type Props = {
    ids: [string],
    noObjectsMessage: string,
    acceptedItemTypes?: [string],
    randomized: boolean,
    sortFunction?: any
}

function objectComponents(objects) {
    const components = [];
    for (const key in objects) {
        if (objects.hasOwnProperty(key)) {
            components.push(
                <List.Item key={key}>
                    {getObjectComponent(parseInt(key) + 1, objects[key])}
                </List.Item>
            );
        }
    }
    return components;
}
const getObjectComponent = (key, object: {id: string, item_type: string}) => (
    switchReturnItemType(object.item_type,
        <ClientCard rank={key} client={object}/>,
        <TrainerCard rank={key} trainer={object}/>,
        null,
        null,
        null,
        <EventCard event={object}/>,
        <ChallengeCard challenge={object}/>,
        null,
        <PostCard postID={object.id}/>,
        null,
        null,
        null,
        null,
        "Get database object list object not implemented for item type"
    )
);
const batchFetchMoreObjects = (typeIDs, typeHiddenIDIndex, randomized, sortFunction, setVisibleObjects, setIsLoading, fetchItems) => {
    setIsLoading(true);
    for (const itemType in typeIDs) {
        if (typeIDs.hasOwnProperty(itemType)) {
            const ids = typeIDs[itemType];
            const hiddenIndex = typeHiddenIDIndex[itemType];
            const variableList = switchReturnItemType(itemType,
                ClientCardInfo.fetchList,
                TrainerCardInfo.fetchList,
                null, null, null,
                EventCard.fetchVariableList,
                ChallengeCardInfo.fetchList,
                null,
                PostCard.fetchVariableList,
                null, null, null, null, null,
                "Get variable list from item type not implemented!");
            fetchItems(ids, itemType, variableList, hiddenIndex, numFetch, (items) => {
                for (let i = 0; i < items.length; i++) {
                    addObject(items[i], randomized, sortFunction, setVisibleObjects, setIsLoading);
                }
                setIsLoading(false);
            });
        }
    }
};
const addObject = (object, randomized, sortFunction, setVisibleObjects, setIsLoading) => {
    if (object && object.id) {
        setVisibleObjects(p => {
            const a = [...p, object];
            if (randomized) { shuffleArray(a) }
            if (sortFunction) { a.sort(sortFunction); }
            return a;
        });
        setIsLoading(false);
    }
};

const DatabaseObjectList = (props: Props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [ids, setIDs] = useState(null);
    // const [typeIDs, setTypeIDs] = useState({});
    // const [typeHiddenIDIndex, setTypeHiddenIDIndex] = useState({});
    const [visibleObjects, setVisibleObjects] = useState([]);
    // const [visibleComponents, setVisibleComponents] = useState({});
    const [hiddenIDIndex, setHiddenIDIndex] = useState(0);

    // Component will receive new props
    useEffect(() => {
        if (props.ids && JSON.stringify(props.ids) !== JSON.stringify(ids)) {
            const ids = [...props.ids];
            // TODO Randomizing doesn't work
            if (props.randomized === true) {
                shuffleArray(ids)
            }
            setIDs(ids);
            setHiddenIDIndex(0);
            setVisibleObjects([]);
            const typeIDs = {};
            const typeHiddenIndex = {};
            for (let i = 0; i < ids.length; i++) {
                const id = ids[i];
                const itemType = getItemTypeFromID(id);
                if (!props.acceptedItemTypes || props.acceptedItemTypes.includes(itemType)) {
                    if (typeIDs[itemType]) {
                        typeIDs[itemType].push(id);
                    }
                    else {
                        typeIDs[itemType] = [id];
                        typeHiddenIndex[itemType] = 0;
                    }
                }
            }
            batchFetchMoreObjects(typeIDs, typeHiddenIndex, props.randomized === true, props.sortFunction,
                setVisibleObjects, setIsLoading, props.fetchItems);
        }
    }, [props.ids]);

    // const handleVisibilityUpdate = (e, {calculations}) => {
    //     // alert("hey");
    //     // alert(JSON.stringify(calculations));
    //     console.log(calculations);
    //     if (calculations.bottomVisible) {
    //         fetchMoreObjects();
    //     }
    // };

    if (isLoading) {
        return(
            <Spinner/>
        )
    }
    if (ids && ids.length > 0) {
        return(
            <div>
                <List relaxed verticalAlign="middle">
                    {objectComponents(visibleObjects)}
                </List>
            </div>
        );
    }
    else {
        return(
            <Message>{props.noObjectsMessage}</Message>
        );
    }
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchItem: (itemType, id, variableList, dataHandler, failureHandler) => {
            dispatch(fetchItem(itemType, id, variableList, dataHandler, failureHandler));
        },
        fetchItems: (ids, itemType, variableList, startIndex, maxFetch, dataHandler, failureHandler) => {
            dispatch(fetchItems(ids, itemType, variableList, startIndex, maxFetch, dataHandler, failureHandler));
        }
    };
};

DatabaseObjectList.defaultProps = {
    randomized: false
};

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseObjectList);
