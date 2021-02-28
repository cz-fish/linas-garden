let areas = [];

let initHover = () => {
    console.log("initHover");
    let img = document.getElementById("img");
    img.onmousemove = mouseMove;
    img.onmousedown = mouseDown;
    fetch("areas.json")
    .then(response => response.json())
    .then(v => {areas = v.areas; console.log(JSON.stringify(areas));});
}

let currentMousePos = () => {
    const event = window.event;
    const img = document.getElementById("img");
    const x = event.clientX - img.offsetLeft;
    const y = event.clientY - img.offsetTop;
    const w = img.clientWidth;
    const h = img.clientHeight;

    const xp = x / w * 1000;
    const yp = y / h * 1000 * h / w;
    return {x: xp, y: yp};
}

let mouseMove = () => {
    const event = window.event;

    let coord = currentMousePos();

    let text = undefined;

    for (area of areas) {
        let d = Math.pow(area.center.x - coord.x, 2) + Math.pow(area.center.y - coord.y, 2);
        if (d <= Math.pow(area.radius, 2)) {
            text = area.title;
            break;
        }
    }

    const div = document.getElementById("hovertext");

    if (!text) {
        div.style.display = "none";
        return;
    }

    div.innerHTML = text;
    div.style.display = "block";
    div.style.position = "absolute";
    div.style.left = (event.clientX + 10) + "px";
    div.style.top = (event.clientY + 10) + "px";
}

let mouseDown = () => {
    /*
    let coord = currentMousePos();
    const coordDiv = document.getElementById("coords");
    coordDiv.innerText = `${coord.x}, ${coord.y}`;
    */
}

window.onload = initHover;
