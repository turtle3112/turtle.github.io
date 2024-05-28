
function signUp() {
    // var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var password1 = document.getElementById("password1").value;
  
    if (password.length < 8) {
        alert("Mật khẩu phải dài hơn 8 ký tự");
        return;
    }
  
    if (password !== password1) {
        alert("Mật khẩu nhập lại không khớp");
        return;
    }
  
    if (password.length === 8 || password === password1) {
        alert("Đăng ký thành công");
        window.location.href = "signin.html";
        
    }
  
    // // Tạo đối tượng JSON
    // var user = {
    //     username: username,
    //     password: password
    // };
  
    // // Lưu đối tượng JSON vào cơ sở dữ liệu hoặc gửi đi qua Ajax
    // console.log("Đăng ký thành công:", user);
  
    // Chuyển hướng về trang signin.html
    window.location.href = "signin.html";
  }

  function signUp() {
    // Lấy thông tin tài khoản từ các trường input
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
  
    // Lưu thông tin tài khoản vào local storage
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
  
    // Chuyển hướng đến trang signin.html
    alert("Đăng ký thành công!");

    window.location.href = "signin.html";
  }
  