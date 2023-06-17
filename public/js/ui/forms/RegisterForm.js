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
        
        App.widgets.user.update();

        // if (localStorage.getItem('id')) {

        //   App.setState('user-logged'); 
        //   const openWin = [...document.querySelectorAll('.modal')];
  
        //   for (let i in openWin) {
        //     if (openWin[i].style.display === 'block') {
        //       openWin[i].style.display = 'none';
        //       openWin[i].querySelector('.form').reset();
        //     }
        //   }
          
        //   App.widgets.user.update();
    
        // }

      } else {
        alert(response.error);
      }

    }

    User.register(data, callback);

  }
}