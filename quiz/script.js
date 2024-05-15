// Inital Data
let currentQuestion = 0;
let correctAnswers = 0;

showQuestion();

// Events
document.querySelector('.scoreArea button').addEventListener('click', resetEvent);


// Functions
function applyOptionStyles() {
    let optionDivs = document.querySelectorAll('.options');
    optionDivs.forEach(div => {
        div.style.display = 'block'; // Alterado de 'flex' para 'block'
        div.style.alignItems = 'center';
        div.style.height = '40px';
        div.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
        div.style.borderRadius = '10px';
        div.style.marginBottom = '5px';
        div.style.color = '#AAA';
        div.style.fontSize = '16px';
        div.style.cursor = 'pointer';
       
    });

    let optionSpans = document.querySelectorAll('.options span');
    optionSpans.forEach(span => {
        span.style.display = 'inline-flex'; // Alterado de 'flex' para 'inline-flex'
        span.style.justifyContent = 'center';
        span.style.alignItems = 'center';
        span.style.width = '30px';
        span.style.height = '30px';
        span.style.borderRadius = '15px';
        span.style.marginLeft = '5px';
        span.style.marginRight = '10px';
        span.style.marginTop = '5px';
        span.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        span.style.color = '#555';
    });
}

function showQuestion() {
    if (questions[currentQuestion]) {
        let q = questions[currentQuestion];

        let pct = Math.floor((currentQuestion / questions.length) * 100);
        document.querySelector('.progress--bar').style.width = `${pct}%`

        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';

        document.querySelector('.question').innerHTML = q.question;
        let optionsHtml = '';
        for (let i in q.options) {
            optionsHtml += `<div data-op="${i}" class="options"><span>${parseInt(i) + 1}</span> ${q.options[i]}</div>`;
        }
        document.querySelector('.options').innerHTML = optionsHtml; // Corrigido para .optionsArea

        document.querySelectorAll('.options').forEach(item =>{
            item.addEventListener('click', optionClickEvent);
        })

        // Aplicar estilos aos elementos criados dinamicamente
        applyOptionStyles();

    } else {
        finishQuiz();
    }
}

function optionClickEvent (e){
    let clickedOption = parseInt(e.target.getAttribute('data-op'));

    if(questions[currentQuestion].answer === clickedOption){
        correctAnswers++;
    } 
    
    currentQuestion++;
    showQuestion();
}

function finishQuiz (){
    let points =  Math.floor((correctAnswers / questions.length) * 100);

    if(points < 30){
        document.querySelector('.scoreText1').innerHTML = 'Tá ruim em?!';
        document.querySelector('.scorePct').style.color = '#FF0000';
    } else if (points >= 30 && points < 70){
        document.querySelector('.scoreText1').innerHTML = 'Muito Bom!';
        document.querySelector('.scorePct').style.color = '#FFFF00';
    } else if ( points >= 70 ){
        document.querySelector('.scoreText1').innerHTML = 'Parabéns!';
        document.querySelector('.scorePct').style.color = '#0D630D';
    }

    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML =`Você respondeu ${questions.length} questoões e acertou ${correctAnswers}.`;


    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = "100%";
}

function resetEvent () {
    correctAnswers = 0;
    currentQuestion = 0;
    showQuestion();
}