const fetch = require('node-fetch');
const fs = require('fs');

for (let i = 1; i <= 37; i++) {
  fetch(`https://trefle.io/api/v1/distributions?token=PJO-Jh2CI8LNSIDVDGxxl8ZeMLlSXdoBQE7BsXsCoRE&page=${i}`)
    .then(res => res.json())
    .then(res => {
      let dataToAppend = res.data.map(e => `{"name":"${e.name}", "id":"${e.id}"}`).toString();
      fs.appendFileSync(
        'distributions.txt',
        dataToAppend + ','
      )
    });
}