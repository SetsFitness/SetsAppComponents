import React, {Component} from 'react'
import {Icon, Modal, Button} from 'semantic-ui-react'
import { connect } from 'react-redux';
import {fetchPost, putChallengeQuery, putPost, putPostQuery, fetchChallenge, putChallenge, fetchClient} from "../../redux_actions/cacheActions";
import {fetchUserAttributes} from "../../../redux_helpers/actions/userActions";
import CreateChallengeProp from "./CreateChallenge";

/**
 * Event Feed
 *
 * This is the main feed in the home page, it currently displays all public events inside of the database for
 * the user to see.
 */
class PostManager extends Component {
    /*state = {
        isLoading: true,
        userID: null,
        posts: [],
        challenges: [],
        loadedPostIDs: [],
        clientNames: {}, // id to name
        postFeedLength: 10,
        challengeFeedLength: 10,
        nextToken: null,
        ifFinished: false,
        calculations: {
            topVisible: false,
            bottomVisible: false
        },
    };*/

    constructor(props) {
        super(props);
        /*this.forceUpdate = this.forceUpdate.bind(this);
        this.queryPosts = this.queryPosts.bind(this);*/
    }
    /*
    componentDidMount() {
        // this.componentWillReceiveProps(this.props);
        // if (this.props.userID) {
        //     this.setState({userID: this.props.userID});
        //     this.props.fetchUserAttributes(["friends", "invitedEvents"],
        //         (data) => {
        //             // When it has finished
        //             consoleLog("Finished");
        //             this.queryEvents();
        //         });
        // }
    }

    componentWillReceiveProps(newProps) {
        // consoleLog("Set state to userID = " + newProps.userID);
        if (this.state.userID !== newProps.userID) {
            this.setState({userID: newProps.userID});
            // consoleLog("fetchin user attributes");
            this.props.fetchUserAttributes(["friends", "invitedChallenges", "name"],
                (data) => {
                    // consoleLog("finished");
                    this.queryPosts()
                });
        }
    }

    queryPosts() {
        this.setState({isLoading: true});
        if (!this.state.ifFinished) {
            // consoleLog(JSON.stringify(this.props.cache.eventQueries));

            // QL.queryPosts(["id", "title", "endTime", "time_created", "owner", "ifCompleted", "members", "capacity", "goal", "access", "restriction", "tags", "prize"], QL.generateFilter("and",
            //     {"ifCompleted": "eq"}, {"ifCompleted": "false"}), this.state.PostFeedLength,
            //     this.state.nextToken, (data) => {
            const filter = QL.generateFilter({
                    not: {
                        postType: {
                            eq: "$postType"
                        }
                    }}
                ,{postType: "submission"}
            );
            QL.queryPosts(["id", "time_created", "by", "item_type", "postType", "about", "description", "videoPaths", "picturePaths"],
                filter, this.state.postFeedLength, this.state.nextToken, (data) => {
                    if (!data.nextToken) {
                        this.setState({ifFinished: true});
                    }
                    if (data.items) {
                        // TODO We can see private events
                        // consoleLog("got items");
                        const newlyQueriedPosts = [];
                        for (let i = 0; i < data.items.length; i++) {
                            const post = data.items[i];
                            //console.log(JSON.stringify("")
                            this.props.fetchChallenge(data.items[i].about, ["title", "endTime", "tags", "time_created", "capacity", "members"]);
                            this.props.fetchClient(data.items[i].about, ["id", "profileImagePath", "name"]);
                            this.props.fetchPost(data.items[i].about, ["about", "by", "description", "picturePaths", "videoPaths"]);
                            newlyQueriedPosts.push(post);
                        }
                        this.setState({posts: [...this.state.posts, ...newlyQueriedPosts]});
                        for (let i = 0; i < data.items.length; i++) {
                            //consoleLog(data.items[i].time_created);
                            // consoleLog("Putting in event: " + JSON.stringify(data.items[i]));
                            // this.setState({events: [...this.state.events, data.items[i]]});
                            this.props.putPost(data.items[i]);
                        }
                        // consoleLog("events in the end: " + JSON.stringify(this.state.events));
                        this.setState({nextToken: data.nextToken});
                    }
                    else {
                        // TODO Came up with no events
                    }
                    this.setState({isLoading: false});
                }, (error) => {
                    consoleLog("Querying Posts failed!");
                    consoleLog(error);
                    consoleError(error);
                    this.setState({isLoading: false, error: error});
                }, this.props.cache.postQueries, this.props.putPostQuery);
        }
    }*/

    render() {
        return(
            <Modal trigger={<Button primary fluid><Icon name='plus'/> Create Post</Button>} closeIcon>
                <Modal.Header>Post Manager</Modal.Header>
                <Modal.Content>
                    {/*<Tab menu={{attached: "top", widths: 3, size: "small", inverted: true}} panes={
                        [
                            {
                                menuItem:
                                    (<Menu.Item key={0}>
                                        Make Challenge
                                    </Menu.Item>),
                                render: () =>
                                    <Tab.Pane basic attached={false}>

                                    </Tab.Pane>
                            },
                            /*{
                                menuItem: (
                                    <Menu.Item key={1}>
                                        Make Post
                                    </Menu.Item>),
                                render: () => <Tab.Pane basic attached={false}>
                                    <CreatePostProp queryPosts={this.props.queryPosts}/>
                                </Tab.Pane>
                            },*//*
                        ]
                    }/>*/}
                        <CreateChallengeProp queryChallenges={this.props.queryChallenges} queryPosts={this.props.queryPosts}/>
                </Modal.Content>
            </Modal>);
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    info: state.info,
    cache: state.cache
});

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserAttributes: (variablesList, dataHandler) => {
            dispatch(fetchUserAttributes(variablesList, dataHandler));
        },
        fetchClient: (variablesList, dataHandler) => {
            dispatch(fetchClient(variablesList, dataHandler));
        },
        fetchPost: (id, variablesList) => {
            dispatch(fetchPost(id, variablesList));
        },
        putPost: (event) => {
            dispatch(putPost(event));
        },
        putPostQuery: (queryString, queryResult) => {
            dispatch(putPostQuery(queryString, queryResult));
        },
        fetchChallenge: (id, variablesList) => {
            dispatch(fetchChallenge(id, variablesList));
        },
        putChallenge: (event) => {
            dispatch(putChallenge(event));
        },
        putChallengeQuery: (queryString, queryResult) => {
            dispatch(putChallengeQuery(queryString, queryResult));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PostManager);