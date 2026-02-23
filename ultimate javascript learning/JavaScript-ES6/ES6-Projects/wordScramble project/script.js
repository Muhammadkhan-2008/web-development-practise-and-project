const words = [
   'javascript',
   `python`,
   `java`,
   `ruby`,
   `swift`,
   `kotlin`,
   `typescript`,
   `go`,
   `rust`,
   `php`,
   `csharp`,
   `scala`,
   `perl`,
   `haskell`,
   `lua`,
   `dart`,
   `elixir`,
   `clojure`,
   `fsharp`,
   `erlang`,
   `coding`,
   `programming`,
   `developer`,
   `algorithm`,
   `function`,
   `variable`,
   `object`,
   `array`,
   `string`,
   `number`,
   `boolean`,
   `loop`,
   `condition`,
   `class`,
   `inheritance`,
   `encapsulation`,
   `polymorphism`,
   `abstraction`,
   `interface`,
   `module`,
   `package`,
   `library`,
   `framework`   
];

const wordEl = document.getElementById("word");
const inputEl = document.getElementById("input");
const checkBtn = document.getElementById("check");
const nextBtn = document.getElementById("next");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const startGameBtn = document.getElementById("startGameBtn");
const welcomeScreen = document.getElementById("welcomeScreen");
const gameScreen = document.getElementById("gameScreen");

let currentWord = "";
let score = 0;

function scrambleWord(word) {
    let scrambled = word;

    // Keep shuffling until we get a different order.
    while (scrambled === word) {
        scrambled = word
            .split("")
            .sort(() => Math.random() - 0.5)
            .join("");
    }

    return scrambled;
}

function pickWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    currentWord = words[randomIndex];

    wordEl.textContent = scrambleWord(currentWord);
    inputEl.value = "";
    resultEl.textContent = "";
    resultEl.style.color = "#0f172a";
    inputEl.focus();
}

function checkGuess() {
    const guess = inputEl.value.trim().toLowerCase();

    if (!guess) {
        resultEl.textContent = "Type a word first.";
        resultEl.style.color = "#b45309";
        return;
    }

    if (guess === currentWord) {
        score += 1;
        scoreEl.textContent = score;
        resultEl.textContent = "Correct! Great job.";
        resultEl.style.color = "#166534";
        setTimeout(pickWord, 700);
        return;
    }

    resultEl.textContent = "Wrong guess. Try again.";
    resultEl.style.color = "#b91c1c";
}

if (checkBtn && nextBtn && inputEl && wordEl && resultEl && scoreEl) {
    checkBtn.addEventListener("click", checkGuess);
    nextBtn.addEventListener("click", pickWord);
    inputEl.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            checkGuess();
        }
    });
}

if (startGameBtn && welcomeScreen && gameScreen) {
    startGameBtn.addEventListener("click", () => {
        welcomeScreen.classList.add("hidden");
        gameScreen.classList.remove("hidden");
        pickWord();
    });
} else if (wordEl) {
    // Fallback for direct game-only page usage.
    pickWord();
}
