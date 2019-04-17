import API from './API';

export default class Autocomplete {
  constructor(rootEl, options = {}) {
    options = Object.assign({ numOfResults: 10, data: [] }, options);
    Object.assign(this, { rootEl, options });
    this.init();
  }

  //I check if I have an API to call...
  onQueryChange(query) {
    if(this.options.apiUrl){
      /*Request*/
      const api = new API(this.options.apiUrl);
      api.get('?q=' + query).then(
        (response)=>this.parseData(JSON.parse(response).items, query),
        (status)=>console.log(status)
      );
    }else{
      this.queryData (query);
    }  
  }

  //I parse data
  parseData (response, query) {
    this.options.data = response.map(item => ({
      text: item.login,
      value: item.id
    }));

    this.queryData (query);
  }

  //I'm the old onQueryChange
  queryData (query) {
    // Get data for the dropdown
    let results = this.getResults(query, this.options.data);
    results = results.slice(0, this.options.numOfResults);
    this.updateDropdown(results);
  }

  /**
   * Given an array and a query, return a filtered array based on the query.
   */
  getResults(query, data) {
    if (!query) return [];

    // Filter for matching strings
    let results = data.filter((item) => {
      return item.text.toLowerCase().includes(query.toLowerCase());
    });

    return results;
  }

  updateDropdown(results) {
    this.listEl.innerHTML = '';
    this.listEl.appendChild(this.createResultsEl(results));
  }

  createResultsEl(results) {
    const fragment = document.createDocumentFragment();
    results.forEach((result) => {
      const el = document.createElement('option');
      Object.assign(el, {
        className: 'result',
        textContent: result.text,
      });

      // Pass the value to the onSelect callback
      el.addEventListener('click', (event) => {
        const { onSelect } = this.options;
        if (typeof onSelect === 'function') onSelect(result.value);
      });

      fragment.appendChild(el);
    });
    return fragment;
  }

  createQueryInputEl() {
    const inputEl = document.createElement('input');
    Object.assign(inputEl, {
      type: 'search',
      name: 'query',
      autocomplete: 'off',
    });

    inputEl.addEventListener('input', event =>
      this.onQueryChange(event.target.value));

    return inputEl;
  }

  init() {
    // Build query input
    this.inputEl = this.createQueryInputEl();
    this.rootEl.appendChild(this.inputEl)

    // Build results dropdown
    this.listEl = document.createElement('select');
    this.listEl.multiple="multiple";
    Object.assign(this.listEl, { className: 'results' });
    this.rootEl.appendChild(this.listEl);
  }
}
