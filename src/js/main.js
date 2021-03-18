import "./slider";
import modals from './modules/modals';
import tabs from './modules/tabs';
import forms from './modules/forms';
import changeModalState from './modules/changeModalState';


window.addEventListener('DOMContentLoaded', () => { //скрипты запускаются только после готовности ВDOM
  "use strict";

  let modalState = {};//объект,который будет заполняться данными

  changeModalState(modalState);
  modals();
  tabs('.glazing_slider', '.glazing_block', '.glazing_content', 'active');
  tabs('.decoration_slider', '.no_click', '.decoration_content > div > div', 'after_click');//строгое соответствие,чтоб был именно див, верстка такая
  tabs('.balcon_icons', '.balcon_icons_img', '.big_img > img', 'do_image_more', 'inline-block');//увеличение картинки окон при нажатии на маленькие эскизы
  forms(modalState);//в итоге на сервер отправит объект с данными пользователя, имя номер телефона и параметры окон,которые он выбрал {["user_name"]=>string3 "Adi" ["user_phone"]=>string5 "55554" ["form"]=>string3 "2" ["width"]=>string2 "78" ["height"]=>string3 "122" ["type"]=>string7 "plastic" ["profile"]=>string16 "Холодное"}
});