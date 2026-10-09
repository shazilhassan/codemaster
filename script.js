
const lessons = {
  HTML: {
    title: "HTML Lesson 1: Headings",
    text: "HTML creates the structure of a website. Use heading tags to display titles.",
    code: "<h1>My First Website</h1>"
  },
  CSS: {
    title: "CSS Lesson 1: Colors",
    text: "CSS styles your website. You can change text colors, backgrounds and layouts.",
    code: "h1 {\n  color: blue;\n}"
  },
  JavaScript: {
    title: "JavaScript Lesson 1: Output",
    text: "JavaScript adds actions and interactivity to your website.",
    code: 'console.log("Hello, World!");'
  }
};

function startLesson(course) {
  const lesson = lessons[course];

  document.getElementById("lessonTitle").textContent = lesson.title;
  document.getElementById("lessonText").textContent = lesson.text;
  document.getElementById("lessonCode").textContent = lesson.code;

  document.getElementById("lesson").scrollIntoView({
    behavior: "smooth"
  });
}

const questions = [
  {
    question: "Which HTML tag creates a heading?",
    answers: ["<p>", "<h1>", "<img>", "<br>"],
    correct: 1
  },
  {
    question: "Which language styles a website?",
    answers: ["HTML", "CSS", "Python", "SQL"],
    correct: 1
  },
  {
    question: "Which language adds interactivity?",
    answers: ["CSS", "HTML", "JavaScript", "XML"],
    correct: 2
  },
  {
    question: "Which tag creates a paragraph in HTML?",
    answers: ["<p>", "<h1>", "<title>", "<link>"],
    correct: 0
  },
  {
    question: "Which symbol starts a JavaScript comment on one line?",
    answers: ["##", "<!--", "//", "**"],
    correct: 2
  }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

function showQuestion() {
  answered = false;

  const q = questions[currentQuestion];

  document.getElementById("questionCount").textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;

  document.getElementById("question").textContent = q.question;
  document.getElementById("feedback").textContent = "";
  document.getElementById("result").textContent = "";

  document.getElementById("nextBtn").hidden = true;
  document.getElementById("restartBtn").hidden = true;

  const answers = document.getElementById("answers");
  answers.replaceChildren();

  q.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.addEventListener("click", () => checkAnswer(index));
    answers.appendChild(button);
  });
}

function checkAnswer(index) {
  if (answered) return;

  answered = true;
  const q = questions[currentQuestion];
  const buttons = document.querySelectorAll("#answers button");

  buttons.forEach(button => {
    button.disabled = true;
  });

  if (index === q.correct) {
    score++;
    document.getElementById("feedback").textContent =
      "Correct! Great job 🎉";
  } else {
    document.getElementById("feedback").textContent =
      "Not quite! Correct answer: " + q.answers[q.correct];
  }

  if (currentQuestion < questions.length - 1) {
    document.getElementById("nextBtn").hidden = false;
  } else {
    document.getElementById("result").textContent =
      `Quiz completed! Your score: ${score}/${questions.length}`;
    document.getElementById("restartBtn").hidden = false;
  }
}

document.getElementById("nextBtn").addEventListener("click", () => {
  currentQuestion++;
  showQuestion();
});

document.getElementById("restartBtn").addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  showQuestion();
});

document.getElementById("themeBtn").addEventListener("click", () => {
  document.body.classList.toggle("light");

  const isLight = document.body.classList.contains("light");

  document.getElementById("themeBtn").textContent =
    isLight ? "🌞" : "🌙";
});

showQuestion();