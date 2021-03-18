const images = () => {
  const imgPopup = document.createElement('div'),//создаю одальное окно
        workSection = document.querySelector('.works'),
        bigImage = document.createElement('img');

  imgPopup.classList.add('popup');
  workSection.appendChild(imgPopup);

  imgPopup.style.justifyContent = 'center';//по середение при увеличении
  imgPopup.style.alignItems = 'center';
  imgPopup.style.display = 'none';

  imgPopup.appendChild(bigImage);

  workSection.addEventListener('click', (e) => {
    e.preventDefault();//тк ссылки,чтобы пе перешли по ним,отключаю
    let target = e.target;

    if (target && target.classList.contains('preview')); {//при нажатии на карипнку,открываю модальное окно,которое создал,в него помещу эту картинку
      imgPopup.style.display = 'flex';
      const path = target.parentNode.getAttribute('href');//получаю картинку...она через ссылку//большое изобр выше поэтому родитель
      bigImage.setAttribute('src', path);
    }

    if (target && target.matches('div.popup')) {//уменьшение при клике,скрываю модальное окно
      imgPopup.style.display = 'none';
    }
  });

};

export default images;