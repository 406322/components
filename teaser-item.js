export class TeaserItem extends HTMLElement {
  title = '';
  image = '';
  
  constructor() {
    super();
    
    this.attachShadow({mode: 'open'});
  }
  
  static get observedAttributes() {
    return ['title', 'image'];
  }
  
  attributeChangedCallback(name, oldValue, newValue) {
    if (this.isConnected) {
      switch (name) {
        case 'title':
          this.title = newValue || 'NO TITLE';
          break;
        case 'image':
          this.image = newValue || '';
          break;
      }
      this.render()
    }
  }
  
  get style() {
    return `
        <style>
            .card {
              width: 25rem;
              height: 25rem;
              margin: 0 1.25em 2em 1.25em;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              background-color: var(--white-background);
              box-shadow: 0px 0px 5px 0px #808080;
              overflow: hidden;
              font-size: 16px;
              font-family: "gsb", sans-serif;
            }
        </style>
      `
  }
  
  get template() {
    return `
        <div class="card">
                ${this.image ? `<img src="${this.image}" alt="${this.title}">` : ''}
           <h2>${this.title}</h2>
        </div>
      `
  }
  
  render() {
    this.shadowRoot.innerHTML = `${this.style}${this.template}`;
  }
}

customElements.define('teaser-item', TeaserItem);