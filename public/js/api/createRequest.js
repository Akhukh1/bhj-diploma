/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {

  if (options.method === 'GET') {

    let dataArr = Object.entries(options.data);

    console.log(dataArr);
    let dataStr = '';

    for (let i in dataArr) {
      let dataArrKey =dataArr[i];
      // if (i === 1) {
      //   dataStr = '&' + dataStr;
      // }
      dataStr = dataStr + dataArrKey[0] + '=' + dataArrKey[1];

    }

    if (dataArr.length >= 1){
      dataStr = '?' + dataStr;
    } else {
      dataStr = '/' + dataStr;
    }

    console.log(dataStr)

    const xhr = new XMLHttpRequest;

    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState === xhr.DONE) {
        let response = JSON.parse(xhr.responseText);
        options.callback(response.success, response); 
        console.log(response)
      }
    });

    console.log(options.method, options.url + dataStr);
    xhr.open(options.method, options.url + dataStr);

    // if (options.data.name) {
    //   console.log(options.method, options.url + '?' + 'name' + '=' + options.data.name + 'id' + '=' + options.data.id);
    //   xhr.open(options.method, options.url + '?' + 'name' + '=' + options.data.name + 'id' + '=' + options.data.id);
    //   // xhr.responseType = 'json';
    // // }
    // //  else if (options.data.user_id) {
    //   // xhr.open(options.method, '/transaction' + '?' + 'id' + '=' + options.data.id + 'user_id' + '=' + options.data.user_id);
    //   // xhr.open(options.method, '/transaction' + '?' + 'user_id' + '=' + options.data.user_id + 'id' + '=' + options.data.id);
    //   // xhr.open(options.method, '/transaction' + '/' + options.data.id);
    // } else {
    //   xhr.open(options.method, options.url + '/' + options.id);
    //   // xhr.responseType = 'json';
    // }

    xhr.send();

  } else {
    
    const xhr = new XMLHttpRequest;

    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState === xhr.DONE) {
        let response = JSON.parse(xhr.responseText);
        options.callback(response.success, response); 
        console.log(response)
      }
    });
  
    let formData = new FormData;

    // console.log('formData');
    // console.log(options.data);


    for (let key in options.data) {
      formData.append( key, options.data[key]);
    }

    console.log(options.method, options.url);
    xhr.open(options.method, options.url);
    xhr.send(formData);

  }


};



