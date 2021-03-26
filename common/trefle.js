const fetch = require('node-fetch');

const TREFLE_KEY = 'PJO-Jh2CI8LNSIDVDGxxl8ZeMLlSXdoBQE7BsXsCoRE';
const baseUrl = `https://trefle.io/api/v1`;

export default trefle = {
    fetchPlantsByDistribution: async (distId) => {
        let out = null;
        await fetch(`${baseUrl}/distributions/${distId}/plants?token=${TREFLE_KEY}`)
            .then(res => res.json())
            .then(res => { out = res; });
        return out;
    },
    fetchPlant: async (plantId) => {
        let out = null;
        await fetch(`${baseUrl}/plants/${plantId}?token=${TREFLE_KEY}`)
            .then(res => res.json())
            .then(res => { out = res; });
        return out;
    },
    fetchPlantsByQuery: async (query) => {
        let out = null;
        await fetch(`${baseUrl}/plants/search?token=${TREFLE_KEY}&q=${query}`)
            .then(res => res.json())
            .then(res => {
                out = res;
            })
        return out;
    },
    fetchPlantsByLink: async (link) => {
        let out = null;
        await fetch(`https://trefle.io${link}&token=${TREFLE_KEY}`)
            .then(res => res.json())
            .then(res => {
                out = res;
            })
        return out;
    }
}