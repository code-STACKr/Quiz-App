
    const createSection = document.getElementById('create-section');
    const quizSection = document.getElementById('quiz-section');
    const resultSection = document.getElementById('result-section');
    const questionInput = document.getElementById('question-input');
    const opt1 = document.getElementById('opt1');
    const opt2 = document.getElementById('opt2');
    const opt3 = document.getElementById('opt3');
    const opt4 = document.getElementById('opt4');
    const correct = document.getElementById('correct');
    const addQuestionBtn = document.getElementById('add-question');
    const startQuizBtn = document.getElementById('start-quiz');
    const qCount = document.getElementById('q-count');

    const quizQuestion = document.getElementById('quiz-question');
    const answersEl = document.getElementById('answers');
    const nextBtn = document.getElementById('next-btn');
    const scoreText = document.getElementById('score-text');
    const restartBtn = document.getElementById('restart-btn');

    let questions = [];
    let current = 0;
    let score = 0;

    addQuestionBtn.onclick = () => {
      const q = questionInput.value.trim();
      const options = [opt1.value, opt2.value, opt3.value, opt4.value];
      const ans = parseInt(correct.value) - 1;

      if (!q || options.some(o => o.trim() === '') || isNaN(ans) || ans < 0 || ans > 3) {
        alert('Please fill all fields correctly!');
        return;
      }

      questions.push({ q, options, answer: ans });
      qCount.textContent = `Added Questions: ${questions.length}`;
      questionInput.value = opt1.value = opt2.value = opt3.value = opt4.value = correct.value = '';
    };

    startQuizBtn.onclick = () => {
      if (questions.length === 0) {
        alert('Please add at least one question!');
        return;
      }
      createSection.classList.add('hidden');
      quizSection.classList.remove('hidden');
      current = 0;
      score = 0;
      loadQuestion();
    };

    function loadQuestion() {
      const q = questions[current];
      quizQuestion.textContent = `${current + 1}. ${q.q}`;
      answersEl.innerHTML = '';
      q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'answer';
        btn.textContent = opt;
        btn.onclick = () => selectAnswer(i, btn);
        answersEl.appendChild(btn);
      });
      nextBtn.classList.add('hidden');
    }

    function selectAnswer(i, btn) {
      const q = questions[current];
      if (i === q.answer) {
        btn.classList.add('correct');
        score++;
      } else {
        btn.classList.add('wrong');
        answersEl.children[q.answer].classList.add('correct');
      }
      Array.from(answersEl.children).forEach(b => b.disabled = true);
      nextBtn.classList.remove('hidden');
    }

    nextBtn.onclick = () => {
      current++;
      if (current < questions.length) {
        loadQuestion();
      } else {
        showResult();
      }
    };

    function showResult() {
      quizSection.classList.add('hidden');
      resultSection.classList.remove('hidden');
      scoreText.textContent = `You answered ${score} out of ${questions.length} correctly! (${Math.round((score / questions.length) * 100)}%)`;
    }

    restartBtn.onclick = () => {
      resultSection.classList.add('hidden');
      createSection.classList.remove('hidden');
      questions = [];
      qCount.textContent = '';
    };