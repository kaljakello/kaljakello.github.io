const TIMEFORMAT = ['en-GB', {"timeStyle": "short"}]

const initButtons = (id) => {
    let element = document.getElementById(id)
    let btns = element.getElementsByTagName("button");
    selected = localStorage.getItem(id)
    if (selected) {
        let xpath = '//div[@id="' + id + '"]//button[text()="' + selected + '"]';
        let matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        matchingElement.className = "active";
    }
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

const getDeltas = (first, beers) => {
    deltas = [0, first, ];
    let next = first;
    for (let i = 2; i < beers; i++) {
        next = next * 2;
        deltas.push(next);
    }
    return deltas;
}

const getFirstDelta = (beers, partyDuration) => {
    let divider = 1
    for (let i = 0; i < beers; i++) {
        divider = divider * 2 + 1
    }
    return partyDuration / divider    
}

const getTimes = (beers, partyDuration, time) => {
    let firstDelta = getFirstDelta(beers, partyDuration)
    const deltas = getDeltas(firstDelta, beers);
    let times = [];
    deltas.forEach(delta => {
        time.setMinutes(time.getMinutes() + delta)
        times.push([delta, time.toLocaleTimeString(...TIMEFORMAT)])
    });
    return times
}

const start = (startTime) => {
    beers = localStorage.getItem("beers")
    hours = localStorage.getItem("hours")
    mins = localStorage.getItem("mins")

    if (beers === null || hours === null || mins === null)
        return

    let partyDuration = Number(mins) + (Number(hours) * 60)

    let ul = document.getElementById('results');
    while (ul.lastElementChild) {
        ul.removeChild(ul.lastElementChild);
    }

    if (startTime === null) {
        startTime = new Date();
        localStorage.setItem("time", startTime);
    }
    let li = document.createElement('li')
    getTimes(beers, partyDuration, startTime).forEach(element => {
        ul.appendChild(document.createElement('li')).innerText = element[1] + " (+" + Math.round(element[0]) + " min)";
    });
}

const clickStart = () => {
    start(null)
}

initButtons("hours")
initButtons("beers")
initButtons("mins")

document.getElementById("start").addEventListener("click", clickStart);
let startTime = new Date(localStorage.getItem("time"))
start(startTime)

document.body.addEventListener('touchstart', function( event ){
    if( this.scrollTop === 0 ) {
        this.scrollTop += 1;
    } else if( this.scrollTop + this.offsetHeight >= this.scrollHeight ) {
        this.scrollTop -= 1;
    }
});