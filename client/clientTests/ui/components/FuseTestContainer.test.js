let sinon = require('sinon');
let chai = require('chai');
let should = chai.should();
let sinonChai = require("sinon-chai");
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import FuseTestContainer from '../../../../client/ui/components/FuseTestContainer';

//require('../DOMConfig')('<html><body></body></html>');

chai.use(sinonChai);


describe('FuseTestContainer Component', function () {
    let FuseTestContainerComponent,
        sandbox,
        setStateSpy;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        FuseTestContainerComponent = ReactTestUtils.renderIntoDocument(React.createElement(FuseTestContainer));

        setStateSpy = sandbox.spy(FuseTestContainerComponent, 'setState');
    });


    describe('algorithm specific functions', function () {
        describe('retrieveOccupiedSpaces', function () {
            it('should return array of positions of a given Char within a string', function () {
                const testString = 'ABABBBABABA';

                let testArr = FuseTestContainerComponent.retrieveOccupiedSpaces(testString, 'A');
                testArr.should.eql([0, 2, 6, 8, 10]);

                testArr = FuseTestContainerComponent.retrieveOccupiedSpaces('', '');
                testArr.should.eql([]);
            });
        });

        describe('getIndexesOfSurroundingSpaces', function () {
            it('return array of 3 adjacent integers if on corner of grid', function () {
                let testArry = FuseTestContainerComponent.getIndexesOfSurroundingSpaces(0, 3, '123456789');
                testArry.sort();
                testArry.should.eql([1, 3, 4]);

                testArry = FuseTestContainerComponent.getIndexesOfSurroundingSpaces(8, 3, '123456789');
                testArry.sort();
                testArry.should.eql([4, 5, 7])
            });
            it('return array of 5 adjacent integers if on edge of grid but not corner', function () {
                let testArry = FuseTestContainerComponent.getIndexesOfSurroundingSpaces(1, 3, '123456789');
                testArry.sort();
                testArry.should.eql([0, 2, 3, 4, 5]);

                testArry = FuseTestContainerComponent.getIndexesOfSurroundingSpaces(7, 3, '123456789');
                testArry.sort();
                testArry.should.eql([3, 4, 5, 6, 8]);
            });
            it('return array of 8 adjacent integers if not on any edge of grid', function () {
                let testArry = FuseTestContainerComponent.getIndexesOfSurroundingSpaces(9, 8, 'asassasasassaasaaassasasssaaassaaasasassssassasa');
                testArry.should.eql([0, 8, 16, 1, 17, 2, 10, 18]);

                testArry = FuseTestContainerComponent.getIndexesOfSurroundingSpaces(14, 8, 'asassasasassaasaaassasasssaaassaaasasassssassasa');
                testArry.should.eql([5, 13, 21, 6, 22, 7, 15, 23]);
            });
        });
        describe('tallyIndexTotals', function () {
            it('modify object passed in to keep a running tally of integers within arrays passed in', function () {
                let tallyObj = {};
                FuseTestContainerComponent.tallyIndexTotals(tallyObj, [1, 2, 3]);
                tallyObj.should.eql({1: 1, 2: 1, 3: 1});

                FuseTestContainerComponent.tallyIndexTotals(tallyObj, [2, 1, 5]);
                tallyObj.should.eql({1: 2, 2: 2, 3: 1, 5: 1})
            });
        });
        describe('processNewGrid', function () {
            it('output a new grid based given rules, occupiedSpaces, current grid, and alive/dead Chars', function () {
                let tallyObj = {0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 0, 6: 1, 7: 2, 8: 3, 9: 4};
                const grid = 'AAAAABBBBBAB';
                const cellStateObj = {alive: 'A', dead: 'B'};

                const newGrid = FuseTestContainerComponent.processNewGrid(tallyObj, grid, cellStateObj.alive, cellStateObj.dead);
                newGrid.should.eql('BBAABBBBABBB');
            });
        });
        describe('computeCycle', function () {
            it('combine algorithm functions with current state to compute new grid', function () {
                let tallyObj = 'tallyObj';
                const grid = 'AAAAABBBBBAB';
                const cellStateObj = {alive: 'A', dead: 'B'};

                FuseTestContainerComponent.setState({
                    grid,
                    aliveChar: cellStateObj.alive,
                    deadChar: cellStateObj.dead,
                    rowLength: 4
                });

                sandbox.stub(FuseTestContainerComponent, 'retrieveOccupiedSpaces').returns([1, 2, 3]);
                sandbox.stub(FuseTestContainerComponent, 'getIndexesOfSurroundingSpaces').returns('test');
                sandbox.stub(FuseTestContainerComponent, 'tallyIndexTotals');
                sandbox.stub(FuseTestContainerComponent, 'processNewGrid').returns('NEWGRID!!!');


                FuseTestContainerComponent.computeCycle()

                setStateSpy.should.have.been.calledWith({grid: 'NEWGRID!!!'})
                FuseTestContainerComponent.retrieveOccupiedSpaces.should.have.been.calledOnce
                FuseTestContainerComponent.getIndexesOfSurroundingSpaces.should.have.been.thrice
                FuseTestContainerComponent.tallyIndexTotals.should.have.been.thrice
            });
        });
    });
});