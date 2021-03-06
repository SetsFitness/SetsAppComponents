import { API, graphqlOperation} from 'aws-amplify';
import {ifDebug, log, err} from "../../Constants";
import _ from 'lodash';
import {switchReturnItemType} from "../logic/ItemType";
import TestHelper from "../logic/TestHelper";

class GraphQL {
    // Represents the amount of items that can be fetched before a batch fetch operation will definitely send items back
    static batchLimit = 100;

    // =================================================================================================================
    // ~ Public GraphQL Using Methods
    // =================================================================================================================

    /**
     * TODO
     *
     * @param itemType
     * @param id
     * @param variablesList
     * @param successHandler
     * @param failureHandler
     */
    static getItem(itemType, id, variablesList, successHandler, failureHandler) {
        const func = switchReturnItemType(itemType, GraphQL.getClient, GraphQL.getTrainer, GraphQL.getGym, GraphQL.getWorkout, GraphQL.getReview,
            GraphQL.getEvent, GraphQL.getChallenge, GraphQL.getInvite, GraphQL.getPost, GraphQL.getSubmission,
            GraphQL.getGroup, GraphQL.getComment, GraphQL.getSponsor, GraphQL.getMessage, GraphQL.getStreak,
            "GraphQL get Fetch function function not implemented");
        if (func) { return func(id, variablesList, successHandler, failureHandler); }
    }

    /**
     * TODO
     *
     * @param itemType
     * @param username
     * @param variablesList
     * @param successHandler
     * @param failureHandler
     */
    static getItemByUsername(itemType, username, variablesList, successHandler, failureHandler) {
        const func = switchReturnItemType(itemType, GraphQL.getClientByUsername, GraphQL.getTrainerByUsername, GraphQL.getGymByUsername,
            null, null, null, null, null, null, null, null, GraphQL.getSponsorByUsername, "GraphQL get Fetch Username function function not implemented");
        if (func) { return func(username, variablesList, successHandler, failureHandler); }
    }

    /**
     * TODO
     *
     * @param itemType
     * @param ids
     * @param variablesList
     * @param successHandler
     * @param failureHandler
     */
    static getItems(itemType, ids, variablesList, successHandler, failureHandler) {
        const func = switchReturnItemType(itemType, GraphQL.getClients, GraphQL.getTrainers, GraphQL.getGyms, GraphQL.getWorkouts,
            GraphQL.getReviews, GraphQL.getEvents, GraphQL.getChallenges, GraphQL.getInvites, GraphQL.getPosts,
            GraphQL.getSubmissions, GraphQL.getGroups, GraphQL.getComments, GraphQL.getSponsors, GraphQL.getMessages, GraphQL.getStreaks,
            "GraphQL get Batch Fetch function function not implemented");
        if (func) { return func(ids, variablesList, successHandler, failureHandler); }
    }

    /**
     * TODO
     *
     * @param itemType
     * @param variablesList
     * @param filter
     * @param limit
     * @param nextToken
     */
    static constructItemQuery(itemType, variablesList, filter, limit, nextToken) {
        const func = switchReturnItemType(itemType, GraphQL.constructClientQuery, GraphQL.constructTrainerQuery, GraphQL.constructGymQuery,
            GraphQL.constructWorkoutQuery, GraphQL.constructReviewQuery, GraphQL.constructEventQuery, GraphQL.constructChallengeQuery,
            GraphQL.constructInviteQuery, GraphQL.constructPostQuery, GraphQL.constructSubmissionQuery, GraphQL.constructGroupQuery,
            GraphQL.constructCommentQuery, GraphQL.constructSponsorQuery, GraphQL.constructMessageQuery, GraphQL.constructStreakQuery,
            "GraphQL get construct Query function not implemented");
        if (func) { return func(variablesList, filter, limit, nextToken); }
    }

    /**
     * TODO
     *
     * @param itemType
     * @param queryString
     * @param successHandler
     * @param failureHandler
     */
    static queryItems(itemType, queryString, successHandler, failureHandler) {
        const func = switchReturnItemType(itemType, GraphQL.queryClients, GraphQL.queryTrainers, GraphQL.queryGyms, GraphQL.queryWorkouts,
            GraphQL.queryReviews, GraphQL.queryEvents, GraphQL.queryChallenges, GraphQL.queryInvites, GraphQL.queryPosts,
            GraphQL.querySubmissions, GraphQL.queryGroups, GraphQL.queryComments, GraphQL.querySponsors, GraphQL.queryMessages,
            GraphQL.queryStreaks, "GraphQL get Query function function not implemented for type");
        if (func) { return func(queryString, successHandler, failureHandler); }
    }

    // =================================================================================================================
    // ~ GraphQL Switch Specific Item Type Functions
    // =================================================================================================================

