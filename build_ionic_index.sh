echo "####################"
echo "####################"
echo "####################"
echo "Providing Closure with the following .js files"
ZONE='node_modules/zone.js/dist/zone.js';
echo ${ZONE}
RJXS=$(find vendor/rxjs -name '*.js');
echo ${RJXS} | tr " " "\n"
ANGULAR_INDEX=$(find node_modules/@angular/{core,common,compiler,forms,http,platform-browser}/index.js);
echo ${ANGULAR_INDEX} | tr " " "\n"
ANGULAR_SRC=$(find node_modules/@angular/{core,common,compiler,forms,http,platform-browser}/src -name '*.js')
echo ${ANGULAR_SRC} | tr " " "\n"
#GENERATED_BY_NGC=$(find built -name '*.js');
#echo ${GENERATED_BY_NGC} | tr " " "\n"
IONIC_ANGULAR=$(find node_modules/ionic-angular/es2015 -name '*.js');
echo ${IONIC_ANGULAR} | tr " " "\n"
echo "####################"
echo "####################"
echo "####################"

OPTS=(
  "--language_in=ES6_STRICT"
  "--language_out=ES5"
  "--compilation_level=ADVANCED_OPTIMIZATIONS"
  "--create_source_map=%outname%.map"
  "--variable_renaming_report=dist/variable_renaming_report"
  "--property_renaming_report=dist/property_renaming_report"

  # Don't include ES6 polyfills
  "--rewrite_polyfills=false"

  # List of path prefixes to be removed from ES6 & CommonJS modules.
  "--js_module_root=node_modules"
  "--js_module_root=built/node_modules"
  "--js_module_root=vendor"

  # Uncomment for easier debugging
  "--formatting=PRETTY_PRINT"

  ${ZONE}
  ${RJXS}
  ${ANGULAR_INDEX}
  ${ANGULAR_SRC}
  #${GENERATED_BY_NGC}
  ${IONIC_ANGULAR}
  #"--entry_point=./built/src/bootstrap"
  "--entry_point=./node_modules/ionic-angular/es2015/index.js"
)

set -ex
java -jar node_modules/google-closure-compiler/compiler.jar --js_output_file=dist/bundle.js $(echo ${OPTS[*]})
gzip --keep -f dist/bundle.js
java -jar node_modules/google-closure-compiler/compiler.jar --js_output_file=dist/bundle.debug.js --debug $(echo ${OPTS[*]})
# requires brotli
# on Mac: brew install brotli
# bro --force --quality 10 --input dist/bundle.js --output dist/bundle.js.brotli
ls -alH dist/bundle*
