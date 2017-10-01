# load-movies-lambda
AWS Lambda Function that reads a json file from a S3 bucket that contains information about movies and writes it to an AWS DynamoDB table.

## Sample json from source file
```
[
    {
        "year": 2013,
        "title": "Rush",
        "info": {
            "directors": [
            "Ron Howard"
            ],
            "release_date": "2013-09-02T00:00:00Z",
            "rating": 8.3,
            "genres": [
            "Action",
            "Biography",
            "Drama",
            "Sport"
            ],
            "image_url": "http://ia.media-imdb.com/images/M/MV5BMTQyMDE0MTY0OV5BMl5BanBnXkFtZTcwMjI2OTI0OQ@@._V1_SX400_.jpg",
            "plot": "A re-creation of the merciless 1970s rivalry between Formula One rivals James Hunt and Niki Lauda.",
            "rank": 2,
            "running_time_secs": 7380,
            "actors": [
            "Daniel Bruhl",
            "Chris Hemsworth",
            "Olivia Wilde"
            ]
        }
    }
]
```

## DynamoDB Table Format
Table Name | movies
-----------|--------
Primary Partition Key | year (Number)
Primary Sort Key | title (String)

## Lambda Environment Variables
* S3_BUCKET
* SRC_FILE_NAME
* DB_TABLE_NAME