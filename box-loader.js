/**
 * @author Alessandro Alberga
 * @description Box loader class.
 */
class BoxLoader {

  /**
   * Load a script onto our DOM.
   *
   * @param { String } path script path.
   */
  static LoadScript = (path, onComplete) => {
    const tag = document.createElement('script');
    tag.setAttribute('src', path);
    tag.async = false;
    document.body.appendChild(tag);
    tag.addEventListener('load', onComplete);
  }
  
  /**
   * Load stylesheet.
   *
   * @param { String } path sheet path.
   */
  static LoadStylesheet = (path) => {
    const link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = path;
    document.head.appendChild(link);
  }
  
  /**
   * Load a box by name.
   *
   * @param { String } boxName box name.
   */
  static LoadBoxByName = (boxName) => {
    const boxPath = `./app/${boxName}/${boxName}.box.js`
    BoxLoader.LoadScript(boxPath);
  }
}

const loadAllScripts = (appSpecificScripts = []) => {
  console.log('BoxJS: Loading all scripts...');
  const scripts = [
    './box-core/box-utils.js',
    './box-core/box.js',
    './box-core/core-boxes/navigator/navigator.box.js',
    './box-core/core-services/dialog/dialog.service.js',
    './box-core/core-services/http/http.service.js',
    './box-core/core-boxes/dialog/dialog.box.js',
    ...appSpecificScripts,
    './box-core/box-core-api.js',
    './box-core/box-core.js'
  ]
  // Needs to be reversed just because of the nature of appendChild()
  .reverse();
  let i = 0;
  const loadNext = () => {
    console.log(`BoxJs: Appended script to body: ${scripts[i]} (script: ${i}) ✅`);
    i++;
    if (i < scripts.length) {
      BoxLoader.LoadScript(scripts[i], loadNext());
    } else {
      console.log(`BoxJs: BoxLoader completed loading scripts (total: ${scripts.length}) 🚀`);
    }
  }
  BoxLoader.LoadScript(scripts[0], loadNext())
  
}

loadAllScripts([
  './app/dummy-dialog/dummy-dialog.box.js',
  './app/animation/animation.box.js',
  './app/main/main.box.js',
  './app/data-fetcher/data-fetcher.box.js'
]);