    // Gives back function with parameters (id, variablesList, successHandler, failureHandler)
    /**
     *
     * @param itemType
     * @return {null}
     */
    static getGetByIDFunction(itemType) {
        return switchReturnItemType(itemType, GraphQL.getClient, GraphQL.getTrainer, GraphQL.getGym, GraphQL.getWorkout, GraphQL.getReview,
            GraphQL.getEvent, GraphQL.getChallenge, GraphQL.getInvite, GraphQL.getPost, GraphQL.getSubmission,
            GraphQL.getGroup, GraphQL.getComment, GraphQL.getSponsor, GraphQL.getMessage, GraphQL.getStreak,
            "GraphQL get Fetch function function not implemented");
    }
    // Gives back function with parameters (username, variablesList, successHandler, failureHandler)
    /**
     * TODO
     *
     * @param itemType
     * @return {null}
     */
    // static getGetByUsernameFunction(itemType) {
    //     return switchReturnItemType(itemType, GraphQL.getClientByUsername, GraphQL.getTrainerByUsername, GraphQL.getGymByUsername,
    //         null, null, null, null, null, null, null, null, GraphQL.getSponsorByUsername, "GraphQL get Fetch Username function function not implemented");
    // }

    // Gives back function with parameters (federatedID, variablesList, successHandler, failureHandler)
    /**
     * TODO
     *
     * @param itemType
     * @return {null}
     */
    // static getGetByFederatedIDFunction(itemType) {
    //     return switchReturnItemType(itemType, GraphQL.getClientByFederatedID, GraphQL.getTrainerByFederatedID, GraphQL.getGymByFederatedID,
    //         null, null, null, null, null, null, null, null, null, GraphQL.getSponsorByFederatedID, null, null, "GraphQL get Fetch FederatedID function function not implemented");
    // }
    // Gives back function with parameters (ids, variablesList, successHandler, failureHandler)
    /**
     * TODO
     *
     * @param itemType
     * @return {null}
     */
    // static getBatchGetFunction(itemType) {
    //     return switchReturnItemType(itemType, GraphQL.getClients, GraphQL.getTrainers, GraphQL.getGyms, GraphQL.getWorkouts,
    //         GraphQL.getReviews, GraphQL.getEvents, GraphQL.getChallenges, GraphQL.getInvites, GraphQL.getPosts,
    //         GraphQL.getSubmissions, GraphQL.getGroups, GraphQL.getComments, GraphQL.getSponsors, GraphQL.getMessages, GraphQL.getStreaks,
    //         "GraphQL get Batch Fetch function function not implemented");
    // }
    // Gives back function with parameters (variablesList, filter, limit, nextToken)
    /**
     * TODO
     *
     * @param itemType
     * @return {null}
     */
    // static getConstructQueryFunction(itemType) {
    //     return switchReturnItemType(itemType, GraphQL.constructClientQuery, GraphQL.constructTrainerQuery, GraphQL.constructGymQuery,
    //         GraphQL.constructWorkoutQuery, GraphQL.constructReviewQuery, GraphQL.constructEventQuery, GraphQL.constructChallengeQuery,
    //         GraphQL.constructInviteQuery, GraphQL.constructPostQuery, GraphQL.constructSubmissionQuery, GraphQL.constructGroupQuery,
    //         GraphQL.constructCommentQuery, GraphQL.constructSponsorQuery, GraphQL.constructMessageQuery, GraphQL.constructStreakQuery,
    //         "GraphQL get construct Query function not implemented");
    // }
    // Gives back function with parameters (queryString, successHandler, failureHandler)
    /**
     * TODO
     *
     * @param itemType
     * @return {null}
     */
    // static getQueryFunction(itemType) {
    //     return switchReturnItemType(itemType, GraphQL.queryClients, GraphQL.queryTrainers, GraphQL.queryGyms, GraphQL.queryWorkouts,
    //         GraphQL.queryReviews, GraphQL.queryEvents, GraphQL.queryChallenges, GraphQL.queryInvites, GraphQL.queryPosts,
    //         GraphQL.querySubmissions, GraphQL.queryGroups, GraphQL.queryComments, GraphQL.querySponsors, GraphQL.queryMessages,
    //         GraphQL.queryStreaks, "GraphQL get Query function function not implemented for type");
    // }

    // =================================================================================================================
    // ~ GraphQL Specific Item Type Functions
    // =================================================================================================================

