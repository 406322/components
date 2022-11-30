import './teaser-item.js';

const filterData = (allData) => {
  const filteredData = []
  allData._embedded.forEach(element => {
    if (typeof element._embedded.relations === 'undefined') return
    if (typeof element._embedded.relations[0].fields.versions === 'undefined') return
    filteredData.push({ title: element.title, image: element._embedded.relations[0].fields.versions.large.url })
  })
  return filteredData
}

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
    const avis = this.getAttribute("param-publication")
    console.log(avis)
    const url = `https://services.api.no/api/acpcomposer/v1.1/search/content/?publicationDomain=${avis}&sort=lastPublishedDate&types=story`
    console.log(url)
    const response = await fetch(url);
    const json = await response.json();
    const result = filterData(json)
    this.#posts = result
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
                image="${post.image || ''}"
                >
              </teaser-item>
            `).join('\n')}
      </section>
    `;
  }
}

customElements.define('amedia-frontpage', TeaserList);