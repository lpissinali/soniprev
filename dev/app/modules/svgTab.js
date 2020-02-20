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
    this.state.activeTab = this.options.tabPrefix + '-2';
    this.activateMarker(this.state.activeTab);
    this.tabs = document.querySelectorAll(`.${this.options.tabPrefix}`);
    this.selectors = document.querySelectorAll(`.${this.options.selectorPrefix}`);
    this.initEventListeners();
  }

  initEventListeners() {
    this.selectors.forEach((element) => {
      $(element).on('click', (event) => {
        let tabId = this.getTabId($(element).attr('id'));
        if (this.isSectionExists(tabId)) {
          if (this.state.activeTab === tabId) {
            if (this.state.activeBigger === true){
              this.deactivateMarker(this.state.activeTab);
              this.state.activeBigger = false;
            }
            else {
              this.activateMarker(this.state.activeTab);
              this.state.activeBigger = true;
            }
          }
          else {
            $(`#${this.state.activeTab}`).addClass('d-none');
            $(`#${tabId}`).removeClass('d-none');
            this.activateMarker(tabId);
            this.deactivateMarker(this.state.activeTab);
            this.state.activeTab = tabId;
            this.state.activeBigger = true;
          }
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

  activateMarker(tabId) {
    const activeSelectorId = this.getSelectorId(tabId);
    this.activateAnimation(activeSelectorId);       
  }

  activateAnimation(selectorId) {
    gsap.set('#' + selectorId, {
      transformOrigin:"50% 50%"
    });
    gsap.to('#' + selectorId, {transformOrign:'center', scale:1.5});
  }

  deactivateMarker(tabId) {
    const activeSelectorId = this.getSelectorId(tabId);
    this.deactivateAnimation(activeSelectorId);   
  }

  deactivateAnimation(selectorId) {
    gsap.set('#' + selectorId, {
      transformOrigin:"50% 50%"
    });
    gsap.to('#' + selectorId, {transformOrign:'center', scale:1});
  }

}

export default SVGTab;