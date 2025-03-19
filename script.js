const questions = [
    {
        question: "In what year was FC Barcelona founded?",
        options: ["1898", "1899", "1902", "1905"],
        correct: 1,
        badge: `<div class="badge">1</div>`
    },
    {
        question: "Who is Barcelona's all-time top goalscorer?",
        options: ["Lionel Messi", "Luis Suárez", "César Rodríguez", "László Kubala"],
        correct: 0,
        badge: `<div class="badge">2</div>`
    },
    {
        question: "How many Champions League titles has Barça won?",
        options: ["3", "5", "7", "9"],
        correct: 1,
        badge: `<div class="badge">3</div>`
    },
    {
        question: "Which player is known as 'The Phantom' in Barça history?",
        options: ["Johan Cruyff", "Paulino Alcántara", "Carles Puyol", "Ronaldinho"],
        correct: 1,
        badge: `<div class="badge">4</div>`
    },
    {
        question: "What's the capacity of Camp Nou stadium?",
        options: ["85,000", "99,354", "78,000", "120,000"],
        correct: 1,
        badge: `<div class="badge">5</div>`
    },
    {
        question: "Which manager introduced 'tiki-taka' football at Barça?",
        options: ["Pep Guardiola", "Johan Cruyff", "Frank Rijkaard", "Luis Enrique"],
        correct: 1,
        badge: `<div class="badge">6</div>`
    },
    {
        question: "In what year did Barça win their first European Cup?",
        options: ["1992", "1975", "2006", "1989"],
        correct: 0,
        badge: `<div class="badge">7</div>`
    },
    {
        question: "Who scored the winning goal in the 2009 UCL final?",
        options: ["Samuel Eto'o", "Thierry Henry", "Lionel Messi", "Andrés Iniesta"],
        correct: 2,
        badge: `<div class="badge">8</div>`
    },
    {
        question: "Which of these is NOT a Barça youth academy graduate?",
        options: ["Xavi Hernández", "Gerard Piqué", "Sergio Busquets", "Neymar Jr"],
        correct: 3,
        badge: `<div class="badge">9</div>`
    },
    {
        question: "What's the name of Barcelona's women's team?",
        options: ["FCB Femenino", "Barça Women", "FC Barcelona Femení", "Barcelona Ladies"],
        correct: 2,
        badge: `<div class="badge">10</div>`
    }
];

let currentQuestion = 0;
let score = 0;

function showQuestion() {
    const q = questions[currentQuestion];
    let html = `<h2>${q.question}</h2>`;
    
    q.options.forEach((option, index) => {
        html += `
            <div class="option" onclick="checkAnswer(${index})">
                ${q.badge}
                <span>${option}</span>
            </div>
        `;
    });
    
    document.getElementById('questionContainer').innerHTML = html;
    updateProgress();
}

function checkAnswer(selected) {
    const options = document.querySelectorAll('.option');
    const correctIndex = questions[currentQuestion].correct;

    options.forEach((option, index) => {
        option.classList.remove('correct', 'wrong');
        if(index === correctIndex) {
            option.classList.add('correct');
        } else if(index === selected) {
            option.classList.add('wrong');
        }
        option.style.pointerEvents = 'none';
    });

    if(selected === correctIndex) score++;
    
    setTimeout(() => {
        currentQuestion++;
        if(currentQuestion < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }, 1500);
}

function updateProgress() {
    const progress = (currentQuestion / questions.length) * 100;
    document.querySelector('.progress').style.width = `${progress}%`;
}

function showResult() {
    const resultText = score >= 8 ? 
        "🔵🔴 Barça Legend! You know your stuff!" : 
        score >= 5 ? 
        "🔵⚪ Good effort! Keep learning!" : 
        "💡 Almost there! Time to rewatch those classic matches!";
    
    document.getElementById('result').innerHTML = `
        <h2>Your Score: ${score}/${questions.length}</h2>
        <p>${resultText}</p>
        <button onclick="location.reload()" 
                style="background: var(--barca-red); color: white; padding: 12px 30px; border: none; border-radius: 25px; margin-top: 1rem;">
            Try Again
        </button>
    `;
    document.getElementById('result').style.display = 'block';
}

// Initialize quiz
showQuestion();
