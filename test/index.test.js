const index = require('../index');
const chai = require('chai');
const assert = require('chai').assert;
const env = Object.assign({}, process.env);
const sinon = require('sinon');

let AWS = require('aws-sdk-mock');

beforeEach(() => {
    process.env.DB_TABLE_NAME = 'TABLE_XYZ';
});

afterEach(() => {
    process.env = env;
    AWS.restore();
});

describe('Movies', () => {
    
    describe('#deleteTable', () => {
        
        it('should delete the table', () => {
            
            AWS.mock('DynamoDB', 'deleteTable', (err, callback) => {
                callback(null, 'table deleted successfully');
            });
            var spyCallback = sinon.spy();
            var result = index.handler({ 'flag': 'delete-table' }, null, spyCallback);
            assert.isTrue(spyCallback.withArgs(null, 'success').calledOnce);
            
        });

        it('should throw an error', () => {

            AWS.mock('DynamoDB', 'deleteTable', (err, callback) => {
                callback('error');
            });
            var spyCallback = sinon.spy();
            var result = index.handler({ 'flag': 'delete-table' }, null, spyCallback);
            assert.isTrue(spyCallback.withArgs('error').calledOnce);

        });
        
    });
    
});