import aws from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const region = 'us-east-1';
const bucketName = 'pictophone-uploads';
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
});

export async function generateUploadUrl() {
    const imageName = `img` + `${Math.random().toString(36).slice(-5)}`; // randomized string

    const params = ({
        Bucket: bucketName,
        Key: imageName,
        Expires: 60
    })

    const uploadURL = await s3.getSignedUrlPromise('putObject', params);
    return uploadURL
}