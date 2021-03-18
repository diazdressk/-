const checkNumInputs = (selector) => {
  const numInputs = document.querySelectorAll(selector);
  numInputs.forEach(item => {//проверка, исправление вводимых в инпуты данных
    item.addEventListener('input', () => {
      item.value = item.value.replace(/\D/, "");//чтобы только цифры можно было
    });
  });
};

export default checkNumInputs;