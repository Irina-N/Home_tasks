import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { TextField, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { addChat } from '../actions/chats.jsx';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


class ChatList extends React.Component {
    static propTypes = {
        chats: propTypes.object.isRequired,
        addChat: propTypes.func.isRequired,
    };

    state = {
        input: '',
    };


    handleChange = (event) => {
        this.setState({
            input: event.target.value
        });
    };

    handleAddChat = () => {
        const { input } = this.state;
        const { addChat } = this.props;
        if (input.length > 0) {
            addChat(input);
            this.setState({ input: '' });
        }
    }

    handleKeyUp = (event) => {
        if (event.key == 'Enter') {
            this.handleAddChat();
        }
    };


    render() {
        const { chats } = this.props;

        const chatElements = Object.keys(chats).map(chatId => (
            <Link key={chatId} to={`/chat/${chatId}`}>
                <ListItem button>
                    <ListItemIcon>
                        <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary={chats[chatId].title} />
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

const mapDispatchToProps = dispatch =>
    bindActionCreators({ addChat }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);