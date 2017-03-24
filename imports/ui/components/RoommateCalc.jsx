import React from 'react'
const _ = require('lodash')//required so it can be used easily in chrome dev tools.

import FloatLabel from './forms/FloatLabelForm.jsx'

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import AppBar from 'material-ui/AppBar';

class RoommateCalc extends React.Component {
    constructor() {
        super();

        this.state = {
            roomies: [],
            daysRented: 1,
            sumOfDaysRented: 1,
            costPerNight: 100
        }
    }
    render() {
        const optionsForDays = []
        for(let a = 1; a < 8; a++){
            optionsForDays.push(<MenuItem key={`daysOptions-${a}`} value={a} primaryText={a} />)
        }

        const totalCost = (this.state.daysRented * this.state.costPerNight).toFixed(2)
        return (
            <div>
                <AppBar
                    title="Roomie Calc"
                    iconStyleLeft={{visibility: "hidden"}}
                />
                <div className="student-calc-container container">
                    <div className="row">
                        <div className="col s12 m8 offset-m2 l10 offset-l1">

                            <p className="roomie-header">Set nights staying (#1), Set cost per night (#2), Follow step #3</p>
                            <div className="row">
                                <div className="col s6 m6 l6">
                                    <SelectField value={this.state.daysRented} onChange={this.handleDaysChange} floatingLabelText="1. Total Days Rented"
                                                 floatingLabelStyle={{fontSize: "0.8rem"}} fullWidth={true}>
                                        {optionsForDays}
                                    </SelectField>
                                </div>
                                <div className="col s6 m6 l6">
                                    <TextField
                                        type="number"
                                        defaultValue={this.state.costPerNight}
                                        floatingLabelText="2. Cost Per Night"
                                        required={true}
                                        onChange={this.updateCostPerNight}
                                        fullWidth={true}/>
                                </div>
                            </div>
                            <p className="roomie-header">3. Add some roomies and select the number of days they'll be in the room</p>
                            <div className="roomies-container">
                                <RoomieComp key={`roomie-header`} roomie={{name: 'Name',daysInRoom: 'Days In Room',amountOwed: 'Amount Owed'}} idx={-1}
                                            onAdd={()=>{this.addRoomie(-1)}} onRemove={()=>{}}/>
                                {this.state.roomies.map((roomie, idx)=> {
                                    return <RoomieComp key={`roomie-${idx}`} roomie={roomie} idx={idx} nameOnChange={this.setRoomieName} dayOnChange={this.setRoomieDays}
                                                       onAdd={()=>{this.addRoomie(idx)}} onRemove={()=>{this.removeRoomie(idx)}} />
                                })}
                                <RoomieComp key={`roomie-footer`} roomie={{name: ' ',daysInRoom: 'Total Owed',amountOwed: `$${totalCost}`}} idx={-2}
                                            onAdd={()=>{}} onRemove={()=>{}}/>
                            </div>
                            <div className="row footer-text">
                                <p>Authored by: @<a href="https://www.twitter.com/takoda117" target="_blank">Takoda117</a></p>
                                <p>Please feel to reach out with comments and concerns</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    handleDaysChange = (e, key, value) => {
        if(value > 0) {
            this.setState({daysRented: value},()=>{
                this.recalcCost()}
            )
        }
    };
    updateCostPerNight = (e,value) => {
        const costPerNight = parseInt(value) || 0
        if (costPerNight > 0){
            this.setState({costPerNight},()=>{
                this.recalcCost()
            })
        }
    };
    setRoomieName = (e,idx) => {
        const roomieName = e.currentTarget.value;
        const roomiesClone = _.cloneDeep(this.state.roomies);

        roomiesClone[idx].name = roomieName //assumes idx exists because made from array

        this.setState({roomies: roomiesClone})
    };
    setRoomieDays = (value,idx) => {
        const roomiesClone = _.cloneDeep(this.state.roomies);

        roomiesClone[idx].daysInRoom = value //assumes idx exists because made from array

        this.setState({roomies: roomiesClone}, ()=>{
            this.recalcCost();
        })
    };


    addRoomie = (idx) => {
        const self= this;
        const currentRoomies = _.cloneDeep(this.state.roomies)

        const newStudent = {
            name: "New roomie",
            daysInRoom: 1,
            amountOwed: 1
        }
        currentRoomies.splice(idx+1,0,newStudent);

        this.setState({roomies:currentRoomies}, ()=>{
            self.recalcCost();
        })
    }
    removeRoomie = (idx) => {
        const self = this;
        const currentRoomies = _.cloneDeep(this.state.roomies);

        currentRoomies.splice(idx, 1)

        this.setState({roomies:currentRoomies}, ()=>{
            self.recalcCost();
        })
    }
    recalcCost = () =>{
        const roomiesClone = _.cloneDeep(this.state.roomies);
        const totalCost = this.state.daysRented * this.state.costPerNight;

        let sumOfDaysRented = 0;
        roomiesClone.forEach((roomie)=>{
            sumOfDaysRented +=roomie.daysInRoom;
        })

        roomiesClone.forEach((roomie, idx)=>{
            const amountOwed = (roomie.daysInRoom / sumOfDaysRented * totalCost).toFixed(2)
            roomie.amountOwed = amountOwed
        })

        this.setState({roomies: roomiesClone})
    }
}

function RoomieComp ({roomie, idx, onAdd, onRemove, nameOnChange,dayOnChange}) {
    const optionsForDays = [];
    for(let a = 1; a < 8; a++){
        optionsForDays.push(<MenuItem key={`daysOptions-${a}`} value={a} primaryText={a} />)
    }

    const daySelector = <div className="select-padding"><SelectField value={roomie.daysInRoom} onChange={(e,key,value)=>{dayOnChange(value,idx)}} fullWidth={true}>
                            {optionsForDays}
                        </SelectField></div>;

    return (
        <div className={`row valign-wrapper roomie ${idx<0? 'first-row': ''}` }>
            <div className="col s4">{idx <0?roomie.name : <TextField onChange={(e)=>{nameOnChange(e,idx)}} id={`nameField-${idx}`} value={roomie.name} fullWidth={true}/>}</div>
            <div className="col s3">{idx <0?roomie.daysInRoom: daySelector}</div>
            <div className="col s3">{(idx >=0?'$':'')+roomie.amountOwed}</div>
            <div className={`col s1 icon remove ${idx <0? 'hide': ''}`}>
                <button onClick={()=>{onRemove(idx)}} className="btn waves-effect waves-light light-blue darken-2">-</button>
            </div>
            <div className={`col s1 icon add ${idx <-1? 'hide': ''}`}><button onClick={()=>{onAdd(idx)}} className="btn waves-effect waves-light light-blue darken-2">+</button></div>
        </div>
    )
}

export default RoommateCalc