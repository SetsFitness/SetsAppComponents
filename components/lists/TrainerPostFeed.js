import React, {Component, Fragment} from 'react';
import _ from 'lodash';
import {Visibility, Header, Icon, Message} from 'semantic-ui-react';
import PostCard from "../cards/PostCard";
import {connect} from 'react-redux';
import {
    fetchPost,
    fetchTrainer,
    forceFetchTrainer,
    putPost,
} from "../../redux_convenience/cacheItemTypeActions";
import {fetchUserAttributes} from "../../../redux_helpers/actions/userActions";

type Props = {
    trainerID: string
};

/**
 * Post Feed
 *
 * This is the main feed in the home page, it currently displays all public events inside of the database for
 * the user to see.
 */
class TrainerPostFeed extends Component<Props> {
    state = {
        isLoading: true,
        trainerID: null,
        shownPostIDs: [],
        hiddenPostIDs: [],
        posts: [],
        // challenges: [],
        clientNames: {}, // id to name
        postFeedLength: 10,
        nextToken: null,
        ifFinished: false,
        fetched: false,
        calculations: {
            topVisible: false,
            bottomVisible: false
        },
    };

    constructor(props) {
        super(props);
        this.forceUpdate = this.forceUpdate.bind(this);
        this.rows = this.rows.bind(this);
    }

    componentDidMount() {
        this.componentWillReceiveProps(this.props);
    }

    componentWillReceiveProps(newProps) {
        // log&&console.log("Set state to userID = " + newProps.userID);
        if (this.state.trainerID !== newProps.trainerID) {
            this.setState({isLoading: true, trainerID: newProps.trainerID});
            this.props.fetchTrainer(newProps.trainerID, ["posts"], (trainer) => {
                this.setState({isLoading: false});
                    if (trainer && trainer.posts && trainer.posts.length) {
                        //console.log(trainer.posts[0]);
                        for (let i = 0; i < trainer.posts.length; i++) {
                            //console.log("Trainer posts: " + trainer.posts[i]);
                            this.props.fetchPost(trainer.posts[i], ["by", "about", "time_created", "access", "description", "postType", "picturePaths", "videoPaths"], (post) => {
                                let hiddenPosts = this.state.hiddenPostIDs;
                                hiddenPosts[i] = post.id;
                                //console.log(hiddenPosts);
                                this.setState({hiddenPostIDs: hiddenPosts});
                                //console.log("state: " + JSON.stringify(this.state.hiddenPostIDs));
                            });
                        }
                    }
            });
            // log&&console.log("fetchin user attributes");
            // this.props.fetchUserAttributes(["friends"],
            //     (data) => {
            //         // log&&console.log("finished");
            //         this.queryPosts()
            //     });
        }
    };

    addAnotherPost() {
        this.state.shownPostIDs.push(this.state.hiddenPostIDs.pop(0));
    }

    /**
     *
     * @param e
     * @param calculations
     */
    handleUpdate = (e, { calculations }) => {
        this.setState({ calculations });
        // log&&console.log(calculations.bottomVisible);
        if (calculations.bottomVisible) {
            //this.addAnotherPost();
        }
    };

    forceUpdate = () => {
        this.props.forceFetchTrainer(this.props.trainerID, ["posts"]);
    };

    rows() {
        // if(events != null && events.length > 0)
        //     log&&console.log(JSON.stringify(events[0].id));
        // log&&console.log("EVENTS TO PRINT: ");
        // log&&console.log(JSON.stringify(events));
        //console.log("rows should be running");
        //console.log(JSON.stringify(this.state.hiddenPostIDs));
        return _.times(this.state.hiddenPostIDs.length, i => (
            <Fragment key={i}>
                <PostCard postID={this.state.hiddenPostIDs[i]}/>
            </Fragment>
        ));
    }

    render() {
        /**
         * This function takes in a list of posts and displays them in a list of Post Card views.
         * @param posts
         * @returns {*}
         */
        //This displays the rows in a grid format, with visibility enabled so that we know when the bottom of the page
        //is hit by the user.
        if (this.state.isLoading) {
            return(
                <Message icon>
                    <Icon name='spinner' size="small" loading />
                    <Message.Content>
                        <Message.Header>
                            Loading...
                        </Message.Header>
                    </Message.Content>
                </Message>
            );
        }
        else if (this.state.shownPostIDs.length > 0 || this.state.hiddenPostIDs) {
            return (
                <Visibility onUpdate={this.handleUpdate}>
                    <Header sub>Recent Posts:</Header>
                    {this.rows(this.state.hiddenPostIDs)/*< this originally had shownPostIDs*/}
                </Visibility>
            );
        }
        else {
            return(
                <Message>No posts yet!</Message>
            );
        }
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
        fetchTrainer: (id, variableList, dataHandler) => {
            dispatch(fetchTrainer(id, variableList, dataHandler));
        },
        forceFetchTrainer: (id, variableList, dataHandler) => {
            dispatch(forceFetchTrainer(id, variableList, dataHandler));
        },
        fetchPost: (id, variablesList, dataHandler) => {
            dispatch(fetchPost(id, variablesList, dataHandler));
        },
        putPost: (post) => {
            dispatch(putPost(post));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TrainerPostFeed);
