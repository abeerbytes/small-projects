document.addEventListener('DOMContentLoaded', function() {
let quiz = [
    { q: "What year was JavaScript released?", a: ["1993", "1995", "1998", "2000"], c: 1 },
    { q: "Who created JavaScript?", a: ["Bill Gates", "Brendan Eich", "Mark Zuckerberg", "Elon Musk"], c: 1 },
    { q: "Correct keyword to declare variables?", a: ["var", "let", "const", "All"], c: 3 },
    { q: "Array index starts from?", a: ["1", "0", "-1", "Any"], c: 1 },
    { q: "What is console.log() used for?", a: ["Input", "Output", "Alert", "Loop"], c: 1 },
    { q: "What does === operator check?", a: ["Value", "Type", "Value + Type", "None"], c: 2 },
    { q: "Syntax for empty array?", a: ["{}", "()", "[]", "<>"], c: 2 },
    { q: "Keyword to create function?", a: ["func", "function", "method", "define"], c: 1 },
    { q: "Which loop is available in JS?", a: ["repeat", "for", "loop", "whilee"], c: 1 },
    { q: "What is full form of DOM?", a: ["Data Object Model", "Document Object Model", "Digital Object Model", "None"], c: 1 }
];


    let qIndex = 0;
    let score = 0;

    let questionEl = document.getElementById("question");
    let optionsEl = document.getElementById("options");
    let startBtn = document.getElementById("start");
    let nextBtn = document.getElementById("next");
    let restartBtn = document.getElementById("restart");
    let scoreEl = document.getElementById("score");
    let scoreTextEl = document.getElementById("scoreText");

    startBtn.addEventListener("click", startQuiz);
    nextBtn.addEventListener("click", nextQuestion);
    restartBtn.addEventListener("click", startQuiz);

    showStartScreen();

    function showStartScreen() {
        questionEl.textContent = "Ready to Test your JS knowledge?";
        optionsEl.innerHTML = "";
        startBtn.classList.remove("hidden");
        nextBtn.classList.add("hidden");
        restartBtn.classList.add("hidden");
        scoreEl.classList.add("hidden");
    }

    function startQuiz() {
        qIndex = 0;
        score = 0;
        scoreEl.classList.add("hidden");
        restartBtn.classList.add("hidden");
        startBtn.classList.add("hidden");
        showQuestion();
    }

    function showQuestion() {
        if (qIndex >= quiz.length) {
            showScore();
            return;
        }
        let q = quiz[qIndex];
        questionEl.textContent = `${qIndex + 1}. ${q.q}`;

        optionsEl.innerHTML = "";
        q.a.forEach((option, i) => {
            let button = document.createElement("button");
            button.className = 'w-full p-4 border-2 border-gray-200 rounded-xl text-left hover:bg-gray-50 transition-all hover:shadow-md font-medium cursor-pointer';
            button.textContent = option;
            button.onclick = () => selectAnswer(i === q.c, button);
            optionsEl.appendChild(button);
        });
        nextBtn.classList.add("hidden");
    }

    function selectAnswer(isCorrect, clickedBtn) {
        Array.from(optionsEl.children).forEach(btn => {
            btn.disabled = true;
            btn.style.cursor = 'not-allowed';
        });
        
        if (isCorrect) {
            clickedBtn.classList.add('bg-success', 'text-white', 'border-success', 'shadow-lg');
            score++;
        } else {
            clickedBtn.classList.add('bg-danger', 'text-white', 'border-danger', 'shadow-lg');
            Array.from(optionsEl.children).forEach(btn => {
                if (btn.textContent === quiz[qIndex].a[quiz[qIndex].c]) {
                    btn.classList.add('bg-success', 'text-white', 'border-success', 'shadow-lg');
                }
            });
        }
        nextBtn.classList.remove('hidden');
    }

    function nextQuestion() {
        qIndex++;
        showQuestion();
    }

    function showScore() {
        questionEl.textContent = '';
        optionsEl.innerHTML = '';
        nextBtn.classList.add('hidden');
        scoreTextEl.textContent = `🎉 ${score}/${quiz.length}`;
        scoreEl.classList.remove('hidden');
        restartBtn.classList.remove('hidden');
    }
});
