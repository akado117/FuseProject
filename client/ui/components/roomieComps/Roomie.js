import React from 'react';
import PropTypes from 'prop-types';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

function RoomieComp({ roomie, idx, onAdd, onRemove, nameOnChange, dayOnChange, daysRented }) {
    const optionsForDays = [];
    for (let a = 1; a <= daysRented; a++) {
        optionsForDays.push(<MenuItem key={`roomieDaysOptions-${a}`} value={a} primaryText={a}/>);
    }

    const daySelector = (
        <div className="select-padding">
            <SelectField
                value={roomie.daysInRoom}
                onChange={(e, key, value) => {
                    dayOnChange(value, idx);
                }}
                fullWidth
            >
                {optionsForDays}
            </SelectField>
        </div>
    );

    return (
        <div className={`row valign-wrapper roomie ${idx < 0 ? 'first-row' : ''}`}>
            <div className="col s4">{idx < 0 ? roomie.name
                : <TextField onChange={(e) => {
                    nameOnChange(e, idx)
                }} id={`nameField-${idx}`} value={roomie.name} fullWidth={true} onFocus={(e) => {
                    e.currentTarget.select()
                }}/>}</div>
            <div className="col s3">{idx < 0 ? roomie.daysInRoom : daySelector}</div>
            <div className="col s3">{(idx >= 0 ? '$' : '') + roomie.amountOwed}</div>
            <div className={`col s1 icon remove ${idx < 0 ? 'not-visible' : ''}`}>
                <button onClick={() => {
                    onRemove(idx)
                }} className="btn waves-effect waves-light light-blue darken-2">-
                </button>
            </div>
            <div className={`col s1 icon add ${idx < -1 ? 'not-visible' : ''}`}>
                <button onClick={() => {
                    onAdd(idx)
                }} className="btn waves-effect waves-light light-blue darken-2">+
                </button>
            </div>
        </div>
    );
}

RoomieComp.propTypes = {
    roomie: PropTypes.object,
    idx: PropTypes.number,
    onAdd: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    nameOnChange: PropTypes.func,
    dayOnChange: PropTypes.func,
    daysRented: PropTypes.number,
}

export default RoomieComp;
