import React from 'react';
const _ = require('lodash')//required so it can be used easily in chrome dev tools.

class FuseTestContainer extends React.Component {
    constructor() {
        super();

        this.state = {
            errors: [],
            grid: 'asassasasassaasaaassasasssaaassaaasasassssassasa',
            rowLength: 8,
            aliveChar: 's',
            deadChar: 'a',
            displayChars: {
                alive: '😸',
                dead: '💀'
            }
        }
    }

    handleChange = (e) => {
        e.preventDefault()
        const grid = this.refs.gridInput.value || '';
        const aliveChar = this.refs.occupied.value || '';
        const deadChar = this.refs.empty.value || '';

        const errors = this.checkForErrors(grid)

        if(!errors.length){
            this.setState({aliveChar,deadChar, grid: grid.replace(/\n/g,''), errors: []})
        } else {
            this.setState({errors})
        }
    }
    determineIfBinaryChars = (string = '') => {
        let error = '';

        const charList = _.uniqBy(string);

        if(charList.length > 3 || charList.length == 2 && !string.match(/\n/)){
            error = 'Please use just 2 different characters and enter'
        }

        return error
    }
    determineCompletedRows = (string='') => {
        const arry = string.split(/\n/) || []
        let rowLength = 0;
        let error = ''
        arry.forEach((str,idx)=>{
            if (idx === 0){
                rowLength = str.length
            } else {
                if(rowLength != str.length){
                    error= 'Please use rows with equal length'
                }
            }
        })

        if(!error)
            this.setState({rowLength});

        return error
    }
    checkForErrors = (string) => {
        const errors = [];

        let error = this.determineIfBinaryChars(string)
        error? errors.push(error): ''

        error = this.determineCompletedRows(string)
        error? errors.push(error): ''

        return errors
    }
    splitStringByLength = (str, splitLength) => {
        const stringArr = []
        for(let i = 0; i < str.length/splitLength; i++){
            stringArr.push(str.substring(i*splitLength,(i+1)*splitLength))
        }
        return stringArr
    }
    toggleGridSpace = (row,col) => {
        const grid = this.state.grid
        const position = row * this.state.rowLength + col

        const charAtPosition = grid.charAt(position)
        const replacementChar = charAtPosition==this.state.aliveChar? this.state.deadChar : this.state.aliveChar

        const newGrid = grid.substr(0,position) + replacementChar + grid.substr(position+1)


        this.setState({ grid: newGrid });

    }
    toggleCharDisplayPicker = (e) => {
        const fieldWrapper = document.querySelector('#displayChar');
        if (!e.currentTarget.checked) {
            fieldWrapper.className += ' hidden';
        } else {
            fieldWrapper.className = fieldWrapper.className.replace('hidden', '')
        }
    }
    applyNewDisplayChars = (e) => {
        e.preventDefault();

        const alive = this.refs.aliveCharDisplay.value || this.state.displayChars.alive;
        const dead = this.refs.deadCharDisplay.value || this.state.displayChars.dead;

        this.setState({ displayChars: { alive, dead } });
    }
    render() {
        const self = this;

        const splitGrid = this.splitStringByLength(this.state.grid,this.state.rowLength)

        const errors = this.state.errors.map((str,idx)=>{
            return <h4 className='error' key={`error-${idx}`}>{str}</h4>
        });
        return (
            <div className="fuse-container container">
                <form onSubmit={this.handleChange}>
                    <h1 className="title">Please type or paste in an array of characters</h1>
                    <p className="helper-text">only use two different CHAR types and separate rows with enter</p>

                    <div className="input-section">
                        <label htmlFor="occupied">Alive Cell Char</label>
                        <input className="text-field" id="occupied" ref="occupied" type="text" defaultValue={this.state.aliveChar}/>

                        <label htmlFor="empty">Dead Cell Char</label>
                        <input className="text-field" id="empty" ref="empty" type="text" defaultValue={this.state.deadChar}/>
                        <br/>

                        <div className="char-display">
                            <label htmlFor="toggleDisplayInputs">Toggle Display Char Picker</label>
                            <input onChange={this.toggleCharDisplayPicker} id="toggleDisplayInputs" ref="toggleDisplayInputs" type="checkbox"/>

                            <div id='displayChar' className="hidden">
                                <label htmlFor="aliveCharDisplay">Alive Cell Display</label>
                                <input className="text-field" id="aliveCharDisplay" ref="aliveCharDisplay" type="text" defaultValue={this.state.displayChars.alive}/>

                                <label htmlFor="deadCharDisplay">Dead Cell Display</label>
                                <input className="text-field" id="deadCharDisplay" ref="deadCharDisplay" type="text" defaultValue={this.state.displayChars.dead}/>
                                <br/>
                                <button type="btn" onClick={this.applyNewDisplayChars} className="btn waves-effect waves-light light-blue darken-2">Apply New Display</button>
                            </div>
                        </div>
                    </div>

                    <textarea ref='gridInput' type="text" id="dataField" name="dataField"
                              style={{minHeight:'100px', minWidth:'100px'}}
                              placeholder="asassasa
sassaasa
aassasas
ssaaassa
aasasass
ssassasa"/><br/>
                    <button type="submit" className="btn waves-effect waves-light light-blue darken-2">Apply State</button>
                </form>
                {errors}
                <h2 className="sub-title">Click cell to toggle occupied/empty</h2>
                <div className="table-content-container">
                    <table className="table-container">
                        <tbody>
                            {splitGrid.map((str, idx)=>{
                                return <TableRow rowString={str} aliveChar={this.state.aliveChar} rowNum={idx}
                                                 key={`row-${idx}`} toggleHandler={self.toggleGridSpace} displayChar={self.state.displayChars}/>
                            })}
                        </tbody>
                    </table>
                    <p className="table-desc-container"><span className="table-description">Alive = {this.state.displayChars.alive}</span><span>Alive = {this.state.displayChars.dead}</span></p>
                </div>
                <button onClick={this.computeCycle} className="btn waves-effect waves-light light-blue darken-2">Compute Cycle</button>
            </div>
        );
    }
    retrieveOccupiedSpaces = (grid,aliveChar) => {
        const indices = [];
        for (let i = 0; i < grid.length; i++) {
            if (grid[i] === aliveChar) indices.push(i);
        }
        return indices
    }
    getIndexesOfSurroundingSpaces = (indexOfSpace,rowLength,grid) => {
        const indices = []
        const gridLength = grid.length;

        for(let i = -1; i < 2; i++){
            if(!(i === -1 && indexOfSpace % rowLength === 0 || i === 1 && (indexOfSpace+1)%rowLength===0)){  //catch end of row issues
                let tempNum = indexOfSpace - rowLength + i;
                if (-1 < tempNum && tempNum < gridLength) {
                    indices.push(tempNum);
                }
                tempNum = indexOfSpace + i;
                if (-1 < tempNum && tempNum < gridLength && i != 0) {
                    indices.push(tempNum);
                }
                tempNum = indexOfSpace + rowLength + i;
                if (-1 < tempNum && tempNum < gridLength) {
                    indices.push(tempNum);
                }
            }
        }
        return indices
    }
    tallyIndexTotals = (runningTotalObject = {}, arrayToAdd=[]) =>{
        arrayToAdd.forEach((value)=>{
            runningTotalObject[value] = runningTotalObject[value]? ++runningTotalObject[value] : 1
        })
    }
    processNewGrid = (runningTotalObject={},grid,aliveChar, deadChar) => {
        let newGrid = '';
        for(var i = 0; i < grid.length; i++){
            if(grid[i] === aliveChar && (!runningTotalObject[i] || runningTotalObject[i] < 2 || 3 < runningTotalObject[i])) { // less than 2 adjacent but more than 3 and alive
                newGrid += deadChar;
            } else if(runningTotalObject[i] == 3 && grid[i] == deadChar) {// 3 adjacent and dead
                newGrid += aliveChar;
            } else {
                newGrid += grid[i];
            }
        }

        return newGrid
    }
    computeCycle = () => {
        const {grid, aliveChar, deadChar, rowLength} = this.state;
        const runningTotalObject = {};

        const occupiedSpacesArr = this.retrieveOccupiedSpaces(grid,aliveChar);

        occupiedSpacesArr.forEach((spaceIndex)=>{
            const adjacentIdxArr  = this.getIndexesOfSurroundingSpaces(spaceIndex,rowLength,grid);
            this.tallyIndexTotals(runningTotalObject,adjacentIdxArr)
        });

        const newGrid = this.processNewGrid(runningTotalObject,grid,aliveChar,deadChar);

        this.setState({grid: newGrid})
    }
}

function TableRow ({rowString='',aliveChar, deadChar, rowNum, toggleHandler = ()=>{},displayChar = {}}) {
    let columnElement = [];
    let colIdx = 0
    for (let char of rowString) {
        const col = colIdx
        columnElement.push(
            <td className={`grid-col ${char==aliveChar?'occupied': '' }`}
                key={`col-${colIdx}-row-${rowNum}`} onClick={()=>{toggleHandler(rowNum,col)}}>
                {char==aliveChar? displayChar.alive : displayChar.dead}
            </td>)
        colIdx++
    }
    return (
        <tr className="grid-row">
            {columnElement}
        </tr>
    )
}

export default FuseTestContainer