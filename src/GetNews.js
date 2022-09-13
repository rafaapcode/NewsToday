import Html from './Html.js';

export default class GetNews {
  #language;
  #subject;
  constructor(language = null, subject = null) {
    this.#language = language;
    this.#subject = subject;
  };

  get language() {
    for (let input of this.#language) {
      if (input.selected) {
        return input.value;
      };
    };
  };

  get url() {
    return `https://newsapi.org/v2/everything?language=${this.language}&q=${this.#subject.value}`
  };

  async #request() {
    const request = new Request(this.url, { method: 'GET', headers: new Headers({ 'X-Api-Key': 'b86d70e2dfee4b15a73d4caec9e7217c' }) });

    const response = await fetch(request).then(res => res.json());

    return response.articles || response;
  };

  async information() {
    const res = await this.#request();

    return Array.isArray(res) ? res.sort(this.#sortNews).map(({ author, title, publishedAt, url: NewsUrl, urlToImage, content }) => {
      return { author, title, publishedAt: publishedAt.slice(0, 10), NewsUrl, urlToImage, content: content.replace(/(\[.+\])/, '') };
    }) : res;
  };

  static requestNotAvailable(res, section) {
    if (typeof res === 'object') {
      res.then(({ status, message }) => {
        if (status === 'error') {
          Html.createErrorRequestNotAvailable(section, message);
        };
      });
    };
    return;
  };

  async lengtNews() {
    const res = await this.#request();

    return res.length;
  };

  #sortNews(obj1, obj2) {
    if (obj1.publishedAt < obj2.publishedAt) return 1;
    if (obj1.publishedAt > obj2.publishedAt) return -1;

    return 0;
  };

  validationSubject(container) {
    if (!this.#subject.value) {
      Html.createMessageError(container, 'Please enter a value.');
      return true;
    };

    this.lengtNews().then(length => {
      if (length === 0) {
        Html.createMessageError(container, 'News not found.')
        return true;
      };
      return false;
    });

    return false;
  };

};