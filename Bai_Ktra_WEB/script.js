// ==========================
// LẤY CÁC PHẦN TỬ HTML
// ==========================

const taskInput = document.querySelector("input");

const addButton = document.querySelector(".submit-btn");

const taskContainer = document.querySelector(".container");

const priorityButtons = document.querySelectorAll(".priority-buttons button");

// Priority mặc định
let selectedPriority = "Low";

// ==========================
// Chọn độ ưu tiên (PRIORITY)
// ==========================

priorityButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedPriority = button.textContent.trim();
    //textContent: Lấy nội dung văn bản của nút, trim() loại bỏ khoảng trắng thừa

    priorityButtons.forEach((btn) => {
      btn.style.opacity = "0.6";
    });

    button.style.opacity = "1";
  });
});

// Mặc định nút Low sáng hơn
document.querySelector(".btn-low").style.opacity = "1";

// ==========================
// Kiểm tra dữ liệu đầu vào
// ==========================

function validateTask(taskName) {
  if (taskName.trim() === "") {
    alert("Tên Task không được để trống!");

    return false;
  }

  if (taskName.length > 100) {
    alert("Tên Task không được vượt quá 100 ký tự!");

    return false;
  }

  return true;
}

// ==========================
// THÊM TASK
// ==========================

function addTask() {
  const taskName = taskInput.value.trim(); //Lấy từ ô input và chạy hàm

  if (!validateTask(taskName)) {
    return;
  }

  let priorityClass = "";

  if (selectedPriority === "High") {
    //selectedPriority chuyển thành class CSS tương ứng
    priorityClass = "high";
  }

  if (selectedPriority === "Medium") {
    priorityClass = "medium";
  }

  if (selectedPriority === "Low") {
    priorityClass = "low";
  }

  const newTask = document.createElement("div");

  newTask.classList.add("task-card");

  newTask.innerHTML = `
    

      <div class="task-title">
        <small>Task</small>
        <h3>${taskName}</h3>
      </div>

      <div class="priority">
        <small>Priority</small>
        <p class="${priorityClass}">
          ${selectedPriority}
        </p>
      </div>

      <div class="status">
        To Do
      </div>

    </div>

    <div class="actions">

      <div class="circle"></div>

      <i class="fa-regular fa-pen-to-square edit"></i>

      <i class="fa-regular fa-trash-can delete"></i>

    </div>
  `;

  document.querySelector(".container").appendChild(newTask); //appendChild: đẩy task vào cuối container

  taskInput.value = ""; //Xóa nội dung trong ô input sau khi thêm task

  attachDeleteEvents();
}

// ==========================
// XÓA TASK
// ==========================

function attachDeleteEvents() {
  const deleteButtons = document.querySelectorAll(".delete");

  deleteButtons.forEach((button) => {
    button.onclick = function () {
      const card = this.closest(".task-card"); //Tìm thẻ .task-card gần nhất chứa nút xóa này

      card.remove(); //Xóa thẻ card đó khỏi giao diện
    };
  });
}

// ==========================
// NÚT ADD
// ==========================

addButton.addEventListener("click", addTask);

// ==========================
// GÁN SỰ KIỆN XÓA CHO
// 3 TASK CÓ SẴN
// ==========================

attachDeleteEvents();
