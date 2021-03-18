import "./slider";
import modals from './modules/modals';
import tabs from './modules/tabs';
import forms from './modules/forms';
import changeModalState from './modules/changeModalState';


window.addEventListener('DOMContentLoaded', () => { //скрипты запускаются только после готовности ВDOM
  "use strict";

  let modalState = {};

  changeModalState(modalState);
  modals();
  tabs('.glazing_slider', '.glazing_block', '.glazing_content', 'active');
  tabs('.decoration_slider', '.no_click', '.decoration_content > div > div', 'after_click');//строгое соответствие,чтоб был именно див, верстка такая
  tabs('.balcon_icons', '.balcon_icons_img', '.big_img > img', 'do_image_more', 'inline-block');//увеличение картинки окон при нажатии на маленькие эскизы
  forms();
});