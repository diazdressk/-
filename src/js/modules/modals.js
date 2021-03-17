const modals = () => {//алгоритм открывания модальных окон
  function bindModal(triggerSelector, modalSelector, closeSelector) {
    const trigger = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      close = document.querySelector(closeSelector);
    
      trigger.forEach(item => {
        item.addEventListener('click', (e) => {
          if (e.target) {//выключаю действие по умолчанию //тк нажимать буду не только на кнопки,но и на ссылки и тд
            e.preventDefault();
          }
    
          modal.style.display = "block";
          document.body.style.overflow = "hidden";
          // document.body.classList.add('modal-open');
        });
      });

    close.addEventListener('click', () => {//крестик кнопка
      modal.style.display = "none";
      document.body.style.overflow = "";
      // document.body.classList.add('modal-open');
    });

    modal.addEventListener('click', (e) => {//закрытие при нажатии на любом месте
      if (e.target === modal) {//если нажимаю в любом месте помимо модального окна,оно закрывается
        modal.style.display = "none";
        document.body.style.overflow = "";
        // document.body.classList.add('modal-open');
      }
    });
    document.addEventListener('keydown', (e) => {//при нажатии на esc
      if (e.code === 'Escape') {
        modal.style.display = "none";
        document.body.style.overflow = "";
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

  bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
  bindModal('.phone_link', '.popup', '.popup .popup_close');
  // showModalByTime('.popup', 60000);//через 60 сек запускается модальное окно
};

export default modals;