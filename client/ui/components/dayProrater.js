import React from 'react'

import TextField from 'material-ui/TextField';


class DayProrater extends React.Component {
    constructor() {
        super();

        this.state = {
            costText: 0,
            roomCostArray: [],
            averageCost: 0,
        };
    }

    render() {
        return (
            <div className="day-prorater-container">
                <h3 className="sub-title">
                    Room rate Variable? <span style={{ fontSize: '12px', fontWeight: 400 }} >Avg cost</span> ${this.state.averageCost.toFixed(2)}
                </h3>
                <p style={{ margin: 0 }}>When finished, the above value can be used within the room rate field (#2) as an
                    average room cost</p>
                <div className="row valign-wrapper">
                    <div className="col s4 m3 l3">
                        <TextField
                            type="number"
                            min="0"
                            value={this.state.costText}
                            floatingLabelText="Nightly cost $"
                            required
                            onChange={(e, value) => {
                                this.handleInput(e, value, 'costText');
                            }}
                            onKeyDown={(e) => {
                                if (e.keyCode === 13) {
                                    this.saveNight();
                                }
                            }}
                            fullWidth
                        />
                    </div>
                    <div className="col s4 m3 l3 offset-s1 ">
                        <button
                            onClick={this.saveNight}
                            className="btn waves-effect waves-light light-blue darken-2 less-button-padding"
                        >
                            Add Night
                        </button>
                    </div>
                    <div className="col s3 m6 l6" />
                </div>
                {this.state.roomCostArray.map((cost, idx) => {
                    return <RoomLine key={`roomLine-${idx}`} cost={cost} idx={idx} removeHandler={this.removeRoom} />
                })}
            </div>
        );
    }

    removeRoom = (idx) => {
        const roomCostArray = this.state.roomCostArray;
        roomCostArray.splice(idx, 1);

        this.setState({ roomCostArray }, () => this.calculateRoomCost());
    };

    calculateRoomCost = () => {
        let roomSum = 0;
        this.state.roomCostArray.forEach((nightCost) => {
            roomSum += parseInt(nightCost);
        });

        this.setState({averageCost: roomSum / (this.state.roomCostArray.length || 1)})
    };

    saveNight = () => {
        if (this.state.costText && this.state.costText != 0) {
            const roomCostArray = this.state.roomCostArray; //not cloning because will be updated right after
            roomCostArray.push(this.state.costText);

            this.setState({roomCostArray, costText: ''}, () => {
                this.calculateRoomCost();
            })
        }
    };

    handleInput = (event, value, field) => {
        if (this.state.hasOwnProperty(field)) {
            this.setState({ [field]: value });
        }
    };
}

const RoomLine = ({ idx, removeHandler, cost }) => {
    return (
        <div className="row room-line-container">
            <div className="cost-line"><p>${cost}</p></div>
            <div className="remove-room" onClick={() => removeHandler(idx)}>&times;</div>
        </div>
    );
}

export default DayProrater;