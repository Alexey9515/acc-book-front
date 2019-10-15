import React from 'react';
import PropTypes from 'prop-types';

import './modal-dialog.css';

const ModalDialog = (props) => {
    return (
        <div className="modal" onClick={props.onEmptyClickPlace}>
            <div className="modal-body" onClick={(e) => e.stopPropagation()}>
                {props.children}
            </div>
        </div>
    );
};

ModalDialog.propTypes = {
    onEmptyClickPlace: PropTypes.func
}
export default ModalDialog;