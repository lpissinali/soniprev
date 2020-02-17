const defaultOptions = {
  objectSelector: '.liver-defeat-reasons',
  objectInitialWidth: 1210,
  objectInitialHeight: 800,
  containerInitialWidth: 1210,
  containerInitialHeight: 800,
    /**
     * массив параметров пересчета ширины объекта
     * resizeDirection
     * если при уменьшении параметра размер тоже уменьшается, то 1
     * если при уменьшении параметра размер нужно увеличивать, то -1
     * если размеры изменяются пропорционально изменению ширины и высоты контейнера-образца, то 0
     * resizeRation
     * это коэффициент, который изменяет скорость изменения размера,
     * т.е. к пропорциями изменения контейнера образца добавляется коэффициент
     */
  widthMediaQueriesArray: [
    {
      highValue: 1920,
      lowValue: 1210,
      resizeDirection: 1,
      resizeRatio: 1,
    },
    // {
    //   highValue: 1960,
    //   lowValue: 1301,
    //   resizeDirection: -1,
    //   resizeRatio: 0.55,
    // },
    // {
    //   highValue: 4960,
    //   lowValue: 1961,
    //   resizeDirection: 1,
    //   resizeRatio: 1,
    // },
  ],
  heightMediaQueriesArray : [
    // {
    //   highValue: 1200,
    //   lowValue: 400,
    //   resizeDirection: 1,
    //   resizeRatio: 1.6,
    // },
  ]
};

const imageResizer = class ImageResizer {

  constructor(options = {}) {
    this.options = { ...defaultOptions, ...options };
  }

  init() {
    const getwindowHeight = () => {
      const de = document.documentElement;
      return self.innerHeight || (de && de.clientHeight) || document.body.clientHeight;
    };
    // Определение ширины видимой части страницы
    const getwindowWidth = () => {
      const de = document.documentElement;
      return self.innerWidth || (de && de.clientWidth) || document.body.clientWidth;
    };
  
    /**
     * объект, размеры которого нужно пересчитывать
     */
    const elem = document.querySelector(this.options.objectSelector);
  
    const startScreenWidth = this.options.containerInitialWidth;
    const startScreenHeight = this.options.containerInitialHeight;
  
    const startObjectWidth = this.options.objectInitialWidth;
    const startObjectHeight = this.options.objectInitialHeight;
  
    const screenAndObjectWidthRatio = startScreenWidth / startObjectWidth;
    const screenAndObjectHeightRatio = startScreenHeight / startObjectHeight;
    const objectRatio = startObjectWidth / startObjectHeight;
  
    const widthMediaQueriesArray = this.options.widthMediaQueriesArray;
  
    const heightMediaQueriesArray = this.options.heightMediaQueriesArray;
  
    const getDelta = (startValue, endValue) => startValue - endValue;
    const multiplyByRatio = (value, ratio) => value * ratio;
    const divideByRatio = (value, ratio) => value / ratio;
  
    const selectMediaQuery = (currentSize, mediaQueryArray) => {
      const matchedMediaQuery = mediaQueryArray.find(element => {
        if (currentSize >= element.lowValue && currentSize <= element.highValue) {
          return true;
        }
        return false;
      });
      return matchedMediaQuery;
    };
  
    const recalculateDeltaWithMediaQueryData = (
      mediaQueryDataObject = {
        highValue: 5000000,
        lowValue: 0,
        resizeDirection: 1,
        resizeRatio: 1,
      },
      delta
    ) => {
      let changedDelta;
      switch (mediaQueryDataObject.resizeDirection) {
      case -1:
        changedDelta = multiplyByRatio(-delta, mediaQueryDataObject.resizeRatio);
        break;
      case 0:
        changedDelta = 0;
        break;
      case 1:
        changedDelta = multiplyByRatio(delta, mediaQueryDataObject.resizeRatio);
        break;
      default:
        changedDelta = 0;
        break;
      }
      return changedDelta;
    };
  
    const setNewObjectSizes = () => {
      /**
       * производится пересчет изменения высоты контейнера образца в ширину объекта
       */
      const deltaObjectHeight = divideByRatio(
        getDelta(startScreenHeight, getwindowHeight()),
        screenAndObjectHeightRatio
      );
  
      const matchedHeightMediaQuery = selectMediaQuery(getwindowHeight(), heightMediaQueriesArray);
  
      const acceleratedDeltaObjectHeight = recalculateDeltaWithMediaQueryData(
        matchedHeightMediaQuery,
        deltaObjectHeight
      );
  
      const newObjectHeight = startObjectHeight - acceleratedDeltaObjectHeight;
      /**
       * это величина, на которую нужно скорректировать ширину,
       * чтобы получилось изменение размера объекта (как-будто изменилась толькоо высота)
       */
      const deltaByHeightObjectWidth = getDelta(
        startObjectWidth,
        multiplyByRatio(newObjectHeight, objectRatio)
      );
  
      const deltaObjectWidth = divideByRatio(
        getDelta(startScreenWidth, getwindowWidth()),
        screenAndObjectWidthRatio
      );
  
      const matchedWidthMediaQuery = selectMediaQuery(getwindowWidth(), widthMediaQueriesArray);
  
      const acceleratedDeltaObjectWidth = recalculateDeltaWithMediaQueryData(
        matchedWidthMediaQuery,
        deltaObjectWidth
      );
  
      const newObjectWidth = startObjectWidth - deltaByHeightObjectWidth - acceleratedDeltaObjectWidth;
      /**
       * изменение размера объекта, т.к. это фоновая картинка, то изменяется свойство CSS
       */
      elem.style.backgroundSize = `${newObjectWidth}px` + ' auto';
    };
  
    setNewObjectSizes();
    window.addEventListener('resize', event => {
      setNewObjectSizes();
    });
  }
};

export default imageResizer;