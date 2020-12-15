//var corsAttr = new EnableCorsAttribute("*", "*", "*")
//config.EnableCors(corsAttr)

const app = document.getElementById('logoH')

const logo = document.createElement('img')
logo.src = 'bball64.png'

app.appendChild(logo)

const table = document.getElementById('standings')

var request = new XMLHttpRequest()

var east = true

showEastern(east)

var eastL = document.getElementById("east")
var westL = document.getElementById("west")

eastL.onclick = function() {
    showEastern(true)
}
westL.onclick = function() {
    showEastern(false)
}

function displayTable(teamsList) {
    teamsList.forEach(team => {
        const newRow = document.createElement('tr')
        newRow.className += "team"

        const standing = document.createElement('td')
        const standingText = document.createElement('h5')
        standingText.textContent = `${team.confRank}`

        const teamName = document.createElement('td')
        const teamNameText = document.createElement('h5')
        teamNameText.textContent = `${team.teamSitesOnly.teamTricode}`

        const record = document.createElement('td')
        const recordText = document.createElement('h5')
        recordText.textContent = `${team.win}-${team.loss}`

        const gamesBehind = document.createElement('td')
        const gamesBehindText = document.createElement('h5')
        gamesBehindText.textContent = `${team.gamesBehind}`

        const streak = document.createElement('td')
        const streakText = document.createElement('h5')
        if (team.isWinStreak) {
            streakText.textContent = `W${team.streak}`
        } else {
            streakText.textContent = `L${team.streak}`
        }

        table.append(newRow)
        newRow.append(standing)
        newRow.append(teamName)
        newRow.append(record)
        newRow.append(gamesBehind)
        newRow.append(streak)
        standing.append(standingText)
        teamName.append(teamNameText)
        record.append(recordText)
        gamesBehind.append(gamesBehindText)
        streak.append(streakText)
    });
}

function showEastern(x) {

    var numTeams = document.getElementsByClassName("team")
    console.log(numTeams)
    if (numTeams.length > 1) {
        var i
        for (i = 1; i <= 15; i++) {
            table.deleteRow(1);
        }
    }

    parseData(x)

}

function parseData(x) {
    console.log(x)  

    request.open('GET', 'http://data.nba.net/10s/prod/v1/current/standings_conference.json', true)

    request.onload = function () {
        var myData = JSON.parse(this.response)

        if (x) {
            var teamsList = myData.league.standard.conference.east
        } else {
            var teamsList = myData.league.standard.conference.west
        }

        if (request.status >= 200 && request.status < 400) {

            displayTable(teamsList)


            /*
            const date = document.createElement('h3')
            date.textContent = `Data last collected: ${niceDate}`

            const totalcases = document.createElement('h2')
            totalcases.textContent = `Total cases: ${myData[0].positive}`
            
            const totaldeaths = document.createElement('h2')
            totaldeaths.textContent = `Total deaths: ${myData[0].death}`
            
            const newcases = document.createElement('h2')
            newcases.textContent = `New cases: ${myData[0].positiveIncrease}`

            const newdeath = document.createElement('h2')
            newdeath.textContent = `New deaths: ${myData[0].deathIncrease}`

            const recovered = document.createElement('h2')
            recovered.textContent = `# of recovered: ${myData[0].recovered}`

            container.append(recovered)
            */

        } else {
            console.log('error')
        }
    }

    console.log('done')

    request.send()

}