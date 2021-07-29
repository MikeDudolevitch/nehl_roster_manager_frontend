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
        newButton.classList.add("submit")
        parent.innerHTML = ""
        const editForm = document.createElement("form")
        editForm.innerHTML = `
            First Name: <input type= "text" class= "form-input" value= ${player.first_name}> <br>
            Last Name: <input type= "text" class= "form-input" value= ${player.last_name}><br>
            Number: <input type= "text" class= "form-input" value= ${player.jersey_number}><br>
            Position: <input type= "text" class= "form-input" value= ${player.primary_position}><br>
            Handedness: <input type= "text" class= "form-input" value= ${player.handedness}><br>
            Available for upcoming game: <input type= "text" class= "form-input" value= ${!player["injured?"]}><br><br>`
        editForm.append(newButton)
        parent.append(editForm)
        editForm.addEventListener('submit', (e) => {
            e.preventDefault()
            const form = e.target
            this.updatePlayer(form, player.id)
        })
    }

    updatePlayer(form, id) {
            fetch(`http://localhost:3000/api/teams/${this.id}/players/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "accept": "application/json"},
                body: JSON.stringify( 
                    {
                        first_name: form[0].value,
                        last_name: form[1].value,
                        jersey_number: form[2].value,
                        primary_position: form[3].value,
                        handedness: form[4].value,
                        injured: form[5].value
                    }
                )
            })
                .then(r => r.json())
                .then(data => this.renderPlayers(data))
    } 

    renderTeam() {
        return (`<h3> ${this.name} </h3>
        <img class= "team-image" src= "${this.logo_img}" />`) 
    }

}