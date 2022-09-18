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

  async filterNewsAuthor(language, subject) {
    const news = new GetNews(language, subject);
    const informationNews = await news.information();

    const filterNews = informationNews.filter(({ author }) => {
      author = author.toLowerCase()
      return author.includes(this.filterWord);
    });

    return filterNews;
  };

  async filterNewsDate(language, subject) {
    const news = new GetNews(language, subject);
    const informationNews = await news.information();

    const filterNews = informationNews.filter(({ publishedAt }) => {
      return publishedAt === this.#filterWord;
    });

    return filterNews;
  }

  async validatingFilterAuthor({ language, subject, section }) {
    const filteredNews = await this.filterNewsAuthor(language, subject);

    if (filteredNews.length === 0) {
      Html.createErrorFilter(section, 'No news found.');
    };
  };

  async validatingFilterDate({ language, subject, section }) {
    const filteredNewsDate = await this.filterNewsDate(language, subject);
    
    if (filteredNewsDate.length === 0) {
      Html.createErrorFilter(section, 'No news found.');
    };
  }
};