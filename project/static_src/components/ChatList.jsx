import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';


export default class ChatList extends React.Component {

    render() {
        return <div className="chatlist">
            <List>
                <Link to="/chat/1">
                    <ListItem button>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Lorem" />
                    </ListItem>
                </Link>
                <Link to="/chat/2">
                    <ListItem button>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Ipsum" />
                    </ListItem>
                </Link>
                <Link to="/chat/3">
                    <ListItem button>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dolor" />
                    </ListItem>
                </Link>
                <Link to="/chat/4">
                    <ListItem button>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Sit" />
                    </ListItem>
                </Link>
                <Link to="/chat/5">
                    <ListItem button>
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Amet" />
                    </ListItem>
                </Link>
            </List>
        </div >
    }

}