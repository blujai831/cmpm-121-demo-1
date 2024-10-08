import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Not my amazing game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const theButton = document.createElement("button");
theButton.innerHTML = "&#x1F6B6;";
theButton.style.fontSize = '32pt';
app.append(theButton);