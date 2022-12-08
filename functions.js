var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const getData = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(url);
    const json = yield response.json();
    return json;
});
export const filterData = (allData) => {
    const filteredData = [];
    allData._embedded.forEach(element => {
        if (typeof element._embedded.relations === 'undefined')
            return;
        if (typeof element._embedded.relations[0].fields.versions === 'undefined')
            return;
        filteredData.push({
            title: element.title,
            image: element._embedded.relations[0].fields.versions.large.url
        });
    });
    return filteredData;
};
