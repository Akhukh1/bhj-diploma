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
    
    const btnPrimary = this.element.querySelector('.btn-primary');
    

    if (btnPrimary) {
      btnPrimary.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(this.element);
        this.submit();
        
        // console.log(this.element);
        // console.log(btnPrimary);
        
      });
    }


    // const form = this.element.querySelector('.form');
    // // console.log(form);
    // if (form) {
    //   // const input = form.querySelectorAll('.form-control');
    //   const input = [...form.querySelectorAll('.form-control')];
    //   for(let i in input) {
    //     input[i].addEventListener('input', () => {
    //       // e.preventDefault();
    //       console.log(input[i].value);
    //     });
    //   }

    // }

  }

  /**
   * Преобразует данные формы в объект вида
   * {
   *  'название поля формы 1': 'значение поля формы 1',
   *  'название поля формы 2': 'значение поля формы 2'
   * }
   * */
  getData() {
    console.log('привет');
    const form = this.element.querySelector('.form');
    // console.log(form);
    if (form) {

      const input = [...form.querySelectorAll('.form-control')];
      let data = {};

      for(let i in input) {
        data[input[i].name] = input[i].value;
      }

      // console.log(data);
      return data;

    }

    // return data;

  }

  onSubmit(options){

  }

  /**
   * Вызывает метод onSubmit и передаёт туда
   * данные, полученные из метода getData()
   * */
  submit() {
    let data = this.getData();
    // console.log(data);
    if (data.name) {
      console.log('регистрация');
      const register = new RegisterForm(this.element);
      register.onSubmit(data);
    } else {
      console.log('вход');
    }
  }
}