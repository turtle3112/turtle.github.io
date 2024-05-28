function validateForm() {
  // Lấy thông tin tài khoản từ local storage
  var storedUsername = localStorage.getItem("username");
  var storedPassword = localStorage.getItem("password");

  // Lấy giá trị từ các trường input
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  // Kiểm tra thông tin tài khoản
  if (username === storedUsername && password === storedPassword) {
    // Thông báo đăng nhập thành công
    alert("Đăng nhập thành công!");

    // Chuyển hướng đến trang index.html
    window.location.href = "index.html";
  } else {
    // Thông báo không thành công và yêu cầu tạo tài khoản
    alert("Thông tin đăng nhập không chính xác. Vui lòng tạo tài khoản!");

    // Chuyển hướng đến trang signup.html
    window.location.href = "signup.html";
  }
}
