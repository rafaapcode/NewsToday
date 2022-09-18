import GetNews from "../src/GetNews.js";
import CreateTemplate from "../src/CreateTemplate.js";
import ResetTemplate from "../src/Reset.js";
import FilterNews from "../src/filter.js";

(function () {
  const btn = document.querySelector('.btn');
  const language = document.querySelectorAll('.language');
  const subject = document.querySelector('.news');
  const section = document.querySelector('.sec');
  const divError = document.querySelector('#errorDiv');
  const filter = document.querySelector('#filter');
  const btnFilter = document.querySelector('#btnFilter');

  btn.addEventListener('click', clickEventSearch());
  btnFilter.addEventListener('click', clickEventFilter());


  function clickEventFilter() {
    return function () {
      resetNews();
      validationFilter();
      setTimeout(() => filteringNew(), 5);
    };
  };

  function clickEventSearch() {
    return function () {
      ResetTemplate.resetError(divError);
      resetNews();
      validation();
      setTimeout(() => creatingNew(), 5);
    };
  };

  function filteringNew() {
    const filteredNews = new FilterNews(filter);
    const createTemplate = new CreateTemplate(section);

    filteredNews.filterNews(language, subject).then(res => {
      res.map(obj => {
        createTemplate.createTemplate(obj);
      });
    })
  };

  function creatingNew() {
    const news = new GetNews(language, subject);
    const createTemplate = new CreateTemplate(section);

    news.information().then(res => {
      res.map(obj => {
        createTemplate.createTemplate(obj);
      });
    });

    news.lengtNews().then(length => {
      createTemplate.length(length);
    });
  };

  function resetNews() {
    const reset = new ResetTemplate(section);
    reset.resetNews();
  };

  function validation() {
    const news = new GetNews(language, subject);

    news.validationSubject(divError) || GetNews.requestNotAvailable(news.information(), section);
  };

  function validationFilter() {
    const filterNews = new FilterNews(filter);
    const paramsValidating = {
      language,
      subject,
      section,
    };

    filterNews.validatingFilter(paramsValidating);
  };

})();