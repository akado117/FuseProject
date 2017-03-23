import React from 'react'
const _ = require('lodash')//required so it can be used easily in chrome dev tools.

import FloatLabel from './forms/FloatLabelForm.jsx'

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

class FuseTestContainer extends React.Component {
    constructor() {
        super();

        this.state = {
            roomies: [{
                name: 'Name',
                daysInRoom: 'Days In Room',
                amountOwed: 'Amount Owed'
            }],
            daysRented: 1,
            sumOfDaysRented: 1,
            costPerNight: 100
        }
    }
    render() {
        const optionsForDays = []
        for(let a = 1; a < 11; a++){
            optionsForDays.push(<MenuItem key={`daysOptions-${a}`} value={a} primaryText={a} />)
        }
        return (
            <div className="student-calc-container container">
                <div className="row">
                    <div className="col s12 m8 offset-m2 l10 offset-l1">
                        <div className="row">
                            <div className="col s6 m6 l6">
                                <SelectField value={this.state.daysRented} onChange={this.handleDaysChange} floatingLabelText="1. Total Days Rented"
                                             floatingLabelStyle={{fontSize: "0.8rem"}} fullWidth={true}>
                                    {optionsForDays}
                                </SelectField>
                            </div>
                            <div className="col s6 m6 l6">
                                <TextField
                                    defaultValue={this.state.costPerNight}
                                    floatingLabelText="2. Cost Per Night"
                                    required={true}
                                    onChange={this.updateCostPerNight}
                                    fullWidth={true}/>
                            </div>
                        </div>
                        <p className="roomie-header">3. Add some roomies and select the number of days they'll be in the room</p>
                        <div className="roomies-container">
                            {this.state.roomies.map((roomie, idx)=> {
                                return <RoomieComp key={`roomie-${idx}`} roomie={roomie} idx={idx}
                                                   onAdd={()=>{this.addRoomie(idx)}} onRemove={()=>{this.removeRoomie(idx)}}/>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    handleDaysChange = (e, key, value) => {
        if(value > 0) {
            this.setState({daysRented: value})
        }
    }
    updateCostPerNight = (e,key,value) => {
        const costPerNight = parseInt(value) || 0
        if (costPerNight > 0){
            this.setState({costPerNight})
        }
    }
    addRoomie = (idx) => {
        const self= this;
        const currentRoomies = _.cloneDeep(this.state.roomies)

        const newStudent = {
            name: 'New roomie',
            daysInRoom: 1,
            amountOwed: 1
        }

        currentRoomies.splice(++idx,0,newStudent);

        this.setState({roomies:currentRoomies}, ()=>{
            $('select').material_select();
            self.recalcCost();
        })
    }
    removeRoomie = (idx) => {
        const currentRoomies = _.cloneDeep(this.state.roomies);

        currentRoomies.splice(idx, 1)

        this.setState({roomies:currentRoomies}, ()=>{
            $('select').material_select();
            self.recalcCost();
        })
    }
    recalcCost = () =>{
        const roomiesClone = _.cloneDeep(this.state.roomies);
        const totalCost = this.state.daysRented * this.state.costPerNight;

        let sumOfDaysRented = 0;
        roomiesClone.forEach((roomie,idx)=>{
            if(idx != 0)
            sumOfDaysRented +=roomie.daysInRoom;
        })

        roomiesClone.forEach((roomie, idx)=>{
            if(idx != 0) {
                const amountOwed = (roomie.daysInRoom / sumOfDaysRented * totalCost).toFixed(2)
                roomie.amountOwed = amountOwed
            }
        })

        this.setState({roomies: roomiesClone})
    }
}

function RoomieComp ({roomie, idx, onAdd, onRemove}) {
    const optionsForDays = []
    for(let a = 1; a < 11; a++){
        optionsForDays.push(<MenuItem key={`daysOptions-${a}`} value={a} primaryText={a} />)
    }

    const daySelector = <div className="select-padding"><SelectField value={roomie.daysInRoom} onChange={()=>{}} fullWidth={true}>
                            {optionsForDays}
                        </SelectField></div>

    return (
        <div className={`row valign-wrapper roomie ${idx==0? 'first-row': ''}` }>
            <div className="col s4">{idx==0?roomie.name : <TextField id={`nameField-${idx}`} defaultValue={roomie.name} fullWidth={true}/>}</div>
            <div className="col s3">{idx==0?roomie.daysInRoom: daySelector}</div>
            <div className="col s3">{(idx!==0?'$':'')+roomie.amountOwed}</div>
            <div className={`col s1 icon remove ${idx==0? 'hide': ''}`}>
                <button onClick={onRemove} className="btn waves-effect waves-light light-blue darken-2">-</button>
            </div>
            <div className="col s1 icon add"><button onClick={onAdd} className="btn waves-effect waves-light light-blue darken-2">+</button></div>
        </div>
    )
}

export default FuseTestContainer