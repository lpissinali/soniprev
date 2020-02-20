import { gsap } from "gsap";

const defaultOptions = {
  tabPrefix: "map-tab",
  selectorPrefix: "selector-map-tab"
};

const SVGTab = class SVGTab{
  constructor(options = {}) {
    this.options = { ...defaultOptions, ...options };
    this.state = {};
  }
  
  init() {
    this.state.activeTab = this.options.tabPrefix + '-1';
    this.tabs = document.querySelectorAll(`.${this.options.tabPrefix}`);
    this.selectors = document.querySelectorAll(`.${this.options.selectorPrefix}`);
    this.initEventListeners();
  }

  initEventListeners() {
    this.selectors.forEach((element) => {
      $(element).on('click', (event) => {
        let tabId = this.getTabId($(element).attr('id'));
        if (this.isSectionExists(tabId)) {
          $(`#${this.state.activeTab}`).addClass('d-none');
          $(`#${tabId}`).removeClass('d-none');
          this.activateAnimation($(element).attr('id'));

          const activeSelectorId = this.getSelectorId(this.state.activeTab);
          this.deactivateAnimation(activeSelectorId);
          this.state.activeTab = tabId;
        }
      })
    });
  }

  getTabId(selectorId) {
    return this.options.tabPrefix + '-' + selectorId.split('-')[3];
  }

  getSelectorId(tabId) {
    return this.options.selectorPrefix + '-' + tabId.split('-')[2];
  }

  isSectionExists(sectionId) {
    return ($('#' + sectionId).length > 0) ? true : false;
  }

  activateAnimation(selectorId) {
    gsap.set('#' + selectorId, {
      transformOrigin:"50% 50%"
    });
    gsap.to('#' + selectorId, {transformOrign:'center', scale:1.2});
  }

  deactivateAnimation(selectorId) {
    gsap.set('#' + selectorId, {
      transformOrigin:"50% 50%"
    });
    gsap.to('#' + selectorId, {transformOrign:'center', scale:1});
  }

}

export default SVGTab;