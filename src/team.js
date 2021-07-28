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
        teamDiv.addEventListener('click', () => {
            this.modal.classList.remove("hide")
            this.renderPlayers()
        })
    }

    renderPlayers() {
        const modalContent = this.modal.querySelector("#modal-content")
        fetch(`http://localhost:3000/api/teams/${this.id}`)
        .then(r => r.json())
        .then( (t) => {
            console.log(t.players)
            this.teamBanner.innerHTML = t.name 
            const playerContainer = document.createElement("div")
            playerContainer.classList.add("player")
            t.players.forEach(player => {
                const playerContent = document.createElement("h4")
                playerContent.innerHTML += `Name: ${player.first_name} ${player.last_name} | Number: ${player.jersey_number} | Position: ${player.primary_position} | Shoots: ${player.handedness} | Available to play?: ${!player["injured?"]}` 
                playerContainer.append(playerContent)
                this.addPlayerButton(player, playerContent, modalContent)
            })
            modalContent.innerHTML = ""
            modalContent.append(playerContainer)
        })
    }

    addPlayerButton(player, parent, modalContent) {
        const editPlayerButton = document.createElement("button")
        editPlayerButton.classList.add("edit")
        editPlayerButton.innerHTML = "Edit Player"
        parent.append(editPlayerButton)
        editPlayerButton.addEventListener('click', () => {
            this.renderEditForm(player, modalContent)
        })
    }

    renderEditForm(player, parent) {
        const newButton = document.createElement("button")
        newButton.innerHTML = "Submit"
        parent.innerHTML = ""
        parent.append(newButton)
        const editForm = document.createElement("form")
        editForm.innerHTML = ``
        editForm.append(newButton)
        parent.append(editForm)
        editForm.addEventListener('submit', (e) => {
            e.preventDefault()
            this.updatePlayer(e.target, player.id)
            // actually edit the player
        })
    }

    updatePlayer(form, id) {
        console.log(form, id)
        this.renderPlayers()
    } 

    renderTeam() {
        return (`<h3> ${this.name} </h3>
        <img class= "team-image" src= "${this.logo_img}" />`) 
    }

}