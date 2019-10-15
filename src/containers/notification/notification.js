import React from "react";
import {connect} from "react-redux";
import {resetNotification} from '../../core/actions/index';
import './style.css';

class Notification extends React.Component {
    render() {
        const error = this.props.notification.error;
        if (error) {
            setTimeout(() => {
                this.props.resetNotification()
            }, 5000);
            return (
                <div className='notification error'>
                    {this.props.notification.error}
                </div>
            );
        }
        return (
            <div className='notification none'/>
        );
    }
}

function mapStateToProps(store) {
    return {
        notification: store.notification
    }
}

export default connect(mapStateToProps, {resetNotification})(Notification);