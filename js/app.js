const initButtons = (id) => {
    let element = document.getElementById(id)
    let btns = element.getElementsByTagName("button");
    selected = localStorage.getItem(id)
    if (selected)
        btns[selected-2].className = "active";

    for (let i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function() {
        current = element.getElementsByClassName("active")[0];
        if (current)
            current.className = current.className.replace("active", "");
        this.className = "active";
        localStorage.setItem(id, this.innerText);

      });
    }
}

const getDelta = (beers, hours) => {
    return hours * 60 / beers
}

const getTimes = (beers, hours) => {
    const delta = getDelta(beers, hours)
    let times = []
    let now = new Date();
    for (let i = 1; i < beers; i++) {
        now.setMinutes(now.getMinutes() + delta * i)
        times.push(now.toLocaleTimeString('en-GB', {"timeStyle": "short"}))
    }
    return times
}

const start = () => {
    beers = localStorage.getItem("beers")
    hours = localStorage.getItem("hours")

    let ul = document.getElementById('results');
    while (ul.lastElementChild) {
        ul.removeChild(ul.lastElementChild);
    }
    
    let li = document.createElement('li')
    ul.appendChild(li).innerText = "Nyt! (" + new Date().toLocaleTimeString('en-GB') + ")";
    getTimes(beers, hours).forEach(element => {
        ul.appendChild(document.createElement('li')).innerText = element;
    });
}


initButtons("hours")
initButtons("beers")
document.getElementById("start").addEventListener("click", start);
