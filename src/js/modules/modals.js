const modals = () => {//алгоритм открывания модальных окон
  function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
    const trigger = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      close = document.querySelector(closeSelector),
      windows = document.querySelectorAll('[data-modal]'),//закрываю все модальные окна,создал датаАтрибут,чтобы пометить только их
      scroll = calcScroll();
    
      trigger.forEach(item => {
        item.addEventListener('click', (e) => {
          if (e.target) {//выключаю действие по умолчанию //тк нажимать буду не только на кнопки,но и на ссылки и тд
            e.preventDefault();
          }

          windows.forEach(item => {
            item.style.display = 'none';
          });
    
          modal.style.display = "block";
          document.body.style.overflow = "hidden";
          document.body.style.marginRight = `${scroll}px`;
          // document.body.classList.add('modal-open');
        });
      });

    close.addEventListener('click', () => {//крестик кнопка
      windows.forEach(item => {
        item.style.display = 'none';
      });

      modal.style.display = "none";
      document.body.style.overflow = "";
      // document.body.classList.add('modal-open');
    });

    modal.addEventListener('click', (e) => {//закрытие при нажатии на любом месте
      if (e.target === modal && closeClickOverlay) {//если нажимаю в любом месте помимо модального окна,оно закрывается
        windows.forEach(item => {
          item.style.display = 'none';
        });

        modal.style.display = "none";
        document.body.style.overflow = "";
        document.body.style.marginRight = `0px`;
        // document.body.classList.add('modal-open');
      }
    });
    document.addEventListener('keydown', (e) => {//при нажатии на esc
      if (e.code === 'Escape') {
        modal.style.display = "none";
        document.body.style.overflow = "";
        document.body.style.marginRight = `0px`;
        // document.body.classList.add('modal-open');
      }
    });
  }
  function showModalByTime(selector, time) {//через какое то время пребывания на сайте запускается модальное окно
    setTimeout(function() {
      document.querySelector(selector).style.display = 'block';
      document.body.style.overflow = "hidden";
    }, time);
  }

  function calcScroll() {//чтоб при открывании модального окна страница не дергалась,буду двигать её вправо
    let div = document.createElement('div');

    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';

    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;//от польной ширины отнимаю ширины страницы без прокрутки
    div.remove();

    return scrollWidth;
  }

  bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
  bindModal('.phone_link', '.popup', '.popup .popup_close');
  bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
  bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
  bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_close', false);
  // showModalByTime('.popup', 60000);//через 60 сек запускается модальное окно
};

export default modals;