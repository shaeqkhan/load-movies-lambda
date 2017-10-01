class Movies {

    constructor(S3, doc, dynamoDB) {
        this.S3 = S3;
        this.doc = doc;
        this.dynamoDB = dynamoDB;
    }
    
    read(callback) {
        console.log('START read file from S3');
        var s3Params = {
            Bucket : process.env.S3_BUCKET,
            Key : process.env.SRC_FILE_NAME
        };
        this.S3.getObject(s3Params, (err, data) => {
            if(err) {
                console.error('ERROR read file from S3: ', err);
                callback(err);
            }
            else {
                var allMovies = data.Body.toString('utf-8');
                console.log('COMPLETE read file from S3');
                this.write(allMovies);
                callback(null, 'success');
            }
        });
    }

    write(allMovies) {
        console.log('START write to DB');
        var movies = JSON.parse(allMovies);
        
        Array.from(movies).forEach(movie => {
            var dbParams = {
                TableName: process.env.DB_TABLE_NAME,
                Item: {
                    'year': movie.year,
                    'title': movie.title,
                    'info': movie.info
                }
            };
            
            this.doc.put(dbParams, (err, data) => {
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

    createTable(callback) {
        console.log('START create table: ', process.env.DB_TABLE_NAME);
        var dbParams = {
            TableName: process.env.DB_TABLE_NAME,
            KeySchema: [       
                { AttributeName: 'year', KeyType: 'HASH'},  //Partition key
                { AttributeName: 'title', KeyType: 'RANGE' }  //Sort key
            ],
            AttributeDefinitions: [       
                { AttributeName: 'year', AttributeType: 'N' },
                { AttributeName: 'title', AttributeType: 'S' }
            ],
            ProvisionedThroughput: {       
                ReadCapacityUnits: 5, 
                WriteCapacityUnits: 5
            }
        };
        this.dynamoDB.createTable(dbParams, (err, data) => {
            if(err){
                console.error('ERROR creating ', process.env.DB_TABLE_NAME, ' table: ', err);
                callback(err);
            } 
            else {
                console.log(data);
            }
        });
        console.log('COMPLETE create table: ', process.env.DB_TABLE_NAME);
        callback(null, 'success');
    }

    deleteTable(callback) {
        console.log('START delete table: ', process.env.DB_TABLE_NAME);
        var dbParams = {
            TableName: process.env.DB_TABLE_NAME
        }
        this.dynamoDB.deleteTable(dbParams, (err, data) => {
            if(err) {
                console.error('ERROR deleting ', process.env.DB_TABLE_NAME, ' table: ', err);
                callback(err);
            }
            else {
                console.log(data);
            }
        });
        console.log('COMPLETE delete table: ', process.env.DB_TABLE_NAME);
        callback(null, 'success');
    }

}

module.exports = Movies;