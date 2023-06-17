/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    function callback(err, response) {

      function addOption (selectAccount) {
        let accounts = response.data;
        for (let i in accounts) {
          const option = document.createElement('option');
          option.value = accounts[i].id;
          option.text = accounts[i].name;
          selectAccount.add(option);
        }
        
      }

      // console.log(selectAccount);
      const selectAccountExpense = document.getElementById('expense-accounts-list');
      const selectAccountIncome = document.getElementById('income-accounts-list');

      addOption(selectAccountExpense);
      addOption(selectAccountIncome);
      
      
    }
    let data = User.current();
    Account.list(data, callback);

  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {

    console.log(data)

    // Transaction.create(data, callback);

    // const openWin = [...document.querySelectorAll('.modal')];
  
    // for (let i in openWin) {
    //   if (openWin[i].style.display === 'block') {
    //     openWin[i].style.display = 'none';
    //     openWin[i].querySelector('.form').reset();
    //   }
    // }

    // s

    
    function callback (err, response) {

      if (response.success) {

        console.log(response);

        const openWin = [...document.querySelectorAll('.modal')];
  
        for (let i in openWin) {
          if (openWin[i].style.display === 'block') {
            openWin[i].style.display = 'none';
            openWin[i].querySelector('.form').reset();
          }
        }
        // Transaction.create(data, callback, '/transaction');
        App.update();
      
      } else {
        alert(response.error);
      }

    }

    // Transaction.create(data, callback);
  }
}