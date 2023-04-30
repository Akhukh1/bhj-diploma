/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    // console.log(data);
    // const dataArr = Object.entries(data);
    // console.log(dataArr);

    User.register(data, (err, response) => {
    
    })

    this.element.style.display = 'none';
    
  }
}