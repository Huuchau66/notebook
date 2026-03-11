// Notes App
// Kỹ năng: localStorage
// Chức năng:
// Thêm ghi chú
// Xóa ghi chú
// Lưu ghi chú khi reload
// Nâng cao:
// Edit note
// Search note
// let title = ""; //luu tieu de vao datalist
// let note = ""; //luu noi dung vao datalist
let listNote = JSON.parse(localStorage.getItem("notes")) || [];
// JSON.stringify() dùng để chuyển array/object → string vì localStorage chỉ lưu string.
// //JSON.parse → chuyển string → object
// || [] → nếu localStorage chưa có dữ liệu thì tạo array rỗng

function UserInput() {
  const inputTitle = document.getElementById("myTitle").value;
  const inputNote = document.getElementById("myNote").value;
  //gan noi dung user nhap tu html vao bien

  if (inputTitle.trim() === "" || inputNote.trim() === "") {
    // một phương thức dùng để loại bỏ các khoảng trắng dư thừa ở cả hai đầu (đầu và cuối) của một chuỗi văn bản.

    alert("Vui lòng nhập đầy đủ tiêu đề và nội dung!");
    return; // neu khong nhap noi dung yeu cau user nhap noi dung
  } else {
    listNote.push({
      title: inputTitle,
      note: inputNote,
    }); // dua noi dung vao object
  }
  document.getElementById("myTitle").value = "";
  document.getElementById("myNote").value = ""; // tu dong xoa du lieu trong input
  localStorage.setItem("notes", JSON.stringify(listNote));
  //   Trong câu lệnh localStorage.setItem("notes", JSON.stringify(listNote));, "notes" đóng vai trò là tên định danh (Key) để lưu trữ dữ liệu vào bộ nhớ trình duyệt.
  UpdatePage();
} // moi lan click thi du lieu se duoc them vao object

function UpdatePage() {
  const noteShow = document.getElementById("note-show"); // ket noi id tu html vao bien noteShow
  let html = ""; // tao bien rong khong co noi dung
  for (let i = 0; i < listNote.length; i++) {
    html += `
        <div>
          <h3>Note ${i + 1}:${listNote[i].title}</h3>
          <p>${listNote[i].note}</p>
          <button onclick="deleteNote(${i})">Delete</button>
          <button onclick="editNote(${i})">Edit</button>
          <hr>
        </div>
       `; // vong lap chay qua tung phan tu trong object lay tittle roi den note va in ra man hinh html
  }
  noteShow.innerHTML = html;
  //   noteShow: Đây là một biến đại diện cho một phần tử (element) trong DOM (Document Object Model), thường được tìm thấy bằng các hàm như document.getElementById('...').
  // .innerHTML: Một thuộc tính của phần tử cho phép truy cập hoặc thay thế toàn bộ nội dung HTML bên trong phần tử đó.
  // = html: Gán giá trị của biến html (thường là một chuỗi chứa các thẻ HTML như <div>, <h1>, <p>) vào phần tử noteShow.
}

function resetNotes() {
  localStorage.removeItem("notes"); // xoa notes trong lacalStorage
  listNote = []; //dua listnote ve array rong
  UpdatePage(); // chay function update
} // xoa bo nho lacalStorage

function deleteNote(index) {
  // 1. Lấy danh sách ghi chú hiện tại từ mảng listNote
  // (Giả sử listNote là mảng chứa dữ liệu của bạn)
  listNote.splice(index, 1); // Xóa 1 phần tử tại vị trí index
  // 2. Lưu lại mảng đã xóa vào localStorage để không bị mất khi load lại trang
  localStorage.setItem("notes", JSON.stringify(listNote));
  // 3. Gọi lại hàm hiển thị (render) để cập nhật giao diện ngay lập tức
  UpdatePage();
}

function editNote(index) {
  document.getElementById("myTitle").value = listNote[index].title;
  document.getElementById("myNote").value = listNote[index].note;
  // ket noi tu html bang id vao bien cua js

  // gia tri bien sau khi duoc lay tu ket noi html se duoc gan vao vit tri index cua cua listnote trong key tuong ung
  listNote.splice(index, 1);
  //chinh sua phan tu tai vi tri index
  localStorage.setItem("notes", JSON.stringify(listNote));
  // goi lai ham render
  UpdatePage();
  // goi ham update
}
// function editbox() {
//   let edit = "";
//   edit += `
//   <div>
//       <p>Title:</p>
//       <input type="text" id="title-Edit" placeholder="Nhập tiêu đề..." />
//       <p>Note:</p>
//       <input type="text" id="note-Edit" placeholder="Nhập nội dung..." />
//   </div>`;
//   document.getElementById("container").innerHTML = edit;
// }
////////////login
function login() {
  const user = "Admin";
  const password = "123123";
  const userInput = document.getElementById("username").value;
  const passwordInput = document.getElementById("password").value;

  if (userInput === user && passwordInput === password) {
    localStorage.setItem("login", "true");
    window.location.href = "main.html";
  } else {
    alert("Sai tài khoản hoặc mật khẩu");
  }
}
function logout() {
  localStorage.removeItem("login");
  window.location.href = "login.html";
}
