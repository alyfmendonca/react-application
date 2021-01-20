import AWS from 'aws-sdk';

const accessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY;
const secretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
const s3 = new AWS.S3({
    accessKeyId,
    secretAccessKey
});

export default s3;