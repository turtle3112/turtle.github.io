// Mảng chứa danh sách câu hỏi
let danhSachCauHoi = [];

// Hàm thêm câu hỏi
function addQuestion() {
  // Lấy giá trị từ các trường input
  let loaiCauHoi = document.getElementById("questionType").value;
  let cauHoi = document.getElementById("question").value;
  let dapAn = [];
  let inputDapAn = document.querySelectorAll("#questionForm input[id='answer']");
  for (let i = 0; i < inputDapAn.length; i++) {
    dapAn.push(inputDapAn[i].value);
  }
  let dapAnDung = document.getElementById("correctAnswer").value;

  // Tạo một đối tượng câu hỏi mới
  let cauHoiMoi = {
    STT: danhSachCauHoi.length + 1,
    ThoiGianGui: new Date().toLocaleString(),
    LoaiCauHoi: loaiCauHoi,
    CauHoi: cauHoi,
    DapAn: dapAn,
    DapAnDung: dapAnDung,
    TrangThai: "Chờ duyệt"
  };

  // Thêm câu hỏi vào danh sách
  danhSachCauHoi.push(cauHoiMoi);

  // Hiển thị danh sách câu hỏi
  displayQuestionList();
}

// Hàm hiển thị danh sách câu hỏi
function displayQuestionList() {
  let tableBody = document.getElementById("questionTableBody");
  tableBody.innerHTML = "";

  for (let i = 0; i < danhSachCauHoi.length; i++) {
    let cauHoi = danhSachCauHoi[i];

    let row = document.createElement("tr");
    let sttCell = document.createElement("td");
    sttCell.textContent = cauHoi.STT;
    row.appendChild(sttCell);

    let thoiGianCell = document.createElement("td");
    thoiGianCell.textContent = cauHoi.ThoiGianGui;
    row.appendChild(thoiGianCell);

    let cauHoiCell = document.createElement("td");
    cauHoiCell.textContent = cauHoi.CauHoi;
    row.appendChild(cauHoiCell);

    let dapAnCell = document.createElement("td");
    dapAnCell.textContent = cauHoi.DapAn.join(", ");
    row.appendChild(dapAnCell);

    let dapAnDungCell = document.createElement("td");
    dapAnDungCell.textContent = cauHoi.DapAnDung;
    row.appendChild(dapAnDungCell);

    let trangThaiCell = document.createElement("td");
    trangThaiCell.textContent = cauHoi.TrangThai;
    row.appendChild(trangThaiCell);

    let thaoTacCell = document.createElement("td");
    let suaButton = document.createElement("button");
    suaButton.textContent = "Sửa";
    suaButton.addEventListener("click", function() {
      editQuestion(i);
    });
    thaoTacCell.appendChild(suaButton);

    let xoaButton = document.createElement("button");
    xoaButton.textContent = "Xóa";
    xoaButton.addEventListener("click", function() {
      deleteQuestion(i);
    });
    thaoTacCell.appendChild(xoaButton);

    row.appendChild(thaoTacCell);

    tableBody.appendChild(row);
  }
}

// Hàm sửa câu hỏi
function editQuestion(index) {
  // Lấy câu hỏi từ danh sách
  let cauHoi = danhSachCauHoi[index];

  // Hiển thị thông tin câu hỏi trong form
  document.getElementById("questionType").value = cauHoi.LoaiCauHoi;
  document.getElementById("question").value = cauHoi.CauHoi;
  let inputDapAn = document.querySelectorAll("#questionForm input[id='answer']");
  for (let i = 0; i < inputDapAn.length; i++) {
    inputDapAn[i].value = cauHoi.DapAn[i];
  }
  document.getElementById("correctAnswer").value = cauHoi.DapAnDung;

  // Xóa câu hỏi từ danh sách
  danhSachCauHoi.splice(index, 1);

  // Hiển thị danh sách câu hỏi
  displayQuestionList();
}

// Hàm xóa câu hỏi
function deleteQuestion(index) {
  // Xóa câu hỏi từ danh sách
  danhSachCauHoi.splice(index, 1);

  // Hiển thị danh sách câu hỏi
  displayQuestionList();
}

// Gọi hàm hiển thị danh sách câu hỏi khi trang web được tải
displayQuestionList();



// Hàm để lưu thông tin câu hỏi vào localStorage
function saveQuestion() {
  // Lấy thông tin câu hỏi từ các trường input
  var questionType = document.getElementById("questionType").value;
  var question = document.getElementById("question").value;
  var answers = document.querySelectorAll("#answer");
  var correctAnswer = document.getElementById("correctAnswer").value;

  // Tạo đối tượng câu hỏi
  var questionObject = {
    questionType: questionType,
    question: question,
    answers: [],
    correctAnswer: correctAnswer
  };

  // Lưu các đáp án vào đối tượng câu hỏi
  answers.forEach(function(answer) {
    questionObject.answers.push(answer.value);
  });

  // Kiểm tra xem đã có danh sách câu hỏi trong local storage chưa
  var questionList = localStorage.getItem("questionList");
  if (questionList) {
    // Nếu đã có danh sách câu hỏi, thêm câu hỏi mới vào danh sách
    questionList = JSON.parse(questionList);
    questionList.push(questionObject);
  } else {
    // Nếu chưa có danh sách câu hỏi, tạo danh sách mới và thêm câu hỏi vào
    questionList = [questionObject];
  }

  // Lưu danh sách câu hỏi vào local storage
  localStorage.setItem("questionList", JSON.stringify(questionList));

  // Hiển thị thông báo thành công
  alert("Câu hỏi đã được lưu!");

  // // Chuyển hướng đến trang signin.html
  // window.location.href = "signin.html";
}



// Hiển thị câu hỏi từ local storage khi trang web được tải
function displaySavedQuestions() {
  var questionList = localStorage.getItem("questionList");
  if (questionList) {
    questionList = JSON.parse(questionList);
    var questionTableBody = document.getElementById("questionTableBody");

    // Xóa nội dung cũ trong bảng câu hỏi
    questionTableBody.innerHTML = "";

    // Hiển thị từng câu hỏi trong danh sách
    questionList.forEach(function(question, index) {
      var row = questionTableBody.insertRow();
      row.insertCell(0).textContent = index + 1; // STT
      row.insertCell(1).textContent = new Date().toLocaleString(); // Thời gian gửi
      row.insertCell(2).textContent = question.question; // Câu hỏi
      row.insertCell(3).textContent = question.answers.join(", "); // Đáp án
      row.insertCell(4).textContent = question.correctAnswer; // Đáp án đúng
      row.insertCell(5).textContent = "Chưa xử lý"; // Trạng thái
      row.insertCell(6).innerHTML = "<button onclick='processQuestion(" + index + ")'>Xử lý</button>"; // Thao tác
    });
  }
}

// Gọi hàm hiển thị câu hỏi khi trang web được tải
window.onload = displaySavedQuestions;
