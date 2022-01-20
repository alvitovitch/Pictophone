import axios from "axios";

export const fetchAllGuesses = () => {
    return axios.get("/api/guesses");
}

export const fetchGuess = (guessObject) => {
    return axios.get(`/api/guesses/?rooomId=${guessObject.roomId}&chainId=${guessObject.chainId}`);
}

export const createGuess = (guess) => {
    return axios.post('/api/guesses/', guess);
}