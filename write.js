const AWS = require('aws-sdk');
const doc = new AWS.DynamoDB.DocumentClient({
    region: 'us-east-1'
});

exports.toDynamoDB = allMovies => {

    console.log('START write to DB');
    var movies = JSON.parse(allMovies);
    
    Array.from(movies).forEach(movie => {
        var dbParams = {
            TableName: 'movies',
            Item: {
                'year': movie.year,
                'title': movie.title,
                'info': movie.info
            }
        };
        
        doc.put(dbParams, (err, data) => {
            if(err){
                console.error('ERROR write to DB: ', err);
                callback(err);
            } 
            else {
                console.log('PUT item succeded : ', movie.title);
            }
        });
    });
    console.log('COMPLETE write to DB');

}