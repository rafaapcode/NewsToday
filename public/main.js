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
  const dateFilter = document.querySelector('#dateFilter');
  const btnDateFilter = document.querySelector('#btnDate');

  btn.addEventListener('click', clickEventSearch());
  btnFilter.addEventListener('click', clickEventFilterAuthor());
  btnDateFilter.addEventListener('click', clickEventFilterDate());

  function clickEventFilterAuthor() {
    return function () {
      resetNews();
      validationFilterAuthor();
      setTimeout(() => filteringNewAuthor(), 5);
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

  function clickEventFilterDate() {
    return function () {
      resetNews();
      validationFilterDate();
      setTimeout(() => filteringNewDate(), 5);
    };
  };




  function filteringNewAuthor() {
    const filteredNews = new FilterNews(filter);
    const createTemplate = new CreateTemplate(section);

    filteredNews.filterNewsAuthor(language, subject).then(res => {
      res.map(obj => {
        createTemplate.createTemplate(obj);
      });
    });
  };

  function filteringNewDate() {
    const filteredNews = new FilterNews(dateFilter);
    const createTemplate = new CreateTemplate(section);

    filteredNews.filterNewsDate(language, subject).then(res => {
      res.map(obj => {
        createTemplate.createTemplate(obj);
      });
    });
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

  function validationFilterAuthor() {
    const filterNews = new FilterNews(filter);
    const paramsValidating = {
      language,
      subject,
      section,
    };

    filterNews.validatingFilterAuthor(paramsValidating);
  };

  function validationFilterDate() {
    const filterNews = new FilterNews(dateFilter);
    const paramsValidating = {
      language,
      subject,
      section,
    };

    filterNews.validatingFilterDate(paramsValidating);
  };

})();