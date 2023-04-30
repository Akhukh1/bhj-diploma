/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {

    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const skinBlue = document.querySelector('.skin-blue');

    sidebarToggle.addEventListener('click', (e) => {
      e.preventDefault();
      if (skinBlue.classList.contains('sidebar-open')) {
        skinBlue.classList.remove('sidebar-open');
        skinBlue.classList.remove('sidebar-collapse');
      } else {
        skinBlue.classList.add('sidebar-open');
        skinBlue.classList.add('sidebar-collapse');
      }
    });

  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {

    const menuItem = [...document.querySelectorAll('.menu-item')];

    for (let i in menuItem) {
      
      menuItem[i].addEventListener('click', (e) => {
        e.preventDefault();
        if (menuItem[i].classList.contains('menu-item_login')) {
          let modal = new Modal('modal-login');
          modal.open();
        } else if (menuItem[i].classList.contains('menu-item_register')) {
          let modal = new Modal('modal-register');
          modal.open();
        } else {
  
        }
      });

    }


  }
}