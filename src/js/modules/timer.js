// import { now } from "core-js/core/date";

const timer = (id, deadline) => {//где будет расположен и сколько будет длится
  const addZero = (num) => {//вставляет 0,если недвузначное время
    if (num <= 9) {
      return '0' + num;
    } else {
      return num;
    }
  };

  const getTimeRemaining = (endTime) => {
    const t = Date.parse(endTime) - Date.parse(new Date()),//разница между дедлайном и сейчас
          seconds = Math.floor((t/1000) % 60),//количество секунд
          minutes = Math.floor((t/1000/60) % 60),
          hours = Math.floor((t/(1000 * 60 * 60)) % 24),
          days = Math.floor((t/(1000 * 60 * 60 * 24)));

    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    }
  };

  const setClock = (selector, endTime) => {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateCLock, 1000);

    updateCLock();//чтобы дергания со временем не было,таймер после перезагрузки сразу работал

    function updateCLock() {//определяет сколько осталось до дедлайна
      const t = getTimeRemaining(endTime);

      days.textContent = addZero(t.days);//вывожу на экран
      hours.textContent = addZero(t.hours);
      minutes.textContent = addZero(t.minutes);
      seconds.textContent = addZero(t.seconds);

      if (t.total <= 0) {
        days.textContent = "00";
        hours.textContent = "00";
        minutes.textContent = "00";
        seconds.textContent = "00";

        clearInterval(timeInterval);
      }
    }
  };
  setClock(id, deadline);
  
};

export default timer;