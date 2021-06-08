import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { TextField, Fab } from '@material-ui/core';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import AddIcon from '@material-ui/icons/Add';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { addChatThunk } from '../actions/chats.jsx';
//import { deleteChatThunk } from '../actions/chats.jsx';
import { connect } from 'react-redux';


class ChatList extends React.Component {
    static propTypes = {
        chats: propTypes.object.isRequired,
        addChatThunk: propTypes.func.isRequired,
        //deleteChatThunk: propTypes.func.isRequired,
    };

    state = {
        input: '',
    };

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.chats === this.props.chats && nextState === this.state) return false;

        return true;
    }

    handleChange = (event) => {
        this.setState({
            input: event.target.value
        });
    };

    handleAddChat = () => {
        const { input } = this.state;
        const { addChatThunk } = this.props;
        if (input.length > 0) {
            addChatThunk(input);
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
        const { chats } = this.props;
        const getClasses = (chat) => {
            let classTitle = 'chatlist_link';
            if (chat.highlighted) {
                classTitle += ' highlight';
            }
            return classTitle;
        }

        const chatElements = Object.keys(chats).map(chatId => (
            <Link key={chatId} id={chatId} to={`/chat/${chatId}`} className={getClasses(chats[chatId])}>
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

        return <div className="chatlist">
            <List>
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
        </div >
    }
}

const mapStateToProps = state => ({
    chats: state.chatsReducer.chats
})

const mapDispatchToProps = dispatch => {
    return {
        addChatThunk: title => dispatch(addChatThunk(title)),
        //deleteChatThunk: chatId => dispatch(deleteChatThunk(chatId)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);