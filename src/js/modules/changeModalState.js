import checkNumInputs from './checkNumInputs';

const changeModalState = (state) => {//заполняю modalState разными данными
  const windowForm = document.querySelectorAll('.balcon_icons_img'),
        windowWidth = document.querySelectorAll('#width'),//хотя тут всего лишь один элемент,чтобы не подправлять всю функцию
        windowHeight = document.querySelectorAll('#height'),
        windowType = document.querySelectorAll('#view-type'),
        windowProfile = document.querySelectorAll('.checkbox');

  checkNumInputs('#width');
  checkNumInputs('#height');

  function bindActionElems (event, elem, prop) {
    elem.forEach((item, i) => {
      item.addEventListener(event, () => {
        if (elem.length > 1) {
          state[prop] = i;//форма окна из первого модальногоОкна
        } else {
          state[prop] = item.value;
        }
        // console.log(state);
      });
    });
  }
  
  bindActionElems('click', windowForm, 'form');//будет выводить {form: 1}
  bindActionElems('input', windowHeight, 'height');//будет выводить {form: 1, height: "700"}
  bindActionElems('input', windowWidth, 'width');//будет выводить {form: 1, width: "500"}
  bindActionElems('change', windowType, 'type');
  bindActionElems('change', windowProfile, 'profile');
};

export default changeModalState;