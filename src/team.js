class Team {
    constructor({name, logo_img}, modal) {
        this.name = name
        this.logo_img = logo_img
        this.modal = modal
        Team.all.push(this)
    }
    static all = []

    addToDom() {
        const teamOnDom = document.querySelector('#team-container')
        const teamDiv = document.createElement("div")
        teamDiv.classList.add("team")
        teamDiv.innerHTML += this.renderTeam()
        teamOnDom.appendChild(teamDiv)
        teamDiv.addEventListener('click', () => {
            this.modal.classList.remove("hide")
        })
    }

    renderTeam() {
        return (`<h3> ${this.name} </h3>
        <img class= "team-image" src= "${this.logo_img}" />`) 
    }
}