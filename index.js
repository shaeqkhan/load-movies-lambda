const Movies = require('./Movies');
let movies = new Movies();

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
        movies.deleteDynamoTable(callback);
    }
    else {
        console.log('Event is not supported');
    }

}