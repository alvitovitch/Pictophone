import axios from "axios";

export const fetchAllGuesses = () => {
    return axios.get("/api/guesses");
}

export const fetchGuess = (guessObj) => {
    return axios.get(`/api/guesses/${guessObj.roomId},${guessObj.chainId}`);
}

export const createGuess = (guess) => {
    return axios.post('/api/guesses/', guess);
}