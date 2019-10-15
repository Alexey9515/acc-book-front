import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Notification from '../../containers/notification/notification';
import './style.css'
import UsersTable from "../../components/users-table/users-table";
import {loadUsers, updateUser, deleteAll, addUser, login} from "../actions";
import AddUserModal from "../../containers/add-user";
import LoginModal from "../../containers/login";

class AccBook extends React.Component {

    state = {
        editableUser: undefined,
        users: undefined,
        showAddUserDialog: false,
        showLoginDialog: false
    };

    componentDidMount() {
        this.props.loadUsers();
    }

    componentDidUpdate() {
        if (!this.state.users && this.props.users) {
            this.setState({...this.state, users: this.props.users});
        }
    }

    handleDblClickRow = (id) => {
        this.setState({...this.state, editableUser: id});
    };

    handleSaveNew = (request) => {
        this.props.addUser(request)
            .then(() => {
                this.props.loadUsers();
                this.handleShowAddUser();
            });
        this.setState({...this.state, editableUser: undefined, users: undefined});
    };

    handleShowAddUser = () => {
        if (!this.props.currentUser) {
            this.setState({...this.state, showLoginDialog: !this.state.showLoginDialog});
        }
        if (this.props.currentUser) {
            this.setState({...this.state, showAddUserDialog: !this.state.showAddUserDialog, showLoginDialog: false});
        }
    };

    deleteAll = () => {
        this.props.deleteAll()
            .then(() => this.props.loadUsers());
        this.setState({...this.state, editableUser: undefined, users: undefined});
    };

    login = (user) => {
        this.props.login(user);
        this.handleShowAddUser();
    };

    handleSaveEditable = () => {
        let users = this.state.users;
        for (const user of users) {
            if (user.id === this.state.editableUser) {
                this.props.updateUser(user)
                    .then(() => this.props.loadUsers());
                this.setState({...this.state, editableUser: undefined, users: undefined});
                return;
            }
        }
    };

    handleChangeEditable = (obj) => {
        let users = this.state.users;
        for (const user of users) {
            if (user.id === this.state.editableUser) {
                console.log('obj.currentTarget.value', obj.currentTarget.value);
                user.salary = obj.currentTarget.value;
                console.log('user', user);
            }
        }
        this.setState({...this.state, users});
    };

    render() {
        const {editableUser, users, showAddUserDialog, showLoginDialog} = this.state;

        return (
            <div>
                <UsersTable users={users}
                            handleDblClickRow={this.handleDblClickRow}
                            editableUser={editableUser}
                            handleChangeEditable={this.handleChangeEditable}
                            handleSaveEditable={this.handleSaveEditable}
                            deleteAll={this.deleteAll}
                            handleAddUser={this.handleShowAddUser}/>
                {
                    showAddUserDialog &&
                    <AddUserModal
                        onEmptyClickPlace={this.handleShowAddUser}
                        handleSaveNew={this.handleSaveNew}/>
                }
                {
                    showLoginDialog &&
                    <LoginModal
                        onEmptyClickPlace={this.handleShowAddUser}
                        handleSaveNew={this.handleSaveNew}
                        login={this.login}/>
                }
                <Notification/>
            </div>
        );
    }

}

AccBook.protoTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        salary: PropTypes.number.isRequired
    }))
};

function mapStateToProps(store) {
    return {
        users: store.data.users,
        currentUser: store.data.currentUser
    }
}

export default connect(mapStateToProps, {loadUsers, updateUser, deleteAll, addUser, login})(AccBook);