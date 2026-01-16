let questions = [
    {
        'question': "Was ist die Hauptstadt von Frankreich?",
        'answer_1': "Berlin",
        'answer_2': "Madrid",
        'answer_3': "Paris",
        'answer_4': "Rom",
        'right_answer': 'answer_3'
    },
    {
        'question': "Welcher Planet ist als der Rote Planet bekannt?",
        'answer_1': "Erde",
        'answer_2': "Mars",
        'answer_3': "Jupiter",
        'answer_4': "Saturn",
        'right_answer': 'answer_2'
    },
    {
        'question': "Was ist der größte Ozean der Erde?",
        'answer_1': "Atlantischer Ozean",
        'answer_2': "Indischer Ozean",
        'answer_3': "Arktischer Ozean",
        'answer_4': "Pazifischer Ozean",
        'right_answer': 'answer_4'
    },
    {
        'question': "Wer hat 'Romeo und Julia' geschrieben?",
        'answer_1': "Charles Dickens",
        'answer_2': "William Shakespeare",
        'answer_3': "Mark Twain",
        'answer_4': "Jane Austen",
        'right_answer': 'answer_2'
    },
    {
        'question': "Was ist die chemische Formel für Wasser?",
        'answer_1': "CO2",
        'answer_2': "H2O",
        'answer_3': "O2",
        'answer_4': "NaCl",
        'right_answer': 'answer_2'
    },
    {
        'question': "Welches Land hat die meisten Einwohner?",
        'answer_1': "Indien",
        'answer_2': "USA",
        'answer_3': "China",
        'answer_4': "Indonesien",
        'right_answer': 'answer_3'
    },
    {
        'question': "Wer malte die Mona Lisa?",
        'answer_1': "Vincent van Gogh",
        'answer_2': "Pablo Picasso",
        'answer_3': "Leonardo da Vinci",
        'answer_4': "Claude Monet",
        'right_answer': 'answer_3'
    },
    {
        'question': "Was ist die kleinste Einheit des Lebens?",
        'answer_1': "Atom",
        'answer_2': "Molekül",
        'answer_3': "Zelle",
        'answer_4': "Gewebe",
        'right_answer': 'answer_3'
    },
    {
        'question': "Welcher Kontinent ist der größte?",
        'answer_1': "Afrika",
        'answer_2': "Asien",
        'answer_3': "Europa",
        'answer_4': "Nordamerika",
        'right_answer': 'answer_2'
    },
    {
        'question': "Wie viele Planeten gibt es in unserem Sonnensystem?",
        'answer_1': "7",
        'answer_2': "8",
        'answer_3': "9",
        'answer_4': "10",
        'right_answer': 'answer_2'
    }
];
let currentQuestion = 0;
let correctAnswers = 0;
let rightAnswer = 0;

let AUDIO_SUCCESS = new Audio('sound/true.mp3');
let AUDIO_FAIL = new Audio('sound/false.mp3');

let AUDIO_GAME_OVER = new Audio('sound/game_over.mp3');
let AUDIO_YOU_WIN = new Audio('sound/you_win.mp3');

function init() {
    document.getElementById('all-question').innerHTML = questions.length;

    showQuestion();
}
function showQuestion() {
    if (currentQuestion >= questions.length) {
        showEndscreen();
        GameOverOrYouWin();
    } else {
        let question = questions[currentQuestion];

        document.getElementById('questionText').innerHTML = question['question'];
        document.getElementById('answer_1').innerHTML = question['answer_1'];
        document.getElementById('answer_2').innerHTML = question['answer_2'];
        document.getElementById('answer_3').innerHTML = question['answer_3'];
        document.getElementById('answer_4').innerHTML = question['answer_4'];
        document.getElementById('progress-bar').style.width = (currentQuestion + 1) / questions.length * 100 + '%';
    }
}
function showEndscreen() {
            document.getElementById('newContentCard').style.display = '';

            document.getElementById('Cardremove').style.display = 'none';
            document.getElementById('newContentCard').innerHTML = `<h2>Du hast <b id="rightAnswer"></b> Fragen von <b id="amount-answers"></b> richtig beantwortet</h2>
                      <button class="btn btn-primary" onclick="window.location.reload();">Quiz neu starten</button>`;
            document.getElementById('amount-answers').innerHTML = questions.length;
            document.getElementById('rightAnswer').innerHTML = rightAnswer;
            document.getElementById('imgAdd').src="image/the-end-3408301_640.jpg";
            document.getElementsByClassName('progress')[0].style.display = 'none';
}
function answer(selection) {

    let question = questions[currentQuestion];// Aktuelle Frage aus dem Fragen-Array holen

    let selectedQuestionsNumber = selection.slice(-1);// Letzte Zeichenkette holen (1,2,3,4)
    let selectedAnswerKey = 'answer_' + selectedQuestionsNumber;

    let IdOfRightAnswer = question['right_answer'];

    if (selectedAnswerKey === question['right_answer']) {
        document.getElementById(selection).parentNode.classList.add('bg-success');
        correctAnswers++;
        rightAnswer++;
        AUDIO_SUCCESS.play();
    }
    else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(IdOfRightAnswer).parentNode.classList.add('bg-success');
        AUDIO_FAIL.play();
    }
    document.getElementById('next-button').disabled = false;
}

function nextQuestion() {
    currentQuestion++;// Nächste Frage +1 (-- heißt -1)
    showQuestion();
    document.getElementById('next-button').disabled = true;
    // Hintergrundfarben entfernen
    let selectedQuestionsNumber = [1, 2, 3, 4];
    for (let i = 0; i < selectedQuestionsNumber.length; i++) {
        document.getElementById('answer_' + selectedQuestionsNumber[i]).parentNode.classList.remove('bg-danger');
        document.getElementById('answer_' + selectedQuestionsNumber[i]).parentNode.classList.remove('bg-success');
    }
    document.getElementById('current-question').innerHTML = currentQuestion + 1;
    if (currentQuestion == questions.length - 1) {
        document.getElementById('next-button').innerHTML = 'Beenden';
    }
}
function GameOverOrYouWin() {
    if (rightAnswer <= 5) {
        AUDIO_GAME_OVER.play();
    } else {
        AUDIO_YOU_WIN.play();
    }
}