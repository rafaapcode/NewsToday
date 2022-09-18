import GetNews from "../src/GetNews.js";
import CreateTemplate from "../src/CreateTemplate.js";
import ResetTemplate from "../src/Reset.js";

(function () {
  const btn = document.querySelector('.btn');
  const language = document.querySelectorAll('.language');
  const subject = document.querySelector('.news');
  const section = document.querySelector('.sec');
  const divError = document.querySelector('#errorDiv');

  btn.addEventListener('click', clickEvent());

  function clickEvent() {
    return function () {
      ResetTemplate.resetError(divError);
      resetNews();
      validation();
      setTimeout(() => creatingNew(), 50)
    };
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

})();