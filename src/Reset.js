export default class ResetTemplate {
  #section;
  constructor(section) {
    this.#section = section;
  };

  resetNews() {
    const section = this.#section;
    let child = section.firstElementChild;

    while (child) {
      section.removeChild(child);
      child = section.firstElementChild;
    };
  };

  static resetError(container) {
    let child = container.firstElementChild;

    while (child) {
      container.removeChild(child);
      child = container.firstElementChild;
    };
  };
};