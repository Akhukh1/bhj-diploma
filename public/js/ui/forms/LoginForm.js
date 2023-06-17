/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(data) {

    function callback (err, response) {

      if (response.success) {

        User.setCurrent(response.user);

        App.setState('user-logged');  
        const openWin = [...document.querySelectorAll('.modal')];

        for (let i in openWin) {
          if (openWin[i].style.display === 'block') {
            openWin[i].style.display = 'none';
            openWin[i].querySelector('.form').reset();
          }
        }

      } else {
        alert(response.error);
      }

    }

    User.login(data, callback);

  }
}