    // ~ Single Fetch Functions
    static getClient(id, variableList, successHandler, failureHandler) {
        GraphQL.execute(GraphQL.constructQuery("GetClient", "getClient", {id}, variableList),
            "getClient", successHandler, failureHandler);
    }
    static getClientByUsername(username, variableList, successHandler, failureHandler) {
        GraphQL.execute(GraphQL.constructQuery("GetClientByUsername", "getClientByUsername", {username}, variableList),
            "getClientByUsername", successHandler, failureHandler);
    }
    static getClientByFederatedID(federatedID, variableList, successHandler, failureHandler) {
        GraphQL.execute(GraphQL.constructQuery("GetClientByFederatedID", "getClientByFederatedID", {federatedID}, variableList),
            "getClientByFederatedID", successHandler, failureHandler);
    }
    static getTrainer(id, variableList, successHandler, failureHandler) {
        GraphQL.execute(GraphQL.constructQuery("GetTrainer", "getTrainer", {id}, variableList),
            "getTrainer", successHandler, failureHandler);
    }
    static getTrainerByUsername(username, variableList, successHandler, failureHandler) {
        GraphQL.execute(GraphQL.constructQuery("GetTrainerByUsername", "getTrainerByUsername", {username}, variableList),
            "getTrainerByUsername", successHandler, failureHandler);
    }
    static getTrainerByFederatedID(federatedID, variableList, successHandler, failureHandler) {
        GraphQL.execute(GraphQL.constructQuery("GetTrainerByFederatedID", "getTrainerByFederatedID", {federatedID}, variableList),
            "getTrainerByFederatedID", successHandler, failureHandler);
    }
    static getGym(id, variableList, successHandler, failureHandler) {
        GraphQL.execute(GraphQL.constructQuery("GetGym", "getGym", {id}, variableList),
            "getGym", successHandler, failureHandler);
    }
    static getGymByUsername(username, variableList, successHandler, failureHandler) {
        GraphQL.execute(GraphQL.constructQuery("GetGymByUsername", "getGymByUsername", {username}, variableList),
            "getGymByUsername", successHandler, failureHandler);
    }
    static getGymByFederatedID(federatedID, variableList, successHandler, failureHandler) {
        GraphQL.execute(GraphQL.constructQuery("GetGymByFederatedID", "getGymByFederatedID", {federatedID}, variableList),
            "getGymByFederatedID", successHandler, failureHandler);
    }
    static getWorkout(id, variableList, successHandler, failureHandler) {
        GraphQL.execute(GraphQL.constructQuery("GetWorkout", "getWorkout", {id}, variableList),
            "getWorkout", successHandler, failureHandler);
    }
    static getReview(id, variableList, successHandler, failureHandler) {
        GraphQL.execute(GraphQL.constructQuery("GetReview", "getReview", {id}, variableList),
            "getReview", successHandler, failureHandler);
    }
    static getEvent(id, variableList, successHandler, failureHandler) {
        GraphQL.execute(GraphQL.constructQuery("GetEvent", "getEvent", {id}, variableList),
            "getEvent", successHandler, failureHandler);
    }
    static getChallenge(id, variableList, successHandler, failureHandler) {
        GraphQL.execute(GraphQL.constructQuery("GetChallenge", "getChallenge", {id}, variableList),
            "getChallenge", successHandler, failureHandler);
    }
    static getInvite(id, variableList, successHandler, failureHandler) {
        GraphQL.execute(GraphQL.constructQuery("GetInvite", "getInvite", {id}, variableList),
            "getInvite", successHandler, failureHandler);
    }
    static getPost(id, variableList, successHandler, failureHandler) {
        GraphQL.execute(GraphQL.constructQuery("GetPost", "getPost", {id}, variableList),
            "getPost", successHandler, failureHandler);
    }
    static getSubmission(id, variableList, successHandler, failureHandler) {
        GraphQL.execute(GraphQL.constructQuery("GetSubmission", "getSubmission", {id}, variableList),
            "getSubmission", successHandler, failureHandler);
    }
    static getGroup(id, variableList, successHandler, failureHandler) {
        GraphQL.execute(GraphQL.constructQuery("GetGroup", "getGroup", {id}, variableList),
            "getGroup", successHandler, failureHandler);
    }
    static getComment(id, variableList, successHandler, failureHandler) {
        GraphQL.execute(GraphQL.constructQuery("GetComment", "getComment", {id}, variableList),
            "getComment", successHandler, failureHandler);
    }
    static getSponsor(id, variableList, successHandler, failureHandler) {
        GraphQL.execute(GraphQL.constructQuery("GetSponsor", "getSponsor", {id}, variableList),
            "getSponsor", successHandler, failureHandler);
    }
    static getSponsorByUsername(username, variableList, successHandler, failureHandler) {
        GraphQL.execute(GraphQL.constructQuery("GetSponsorByUsername", "getSponsorByUsername", {username}, variableList),
            "getSponsorByUsername", successHandler, failureHandler);
    }
    static getSponsorByFederatedID(federatedID, variableList, successHandler, failureHandler) {
        GraphQL.execute(GraphQL.constructQuery("GetSponsorByFederatedID", "getSponsorByFederatedID", {federatedID}, variableList),
            "getSponsorByFederatedID", successHandler, failureHandler);
    }
    static getMessage(board, id, variableList, successHandler, failureHandler) {
        GraphQL.execute(GraphQL.constructQuery("GetMessage", "getMessage", {board, id}, variableList),
            "getMessage", successHandler, failureHandler);
    }
    static getStreak(id, variableList, successHandler, failureHandler) {
        GraphQL.execute(GraphQL.constructQuery("GetStreak", "getStreak", {id}, variableList),
            "getStreak", successHandler, failureHandler);
    }

