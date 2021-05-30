import React from 'react';
import { Link } from 'react-router-dom';


export default class Profile extends React.Component {

    render() {
        return (
            <div className="profile">
                <header className="profile_header">
                    <Link to="/">
                        close
                    </Link>
                    <span className="profile_header_title">Profile</span>
                </header>
            </div >
        )
    }

}