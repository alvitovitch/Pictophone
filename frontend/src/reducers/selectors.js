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