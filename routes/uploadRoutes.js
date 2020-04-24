const AWS = require('aws-sdk');
const uuid = require('uuid');
const keys = require('../config/keys');

const s3 = new AWS.S3({
    accessKeyId: keys.accessKeyId,
    secretAccessKey: keys.secretAccessKey
});

module.exports = app => {
    app.get('/api/upload', (req, res) => {

        s3.getSignedUrl('putObject', {
            Bucket: 'blog-test-bucket-00',
            ContentType:'jpeg',
            Key: '',
        })
    });
};