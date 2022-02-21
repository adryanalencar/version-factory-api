import axios from "axios";
import https from 'https';
import qs from 'qs'

function GitLabApi(){
    this.baseUrl = `${process.env.SECURE_URL ? 'https' : 'http'}://${process.env.BASE_URL}/api/v4`;
    this.headers = {
        'Private-Token': process.env.PRIVATE_TOKEN,
    }
    
    const agent = new https.Agent({  
        rejectUnauthorized: false
    });
    
    this.ObjectToQueryString = (obj) => {
        return Object.keys(obj).map(k => {
            return encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])
        }).join('&');
    }

    this.getRelease = async (projectId, releaseName) => {
        const url = `${this.baseUrl}/projects/${projectId}/releases`;
        const response = await axios.get(url, { headers: this.headers, httpsAgent: agent });
        const release = response.data.find(release => release.tag_name === releaseName);

        return release;
    }

    this.createLink = async (projectId, releaseName, link) => {
        const url = `${this.baseUrl}/projects/${projectId}/releases/${releaseName}/assets/links`;
        var data = this.ObjectToQueryString(link)

        const response = await axios.post(url, data, { headers: this.headers, httpsAgent: agent });

        return response.data;
    }

    this.updateLink = async (projectId, releaseName, link) => {
        ///projects/:id/releases/:tag_name/assets/links/:link_id
        const url = `${this.baseUrl}/projects/${projectId}/releases/${releaseName}/assets/links/${link.id}`;
        var data = this.ObjectToQueryString(link)

        const response = await axios.put(url, data, { headers: this.headers, httpsAgent: agent });

        return response.data;
    }

    this.createProjectHook = async (projectId) => {
        const url = `${this.baseUrl}/projects/${projectId}/hooks`;
        var data = qs.stringify({
            url: `http://localhost:${process.env.PORT}/webhook`,
            releases_events: 'true',
            push_events: 'false',
            enable_ssl_verification: 'false'             
        });

        const response = await axios.post(url, data, { headers: this.headers, httpsAgent: agent });

        return response.data;
    }      



}

export { GitLabApi };
