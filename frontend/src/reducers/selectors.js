export const randomPrompts = (roomSize, state) => {
    let prompts = Object.values(state.entities.prompts)
    let randomPrompts = []
    while (randomPrompts.length < roomSize) {
        let rando = prompts.sample()
        if (!randomPrompts.includes(rando)) {
            randomPrompts.push(rando)
        }
    }
    return randomPrompts
}

export const sortedChains = (room, state) => {
    // const test = [
    //     {10: "test"},
    //     {20: "test"},
    //     {30: "test"},
    //     {40: "test"},
    //     {11: "https://pictophone-uploads.s3.amazonaws.com/drawing61e9aea15e46f5495e52b69a11"},
    //     {41: "https://pictophone-uploads.s3.amazonaws.com/drawing61e9aea15e46f5495e52b69a11"},
    //     {31: "https://pictophone-uploads.s3.amazonaws.com/drawing61e9aea15e46f5495e52b69a11"},
    //     {21: "https://pictophone-uploads.s3.amazonaws.com/drawing61e9aea15e46f5495e52b69a11"},
    //     {22: "test"},
    //     {12: "test"},
    //     {42: "test"},
    //     {32: "test"},
    //     {13: "https://pictophone-uploads.s3.amazonaws.com/drawing61e9aea15e46f5495e52b69a11"},
    //     {33: "https://pictophone-uploads.s3.amazonaws.com/drawing61e9aea15e46f5495e52b69a11"},
    //     {43: "https://pictophone-uploads.s3.amazonaws.com/drawing61e9aea15e46f5495e52b69a11"},
    //     {23: "https://pictophone-uploads.s3.amazonaws.com/drawing61e9aea15e46f5495e52b69a11"},
    //     {24: "test"},
    //     {14: "test"},
    //     {44: "test"},
    //     {34: "test"},
    // ]
    const chains = (state.entities.games[room._id].chains).slice();
    // const chains = test;
    debugger
    const sortedChains = chains.sort((a, b) => (Object.keys(a)[0] - Object.keys(b)[0]));
    const presentationObj = {};
    room.players.forEach((player) => {
        presentationObj[player] = []
        for(let i = 0; i < room.size+1; i++){
            if (sortedChains[0] === undefined){
            }
            presentationObj[player].push(Object.values(sortedChains.shift())[0])
        }
    })
    return presentationObj;
}