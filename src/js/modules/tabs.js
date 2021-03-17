const tabs = (headerSelector, tabSelector, contentSelector, activeClass) => {
  const header = document.querySelector(headerSelector),
    tab = document.querySelectorAll(tabSelector),
    content = document.querySelectorAll(contentSelector);

  function hideTabContent() {
    content.forEach(item => {
      item.style.display = 'none';
    });

    tab.forEach(item => {//у каждого таба убираю активКласс у ненужных табов
      item.classList.remove(activeClass);
    });
  }
  function showTabContent(i = 0) {
    content[i].style.display = 'block';
    tab[i].classList.add(activeClass);//добавляю активКласс
  }

  hideTabContent();//скрываю,чтобы изначально все было скрыто
  showTabContent();//оставляю только один таб,в нем по умолчанию оставляю первый таб

  //отслеживание нажатия на табы через делегирование
  header.addEventListener('click', (e) => {
    const target = e.target;
    if (target &&//кликабелен ли вообще
    (target.classList.contains(tabSelector.replace(/\./, ""))) ||//или таб или его родитель 
    (target.parentNode.classList.contains(tabSelector.replace(/\./, "")))) {
      //так как в селекторе класс с точкой,убираю точку с помощью регвыраж,тк classList видит классы и без точек
      tab.forEach((item, i) => {  //определяю на какой именно таб нажат по номеру индекса
        if (target == item || target.parentNode == item) {
          hideTabContent(); //скрываю все табы
          showTabContent(i);  //показываю только тот,который нужен          
        }
      });
    }
  });
};

export default tabs;