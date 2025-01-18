function autocompleteCity(input, dataList, onChange) {
  let dataListOptions

  input.addEventListener('keyup', (e) => {
    let enteredCity = e.target.value

    if (
      enteredCity.length < 2 ||
      ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft', 'Enter', 'Escape'].includes(e.key))
    {
      return
    }

    dataListOptions = []
    enteredCity = enteredCity.trim().replace(/,.*/, '').toLowerCase()
    const options = []

    for (let city of autocompleteCityNames.cities) {
      if (city[0].toLowerCase().startsWith(enteredCity)) {
        let parts = [city[0]]

        if (autocompleteCityNames.regions[city[2] + '.' + city[1]]) {
          parts.push(autocompleteCityNames.regions[city[2] + '.' + city[1]])
        }

        parts.push(autocompleteCityNames.countries[city[2]])

        city.longName = parts.join(', ')
        options.push(new Option('', city.longName))
        dataListOptions.push(city)
      }
    }

    dataList.replaceChildren(...options)
  })

  input.addEventListener('change', (e) => {
    for (let option of dataListOptions) {
      if (e.target.value === option.longName) {
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