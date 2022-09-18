import GetNews from "./GetNews.js";
import Html from "./Html.js";

export default class FilterNews {
  #filterWord;
  constructor(filterWord) {
    this.#filterWord = filterWord.value;
  };

  get filterWord() {
    return this.#filterWord.toLowerCase();
  };

  async filterNews(language, subject) {
    const news = new GetNews(language, subject);
    const informationNews = await news.information();

    const filterNews = informationNews.filter(({ author }) => {
      author = author.toLowerCase()
      return author.includes(this.filterWord);
    });

    return filterNews;
  };

  async validatingFilter({ language, subject, section }) {
    const filteredNews = await this.filterNews(language, subject);

    if (filteredNews.length === 0) {
      Html.createErrorFilter(section, 'No news found.');
    };
  };
};