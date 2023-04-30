/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {

  // JSON.stringify(options)

  if (options.method === 'POST') {

    const xhr = new XMLHttpRequest;

    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState === xhr.DONE) {
        console.log(xhr.responseText);
      }
    })
    
    formData = new FormData;
  
    formData.append( 'name', options.data.name );
    formData.append( 'mail', options.data.email );
    formData.append( 'password', options.data.password )

    xhr.open('POST', '');
    xhr.send(formData);
   

  }


  // options.data.name

};
