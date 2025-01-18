function autocompleteCity(input, dataList, onChange) {
  let dataListOptions

  input.addEventListener('keyup', (e) => {
    let enteredCity = e.target.value

    /* Ignoring the keyup event if the user has entered less than two
    characters or the entered characters are arrow keys, Enter or
    Escape. Those keys, when used to navigate the <datalist>, will make
    the <datalist> glitch if we don't return here. */
    if (
      enteredCity.length < 2 ||
      ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft', 'Enter', 'Escape'].includes(e.key))
    {
      return
    }

    dataListOptions = []
    // Ignoring everything after the first comma:
    enteredCity = enteredCity.trim().replace(/,.*/, '').toLowerCase()
    const options = []

    for (let city of autocompleteCityNames.cities) {
      if (city[0].toLowerCase().startsWith(enteredCity)) {
        let parts = [city[0]]

        /* If the city is in a region, we'll add it. Not every city in
        the data belongs to a region. */
        if (autocompleteCityNames.regions[city[2] + '.' + city[1]]) {
          parts.push(autocompleteCityNames.regions[city[2] + '.' + city[1]])
        }

        parts.push(autocompleteCityNames.countries[city[2]])

        city.longName = parts.join(', ')
        // Creating an <option> element for the <datalist>:
        options.push(new Option('', city.longName))
        dataListOptions.push(city)
      }
    }

    /* Replacing the old <option> elements in the <datalist> with the
    new ones: */
    dataList.replaceChildren(...options)
  })

  /* Since there are no events that can be attached to a <datalist>,
  the best way to detect when the user has selected a city is to use
  the "change" event on the <input> element: */
  input.addEventListener('change', (e) => {
    for (let option of dataListOptions) {
      if (e.target.value === option.longName) {
        // Running the user's callback function if supplied:
        if (onChange instanceof Function) {
          onChange({
            name: option[0],
            longName: option.longName,
            regionId: option[1],
            countryId: option[2],
            latitude: option[3],
            longitude: option[4]
          })
        }

        return
      }
    }

    /* In case the user has entered a few characters but NOT selected a
    city on the list, we'll reset the city: */
    e.target.value = ''
  })
}