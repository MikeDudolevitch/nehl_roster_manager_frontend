class Team {
    constructor({name, logo_img, id}, modal) {
        this.name = name
        this.logo_img = logo_img
        this.id = id
        this.modal = modal
        Team.all.push(this)
    }
    static all = []
    static playerArray = []

    addToDom() {
        const teamOnDom = document.querySelector('#team-container')
        const teamDiv = document.createElement("div")
        teamDiv.classList.add("team")
        teamDiv.innerHTML += this.renderTeam()
        teamOnDom.appendChild(teamDiv)
        const modalContent = this.modal.querySelector("#modal-content")
        const playerContent = document.createElement("div")
        playerContent.classList.add("player")
        teamDiv.addEventListener('click', () => {
            this.modal.classList.remove("hide")
            fetch(`http://localhost:3000/api/teams/${this.id}`)
            .then(r => r.json())
            .then( (t) => {
                t.players.forEach(player => {
                    playerContent.innerHTML += `<div>
                        <h4>Name: ${player.first_name} ${player.last_name}</h4>
                        <h4>Shoots: ${player.handedness}</h4><br>
                        <button class= "Edit"> Edit Player </button>

                    </div>`
                    // playerContent.innerHTML += `Name:  Shoots:  Position: ${player.primary_position}` 
                })
            })
        })
        modalContent.append(playerContent)
    }


    renderTeam() {
        return (`<h3> ${this.name} </h3>
        <img class= "team-image" src= "${this.logo_img}" />`) 
    }
}