import './teaser-item.js';
import { getData, filterData } from './functions.js';

const teaserElement = document.getElementById('teasers');
teaserElement.posts = []

export class TeaserList extends HTMLElement {
  #posts = [];

  constructor() {
    super();    
    this.attachShadow({mode: 'open'});
  }

  set posts(value) {
    this.#posts = value;
  }

  async connectedCallback() {
    const publication = this.getAttribute("param-publication")
    const url = `https://services.api.no/api/acpcomposer/v1.1/search/content/?publicationDomain=${publication}&sort=lastPublishedDate&types=story`
    const data = await getData(url)
    const filteredData = filterData(data)
    this.#posts = filteredData
    this.render();
  }

  get style() {
    return `
      <style>
          .container {
            padding: 3em 0 5em 0;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            background-color: white;
            color: black
          }
      </style>
    `
  }
  
  render() {
    this.shadowRoot.innerHTML = `
      ${this.style}
      <section class="container">
            ${this.#posts.map(post => `
              <teaser-item
                title="${post.title}"
                image="${post.image}"
                >
              </teaser-item>
            `).join('\n')}
      </section>
    `;
  }
}

customElements.define('amedia-frontpage', TeaserList);