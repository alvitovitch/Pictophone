// import axios from 'axios';
// import bike from '../images/avatars/bicycle.png';

// export const uploadImage = async () => {
//     let file = {bike};
//     const url = await axios.get('http://localhost:4000/awsUrl').then(res => console.log(res.data.url));
//     console.log(url);

//     await axios.post(url, {
//         headers: {
//             "Content-Type": "image/png"
//         },
//         body: file

//     });

//     //can also do post request to drawings collection with other info

//     const imageUrl = url.split('?')[0];
//     console.log(imageUrl);
// }

// res.json()

import { uploadFile } from 'react-s3';
// import dotenv from 'dotenv';

const BUCKET = 'pictophone-uploads';
const REGION = 'us-east-1';
const KEY = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
const SECRET_KEY = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;

const config = {
    bucketName: BUCKET,
    region: REGION,
    accessKeyId: KEY,
    secretAccessKey: SECRET_KEY,
}

const file = '../images/avatars/bicycle.png'
//pass image data in here somewhow...
export const handleUpload = async (file) => {
        uploadFile(file, config)
            .then(data => console.log(data))
            .catch(err => console.error(err))
};



   