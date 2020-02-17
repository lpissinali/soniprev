import * as axios from 'axios';

const ShareSocial = class ShareSocial {
  constructor(options = {}) {
    this.options = { ...options };
  }

  init() {
    // const url = window.location.href;
    // const urlComponentsArray = url.split('/');
    // const siteRoot = `${urlComponentsArray[0]}//${urlComponentsArray[2]}`;
    this.shareUrl = 'https://super.mironline.ru/otkritie';
    this.title = 'Мир';
    this.description = 'Участвуйте в акции «Ваши покупки вернутся с картой «Мир» Банка «Открытие»';
    this.images = {
      vk: 'https://super.mironline.ru/otkritie/images/vk.jpg',
      ok: 'https://super.mironline.ru/otkritie/images/ok.jpg',
      fb: 'https://super.mironline.ru/otkritie/images/facebook.jpg',
    };
    if (this.options.VKButtonClass) {
      this.VKButton = document.querySelector(`.${this.options.VKButtonClass}`);
    }
    if (this.options.FBButtonClass) {
      this.FBButton = document.querySelector(`.${this.options.FBButtonClass}`);
    }
    if (this.options.OKButtonClass) {
      this.OKButton = document.querySelector(`.${this.options.OKButtonClass}`);
    }
    this.initEventListeners();
  }

  sendData(social) {
    const formData = new FormData();
    formData.append('share', social);
    formData.append('id', window.userID);
    formData.append('points', window.userPoints);
    const configData = {
      url: './share.php',
      method: 'POST',
      data: formData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    axios(configData).then(response => {}, error => {});
  }

  initEventListeners() {
    if (this.VKButton) {
      this.VKButton.addEventListener('click', event => {
        event.preventDefault();
        /**
         * на бэк не нужно передавать данные о шаринге, поэтому комментирую
         */
        // this.sendData('VK');
        this.vkontakte(this.shareUrl, this.description, this.images.vk, this.title);
      });
    }
    if (this.FBButton) {
      this.FBButton.addEventListener('click', event => {
        event.preventDefault();
        /**
         * на бэк не нужно передавать данные о шаринге, поэтому комментирую
         */
        // this.sendData('FB');
        this.facebook(
          this.shareUrl,
          this.title,
          this.images.fb,
          'Участвуй в акции с картой «Мир» Банка «Открытие»'
        );
      });
    }
    if (this.OKButton) {
      this.OKButton.addEventListener('click', event => {
        event.preventDefault();
        /**
         * на бэк не нужно передавать данные о шаринге, поэтому комментирую
         */
        // this.sendData('OK');
        this.odnoklassniki(this.shareUrl, this.title, this.images.vk);
      });
    }
  }

  vkontakte(purl, ptitle, pimg, text) {
    let url = 'http://vkontakte.ru/share.php?';
    url += `url=${encodeURIComponent(purl)}`;
    url += `&title=${encodeURIComponent(ptitle)}`;
    url += `&description=${encodeURIComponent(text)}`;
    url += `&image=${encodeURIComponent(pimg)}`;
    url += '&noparse=true';
    this.popup(url);
  }

  odnoklassniki(purl, ptitle, pimg) {
    let url = 'https://connect.ok.ru/offer?';
    url += `url=${encodeURIComponent(purl)}`;
    url += `&title=${encodeURIComponent(ptitle)}`;
    url += `&imageUrl=${encodeURIComponent(pimg)}`;
    this.popup(url);
  }

  facebook(purl, ptitle, pimg, text) {
    let url = 'http://www.facebook.com/sharer.php?s=100';
    url += `&p[title]=${encodeURIComponent(ptitle)}`;
    url += `&p[summary]=${encodeURIComponent(text)}`;
    url += `&p[url]=${encodeURIComponent(purl)}`;
    url += `&p[images][0]=${encodeURIComponent(pimg)}`;
    this.popup(url);
  }

  twitter(purl, ptitle) {
    let url = 'http://twitter.com/share?';
    url += `text=${encodeURIComponent(ptitle)}`;
    url += `&url=${encodeURIComponent(purl)}`;
    url += `&counturl=${encodeURIComponent(purl)}`;
    this.popup(url);
  }

  mailru(purl, ptitle, pimg, text) {
    let url = 'http://connect.mail.ru/share?';
    url += `url=${encodeURIComponent(purl)}`;
    url += `&title=${encodeURIComponent(ptitle)}`;
    url += `&description=${encodeURIComponent(text)}`;
    url += `&imageurl=${encodeURIComponent(pimg)}`;
    this.popup(url);
  }

  popup(url) {
    window.open(url, '', 'toolbar=0,status=0,width=626,height=436');
  }
};

export default ShareSocial;
