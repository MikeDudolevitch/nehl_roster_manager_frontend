class Team {
    constructor({name, logo_img, id}, modal) {
        this.name = name
        this.logo_img = logo_img
        this.id = id
        this.modal = modal
        Team.all.push(this)
    }
    static all = []
    teamBanner = document.querySelector("#team-banner")

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
                this.teamBanner.innerHTML = t.name 
                t.players.forEach(player => {
                    playerContent.innerHTML += `<h4>Name: ${player.first_name} ${player.last_name} | Number: ${player.jersey_number} | Position: ${player.primary_position} | Shoots: ${player.handedness} | Available to play?: ${player.injured} <button class= "edit"> Edit Player </button></h4> ` 
                })
            })
            // if (modalContent.innerHTML === "")
                {modalContent.append(playerContent)}
        })
    }

    renderTeam() {
        return (`<h3> ${this.name} </h3>
        <img class= "team-image" src= "${this.logo_img}" />`) 
    }

}