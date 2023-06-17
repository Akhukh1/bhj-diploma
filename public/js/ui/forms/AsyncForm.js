/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */
class AsyncForm {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor(element) {
    if (!element) {
      throw new Error('Значение element не задано')
    }
    this.element = element;
    this.registerEvents();
  }

  /**
   * Необходимо запретить отправку формы и в момент отправки
   * вызывает метод submit()
   * */
  registerEvents() {
    
    // const btnPrimary = this.element.querySelector('.btn-primary');

    const formReg = this.element.querySelector('.form');

    if (formReg) {
      formReg.addEventListener('submit', (e) => {
        e.preventDefault();
        this.submit();     
      });
    }

  }

  /**
   * Преобразует данные формы в объект вида
   * {
   *  'название поля формы 1': 'значение поля формы 1',
   *  'название поля формы 2': 'значение поля формы 2'
   * }
   * */
  getData() {

    const formReg = this.element.querySelector('.form');
    let formData = new FormData(formReg);
    let entries = formData.entries();

    let data = {};
    for (let item of entries) {
       data[item[ 0 ]] = item[ 1 ];
    }

    return data;

  }

  onSubmit(options){

  }

  /**
   * Вызывает метод onSubmit и передаёт туда
   * данные, полученные из метода getData()
   * */
  submit() {

    let data = this.getData();

    if (this.element.id === 'modal-register') {
      const register = new RegisterForm(this.element);
      register.onSubmit(data);
    } else if (this.element.id === 'modal-login') {
      const logget = new LoginForm(this.element);
      logget.onSubmit(data);
    } else if (this.element.id === 'modal-new-account') {
      const newAccount = new CreateAccountForm(this.element);
      console.log('newAccount');
      console.log(data);
      newAccount.onSubmit(data);
    } else if (this.element.id === 'modal-new-income') {
      const newTransaction = new CreateTransactionForm(this.element);
      newTransaction.onSubmit(data);
    }
  }
}