    // ~ Batch Fetch Functions
    static getClients(ids, variableList, successHandler, failureHandler) {
        if (ids && ids.length > GraphQL.batchLimit) {
            // TODO Make sure we actually test GraphQL so that GraphQL error will pop up!
            log&&console.log("Be prepared to have some IDs returned in the unretrieved Items list!!!!");
        }
        const idList = GraphQL.generateIDList(ids);
        GraphQL.execute(GraphQL.constructQuery("GetClients", "getClients", null, variableList, idList, true),
            "getClients", successHandler, failureHandler);
    }
    static getTrainers(ids, variableList, successHandler, failureHandler) {
        if (ids && ids.length > GraphQL.batchLimit) {
            // TODO Make sure we actually test GraphQL so that GraphQL error will pop up!
            log&&console.log("Be prepared to have some IDs returned in the unretrieved Items list!!!!");
        }
        const idList = GraphQL.generateIDList(ids);
        GraphQL.execute(GraphQL.constructQuery("GetTrainers", "getTrainers", null, variableList, idList, true),
            "getTrainers", successHandler, failureHandler);
    }
    static getGyms(ids, variableList, successHandler, failureHandler) {
        if (ids && ids.length > GraphQL.batchLimit) {
            // TODO Make sure we actually test GraphQL so that GraphQL error will pop up!
            log&&console.log("Be prepared to have some IDs returned in the unretrieved Items list!!!!");
        }
        const idList = GraphQL.generateIDList(ids);
        GraphQL.execute(GraphQL.constructQuery("GetGyms", "getGyms", null, variableList, idList, true),
            "getGyms", successHandler, failureHandler);
    }
    static getWorkouts(ids, variableList, successHandler, failureHandler) {
        if (ids && ids.length > GraphQL.batchLimit) {
            // TODO Make sure we actually test GraphQL so that GraphQL error will pop up!
            log&&console.log("Be prepared to have some IDs returned in the unretrieved Items list!!!!");
        }
        const idList = GraphQL.generateIDList(ids);
        GraphQL.execute(GraphQL.constructQuery("GetWorkouts", "getWorkouts", null, variableList, idList, true),
            "getWorkouts", successHandler, failureHandler);
    }
    static getReviews(ids, variableList, successHandler, failureHandler) {
        if (ids && ids.length > GraphQL.batchLimit) {
            // TODO Make sure we actually test GraphQL so that GraphQL error will pop up!
            log&&console.log("Be prepared to have some IDs returned in the unretrievedItems list!!!!");
        }
        const idList = GraphQL.generateIDList(ids);
        GraphQL.execute(GraphQL.constructQuery("GetReviews", "getReviews", null, variableList, idList, true),
            "getReviews", successHandler, failureHandler);
    }
    static getEvents(ids, variableList, successHandler, failureHandler) {
        if (ids && ids.length > GraphQL.batchLimit) {
            // TODO Make sure we actually test GraphQL so that GraphQL error will pop up!
            log&&console.log("Be prepared to have some IDs returned in the unretrievedItems list!!!!");
        }
        const idList = GraphQL.generateIDList(ids);
        GraphQL.execute(GraphQL.constructQuery("GetEvents", "getEvents", null, variableList, idList, true),
            "getEvents", successHandler, failureHandler);
    }
    static getChallenges(ids, variableList, successHandler, failureHandler) {
        if (ids && ids.length > GraphQL.batchLimit) {
            // TODO Make sure we actually test GraphQL so that GraphQL error will pop up!
            log&&console.log("Be prepared to have some IDs returned in the unretrievedItems list!!!!");
        }
        const idList = GraphQL.generateIDList(ids);
        GraphQL.execute(GraphQL.constructQuery("GetChallenges", "getChallenges", null, variableList, idList, true),
            "getChallenges", successHandler, failureHandler);
    }
    static getInvites(ids, variableList, successHandler, failureHandler) {
        if (ids && ids.length > GraphQL.batchLimit) {
            // TODO Make sure we actually test GraphQL so that GraphQL error will pop up!
            log&&console.log("Be prepared to have some IDs returned in the unretrievedItems list!!!!");
        }
        const idList = GraphQL.generateIDList(ids);
        GraphQL.execute(GraphQL.constructQuery("GetInvites", "getInvites", null, variableList, idList, true),
            "getInvites", successHandler, failureHandler);
    }
    static getPosts(ids, variableList, successHandler, failureHandler) {
        if (ids && ids.length > GraphQL.batchLimit) {
            // TODO Make sure we actually test GraphQL so that GraphQL error will pop up!
            log&&console.log("Be prepared to have some IDs returned in the unretrievedItems list!!!!");
        }
        const idList = GraphQL.generateIDList(ids);
        GraphQL.execute(GraphQL.constructQuery("GetPosts", "getPosts", null, variableList, idList, true),
            "getPosts", successHandler, failureHandler);
    }
    static getSubmissions(ids, variableList, successHandler, failureHandler) {
        if (ids && ids.length > GraphQL.batchLimit) {
            // TODO Make sure we actually test GraphQL so that GraphQL error will pop up!
            log&&console.log("Be prepared to have some IDs returned in the unretrievedItems list!!!!");
        }
        const idList = GraphQL.generateIDList(ids);
        GraphQL.execute(GraphQL.constructQuery("GetSubmissions", "getSubmissions", null, variableList, idList, true),
            "getSubmissions", successHandler, failureHandler);
    }
    static getGroups(ids, variableList, successHandler, failureHandler) {
        if (ids && ids.length > GraphQL.batchLimit) {
            // TODO Make sure we actually test GraphQL so that GraphQL error will pop up!
            log&&console.log("Be prepared to have some IDs returned in the unretrievedItems list!!!!");
        }
        const idList = GraphQL.generateIDList(ids);
        GraphQL.execute(GraphQL.constructQuery("GetGroups", "getGroups", null, variableList, idList, true),
            "getGroups", successHandler, failureHandler);
    }
    static getComments(ids, variableList, successHandler, failureHandler) {
        if (ids && ids.length > GraphQL.batchLimit) {
            // TODO Make sure we actually test GraphQL so that GraphQL error will pop up!
            log&&console.log("Be prepared to have some IDs returned in the unretrievedItems list!!!!");
        }
        const idList = GraphQL.generateIDList(ids);
        GraphQL.execute(GraphQL.constructQuery("GetComments", "getComments", null, variableList, idList, true),
            "getComments", successHandler, failureHandler);
    }
    static getSponsors(ids, variableList, successHandler, failureHandler) {
        if (ids && ids.length > GraphQL.batchLimit) {
            // TODO Make sure we actually test GraphQL so that GraphQL error will pop up!
            log&&console.log("Be prepared to have some IDs returned in the unretrievedItems list!!!!");
        }
        const idList = GraphQL.generateIDList(ids);
        GraphQL.execute(GraphQL.constructQuery("GetSponsors", "getSponsors", null, variableList, idList, true),
            "getSponsors", successHandler, failureHandler);
    }
    static getMessages(board, ids, variableList, successHandler, failureHandler) {
        if (ids && ids.length > GraphQL.batchLimit) {
            // TODO Make sure we actually test GraphQL so that GraphQL error will pop up!
            log&&console.log("Be prepared to have some IDs returned in the unretrievedItems list!!!!");
        }
        const idList = GraphQL.generateIDList(ids);
        GraphQL.execute(GraphQL.constructQuery("GetMessages", "getMessages", {board}, variableList, idList, true),
            "getMessages", successHandler, failureHandler);
    }
    static getStreaks(ids, variableList, successHandler, failureHandler) {
        if (ids && ids.length > GraphQL.batchLimit) {
            // TODO Make sure we actually test GraphQL so that GraphQL error will pop up!
            log&&console.log("Be prepared to have some IDs returned in the unretrievedItems list!!!!");
        }
        const idList = GraphQL.generateIDList(ids);
        GraphQL.execute(GraphQL.constructQuery("GetStreaks", "getStreaks", null, variableList, idList, true),
            "getStreaks", successHandler, failureHandler);
    }

