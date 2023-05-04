'use strict'
const $ = document.querySelector.bind(document);

const playBtn = $('.playBtn');
const ruleBtn = $('.ruleBtn');
const memberBtn = $('.memberBtn');
const formElement = $('.form');
let isAnswerShown = false;




const app = {
    showForm() {
        formElement.classList.add('form-show')
    },
    closeForm() {
        window.onclick = (event) => {
            if (event.target === formElement) {
                formElement.classList.remove("form-show");
            }
        }
    },
    showAnswer(text) {
        if (!isAnswerShown) {
            isAnswerShown = true;
            const answerDiv = $('.answer');
            $('.translate').style.display = 'block'
            $('.btnTranslate').disabled = true;


            let index = 0;

            function printLetterByLetter() {
                answerDiv.innerHTML += text[index];
                if (text[index] === '\n') {
                    answerDiv.innerHTML += "<br>";
                }
                index++;
                if (index === text.length) {
                    clearInterval(timer);
                    isAnswerShown = false;
                }
            }

            const timer = setInterval(printLetterByLetter, 70);
        }
    },

    morseCode: {
        A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.", G: "--.", H: "....", I: "..",
        J: ".---", K: "-.-", L: ".-..", M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.",
        S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-", Y: "-.--", Z: "--..",
        0: "-----", 1: ".----", 2: "..---",
        3: "...--", 4: "....-", 5: ".....",
        6: "-....", 7: "--...", 8: "---..",
        9: "----.",
        " ": "/"
    },


    handleTranslator: () => {
        const plainText = $('#plain-text');
        const morseCode = $('#morse-code');

        plainText.addEventListener('input', () => {
            morseCode.value = app.toMorseCode(plainText.value)
        })
        morseCode.addEventListener('input', () => {
            plainText.value = app.fromMorseCode(morseCode.value)
        })
    },

    toMorseCode: (text) => {
        const upperCaseText = text.toUpperCase();
        // Split từng character trong string thành array
        // Dùng map để chuyển đổi từng character thành morse code
        return upperCaseText.split('').map((char) => {
            return app.morseCode[char] || '';
        }).join(' ');
    },
    fromMorseCode: (code) => {
        // Tạo object mới với key và value đảo ngược với object app.morseCode
        const reverseMorseCode = Object.entries(app.morseCode).reduce((acc, [key, value]) => {
            acc[value] = key;
            return acc;
        }, {});

        // Trả về string
        return code.split(' ').map((sequence) => {
            return reverseMorseCode[sequence] || '';
        }).join('');
    },

    questions: {
        question1: {
            star: 2,
            header: 'Câu 1:',
            content: `“ ... --- -. --. / -... .- - / -.. .- ..- / - ..- /\n
            --. .. --- / -... .- - / -.. .- ..- / - ..- / -.. .- ..- "`,
            answer: `"Sóng bắt đầu từ gió \nGió bắt đầu từ đâu"`

        },
        question2: {
            star: 4,
            header: 'Câu 2:',
            content: `" -.-- . ..- / -. .... .- ..- / -.-. .... .- -. --. / -. --. .- .. / .-.. .- -- / - .... .- -. /\n
            -- .- -.-- / ... --- -. --. / -.-. ..- -. --. / .-.. --- .. / -- .- -.-- / -. --. .- -. / -.-. ..- -. --. / --.- ..- .- "`,
            answer: `“Yêu nhau chẳng quản lầm than,
            Mấy sông cũng lội, mấy ngàn cũng qua.”
            `,
        },
        question3: {
            star: 2,
            header: 'Câu 3:',
            content: `“ . -- / -.-. ..- -. --. / -.- .... --- -. --. / -... .. . - / -. ..- .-  /\n
            -.- .... .. / -. .- --- / - .- / -.-- . ..- / -. .... .- ..- “
            `,
            answer: `“Em cũng không biết nữa
            khi nào ta yêu nhau”
            `,
        },
        question4: {
            star: 3,
            header: 'Câu 4:',
            content: `“ -.- .... .. / -.. --- .. / -.-. ..- -. --. / -.-. .... ..- -. --. / -- --- - / -.. .- /\n
            -.- .... .. / .-. . - / -.-. ..- -. --. / -.-. .... ..- -. --. / -- --- - / -.. --- -. --. ”
            `,
            answer: `"Khi đói cùng chung một dạ
            Khi rét cùng chung một dòng.”
            `,
        },
        question5: {
            star: 2,
            header: 'Câu 5:',
            answer: `“ Đầu lòng hai ả tố nga,Thúy Kiều là chị, em là Thúy Vân.”`,
            content: `“  -.. .- ..- / .-.. --- -. --. / .... .- .. / .- / - --- / -. --. .- /\n
            - .... ..- -.-- / -.- .. . ..- / .-.. .- / -.-. .... .. / . -- / .-.. .- / - .... ..- -.-- / ...- .- -. ”
            `
        },
        question6: {
            star: 3,
            header: 'Câu 6:',
            answer: `“Thân em vừa trắng lại vừa tròn
            Ba chìm bảy nổi với nước non “
            `,
            content: `“ - .... .- -. / . -- / ...- ..- .- / - .-. .- -. --. / .-.. .- .. / ...- ..- .- / - .-. --- -. /\n
            -... .- / -.-. .... .. -- / -... .- -.-- / -. --- .. / ...- --- .. / -. ..- --- -.-. / -. --- -. ”
            `
        },
        question7: {
            star: 3,
            header: 'Câu 7:',
            content: `“ --.- ..- . / .... ..- --- -. --. / .-.. .- / -.-. .... ..- -- / -.- .... . / -. --. --- - /\n
            -.-. .... --- / -.-. --- -. / - .-. . --- / .... .- .. / -- --- .. / -. --. .- -.-- “
            `,
            answer: `“ Quê hương là chùm khế ngọt
            Cho con trèo hái mỗi ngày “
            `
        },
        question8: {
            star: 4,
            header: 'Câu 8',
            content: `" -- ..- --- -. / .- -. / -.-. --- -- / - .-. .- -. --. / ...- --- .. / --. .. --- /
            .-.. .- .. / -.. .- -.-- / -- .- / -.. .- -.-- / -..- . / -... --- / ...- --- .. / .- -. .... "`,
            answer: `“Muốn ăn cơm trắng với giò, lại đây mà đẩy xe bò với anh”`
        },
        question9: {
            star: 1,
            header: 'Câu 9:',
            content: `“ -.-. ..- ..- / -- --- - / -- .- -. --. / -. --. ..- --- .. / .... --- -. / -..- .- -.-- / --... / - .... .- .--. / .--. .... ..- / -.. --- “
            `,
            answer: `“Cứu một mạng người hơn xây 7 tháp phù đồ.”
            `
        },
        question10: {
            star: 4,
            header: 'Câu 10:',
            content: `“  -.- .... --- -. / -. --. --- .- -. / -.. --- .. / -.. .- .--. / -. --. ..- --- .. / -. --. --- .- .. /\n
            --. .- / -.-. ..- -. --. / -- --- - / -- . / -.-. .... --- / .... --- .- .. / -.. .- / -. .... .- ..- “
            `,
            answer: `“Khôn ngoan đối đáp người ngoài
            Gà cùng một mẹ chớ hoài đá nhau.”
            `,
        },
    },

    render(content = '') {

        formElement.innerHTML = `
            ${content}
        `
        this.showForm();
        this.closeForm()


    },

    handleState(state = '') {
        switch (state) {
            case 'play':
                this.render(`
                <ul>
                <h2>Câu hỏi:</h2>
                    <div class="questions-content">
                    <button class='questions-button' type='button' onclick=app.handleState('question-1')>Câu 1</button>
                    <button class='questions-button' type='button' onclick=app.handleState('question-2')>Câu 2</button>
                    <button class='questions-button' type='button' onclick=app.handleState('question-3')>Câu 3</button>
                    <button class='questions-button' type='button' onclick=app.handleState('question-4')>Câu 4</button>
                    <button class='questions-button' type='button' onclick=app.handleState('question-5')>Câu 5</button>
                    <button class='questions-button' type='button' onclick=app.handleState('question-6')>Câu 6</button>
                    <button class='questions-button' type='button' onclick=app.handleState('question-7')>Câu 7</button>
                    <button class='questions-button' type='button' onclick=app.handleState('question-8')>Câu 8</button>
                    <button class='questions-button' type='button' onclick=app.handleState('question-9')>Câu 9</button>
                    <button class='questions-button' type='button' onclick=app.handleState('question-10')>Câu 10</button>
                    </div>
                </ul>
              `);
                break;
            case 'rule':
                this.render(`
                <ul>
                <h2>Thể lệ</h2>
                <li>Người chơi sẽ dịch đoạn mã morse bất kì thành một câu thơ, câu ca giao tục ngữ</li>
                <li>Người chơi sẽ giơ tay để dành quyền trả lời câu hỏi  hỏi</li>
                <li>Khi trả lời đúng người sẽ dành được những  phần quà tương ứng với số sao có trong câu hỏi đó</li>
                </ul>
                `)
                break;

            case 'translator':
                this.render(`
                <ul>
                <h2>Trình dịch mã morse</h2>
                <div class="wrapper">
                    <div class="left">
                        <label>Plain text</label>
                        <textarea id="plain-text" rows="10" cols="50"></textarea>
                    </div>
                    <div class="right">
                        <label>Morse code</label>
                        <textarea id="morse-code" rows="10" cols="50"></textarea>
                    </div>
                </div>
                
                </ul>
                `)
                this.handleTranslator();
                break;
            case 'member':
                this.render(`
                <ul style="align-items:center">
                    <h2>Thành viên nhóm 9:</h2>
                    <li>Nguyễn Vũ Thành Long - 1721030453</li>
                    <li>Đỗ Việt Hùng - 1721030493</li>
                    <li>Trần Minh Quang - 1721030398</li>
                    <li>Lê Minh Nghĩa - 1721031512</li>
                    <li>Trần Triệu Vĩ - 172100070</li>
                </ul>
                `);
                break;
            case 'question-1':
                this.render(`
                <ul>
                <div class='header'>
                    <i class="fa-solid fa-arrow-left" onclick=app.handleState('play') style="cursor:pointer"></i>
                    <h2>${this.questions.question1.header}</h2>
                    <i class="fa-solid fa-star">${this.questions.question1.star}</i>
                </div>
               
                <div class='content'>
                <p>
                ${this.questions.question1.content}
                </p>
                <button class='btnTranslate' onclick=app.showAnswer(app.questions.question1.answer) type='button'>Dịch mã</button>
                <div class='translate' style="display:none">
                <p class='answer'>

                </p>
                </div>
                </ul>
                `
                )
                break;
            case 'question-2':
                this.render(`
                <ul>
                <div class='header'>
                <i class="fa-solid fa-arrow-left" onclick=app.handleState('play') style="cursor:pointer"></i>
                <h2>${this.questions.question2.header}</h2>
                <i class="fa-solid fa-star">${this.questions.question2.star}</i>
                </div>
               
                <div class='content'>
                <p>
                ${this.questions.question2.content}
                </p>
                <button class='btnTranslate' onclick=app.showAnswer(app.questions.question2.answer) type='button'>Dịch mã</button>
                <div class='translate' style="display:none">
                <p class='answer'>

                </p>
                </div>
                </ul>
                `
                )
                break;
            case 'question-3':
                this.render(`
                <ul>
                <div class='header'>
                <i class="fa-solid fa-arrow-left" onclick=app.handleState('play') style="cursor:pointer"></i>
                <h2>${this.questions.question3.header}</h2>
                <i class="fa-solid fa-star">${this.questions.question3.star}</i>
                </div>
               
                <div class='content'>
                <p>
                ${this.questions.question3.content}
                </p>
                <button class='btnTranslate' onclick=app.showAnswer(app.questions.question3.answer) type='button'>Dịch mã</button>
                <div class='translate' style="display:none">
                <p class='answer'>

                </p>
                </div>
                </ul>
                `
                )
                break;
            case 'question-4':
                this.render(`
                <ul>
                <div class='header'>
                <i class="fa-solid fa-arrow-left" onclick=app.handleState('play') style="cursor:pointer"></i>
                <h2>${this.questions.question4.header}</h2>
                <i class="fa-solid fa-star">${this.questions.question4.star}</i>
                </div>
               
                <div class='content'>
                <p>
                ${this.questions.question4.content}
                </p>
                <button class='btnTranslate' onclick=app.showAnswer(app.questions.question4.answer) type='button'>Dịch mã</button>
                <div class='translate' style="display:none">
                <p class='answer'>

                </p>
                </div>
                </ul>
                `
                )
                break;
            case 'question-5':
                this.render(`
                <ul>
                <div class='header'>
                <i class="fa-solid fa-arrow-left" onclick=app.handleState('play') style="cursor:pointer"></i>
                <h2>${this.questions.question5.header}</h2>
                <i class="fa-solid fa-star">${this.questions.question5.star}</i>
                </div>
               
                <div class='content'>
                <p>
                ${this.questions.question5.content}
                </p>
                <button class='btnTranslate' onclick=app.showAnswer(app.questions.question5.answer) type='button'>Dịch mã</button>
                <div class='translate' style="display:none">
                <p class='answer'>

                </p>
                </div>
                </ul>
                `
                )
                break;
            case 'question-6':
                this.render(`
                <ul>
                <div class='header'>
                <i class="fa-solid fa-arrow-left" onclick=app.handleState('play') style="cursor:pointer"></i>
                <h2>${this.questions.question6.header}</h2>
                <i class="fa-solid fa-star">${this.questions.question6.star}</i>
                </div>
               
                <div class='content'>
                <p>
                ${this.questions.question6.content}
                </p>
                <button class='btnTranslate' onclick=app.showAnswer(app.questions.question6.answer) type='button'>Dịch mã</button>
                <div class='translate' style="display:none">
                <p class='answer'>

                </p>
                </div>
                </ul>
                `
                )
                break;
            case 'question-7':
                this.render(`
                <ul>
                <div class='header'>
                <i class="fa-solid fa-arrow-left" onclick=app.handleState('play') style="cursor:pointer"></i>
                <h2>${this.questions.question7.header}</h2>
                <i class="fa-solid fa-star">${this.questions.question7.star}</i>
                </div>
               
                <div class='content'>
                <p>
                ${this.questions.question7.content}
                </p>
                <button class='btnTranslate' onclick=app.showAnswer(app.questions.question7.answer) type='button'>Dịch mã</button>
                <div class='translate' style="display:none">
                <p class='answer'>

                </p>
                </div>
                </ul>
                `
                )
                break;
            case 'question-8':
                this.render(`
                <ul>
                <div class='header'>
                <i class="fa-solid fa-arrow-left" onclick=app.handleState('play') style="cursor:pointer"></i>
                <h2>${this.questions.question8.header}</h2>
                <i class="fa-solid fa-star">${this.questions.question8.star}</i>
                </div>
               
                <div class='content'>
                <p>
                ${this.questions.question8.content}
                </p>
                <button class='btnTranslate' onclick=app.showAnswer(app.questions.question8.answer) type='button'>Dịch mã</button>
                <div class='translate' style="display:none">
                <p class='answer'>

                </p>
                </div>
                </ul>
                `
                )
                break;
            case 'question-9':
                this.render(`
                <ul>
                <div class='header'>
                <i class="fa-solid fa-arrow-left" onclick=app.handleState('play') style="cursor:pointer"></i>
                <h2>${this.questions.question9.header}</h2>
                <i class="fa-solid fa-star">${this.questions.question9.star}</i>
                </div>
               
                <div class='content'>
                <p>
                ${this.questions.question9.content}
                </p>
                <button class='btnTranslate' onclick=app.showAnswer(app.questions.question9.answer) type='button'>Dịch mã</button>
                <div class='translate' style="display:none">
                <p class='answer'>

                </p>
                </div>
                </ul>
                `
                )
                break;
            case 'question-10':
                this.render(`
                <ul>
                <div class='header'>
                <i class="fa-solid fa-arrow-left" onclick=app.handleState('play') style="cursor:pointer"></i>
                <h2>${this.questions.question10.header}</h2>
                <i class="fa-solid fa-star">${this.questions.question10.star}</i>
                </div>
               
                <div class='content'>
                <p>
                ${this.questions.question10.content}
                </p>
                <button class='btnTranslate' onclick=app.showAnswer(app.questions.question10.answer) type='button'>Dịch mã</button>
                <div class='translate' style="display:none">
                <p class='answer'>

                </p>
                </div>
                </ul>
                `
                )
                break;
        }
    }
}