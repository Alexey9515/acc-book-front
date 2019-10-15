import React from "react";
import PropTypes from 'prop-types';
import ModalDialog from "../../components/modal/modal-dialog";
import {Input, Button} from "semantic-ui-react";

class AddUserModal extends React.Component {

    state = {
        request: {
            name: '',
            salary: 0
        }
    }
    changeData = (type, data) => {
        let request = this.state.request;
        request[type] = data;
        this.setState({...this.state, request: request});
    };

    render() {
        return (
            <ModalDialog onEmptyClickPlace={this.props.onEmptyClickPlace}>
                <Input placeholder='ФИО'
                       onChange={(e) => this.changeData('name', e.target.value)}
                       value={this.state.request.name}/>
                <Input type='number' placeholder='Оклад'
                       onChange={(e) => this.changeData('salary', e.target.value)}
                       value={this.state.request.salary}/>
                <Button primary onClick={() => {
                    this.props.handleSaveNew(this.state.request)
                }}>Сохранить</Button>
            </ModalDialog>
        );
    }
}

AddUserModal.protoTypes = {
    handleSaveNew: PropTypes.func.isRequired,
    onEmptyClickPlace: PropTypes.func.isRequired
};

export default AddUserModal;