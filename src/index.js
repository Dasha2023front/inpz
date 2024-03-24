import "./styles/main.scss";

const btn = document.querySelector(".dropdown__button");
const dropdownList = document.querySelector(".dropdown__list");
const listItems = document.querySelectorAll(".dropdown__list-item");
const inputHidden = document.querySelector(".dropdown__input-hidden");
const phone = document.querySelector("#phone");
const inputItems = document.querySelectorAll("input");

btn.addEventListener("click", () => {
  dropdownList.classList.toggle("dropdown__list-visible");
  btn.classList.toggle("active");
});

// отправка формы

const submitBtn = document.querySelector(".submit__button");
const f = document.querySelector(".f__form");

f.addEventListener("submit", function (e) {
  e.preventDefault();
  const data = new FormData(this);
  const url = "https://jsonplaceholder.typicode.com/posts";
  fetch(url, {
    method: "post",
    headers: {
      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    body: data,
  })
    .then((response) => response.json())
    .then((json) => {
      if (json.id === 101) {
        submitBtn.innerText = "Отправлено";
        const val = phone.value;
        console.log(val);
        val.substr(1, val.length);
        inputItems.forEach((el) => {
          el.value = null;
        });
      }
      console.log(json);
    })
    .catch((err) => console.log(err));
});

// Выбор элементов списка, запоминание выбранного значения, закрытие списка

listItems.forEach((listItem) => {
  listItem.addEventListener("click", (e) => {
    e.stopPropagation();
    let target = e.target;
    document.querySelector(".dropdown__city").innerText = target.innerText;
    document.querySelector(".dropdown__button").focus();
    inputHidden.value = target.dataset.value;
    dropdownList.classList.remove("dropdown__list-visible");
    btn.classList.remove("dropdown__button-active");
  });
});

// Закрытие дропдауна по клику вне списка

document.addEventListener("click", (e) => {
  if (e.target !== btn) {
    dropdownList.classList.remove("dropdown__list-visible");
    btn.classList.remove("dropdown__button-active");
  }
});

// phone.addEventListener('keypress', e => {
//   // Отменяем ввод не цифр
//   if(!/\d/.test(e.key))
//     e.preventDefault();
// });

let maskOptions = {
  mask: "+7 (000) 000-00-00",
};
IMask(phone, maskOptions);
