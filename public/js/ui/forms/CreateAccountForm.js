/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {

    function callback (err, response) {

      if (response.success) {

        console.log('response CreateAccountForm');
        console.log(response);

        const openWin = [...document.querySelectorAll('.modal')];
  
        for (let i in openWin) {
          if (openWin[i].style.display === 'block') {
            openWin[i].style.display = 'none';
            openWin[i].querySelector('.form').reset();
          }
        }
        App.update();
      

      } else {
        alert(response.error);
      }

    }

    console.log('data');
    console.log(data);


    Account.create(data, callback);

  }
}