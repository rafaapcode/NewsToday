export default class CreatingAttribute {
  static addingClassName(element, classNameArr) {
    classNameArr.forEach(el => {
      element.classList.add('class', el);
    });
  };

  static appendChilds(element, childArr) {
    childArr.forEach(el => {
      element.appendChild(el);
    });
  };
};