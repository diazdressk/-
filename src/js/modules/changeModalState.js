import checkNumInputs from './checkNumInputs';

const changeModalState = (state) => {//заполняю modalState разными данными
  const windowForm = document.querySelectorAll('.balcon_icons_img'),
        windowWidth = document.querySelectorAll('#width'),//хотя тут всего лишь один элемент,чтобы не подправлять всю функцию
        windowHeight = document.querySelectorAll('#height'),
        windowType = document.querySelectorAll('#view_type'),
        windowProfile = document.querySelectorAll('.checkbox');

  checkNumInputs('#width');
  checkNumInputs('#height');

  function bindActionElems (event, elem, prop) {
    elem.forEach((item, i) => {
      item.addEventListener(event, () => {
        switch(item.nodeName) {
          case 'SPAN' :
            state[prop] = i;
            // console.log('span');
            break;
          case 'INPUT' :
            if (item.getAttribute('type') === 'checkbox') {
              // console.log('checkbox');
              i === 0 ? state[prop] = "Холодное" : state[prop] = "Теплое";
              elem.forEach((box, j) => {//если выбираю одно,с другой галочка уберется
                box.checked = false;
                if (i == j) {
                  box.checked = true;
                }
              });
            } else {
              state[prop] = item.value;
              // console.log('input');
            }
            break;
          case 'SELECT' :
            state[prop] = item.value;
            // console.log('select');
            break;
        }
        console.log(state);//{ form: 0, width: "43", height: "65", type: "plastic", profile: "Теплое" }
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