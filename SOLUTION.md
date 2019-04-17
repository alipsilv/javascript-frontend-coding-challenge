# Solution Docs

<!-- You can include documentation, additional setup instructions, notes etc. here -->

1) **Code organization**

    I extended Autocomplete with API functionalities (API.JS).
    - The API get method return a promisse.

2) **Refactors**

    I refactored the method "onQueryChange", to deal with the option of have or not an API url. 
    - If I have an API I make a request and parse the data in the new method "parseData".
    - If I don't have, I consider that the data comes from an array and keep going with "queryData", that contain the code from the old method "onQueryChange". 

3) **Enhancement** 

    I worked with a select instead of an ul, the dropdown supports by default  keyboard shortcuts to navigation.

4) I implemented event captors for keyup and click.

I spent the 4 hours working on the solution. 
If I had more time I would make improvements in the api.js and autocomplete.js to make those more generic, and I would apply bootstrap in the interface.
