# autocompleteCity

### A faster alternative to Google Maps Place Autocomplete

This project takes a different approach to those input fields where you can enter your city/location and get it auto-completed: The city lookups are performed client-side, so no communication with a server is needed.

This presents both advantages and disadvantages compared to the "normal" way of doing it (using an API such as e.g. Google Maps Place Autocomplete). Let's hear the bad news first:

### Cons of using autocompleteCity instead of Google Maps Place Autocomplete:

- **No localization.** The city names are all in English, so for instance, if visitors to your website who live in the second-largest city in Switzerland input the name of their city, they'll have to write *Geneva* as opposed to *Genève* (French) or *Genf* (German).
- **Semi-large file:** The city data and the JS code combined are about 2.6 MB, although when sent over HTTP, your server will probably compress them down to about 1 MB. Not terrible per se size-wise, but also not perfect.
- **Only cities:** This project only allows you to autocomplete cities, not landmarks, restaurants, etc.
- **Only cities with at least 5,000 inhabitants are autocompleted.** If you want cities down to 1,000 inhabitants to be autocompleted (which will make the file size considerably bigger), check the FAQ.

### Pros of using autocompleteCity instead of Google Maps Place Autocomplete:

- **It's quick to install.** While the available APIs out there such as Place Autocomplete might be easy to use, you often spend time having to deal with map users, tokens, researching pricing and setting up billing. By contrast, autocompleteCity is install and go.
- **It's free.** The map APIs out there start charging you when your website becomes popular, and even if your website never reaches that level of visitors, you'll still often have to set up billing in advance.
- **It's fast.** Since everything happens client-side, no HTTP communcation with a server is needed, and the autocompletion input is not vulnerable to server issues such as downtime.
- **It's more stable in the long run:** Popular map services change their APIs relatively frequently which means you might be forced to update your autocompletion widget down the line. With autocompleteCity, everything will still work in 5-10 years.

## Demo

Simply download the files and open demo.html in a browser.

## Install

1. Upload the file autocompleteCity.js to your server.

1. Put the following into an HTML file:

```html
<input list="autocomplete-city-list" id="city" autocomplete="off">

<datalist id="autocomplete-city-list"></datalist>

<script src="autocompleteCity.js"></script>
<script>
  autocompleteCity(
    document.getElementById('city'),
    document.getElementById('autocomplete-city-list'),
    (city) => {
      console.log(city)
    }
  )
</script>
```
1. Make sure that ```<script src="..."``` isn't a 404.

1. **Only applicable if you've changed some of the code above:** Make sure that the value of ```<input list="..."``` matches the value of ```<datalist id="..."```, and make sure that the IDs in the JS (```document.getElementById('...')```) refer to the correct elements.

1. Change the line ```console.log(city)``` to whatever code you would like to run when the user has entered and selected a city. The ```city``` object in that line contains information about the selected city such as its location, region, etc. You could write some code that places that info in hidden input fields in your form, so that the info can be saved to your server when the user submits the form.