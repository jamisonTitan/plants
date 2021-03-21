const fetch = require('node-fetch');

const TREFLE_KEY = 'PJO-Jh2CI8LNSIDVDGxxl8ZeMLlSXdoBQE7BsXsCoRE';
const baseUrl = `https://trefle.io/api/v1`;

export default trefle = {
    fetchPlantsInDistribution: async (distId, page = 1) => {
        let out = null;
        await fetch(`${baseUrl}/distributions/${distId}/plants?token=${TREFLE_KEY}&page=${page}`)
            .then(res => res.json())
            .then(res => {
                out = res;
            });
        return out;
    }
}