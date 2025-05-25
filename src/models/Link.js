export class Link {
  constructor(id, url, description) {
    this.id = id;
    this.url = url;
    this.description = description;
  }

  static fromInput(input) {
    return new Link(
      input.id,
      input.url,
      input.description
    );
  }

  toJSON() {
    return {
      id: this.id,
      url: this.url,
      description: this.description
    };
  }
} 