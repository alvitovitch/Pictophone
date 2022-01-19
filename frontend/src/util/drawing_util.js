import axios from 'axios';
import bike from '../images/avatars/bicycle.png';

export const uploadImage = async () => {
    let file = {bike};
    const { url } = await axios.get('http://localhost:4000/awsUrl').then(res => res.json());
    console.log(url);

    await axios.post(url, {
        headers: {
            "Content-Type": "image/png"
        },
        body: file

    });

    //can also do post request to drawings collection with other info

    const imageUrl = url.split('?')[0];
    console.log(imageUrl);
}


   