    // ~ Construct Query Functions
    static constructClientQuery(variableList, filter, limit, nextToken) {
        var inputVariables = {};
        if (limit) { inputVariables.limit = limit; }
        if (nextToken) { inputVariables.nextToken = nextToken; }
        return GraphQL.constructQuery("QueryClients", "queryClients", inputVariables, variableList, filter, false, true);
    }
    static constructTrainerQuery(variableList, filter, limit, nextToken) {
        var inputVariables = {};
        if (limit) { inputVariables.limit = limit; }
        if (nextToken) { inputVariables.nextToken = nextToken; }
        return GraphQL.constructQuery("QueryTrainers", "queryTrainers", inputVariables, variableList, filter, false, true);
    }
    static constructGymQuery(variableList, filter, limit, nextToken) {
        var inputVariables = {};
        if (limit) { inputVariables.limit = limit; }
        if (nextToken) { inputVariables.nextToken = nextToken; }
        return GraphQL.constructQuery("QueryGyms", "queryGyms", inputVariables, variableList, filter, false, true);
    }
    static constructWorkoutQuery(variableList, filter, limit, nextToken) {
        var inputVariables = {};
        if (limit) { inputVariables.limit = limit; }
        if (nextToken) { inputVariables.nextToken = nextToken; }
        return GraphQL.constructQuery("QueryWorkouts", "queryWorkouts", inputVariables, variableList, filter, false, true);
    }
    static constructReviewQuery(variableList, filter, limit, nextToken) {
        var inputVariables = {};
        if (limit) { inputVariables.limit = limit; }
        if (nextToken) { inputVariables.nextToken = nextToken; }
        return GraphQL.constructQuery("QueryReviews", "queryReviews", inputVariables, variableList, filter, false, true);
    }
    static constructEventQuery(variableList, filter, limit, nextToken) {
        var inputVariables = {};
        if (limit) { inputVariables.limit = limit; }
        if (nextToken) { inputVariables.nextToken = nextToken; }
        return GraphQL.constructQuery("QueryEvents", "queryEvents", inputVariables, variableList, filter, false, true);
    }
    static constructChallengeQuery(variableList, filter, limit, nextToken) {
        var inputVariables = {};
        if (limit) { inputVariables.limit = limit; }
        if (nextToken) { inputVariables.nextToken = nextToken; }
        return GraphQL.constructQuery("QueryChallenges", "queryChallenges", inputVariables, variableList, filter, false, true);
    }
    static constructInviteQuery(variableList, filter, limit, nextToken) {
        var inputVariables = {};
        if (limit) { inputVariables.limit = limit; }
        if (nextToken) { inputVariables.nextToken = nextToken; }
        return GraphQL.constructQuery("QueryInvites", "queryInvites", inputVariables, variableList, filter, false, true);
    }
    static constructPostQuery(variableList, filter, limit, nextToken) {
        var inputVariables = {};
        if (limit) { inputVariables.limit = limit; }
        if (nextToken) { inputVariables.nextToken = nextToken; }
        return GraphQL.constructQuery("QueryPosts", "queryPosts", inputVariables, variableList, filter, false, true);
    }
    static constructSubmissionQuery(variableList, filter, limit, nextToken) {
        var inputVariables = {};
        if (limit) { inputVariables.limit = limit; }
        if (nextToken) { inputVariables.nextToken = nextToken; }
        return GraphQL.constructQuery("QuerySubmissions", "querySubmissions", inputVariables, variableList, filter, false, true);
    }
    static constructGroupQuery(variableList, filter, limit, nextToken) {
        var inputVariables = {};
        if (limit) { inputVariables.limit = limit; }
        if (nextToken) { inputVariables.nextToken = nextToken; }
        return GraphQL.constructQuery("QueryGroups", "queryGroups", inputVariables, variableList, filter, false, true);
    }
    static constructCommentQuery(variableList, filter, limit, nextToken) {
        var inputVariables = {};
        if (limit) { inputVariables.limit = limit; }
        if (nextToken) { inputVariables.nextToken = nextToken; }
        return GraphQL.constructQuery("QueryComments", "queryComments", inputVariables, variableList, filter, false, true);
    }
    static constructSponsorQuery(variableList, filter, limit, nextToken) {
        var inputVariables = {};
        if (limit) { inputVariables.limit = limit; }
        if (nextToken) { inputVariables.nextToken = nextToken; }
        return GraphQL.constructQuery("QuerySponsors", "querySponsors", inputVariables, variableList, filter, false, true);
    }
    static constructMessageQuery(board, variableList, filter, limit, nextToken) {
        var inputVariables = {board};
        if (limit) { inputVariables.limit = limit; }
        if (nextToken) { inputVariables.nextToken = nextToken; }
        return GraphQL.constructQuery("QueryMessages", "queryMessages", inputVariables, variableList, filter, false, true);
    }
    static constructStreakQuery(variableList, filter, limit, nextToken) {
        var inputVariables = {};
        if (limit) { inputVariables.limit = limit; }
        if (nextToken) { inputVariables.nextToken = nextToken; }
        return GraphQL.constructQuery("QueryStreaks", "queryStreaks", inputVariables, variableList, filter, false, true);
    }

