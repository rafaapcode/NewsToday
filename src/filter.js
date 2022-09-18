import GetNews from "./GetNews.js";

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
};