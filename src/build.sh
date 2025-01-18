###################
# Merges geoNames.js (from geonames2js) with a minified version of
# main.js.
# 
# Requirements: uglifyjs.
# Usage: sh build.sh
###################

OUTPUT_FILE=../autocompleteCity.js

# Converts geoNames.js from an ES module to a script that can be easily
# added to a webpage without using <script type="module">:
sed -e 's/export default/const autocompleteCityNames=/' geoNames.js > $OUTPUT_FILE
echo ';' >> $OUTPUT_FILE

uglifyjs --compress --mangle -- main.js >> $OUTPUT_FILE