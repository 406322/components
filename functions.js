

export const getData = async (url) => {
    const response = await fetch(url);
    const json = await response.json();
    return json
  }

export const filterData = (allData) => {
    const filteredData = []
    allData._embedded.forEach(element => {
      if (typeof element._embedded.relations === 'undefined') return
      if (typeof element._embedded.relations[0].fields.versions === 'undefined') return
      filteredData.push({ 
        title: element.title,
        image: element._embedded.relations[0].fields.versions.large.url })
    })
    return filteredData
  }