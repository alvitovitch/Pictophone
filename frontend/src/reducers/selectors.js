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

    if (Object.values(state.entities.games).length === 0) {
        return {};
    } else {
        const chains = (state.entities.games[room._id].chains).slice();
        const sortedChains = chains.sort((a, b) => (Object.keys (a)[0] - Object.keys(b)[0]));
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
}

export const sortedDemo = (currentUsername, state) => {
    if (state.entities.demos === null) {
        return null
    } else {
        const chains = state.entities.demos.slice();
        const sortedChains = chains.sort((a, b) => (Object.keys(a)[0] - Object.keys(b)[0]));
        const presentationObj = {};
        const players = [currentUsername, "Ida", "Reginald", "Theodore"]
        
        players.forEach((player) => {
            presentationObj[player] = []
            for (let i = 0; i < 5; i++) {
                presentationObj[player].push(Object.values(sortedChains.shift())[0])
            }
        })
        return presentationObj;
    }
}