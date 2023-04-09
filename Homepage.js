// Hàm lấy Element
function getElement(element) {
    return document.querySelector(element);
}

// Hàm hiển thị popup
function showPopup(button) {
    getElement(button).addEventListener('click', function () {
        getElement('.popup-form').style.display = "block";
    })
}

// Hàm đóng popup
function closePopup() {
    var popupElement = getElement('.popup-form');
    window.addEventListener('click', function (event) {
        if (event.target === popupElement) {
            popupElement.style.display = "none"
        }
    })
}

// Switch case xử lý các trạng thái của user
function handleUserState(userState) {
    switch (userState) {
        case 'play': {
            var element = getElement('.popup-form');
            element.id = 'popupFormPlay'
            // Render HTML
            element.innerHTML = `<form>
            <h2>Câu hỏi:</h2>
            <div class="questions-content">
                <button class="questions">Câu 1</button>
                <button class="questions">Câu 2</button>
                <button class="questions">Câu 3</button>
                <button class="questions">Câu 4</button>
                <button class="questions">Câu 5</button>
                <button class="questions">Câu 6</button>
                <button class="questions">Câu 7</button>
                <button class="questions">Câu 8</button>
                <button class="questions">Câu 9</button>
                <button class="questions">Câu 10</button>
            </div>
        </form>`
            // open & close Form
            showPopup('.play-button');
            closePopup();
            break;
        }

        case 'rules': {
            var element = getElement('.popup-form');
            element.id = 'popupFormRules'
            element.innerHTML = `<ul"><form><h2> Thể lệ</h2><li>Trò chơi nhóm (dơ tay để dành quyền trả lời)</li>
            <li>Mỗi nhóm sẽ chọn ngẫu nhiên 1 trong 10 câu hỏi</li>
            <li>Nhóm trả lời đúng sẽ dành được số điểm tương ứng</li>
            <li>Sau 10 câu hỏi, nhóm chiến thắng với số điểm cao nhất
                sẽ dành được một phần thưởng.</li></form>
        </ul>`
            showPopup('.rules-button');
            closePopup();
            break;
        }
        case 'members': {
            var element = getElement('.popup-form');
            element.id = 'popupFormMembers';
            element.innerHTML = `<ul><form><h2>Đội ngũ sáng tạo</h2>
            <li>Lê Minh Nghĩa - </li>
            <li>Trần Minh Quang - </li>
            <li>Nguyễn Vũ Thành Long - </li>
            <li>Trần Triệu Vĩ - </li>
            <li>Đỗ Việt Hùng - </li>
            </form><ul>`
            showPopup('.members-button');
            closePopup();
        }
    }
}

// Khởi tạo userState rỗng
var userState = '';

var buttonsElement = document.querySelectorAll('.rules-button, .play-button, .members-button');
for (var i = 0; i < buttonsElement.length; i++) {
    buttonsElement[i].addEventListener('click', function (event) {
        var buttonClicked = event.target; // lay phan tu button duoc click
        var buttonClass = buttonClicked.id; // lay id cua phan tu button duoc click
        console.log(buttonClass)
        if (buttonClass === 'rulesButton') {
            userState = 'rules';
        } else if (buttonClass === 'playButton') {
            userState = 'play';
        } else if (buttonClass === 'membersButton') {
            userState = 'members';
        }

        handleUserState(userState);
    })
}


