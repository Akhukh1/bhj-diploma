/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    this.element = element;
    if (!this.element) {
      throw new Error('Значение element не задано')
    }
    this.registerEvents();
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    const btn = [...document.querySelectorAll('.btn')];
    for (let i in btn) {
      btn[i].addEventListener('click', (e) => {
        if (btn[i].classList.contains('create-income-button')) {
          console.log('Доход');
          let modal = new Modal('modal-new-income');
          modal.open();
        } else if (btn[i].classList.contains('create-expense-button')) {
          let modal = new Modal('modal-new-expense');
          modal.open();
          console.log('Расход');
        }
      });
    }
  }
}
