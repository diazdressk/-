const modals = () => {//алгоритм открывания модальных окон
  function bindModal(trigger, modal, close) {
    trigger.addEventListener('click', (e) => {//тк нажимать буду не только на кнопки,но и на ссылки и тд
      if (e.target) {//выключаю действие по умолчанию
        e.preventDefault();
      }

      modal.style.display = "block";
      document.body.style.overflow = "hidden";
      // document.body.classList.add('modal-open');
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

  const callEngineerBtn = document.querySelector('.popup_engineer_btn'),
    modalEngineer = document.querySelector('.popup_engineer'),
    modalEngineerClose = document.querySelector('.popup_engineer .popup_close');

  
    bindModal(callEngineerBtn, modalEngineer, modalEngineerClose);
};

export default modals;