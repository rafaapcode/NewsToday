import Html from './Html.js';

export default class CreateTemplate {
  #section;
  constructor(section) {
    this.#section = section;
  };

  createTemplate({ author, title, publishedAt, NewsUrl, urlToImage, content }) {
    const parametersText = { title, content, author, publishedAt }
    const secondaryDiv = Html.createSecondaryDiv(Html.createTexts(parametersText), Html.createLinkButton(NewsUrl));
    const template = Html.createPrimaryDiv(Html.createImg(urlToImage), secondaryDiv);
    this.#section.appendChild(template);
  };

  length(message) {
    this.#section.insertAdjacentElement('beforebegin', Html.infoLengthNews(message));
  }
};
