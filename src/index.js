document.addEventListener('DOMContentLoadec', () => {
    getTeam()
})

function getTeam(){
    fetch('http://localhost:3000/api/teams')
    .then(r => r.json())
    .then(resp => {
        resp.forEach(team => {
            const t = new Team(team)
            t.addToDom()
        })
    })
}