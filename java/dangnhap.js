document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Ngừng hành động mặc định của form

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Kiểm tra điều kiện đăng nhập đơn giản
    if (username === 'admin' && password === '123') {
        alert('Đăng nhập thành công!');
        window.location.href = '/Trang/Trangdangnhap.html'; // Chuyển hướng đến trang "Trangdangnhap.html"
    } else {
        alert('Tên đăng nhập hoặc mật khẩu không chính xác.');
    }
});