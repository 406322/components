var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _TeaserList_posts;
import './teaser-item.js';
import { getData, filterData } from './functions.js';
const teaserElement = document.getElementById('teasers'); // Cast to TeaserList?
if (teaserElement) {
    teaserElement.posts = [];
}
export class TeaserList extends HTMLElement {
    constructor() {
        super();
        _TeaserList_posts.set(this, []);
        this.attachShadow({ mode: 'open' });
    }
    set posts(value) {
        __classPrivateFieldSet(this, _TeaserList_posts, value, "f");
    }
    connectedCallback() {
        return __awaiter(this, void 0, void 0, function* () {
            const publication = this.getAttribute("param-publication");
            const url = `https://services.api.no/api/acpcomposer/v1.1/search/content/?publicationDomain=${publication}&sort=lastPublishedDate&types=story`;
            const data = yield getData(url);
            const filteredData = filterData(data);
            __classPrivateFieldSet(this, _TeaserList_posts, filteredData, "f");
            this.render();
        });
    }
    get css() {
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
    `;
    }
    render() {
        if (this.shadowRoot)
            this.shadowRoot.innerHTML = `
      ${this.css}
      <section class="container">
            ${__classPrivateFieldGet(this, _TeaserList_posts, "f").map(post => `
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
_TeaserList_posts = new WeakMap();
customElements.define('amedia-frontpage', TeaserList);