    // ~ Query Fetch Functions
    static queryClients(queryString, successHandler, failureHandler) {
        GraphQL.execute(queryString, "queryClients", successHandler, failureHandler);
    }
    static queryTrainers(queryString, successHandler, failureHandler) {
        GraphQL.execute(queryString, "queryTrainers", successHandler, failureHandler);
    }
    static queryGyms(queryString, successHandler, failureHandler) {
        GraphQL.execute(queryString, "queryGyms", successHandler, failureHandler);
    }
    static queryWorkouts(queryString, successHandler, failureHandler) {
        GraphQL.execute(queryString, "queryWorkouts", successHandler, failureHandler);
    }
    static queryReviews(queryString, successHandler, failureHandler) {
        GraphQL.execute(queryString, "queryReviews", successHandler, failureHandler);
    }
    static queryEvents(queryString, successHandler, failureHandler) {
        GraphQL.execute(queryString, "queryEvents", successHandler, failureHandler);
    }
    static queryChallenges(queryString, successHandler, failureHandler) {
        GraphQL.execute(queryString, "queryChallenges", successHandler, failureHandler);
    }
    static queryInvites(queryString, successHandler, failureHandler) {
        GraphQL.execute(queryString, "queryInvites", successHandler, failureHandler);
    }
    static queryPosts(queryString, successHandler, failureHandler) {
        GraphQL.execute(queryString, "queryPosts", successHandler, failureHandler);
    }
    static querySubmissions(queryString, successHandler, failureHandler) {
        GraphQL.execute(queryString, "querySubmissions", successHandler, failureHandler);
    }
    static queryGroups(queryString, successHandler, failureHandler) {
        GraphQL.execute(queryString, "queryGroups", successHandler, failureHandler);
    }
    static queryComments(queryString, successHandler, failureHandler) {
        GraphQL.execute(queryString, "queryComments", successHandler, failureHandler);
    }
    static querySponsors(queryString, successHandler, failureHandler) {
        GraphQL.execute(queryString, "querySponsors", successHandler, failureHandler);
    }
    static queryMessages(queryString, successHandler, failureHandler) {
        GraphQL.execute(queryString, "queryMessages", successHandler, failureHandler);
    }
    static queryStreaks(queryString, successHandler, failureHandler) {
        GraphQL.execute(queryString, "queryStreaks", successHandler, failureHandler);
    }

