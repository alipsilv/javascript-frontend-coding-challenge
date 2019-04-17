import Autocomplete from './Autocomplete';
import usStates from './us-states';
import './main.css';


// US States
let data = usStates.map(state => ({
  text: state.name,
  value: state.abbreviation
}));

new Autocomplete(document.getElementById('state'), {
  data,
  onSelect: (stateCode) => {
    console.log('selected state:', stateCode);
  },
});

data = [];
const apiUrl = 'https://api.github.com/search/users'
let elem = document.getElementById('gh-user');
new Autocomplete(elem, {
  data,
  apiUrl,
  onSelect: (ghUserId) => {
    console.log('selected github user id:', ghUserId);
  },
});

//Event captors
let selects = document.getElementsByClassName("results");
for (let i=0;i<selects.length;i++){
  let select = selects[i];
  // I listen keyup
  select.addEventListener("keyup", function(event) {    
    let input = selects[i].previousSibling;
    // On Enter
    if (event.keyCode === 13) {
      // I change the search field value
      input.value = event.target.value
    }
  });
  
  //I listen clicks
  select.addEventListener("click", function(event) {
    let input = selects[i].previousSibling;
    // I change the search field value
    input.value = event.target.value
  });
}
