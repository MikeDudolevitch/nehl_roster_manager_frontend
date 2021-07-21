const modal = document.getElementById("modal")
const closeModalBtn = document.getElementById("close-modal")
const modalContent = modal.querySelector("#modal-content")

document.addEventListener('DOMContentLoaded', () => {
    getTeam()
})

closeModalBtn.addEventListener('click', () => {
    modal.classList.add("hide")
    modalContent.innerHTML = ""
})



function getTeam(){
    fetch('http://localhost:3000/api/teams')
    .then(r => r.json())
    .then(resp => {
        resp.forEach(team => {
            const t = new Team(team, modal)
            t.addToDom()
        })
    })
}

