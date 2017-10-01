const AWS = require('aws-sdk');
const S3 = new AWS.S3();

let write = require('./write');

exports.handler = (event, context, callback) => {

    if(event.flag == null || !event.flag) {
        console.log('Data was not loaded to table, flag is false or DNE');
    }   
    else {
        console.log('START read file from S3');
        var s3Params = {
            Bucket : process.env.S3_BUCKET,
            Key : process.env.SRC_FILE
        };
        S3.getObject(s3Params, (err, data) => {
            if(err) {
                console.error('ERROR read file from S3: ', err);
                callback(err);
            }
            else {
                var allMovies = data.Body.toString('utf-8');
                console.log('COMPLETE read file from S3');
                write.toDynamoDB(allMovies);
            }
        });  
    } 
    callback(null, 'success');   

}