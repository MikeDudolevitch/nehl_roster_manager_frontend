class Team {
    constructor({name, logo_img}) {
        this.name = name
        this.logo_img = logo_img
        Team.all.push(this)
    }
    static all = []

    addToDom() {
        const teamOnDom = document.querySelector('#team-container')
        teamOnDom.innerHTML += this.renderTeam()
    }

    renderTeam() {
        return (`<h3> ${this.name} </h3>`)
    }
}