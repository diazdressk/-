import checkNumInputs from './checkNumInputs';

const forms = () => {//получаю данные с сайта,отправляю на сервер
  const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input');//получаю данные с инпутов форм

  checkNumInputs('input[name="user_phone"]');
  
  const message = {//создаю сообщения,которые будут выходить во время взаимодействия с сервером
    loading: 'Загрузка...',
    success: 'Спасибо, с Вами скоро свяжемся!',
    failure: 'Ошибка',
  };

  const postData = async (url, data) => {//асинхронная операция...отправка запроса
    document.querySelector('.status').textContent = message.loading;
    let res = await fetch(url, {//рес присвоится тольо после получается ответа от сервера
      method: "POST",
      body: data
    });

    return await res.text();//возвращает результат только после получения с свервера..текстовый файл
  };

  const clearInputs = () => {//функция очищения инпутов,после отправления на сервер
    inputs.forEach(item => {
      item.value = '';
    });
  };

  form.forEach(item => {//перебираю все формы
    item.addEventListener('submit', (e) => {//реагирую на submit
      e.preventDefault;//чтобы после отправки данных,страница не перезагружалась

      let statusMessage = document.createElement('div');//сообщение с оповещениями
      statusMessage.classList.add('status');
      item.appendChild(statusMessage);//показываю статус сообщения пользователю

      const formData = new FormData(item);//собираю все данные и отправляю на сервер в видео формы

      postData('assets/server.php', formData)//отправляю на сервер 
        .then(res => {
          console.log(res);
          statusMessage.textContent = message.success;
        })
        .catch(() => {
          statusMessage.textContent = message.failure;
        })
        .finally(() => {//оно выполнится в любом случае,даже если с ошибкой закончится
          clearInputs();//очищаю инпуты
          setTimeout(() => {
            statusMessage.remove();//удаляю объект статусМесс
          }, 5000);
        });


    });
  });
};

export default forms;