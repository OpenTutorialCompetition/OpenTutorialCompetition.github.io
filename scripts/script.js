// quiz questions + options
const quizData = [
    {
        question: "你想補哪科？",
        options: ["中文科", "英文科","數學科/M1/M2","商科","理科","文科","不確定🧐"],
        score: [10,10,10,10,10,0,5],
        subject: ""
    },
    {
        question: "你平均每週花多長時間溫習學校教材？",
        options: ["0-60mins", "61-120 mins💪","121-180 mins🔥","181 mins or more"],
        score: [5,10,15,20]
    },
    {
        question: "你願意投入更多的時間溫習嗎？",
        options: ["Yes🤓", "No " + String.fromCodePoint(0x1F927)],
        score: [5,10] //stickman pop up for option 2
    },
    {
        // for recommendations
        question: "你認為你正就讀的日校提供足夠資源嗎？(e.g. 歷屆試題, 5**範本等)",
        options: ["足夠👍","還好 🙌","不足夠😵"],
        score: [5,10,20]
    },
    {
        // for recommendations?
        question: "你認為日校老師的教授方式/ 速度適合你嗎？",
        options: ["適合😝","還好","不適合🤬"],
        score: [5,10,20]
    },
    {
        // for recommendations
        question: "你希望補習的原因是什麼？",
        options: ["希望學到更多應試技巧🤩，追求更高、更穩定的成績","重溫／鞏固課業重點"],
        score: [5,40],
        reason: ""
    },
    {
        question: "你平均每週花多長時間於課外活動/校內外職務上？(補習班除外)",
        options: ["0-60mins🤥","61-120 mins🥵","121-180 mins","181 mins or more"],
        score: [5,10,15,20]
    },
    {
        question: "您是否經常發現自己因為在初次閱讀時沒有完全集中主意力而必須重新閱讀或複習材料？",
        options: ["Yes 🤕","No 😎"],
        score: [20,10]
    },
    {
        question: "在自發性方面，你有多願意上補習班？",
        options: ["非常不願意😑","不願意","是但la","願意", "非常願意🤓"],
        score: [0,5,15,25,30]
    },
    {
        question: "承上題，為什麼你(不)願意上補習班？",
        options: ["父母意願","大部分同學都有補習，不希望吃虧😩","我要發奮圖強！😤"],
        score: [0,10,20]
    },
    {
        question: "你家庭一個月的收入（大概）",
        options: ["$10000 或以下","$10001-30000","$30001-$50000","$50001-70000","$$70001 或以上"],
        score: [0,20,35,50,60]
    }
];

// html elements
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("answer-buttons");

// initial var 
let currentQuestion = 0;
let score = 0;
let subj = ""; // for recommendations 
let reason = ""; // for recommendations (q6)

// logic to show new question
function showQuestion() {
    // new question 
    const question = quizData[currentQuestion];
    questionElement.innerText = question.question;

    // clear old options
    optionsElement.innerHTML = "";

    // create new options
    question.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        optionsElement.appendChild(button);
        button.addEventListener("click", selectAnswer);
    });
}


// logic for scoring system
function selectAnswer(e) {
    const selectedButton = e.target;
    const scoreIndex = quizData[currentQuestion].options.indexOf(selectedButton.innerText);
    score += +quizData[currentQuestion].score[scoreIndex];
    
    currentQuestion++;

    if (currentQuestion < quizData.length){
        showQuestion();
    } else {
        showResult();
    }

}

// logic for showing result (e.g. score/recommendations (later))
function showResult(){
    const result = document.getElementById('score');
    const overallQuiz = document.getElementById('quiz');
    overallQuiz.innerHTML = '';
    if (score <= 154){
        result.innerText = `Tutorial might not be neccessary yet.`
    } else if (score <= 209){
        result.innerText = `補習可能對你有幫助, 我們建議你選擇連鎖式大型補習社! 
        ⚠️ 建議只供參考`
    } else if (score <= 239) {
        result.innerText = `補習可能對你有幫助, 我們建議你選擇中小型補習社! 
        ⚠️ 建議只供參考`
    } else if (score<=270){
        result.innerText = `補習可能對你有幫助, 我們建議你選擇私人補習! 
        ⚠️ 建議只供參考`
    }

}

showQuestion();