    /**
     *
     * @param filterJSON The filter in JSON format using $ in front of variable names, and using and, or, and not to consolidate
     * @param variableValues The exact values for the variables in the JSON
     * @example
     *      const filter = generateFilter({
     *          and: [
     *              {
     *                  ifCompleted: {
     *                      eq: $ifCompleted
     *                  }
     *              },
     *              {
     *                  or: [
     *                      {
     *                          access: {
     *                              eq: "$access"
     *                          }
     *                      },
     *                      {
     *                          friends: {
     *                              contains: "$id"
     *                          }
     *                      }
     *                  ]
     *              }
     *          ]
     *      },{
     *          ifCompleted: false,
     *          access: public,
     *          id: GraphQL.props.user.id
     *      });
     */
    static generateFilter(filterJSON, variableValues) {
        return {
            // Add the parameter value and also take out all the quotation marks from the JSON
            parameterString: "filter: " + JSON.stringify(filterJSON).replace(/['"]+/g, ''),
            parameters: variableValues
        }
    }

    /**
     * TODO
     *
     * @param ids
     * @return {{parameterString: string, parameters}}
     */
    static generateIDList(ids) {
        let idListString = "ids: [";
        const parameters = {};
        for (let i = 0; i < ids.length; i++) {
            const id = ids[i];
            const idName = "id" + i;
            parameters[idName] = id;
            idListString += ("$" + idName + ", ");
        }
        idListString += "]";
        return {
            parameterString: idListString,
            parameters: parameters
        }
    }
    // TODO GraphQL only supports input String! regular types. Reason to change?
    // TODO Make GraphQL more resilient to an empty filter?
    /**
     * TODO
     *
     * @param queryName
     * @param queryFunction
     * @param inputVariables
     * @param outputVariables
     * @param filter
     * @param ifBatch
     * @param ifQuery
     * @return {{query: string, variables: *}}
     */
    static constructQuery(queryName, queryFunction, inputVariables, outputVariables, filter = null, ifBatch = false, ifQuery = false) {
        let query = '';
        // Filter out the null'ed variables
        let finalInputVariables;
        if (filter) {
            finalInputVariables = {...inputVariables, ...filter.parameters};
        }
        else {
            finalInputVariables = inputVariables;
        }
        let ifFirst = true;
        query += 'query ' + queryName;
        if (!_.isEmpty(finalInputVariables)) {
            query += '(';
            for (let variable in finalInputVariables) {
                if (!ifFirst) {
                    query += ", ";
                }
                query += '$' + variable + ': ';
                if (variable === "limit") {
                    query += 'Int';
                }
                else if (variable === "ids") {
                    query += '[String]!';
                }
                else {
                    query += 'String!';
                }
                ifFirst = false;
            }
            query += ')';
        }
        query += ' {\n    ' + queryFunction;
        ifFirst = true;
        if (!_.isEmpty(inputVariables) || filter) {
            query += '(';
            if (filter) {
                query += filter.parameterString;
            }
            for (let variable in inputVariables) {
                if (!ifFirst || filter) {
                    query += ', ';
                }
                query += variable + ": $" + variable;
                ifFirst = false;
            }
            query += ')';
        }
        query += ' {\n';
        if (ifQuery || ifBatch) {
            query += '        items {\n';
        }
        for (let i in outputVariables) {
            if (ifQuery || ifBatch) {
                query += '    ';
            }
            query += '        ' + outputVariables[i] + '\n';
        }
        if (ifQuery) {
            query += '        }\n        nextToken\n';
        }
        else if (ifBatch) {
            query += '        }\n        unretrievedItems {\n            id\n        }\n';
        }
        query += '    }\n}';

        return {
            query: query,
            variables: finalInputVariables
        };
    }

    /**
     * TODO
     *
     * @param nextToken
     * @return {string}
     */
    static getNextTokenString(nextToken) { return nextToken ? nextToken : "null"; }

    /**
     * TODO
     *
     * @param query
     * @return {{variables: {nextToken: string}}}
     */
    static getNormalizedQuery(query) {
        return {
            ...query,
            variables: {
                ...query.variables,
                nextToken: "not_defined"
            }
        };
    }

    /**
     * TODO
     *
     * @param normalizedQuery
     * @param nextToken
     * @return {{variables: {nextToken: *}}}
     */
    static getQueryFromNormalizedQuery(normalizedQuery, nextToken) {
        return {
            ...normalizedQuery,
            variables: {
                ...normalizedQuery.variables,
                nextToken
            }
        };
    }

    /**
     * TODO
     *
     * @param queryResult
     * @return {{ids: Array, nextToken: *}}
     */
    static getCompressedFromQueryResult(queryResult) {
        const items = queryResult.items;
        const ids = [];
        if (items) {
            for (let i = 0; i < items.length; i++) {
                ids.push(items[i].id);
            }
        }
        return {
            ids,
            nextToken: queryResult.nextToken
        };
    }

    /**
     * TODO
     *
     * @param compressedResult
     * @param itemTypeCache
     * @return {{items: Array, nextToken: *}}
     */
    static getQueryResultFromCompressed(compressedResult, itemTypeCache) {
        const ids = compressedResult.ids;
        const items = [];
        for (let i = 0; i < ids.length; i++) {
            const item = itemTypeCache[ids[i]];
            if (item) {
                items.push(item);
            }
        }
        return {
            items,
            nextToken: compressedResult.nextToken
        };
    }

    /**
     * TODO
     *
     * @param query
     * @param queryFunctionName
     * @param successHandler
     * @param failureHandler
     * @param queryCache
     * @param putQuery
     * @return {*}
     */
    static execute(query, queryFunctionName, successHandler, failureHandler, queryCache, putQuery) {
        const queryString = JSON.stringify(query.query) + JSON.stringify(query.variables);
        // log&&console.log(queryString);
        if (queryCache && queryCache[queryString]) {
            // log&&console.log("Received query from the cache");
            log&&console.log("Received the query from the cache");
            // log&&console.log(JSON.stringify(queryCache[queryString]));
            if (successHandler) { successHandler(queryCache[queryString]); }
        }
        else {
            log&&console.log("Sending ql = " + query.query + "\nWith variables = " + JSON.stringify(query.variables));
            if (ifDebug) {
                alert("Sending ql = " + query.query + "\nWith variables = " + JSON.stringify(query.variables));
            }
            TestHelper.ifTesting || API.graphql(graphqlOperation(query.query, query.variables)).then((data) => {
                log&&console.log("GraphQL operation succeeded!");
                if (!data.data || !data.data[queryFunctionName]) {
                    log&&console.log("Object returned nothing!!! Something wrong?");
                    if (successHandler) { successHandler(null); }
                    return;
                }
                log&&console.log("Returned: " + JSON.stringify(data.data[queryFunctionName]));
                if (ifDebug) {
                    alert("Returned: " + JSON.stringify(data.data[queryFunctionName]));
                }
                if (putQuery) {
                    putQuery(queryString, data.data[queryFunctionName]);
                }
                log&&console.log("Handling the successHandler...");
                log&&console.log("QL S H = " + successHandler.toString());
                if (successHandler) { successHandler(data.data[queryFunctionName]); }
            }).catch((error) => {
                err&&console.error("GraphQL operation failed...");
                if (error.message) {
                    error = error.message;
                }
                err&&console.error(JSON.stringify(error));
                err&&console.error("Handling the failureHandler...");
                err&&console.error("QL F H = " + failureHandler.toString());
                if (failureHandler) { failureHandler(error); }
            });
        }
        return query;
    }
}

export default GraphQL;
