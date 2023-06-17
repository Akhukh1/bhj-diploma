/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    this.element = element;
    if (!this.element) {
      throw new Error('Значение element не задано');
    }
    this.registerEvents();
    this.update();
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {

    const createAccount = document.querySelector('.create-account');
    const choiceAccount = [...document.querySelectorAll('.account')];

    createAccount.addEventListener('click', () => {
      let modal = new Modal('modal-new-account');
      modal.open();
    });

    for (let i in choiceAccount) {
      choiceAccount[i].addEventListener('click', (e) => {
        e.preventDefault();

        let indexChoce = choiceAccount.findIndex((elementChoice) => elementChoice.classList.contains('active'));
        if (indexChoce >= 0) {
          choiceAccount[indexChoce].classList.remove('active');
        }

        this.onSelectAccount(choiceAccount[i]);
      });
    }

  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {

    function callback(err, response, url) {
      if (response.success) {
        App.widgets.accounts.renderItem(response.data);
      }
    }
    let data = User.current();
    if (data) {
      this.clear();
      Account.list(data, callback);
    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    const accountDel = [...document.querySelectorAll('.account')];
    for (let i in accountDel) {
      accountDel[i].remove();
    }
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {
    // const choiceAccount = [...document.querySelectorAll('.account')];
    // let indexChoce = choiceAccount.findIndex((elementChoice) => elementChoice.classList.contains('active'));
    // if (indexChoce >= 0) {
    //   console.log(choiceAccount[indexChoce])
    //   choiceAccount[indexChoce].classList.remove('active')
    // }
    element.classList.add('active');

    App.showPage( 'transactions', { account_id: element.dataset.id})
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item){

    let inElem = document.createElement('li');
    inElem.classList.add('account');
    inElem.dataset.id = item.id;
    inElem.innerHTML = '<a href="#">' + item.name + '</span> /<span>' + item.sum + ' ₽</span></a>';
    this.element.appendChild(inElem);

  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data){

    for (let i in data) {
      App.widgets.accounts.getAccountHTML(data[i]);
    }

    this.registerEvents();

  }
}
