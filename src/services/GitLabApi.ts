import axios from "axios";

function GitLabApi(){
    this.baseUrl = `${process.env.SECURE_URL ? 'https' : 'http'}://${process.env.BASE_URL}/api/v4`;

    this.headers = {
        'Private-Token': process.env.PRIVATE_TOKEN,
    }

    this.getRelease = async (projectId, releaseName) => {
        const url = `${this.baseUrl}/projects/${projectId}/releases`;
        const response = await axios.get(url, { headers: this.headers });
        const release = response.data.find(release => release.tag_name === releaseName);

        return release;
    }

    this.createLink = async (projectId, releaseName, link) => {
        const url = `${this.baseUrl}/projects/${projectId}/releases/${releaseName}/assets/links`;
        var data = Object.keys(link).map(key => {
            return `${key}=${link[key]}`
        }).join('&');

        const response = await axios.post(url, data, { headers: this.headers });

        return response.data;
    }

    this.updateLink = async (projectId, releaseName, link) => {
        ///projects/:id/releases/:tag_name/assets/links/:link_id
        const url = `${this.baseUrl}/projects/${projectId}/releases/${releaseName}/assets/links/${link.id}`;
        var data = Object.keys(link).map(key => {
            return `${key}=${link[key]}`
        }
        ).join('&');

        const response = await axios.put(url, data, { headers: this.headers });

        return response.data;
    }

}

export { GitLabApi };