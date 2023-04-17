const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

function start() {
    var userState = '';
    homeBtnHandle();
    handleUserState(userState);
}
start();

// Hàm hiển thị popup
function showPopup(button) {

    $(button).onclick = () => {
        $('.popup-form').style.display = "block";
    }
}

// Hàm đóng popup
function closePopup() {
    var popupElement = $('.popup-form');
    window.onclick = (event) => {
        if (event.target === popupElement) {
            popupElement.style.display = "none";
        }
    }

}
// Show answer
function showAnswer() {
    let answer = $('.show-answer')
    answer.onclick = function () {
        $('.dap-an').style.display = 'block';
    }
}

// Khởi tạo userState rỗng
function homeBtnHandle() {
    var homeBtn = document.querySelectorAll('.rules-button, .play-button, .members-button');
    for (var i = 0; i < homeBtn.length; i++) {
        homeBtn[i].addEventListener('click', function () {
            // Thực hiện thay đổi giá trị của userState dựa trên lớp của phần tử được nhấn
            if (this.classList.contains('play-button')) {
                userState = "play";
            } else if (this.classList.contains('members-button')) {
                userState = "members";
            } else if (this.classList.contains('rules-button')) {
                userState = "rules";
            }
            handleUserState(userState);
        })
    }
}

// Biến lưu trữ câu hỏi
const questions = {
    question1: {
        star: 2,
        header: 'Câu 1:',
        content: `“ ... --- -. --. / -... .- - / -.. .- ..- / - ..-</br>
        --. .. --- / -... .- - / -.. .- ..- / - ..- / -.. .- ..- "`,
        answer: `“Sóng bắt đầu từ gió </br>
        Gió bắt đầu từ đâu”`,
    },
    question2: {
        star: 4,
        header: 'Câu 2:',
        content: `" -.-- . ..- / -. .... .- ..- / -.-. .... .- -. --. / -. --. .- .. / .-.. .- -- / - .... .- -.</br>
        -- .- -.-- / ... --- -. --. / -.-. ..- -. --. / .-.. --- .. / -- .- -.-- / -. --. .- -. / -.-. ..- -. --. / --.- ..- .- "`,
        answer: `“Yêu nhau chẳng quản lầm than,</br>
        Mấy sông cũng lội, mấy ngàn cũng qua.”
        `,
    },
    question3: {
        star: 2,
        header: 'Câu 3:',
        content: `“ . -- / -.-. ..- -. --. / -.- .... --- -. --. / -... .. . - / -. ..- .-</br>
        -.- .... .. / -. .- --- / - .- / -.-- . ..- / -. .... .- ..- “
        `,
        answer: `“Em cũng không biết nữa</br>
        khi nào ta yêu nhau”
        `,
    },
    question4: {
        star: 3,
        header: 'Câu 4:',
        content: `“-.- .... .. / -.. --- .. / -.-. ..- -. --. / -.-. .... ..- -. --. / -- --- - / -.. .-</br>
        -.- .... .. / .-. . - / -.-. ..- -. --. / -.-. .... ..- -. --. / -- --- - / -.. --- -. --.”
        `,
        answer: `"Khi đói cùng chung một dạ</br>
        Khi rét cùng chung một dòng.”
        `,
    },
    question5: {
        star: 2,
        header: 'Câu 5:',
        answer: `“ Đầu lòng hai ả tố nga,</br>Thúy Kiều là chị, em là Thúy Vân.”`,
        content: `“  -.. .- ..- / .-.. --- -. --. / .... .- .. / .- / - --- / -. --. .-</br>
        - .... ..- -.-- / -.- .. . ..- / .-.. .- / -.-. .... .. / . -- / .-.. .- / - .... ..- -.-- / ...- .- -.”
        `
    },
    question6: {
        star: 3,
        header: 'Câu 6:',
        answer: `“  Thân em vừa trắng lại vừa tròn</br>
        Ba chìm bảy nổi với nước non “
        `,
        content: `“- .... .- -. / . -- / ...- ..- .- / - .-. .- -. --. / .-.. .- .. / ...- ..- .- / - .-. --- -.</br>
        -... .- / -.-. .... .. -- / -... .- -.-- / -. --- .. / ...- --- .. / -. ..- --- -.-. / -. --- -.”
        `
    },
    question7: {
        star: 3,
        header: 'Câu 7:',
        content: `“--.- ..- . / .... ..- --- -. --. / .-.. .- / -.-. .... ..- -- / -.- .... . / -. --. --- -</br>
        -.-. .... --- / -.-. --- -. / - .-. . --- / .... .- .. / -- --- .. / -. --. .- -.—“
        `,
        answer: `“ Quê hương là chùm khế ngọt</br>
        Cho con trèo hái mỗi ngày “
        `
    },
    question8: {
        star: 4,
        header: 'Câu 8',
        content: `-- ..- --- -. / .- -. / -.-. --- -- / - .-. .- -. --. / ...- --- .. / --. .. --- /
        .-.. .- .. / -.. .- -.-- / -- .- / -.. .- -.-- / -..- . / -... --- / ...- --- .. / .- -. ....
        `,
        answer: `“Muốn ăn cơm trắng với giò, lại đây mà đẩy xe bò với anh”`
    },
    question9: {
        star: 1,
        header: 'Câu 9:',
        content: `“-.-. ..- ..- / -- --- - / -- .- -. --. / -. --. ..- --- .. / .... --- -. / -..- .- -.-- / --... / - .... .- .--. / .--. .... ..- / -.. ---“
        `,
        answer: `“Cứu một mạng người hơn xây 7 tháp phù đồ.”
        `
    },
    question10: {
        star: 4,
        header: 'Câu 10:',
        content: `“  -.- .... --- -. / -. --. --- .- -. / -.. --- .. / -.. .- .--. / -. --. ..- --- .. / -. --. --- .- ..</br>
        --. .- / -.-. ..- -. --. / -- --- - / -- . / -.-. .... --- / .... --- .- .. / -.. .- / -. .... .- ..- “
        `,
        answer: `“Khôn ngoan đối đáp người ngoài</br>
        Gà cùng một mẹ chớ hoài đá nhau.”
        `,
    },
}

