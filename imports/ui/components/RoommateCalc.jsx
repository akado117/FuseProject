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
            roomies: [{"name":"Your","daysInRoom":2,"amountOwed":"187.18"},{"name":"Names","daysInRoom":3,"amountOwed":"280.77"},{"name":"Here","daysInRoom":2,"amountOwed":"187.18"}],
            daysRented: 3,
            sumOfDaysRented: 1,
            costPerNight: 95,
            fees: 25,
            taxRate: 6
        }
    }
    render() {
        const optionsForDays = []
        for(let a = 1; a < 15; a++){
            optionsForDays.push(<MenuItem key={`daysOptions-${a}`} value={a} primaryText={a} />)
        }

        const totalCost = this.totalCost().toFixed(2);
        const floatLableStyle = {fontSize: "0.9rem"};
        return (
            <div>
                <AppBar
                    title="Roomie Calc"
                    iconStyleLeft={{visibility: "hidden"}}
                />
                <div className="student-calc-container container">
                    <div className="row">
                        <div className="col s12 m10 offset-m1 l10 offset-l1">

                            <p className="roomie-header">Set nights staying (#1), Set cost per night (#2), Set fees (#3), Set Taxes (#4), Follow step #5</p>
                            <div className="row">
                                <div className="col s6 l3">
                                    <SelectField value={this.state.daysRented} onChange={this.handleDaysChange} floatingLabelText="1. Days Rented"
                                                 floatingLabelStyle={{fontSize: "0.8rem"}} fullWidth={true} floatingLabelStyle={floatLableStyle}>
                                        {optionsForDays}
                                    </SelectField>
                                </div>
                                <div className="col s6 l3">
                                    <TextField
                                        type="number"
                                        min="0"
                                        defaultValue={this.state.costPerNight}
                                        floatingLabelText="2. Cost per Night($)"
                                        required={true}
                                        onChange={(e,value)=>{this.handleInput(e,value,'costPerNight')}}
                                        fullWidth={true}/>
                                </div>
                                <div className="hide-on-med-and-down">
                                    <div className="col l3">
                                        <TextField
                                            min="0"
                                            type="number"
                                            defaultValue={this.state.fees}
                                            floatingLabelText="3. Fees($)"
                                            required={true}
                                            onChange={(e,value)=>{this.handleInput(e,value,'fees')}}
                                            fullWidth={true}/>
                                    </div>
                                    <div className="col l3">
                                        <TextField
                                            min="0"
                                            max="100"
                                            type="number"
                                            defaultValue={this.state.taxRate}
                                            floatingLabelText="4. Tax Rate (%1-100)"
                                            required={true}
                                            onChange={(e,value)=>{this.handleInput(e,value,'taxRate')}}
                                            fullWidth={true}/>
                                    </div>
                                </div>
                            </div>
                            <div className="row hide-on-large-only	">
                                <div className="col s6">
                                    <TextField
                                        min="0"
                                        type="number"
                                        defaultValue={this.state.fees}
                                        floatingLabelText="3. Fees($)"
                                        required={true}
                                        onChange={(e,value)=>{this.handleInput(e,value,'fees')}}
                                        fullWidth={true}/>
                                </div>
                                <div className="col s6">
                                    <TextField
                                        min="0"
                                        max="100"
                                        type="number"
                                        defaultValue={this.state.taxRate}
                                        floatingLabelText="4. Tax Rate (%1-100)"
                                        required={true}
                                        onChange={(e,value)=>{this.handleInput(e,value,'taxRate')}}
                                        fullWidth={true}/>
                                </div>
                            </div>
                            <p className="roomie-header">5. Add some roomies and select the number of days they'll be in the room</p>
                            <div className="roomies-container">
                                <RoomieComp key={`roomie-header`} roomie={{name: 'Name',daysInRoom: 'Days In Room',amountOwed: 'Amount Owed'}} idx={-1}
                                            onAdd={()=>{this.addRoomie(-1)}} onRemove={()=>{}}/>
                                {this.state.roomies.map((roomie, idx)=> {
                                    return <RoomieComp key={`roomie-${idx}`} roomie={roomie} idx={idx} nameOnChange={this.setRoomieName} dayOnChange={this.setRoomieDays}
                                                       onAdd={()=>{this.addRoomie(idx)}} onRemove={()=>{this.removeRoomie(idx)}} daysRented={this.state.daysRented}/>
                                })}
                                <RoomieComp key={`roomie-footer`} roomie={{name: ' ',daysInRoom: 'Total Owed',amountOwed: `$${totalCost}`}} idx={-2}
                                            onAdd={()=>{}} onRemove={()=>{}}/>
                            </div>
                            <div className="row footer-text">
                                <p>Authored by: <a href="https://www.twitter.com/takoda117" target="_blank">Takoda</a></p>
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
    handleInput=(e,value,prop)=>{
        const parsedValue = parseFloat(value) || 0.00;
        if (parsedValue > -1){
            this.setState({[prop]:parsedValue},()=>{
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
    totalCost = ()=>{
        const taxRate = ((this.state.taxRate + 100)/100);
        return this.state.daysRented * this.state.costPerNight * taxRate + this.state.fees;
    }
    recalcCost = () =>{
        const roomiesClone = _.cloneDeep(this.state.roomies);
        const totalCost = this.totalCost();

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

function RoomieComp ({roomie, idx, onAdd, onRemove, nameOnChange,dayOnChange,daysRented}) {
    const optionsForDays = [];
    for(let a = 1; a <= daysRented; a++){
        optionsForDays.push(<MenuItem key={`roomieDaysOptions-${a}`} value={a} primaryText={a} />)
    }

    const daySelector = <div className="select-padding"><SelectField value={roomie.daysInRoom} onChange={(e,key,value)=>{dayOnChange(value,idx)}} fullWidth={true}>
                            {optionsForDays}
                        </SelectField></div>;

    return (
        <div className={`row valign-wrapper roomie ${idx<0? 'first-row': ''}` }>
            <div className="col s4">{idx <0?roomie.name
                : <TextField onChange={(e)=>{nameOnChange(e,idx)}} id={`nameField-${idx}`} value={roomie.name} fullWidth={true} onFocus={(e)=>{e.currentTarget.select()}}/>}</div>
            <div className="col s3">{idx <0?roomie.daysInRoom: daySelector}</div>
            <div className="col s3">{(idx >=0?'$':'')+roomie.amountOwed}</div>
            <div className={`col s1 icon remove ${idx <0? 'not-visible': ''}`}>
                <button onClick={()=>{onRemove(idx)}} className="btn waves-effect waves-light light-blue darken-2">-</button>
            </div>
            <div className={`col s1 icon add ${idx <-1? 'not-visible': ''}`}><button onClick={()=>{onAdd(idx)}} className="btn waves-effect waves-light light-blue darken-2">+</button></div>
        </div>
    )
}

export default RoommateCalc