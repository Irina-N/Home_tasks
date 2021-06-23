import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import _ from 'lodash';

import { TextField, Fab, CircularProgress, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
/* import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined'; */
import AddIcon from '@material-ui/icons/Add';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { addChatThunk, addChat, fetchChats } from '../actions/chats.jsx';
import { REQUEST_STATUSES } from '../constants.jsx';
//import { deleteChatThunk } from '../actions/chats.jsx';



class ChatList extends React.Component {
    static propTypes = {
        chats: propTypes.object.isRequired,
        addChatThunk: propTypes.func.isRequired,
        fetchChats: propTypes.func.isRequired,
        chatsRequestStatus: propTypes.string.isRequired,
        //deleteChatThunk: propTypes.func.isRequired,
    };

    state = {
        input: '',
    };

    componentDidMount() {
        if (this.props.chatsRequestStatus === '' || this.props.chatsRequestStatus === REQUEST_STATUSES.ERROR) {
            this.props.fetchChats();
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (_.isEqual(nextProps, this.props) &&
            _.isEqual(nextState, this.state)) {
            return false;
        }
        return true;
    }

    handleChange = (event) => {
        this.setState({
            input: event.target.value
        });
    };

    handleAddChat = () => {
        const { input } = this.state;
        const { chats, addChatThunk } = this.props;
        if (input.length > 0) {
            const chatId = 'chat' + (Object.keys(chats).length + 1);
            addChatThunk(input, chatId);
            this.setState({ input: '' });
        }
    }

    handleKeyUp = (event) => {
        if (event.key == 'Enter') {
            this.handleAddChat();
        }
    };

    /* handleDeleteChat = (event) => {
        const { deleteChatThunk } = this.props;
        const chatId = (event.target.id).slice(7);
        console.log('event.target.id', event.target.id);
        console.log('chatId', chatId);
        deleteChatThunk(chatId);
    }
 */
    render() {

        if (this.props.chatsRequestStatus === REQUEST_STATUSES.STARTED) {
            return <div className="chatlist">
                <CircularProgress />
            </div>
        }

        const { chats } = this.props;

        const getClasses = (chat) => {
            let classTitle = 'chatlist_link';
            if (chat.highlighted) {
                classTitle += ' highlight';
            }
            return classTitle;
        }
        const chatElements = Object.keys(chats).map(chatId => (
            <Link key={chatId} id={chatId} to={`/chat/${chatId}`} className={chats[chatId].highlighted ? "chatlist_link highlight" : "chatlist_link"}>
                <ListItem button className="chatlist_item">
                    <ListItemIcon>
                        <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary={chats[chatId].title} />
                    {/* <DeleteForeverOutlinedIcon
                        id={`delete_${chatId}`}
                        className="del_chat-btn"
                        onClick={this.handleDeleteChat} /> */}
                </ListItem>
            </Link>
        ));

        return <List>
            {chatElements}
            <ListItem className="add_chat_field">
                <TextField
                    className="new_chat_title"
                    name="input"
                    variant="outlined"
                    placeholder="Add new chat"
                    onChange={this.handleChange}
                    value={this.state.input}
                    onKeyUp={this.handleKeyUp}
                />
                <Fab
                    className="add_chat_btn"
                    onClick={() => this.handleAddChat()}>
                    <AddIcon />
                </Fab>
            </ListItem>
        </List>
    }
}

const mapStateToProps = state => ({
    chats: state.chatsReducer.chats,
    chatsRequestStatus: state.chatsReducer.chatsRequestStatus,
})

const mapDispatchToProps = dispatch => {
    return {
        addChatThunk: (title, chatId) => dispatch(addChatThunk(title, chatId)),
        addChat: (title, chatId) => dispatch(addChat(title, chatId)),
        fetchChats: () => dispatch(fetchChats()),
        //deleteChatThunk: chatId => dispatch(deleteChatThunk(chatId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);