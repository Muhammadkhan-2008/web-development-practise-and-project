const output = document.getElementById("output");
const terminal = document.getElementById("terminal");

const logLines = [
  "Initializing secure bridge",
  "Validating encrypted handshake",
  "Connecting to relay node 17",
  "Bypassing firewall signature",
  "Extracting remote payload",
  "Compiling access map",
  "Escalating privilege token",
  "Access granted. Welcome, operator."
];

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomMs(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function appendLine() {
  const line = document.createElement("p");
  line.className = "line";
  output.appendChild(line);
  return line;
}

async function typeLine(text) {
  const line = appendLine();
  line.textContent = "> ";

  for (const char of text) {
    line.textContent += char;
    await wait(randomMs(18, 55));
  }

  terminal.scrollTop = terminal.scrollHeight;
}

async function fakeLoading(text) {
  const line = appendLine();
  line.textContent = `> ${text}`;

  const dots = randomMs(2, 5);
  for (let i = 0; i < dots; i += 1) {
    await wait(randomMs(180, 360));
    line.textContent += ".";
  }

  terminal.scrollTop = terminal.scrollHeight;
}

async function runTerminal() {
  for (let i = 0; i < logLines.length; i += 1) {
    if (i === logLines.length - 1) {
      await typeLine(logLines[i]);
    } else {
      await fakeLoading(logLines[i]);
      await wait(randomMs(250, 620));
    }
  }
}

runTerminal();
 