// Switch case xử lý các trạng thái của user
function handleUserState(userState) {
    switch (userState) {
        case 'play': {
            var element = $('.popup-form');
            element.id = 'popupFormPlay';
            // Render HTML
            element.innerHTML = `
            <form>
                <h2>Câu hỏi:</h2>
                <div class="questions-content">
                    <button class='questions-button' type='button' onclick=handleUserState('question-1')>Câu 1</button>
                    <button class='questions-button' type='button' onclick=handleUserState('question-2')>Câu 2</button>
                    <button class='questions-button' type='button' onclick=handleUserState('question-3')>Câu 3</button>
                    <button class='questions-button' type='button' onclick=handleUserState('question-4')>Câu 4</button>
                    <button class='questions-button' type='button' onclick=handleUserState('question-5')>Câu 5</button>
                    <button class='questions-button' type='button' onclick=handleUserState('question-6')>Câu 6</button>
                    <button class='questions-button' type='button' onclick=handleUserState('question-7')>Câu 7</button>
                    <button class='questions-button' type='button' onclick=handleUserState('question-8')>Câu 8</button>
                    <button class='questions-button' type='button' onclick=handleUserState('question-9')>Câu 9</button>
                    <button class='questions-button' type='button' onclick=handleUserState('question-10')>Câu 10</button>
                </div>
            </form>`
            showPopup('.play-button');
            closePopup();
            break;
        }

        case 'rules': {
            var element = $('.popup-form');
            element.id = 'popupFormRules';

            element.innerHTML = `<form><ul>
            <h2>Thể lệ</h2>
            <li>Trò chơi giải mã Morse thành một ca dao / tục ngữ</li>
            <li>Mỗi cá nhân sẽ dơ tay dành quyền trả lời câu hỏi</li>
            <li>Cá nhân trả lời đúng sẽ nhận được một phần thưởng</li>
            </ul>
            </form>
        
        `
            showPopup('.rules-button');
            closePopup();
            break;
        }
        case 'members': {
            var element = $('.popup-form');
            element.id = 'popupFormMembers';
            element.innerHTML = `<form><ul>
            <h2>Nhóm 9</h2>
            <li>Nguyễn Vũ Thành Long - 1721030453</li>
            <li>Đỗ Việt Hùng - 1721030493</li>
            <li>Trần Minh Quang - 1721030398</li>
            <li>Lê Minh Nghĩa - 1721031512</li>
            <li>Trần Triệu Vĩ - 172100070</li>
            </ul>
            </form>`
            showPopup('.members-button');
            closePopup();
            break;
        }
        case 'question-1': {
            var formElement = document.querySelector('form')
            formElement.classList.add('popupFormQuestion')
            formElement.innerHTML = `<form>
            <div class='header'>
            <i class="fa-solid fa-arrow-left" onclick=handleUserState('play')></i>
            <i class="fa-solid fa-star">${questions.question1.star}</i>
            </div>
            <div class='question'>
            <h2>${questions.question1.header}</h2>
            </div>

            <div class='content'>
            <p>
            ${questions.question1.content}
            </p>
            <button class='show-answer' onclick=showAnswer() type='button'>Đáp án</button>
            <div class='dap-an'>
            <p>
            ${questions.question1.answer}
            </p>
            </div>
            </form>`
            break;
        }
        case 'question-2': {
            var formElement = document.querySelector('form')
            formElement.classList.add('popupFormQuestion')
            formElement.innerHTML = `<form>
            <div class='header'>
            <i class="fa-solid fa-arrow-left" onclick=handleUserState('play')></i>
            <i class="fa-solid fa-star">${questions.question2.star}</i>
            </div>
            <div class='question'>
            <h2>${questions.question2.header}</h2>
            </div>

            <div class='content'>
            <p>
            ${questions.question2.content}
            </p>
            <button class='show-answer' onclick=showAnswer() type='button'>Đáp án</button>
            <div class='dap-an'>
            <p>
            ${questions.question2.answer}
            </p>
            </div>
            </form>`
            break;
        }
        case 'question-3': {
            var formElement = document.querySelector('form')
            formElement.classList.add('popupFormQuestion')

            formElement.innerHTML = `<form>
            <div class='header'>
            <i class="fa-solid fa-arrow-left" onclick=handleUserState('play')></i>
            <i class="fa-solid fa-star">${questions.question3.star}</i>
            </div>
            <div class='question'>
            <h2>${questions.question3.header}</h2>
            </div>

            <div class='content'>
            <p>
            ${questions.question3.content}
            </p>
            <button class='show-answer' onclick=showAnswer() type='button'>Đáp án</button>
            <div class='dap-an'>
            <p>
            ${questions.question3.answer}
            </p>
            </div>
            </form>`
            break;
        }
        case 'question-4': {
            var formElement = document.querySelector('form')
            formElement.classList.add('popupFormQuestion')

            formElement.innerHTML = `<form>
            <div class='header'>
            <i class="fa-solid fa-arrow-left" onclick=handleUserState('play')></i>
            <i class="fa-solid fa-star">${questions.question4.star}</i>
            </div>
            <div class='question'>
            <h2>${questions.question4.header}</h2>
            </div>

            <div class='content'>
            <p>
            ${questions.question4.content}
            </p>
            <button class='show-answer' onclick=showAnswer() type='button'>Đáp án</button>
            <div class='dap-an'>
            <p>
            ${questions.question4.answer}
            </p>
            </div>
            </form>`
            break;
        }
        case 'question-5': {
            var formElement = document.querySelector('form')
            formElement.classList.add('popupFormQuestion')

            formElement.innerHTML = `<form>
            <div class='header'>
            <i class="fa-solid fa-arrow-left" onclick=handleUserState('play')></i>
            <i class="fa-solid fa-star">${questions.question5.star}</i>
            </div>
            <div class='question'>
            <h2>${questions.question5.header}</h2>
            </div>

            <div class='content'>
            <p>
            ${questions.question5.content}
            </p>
            <button class='show-answer' onclick=showAnswer() type='button'>Đáp án</button>
            <div class='dap-an'>
            <p>
            ${questions.question5.answer}
            </p>
            </div>
            </form>`
            break;
        }
        case 'question-6': {
            var formElement = document.querySelector('form')
            formElement.classList.add('popupFormQuestion')

            formElement.innerHTML = `<form>
            <div class='header'>
            <i class="fa-solid fa-arrow-left" onclick=handleUserState('play')></i>
            <i class="fa-solid fa-star">${questions.question6.star}</i>
            </div>
            <div class='question'>
            <h2>${questions.question6.header}</h2>
            </div>

            <div class='content'>
            <p>
            ${questions.question6.content}
            </p>
            <button class='show-answer' onclick=showAnswer() type='button'>Đáp án</button>
            <div class='dap-an'>
            <p>
            ${questions.question6.answer}
            </p>
            </div>
            </form>`
            break;
        }
        case 'question-7': {
            var formElement = document.querySelector('form')
            formElement.classList.add('popupFormQuestion')

            formElement.innerHTML = `<form>
            <div class='header'>
            <i class="fa-solid fa-arrow-left" onclick=handleUserState('play')></i>
            <i class="fa-solid fa-star">${questions.question7.star}</i>
            </div>
            <div class='question'>
            <h2>${questions.question7.header}</h2>
            </div>

            <div class='content'>
            <p>
            ${questions.question7.content}
            </p>
            <button class='show-answer' onclick=showAnswer() type='button'>Đáp án</button>
            <div class='dap-an'>
            <p>
            ${questions.question7.answer}
            </p>
            </div>
            </form>`
            break;
        }
        case 'question-8': {
            var formElement = document.querySelector('form')
            formElement.classList.add('popupFormQuestion')

            formElement.innerHTML = `<form>
            <div class='header'>
            <i class="fa-solid fa-arrow-left" onclick=handleUserState('play')></i>
            <i class="fa-solid fa-star">${questions.question8.star}</i>
            </div>
            <div class='question'>
            <h2>${questions.question8.header}</h2>
            </div>

            <div class='content'>
            <p>
            ${questions.question8.content}
            </p>
            <button class='show-answer' onclick=showAnswer() type='button'>Đáp án</button>
            <div class='dap-an'>
            <p>
            ${questions.question8.answer}
            </p>
            </div>
            </form>`
            break;
        }
        case 'question-9': {
            var formElement = document.querySelector('form')
            formElement.classList.add('popupFormQuestion')

            formElement.innerHTML = `<form>
            <div class='header'>
            <i class="fa-solid fa-arrow-left" onclick=handleUserState('play')></i>
            <i class="fa-solid fa-star">${questions.question9.star}</i>
            </div>
            <div class='question'>
            <h2>${questions.question9.header}</h2>
            </div>

            <div class='content'>
            <p>
            ${questions.question9.content}
            </p>
            <button class='show-answer' onclick=showAnswer() type='button'>Đáp án</button>
            <div class='dap-an'>
            <p>
            ${questions.question9.answer}
            </p>
            </div>
            </form>`
            break;
        }
        case 'question-10': {
            var formElement = document.querySelector('form')
            formElement.classList.add('popupFormQuestion')

            formElement.innerHTML = `<form>
            <div class='header'>
            <i class="fa-solid fa-arrow-left" onclick=handleUserState('play')></i>
            <i class="fa-solid fa-star">${questions.question10.star}</i>
            </div>
            <div class='question'>
            <h2>${questions.question10.header}</h2>
            </div>

            <div class='content'>
            <p>
            ${questions.question10.content}
            </p>
            <button class='show-answer' onclick=showAnswer() type='button'>Đáp án</button>
            <div class='dap-an'>
            <p>
            ${questions.question10.answer}
            </p>
            </div>
            </form>`
            break;
        }
    }
}




