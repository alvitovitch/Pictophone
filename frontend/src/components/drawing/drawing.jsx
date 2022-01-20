import React from 'react';
import AWS from 'aws-sdk';


class Drawing extends React.Component {
    constructor(props) {
        super(props)

        AWS.config.update({
            accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
        })

        this.bucket = new AWS.S3({
            params: { Bucket: 'pictophone-uploads' },
            region: 'us-east-1',
        })

    }

    

    uploadFile = (file) => {
        const params = {
            ACL: 'public-read',
            Key: file.name,
            ContentType: file.type,
            Body: file,
        }
        this.bucket.putObject(params)
            .on('httpUploadProgress', (e) => {
                this.setState({
                    progress: Math.round((e.loaded / e.total) * 100),
                })
            })
            .send((err) => {
                if (err) {
                    
                }
            })
    }

}

export default Drawing;