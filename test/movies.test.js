const Movies = require('../movies');
const chai = require('chai');
const assert = require('chai').assert;

var response = {
    'status': 'success',
    'data': 'test data'
};
var param = 'param';
var dynamoDB = {
    deleteTable: function(param, callback) {
        return response;
    }
};

function callback() {}

let movies = new Movies(null, null, dynamoDB);

describe('Movies', () => {
    
    describe('#deleteTable', () => {
        it('should delete the table', () => {
            movies.deleteTable(callback);
        });
    });
    
})