export default class Api {
  constructor(url,query) {
    this.url = url;
  }

  // Get data for the dropdown
  get(query) {
    
    let xhr = new XMLHttpRequest();
    this.query = query;

    let promise = new Promise((resolve, reject) => {
      xhr.open('GET', this.url + this.query);
      xhr.send();
      xhr.onload = function() {
        // analyze HTTP status of the response
        if (xhr.status != 200) { 
          reject(xhr.status); 
        } else { 
          resolve(xhr.response); 
        }
      };
      xhr.onerror = function() {
        console.log("Request failed");
      };
    });   

    return promise;
  }  
}
