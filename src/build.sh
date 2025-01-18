OUTPUT_FILE=../autocompleteCity.js

sed -e 's/export default/const autocompleteCityNames=/' geoNames.js > $OUTPUT_FILE
echo ';' >> $OUTPUT_FILE
uglifyjs --compress --mangle -- main.js >> $OUTPUT_FILE