const AWS = require('aws-sdk');
const Movies = require('movies');

const S3 = new AWS.S3();
const dynamoDB = new AWS.DynamoDB();
const doc = new AWS.DynamoDB.DocumentClient({
    region: 'us-east-1'
});

let movies = new Movies(S3, doc, dynamoDB);

exports.handler = (event, context, callback) => {

    if(event.flag == null || !event.flag) {
        console.log('Feature flag is null or DNE');
    }   
    else if(event.flag === "load") {
        movies.load(callback);
    }
    else if(event.flag === "create-table") {
        movies.createTable(callback);
    }
    else if(event.flag == "delete-table") {
        movies.deleteTable(callback);
    }
    else {
        console.log('Event is not supported');
    }

}