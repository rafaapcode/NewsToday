import CreatingAttribute from "./CreatingAttribute.js";

export default class Html {

  static createPrimaryDiv(img, secondaryDiv) {
    const primaryDiv = document.createElement('div');
    const classNames = [
      'card',
      'mb-3',
      'w-50',
      'ms-0',
      'me-2'
    ];

    CreatingAttribute.addingClassName(primaryDiv, classNames);

    CreatingAttribute.appendChilds(primaryDiv, [img, secondaryDiv]);

    return primaryDiv;
  };

  static createImg(url) {
    const img = document.createElement('img');
    img.setAttribute('src', url);
    img.setAttribute('class', 'card-img-top');

    return img;
  };

  static createSecondaryDiv({ h5, p, secondaryP, thirdP }, link) {
    const secondaryDiv = document.createElement('div');
    const childsNames = [
      h5,
      p,
      secondaryP,
      thirdP,
      link
    ];
    secondaryDiv.setAttribute('class', 'card-body');

    CreatingAttribute.appendChilds(secondaryDiv, childsNames)

    return secondaryDiv;
  };

  static createTexts({ title, content, author, publishedAt }) {
    const h5 = document.createElement('h5');
    h5.setAttribute('class', 'card-title');
    h5.innerText = title;


    const p = document.createElement('p');
    p.setAttribute('class', 'card-text');
    p.innerText = content;


    const secondaryP = document.createElement('p');
    secondaryP.setAttribute('class', 'card-text');

    const small = document.createElement('small');
    small.setAttribute('class', 'text-muted');
    small.innerText = `Autor: ${author}`;
    secondaryP.appendChild(small);


    const thirdP = document.createElement('p');
    thirdP.setAttribute('class', 'card-text');
    const secondarySmall = document.createElement('small');
    secondarySmall.setAttribute('class', 'text-muted');
    secondarySmall.innerText = `Publicado em: ${publishedAt}`;
    thirdP.appendChild(secondarySmall);

    return { h5, p, secondaryP, thirdP };
  };

  static createLinkButton(urlNews) {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', urlNews);

    const button = document.createElement('button');
    button.setAttribute('class', 'btn btn-primary');
    button.innerText = 'Read the News';
    link.appendChild(button);

    return link;
  };

  static createMessageError(element, message) {
    const div = document.createElement('div');
    const h5 = document.createElement('h5');
    const classNames = [
      'border',
      'border-danger',
      'w-25',
      'text-center',
      'rounded',
      'shadow-lg',
      'mt-2',
      'bg-danger'
    ];

    CreatingAttribute.addingClassName(div, classNames);
    CreatingAttribute.addingClassName(h5, ['text-light']);

    h5.innerText = message;

    div.appendChild(h5);

    element.appendChild(div);
  };

  static createErrorRequestNotAvailable(section, msg) {
    const div = document.createElement('div');
    const secondDiv = document.createElement('div');
    const paragraph = document.createElement('p');
    const classNames = [
      'alert',
      'alert-danger',
      'd-flex',
      'align-items-center',
      'w-50'
    ];

    CreatingAttribute.addingClassName(div, classNames);

    div.setAttribute('role', 'alert');

    paragraph.innerText = msg;

    secondDiv.appendChild(paragraph);
    div.appendChild(secondDiv);
    section.appendChild(div);
  };
};