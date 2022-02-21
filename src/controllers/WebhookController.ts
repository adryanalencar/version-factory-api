import { Request, Response } from "express";
import { GitLabApi } from "../services/GitLabApi";
import { extractLinks } from "../utils/markdown";

class WebhookController{

    async dispatch(request: Request, response: Response): Promise<Response> {
        const { body } = request;

        const { project, name } = body;

        const gitLabApi = new GitLabApi();
        const release = await gitLabApi.getRelease(project.id, name);
        const description = release.description.split("Links") 
        
        if(description.length > 1){
            const data = extractLinks(description[1]);
            const links = data.map(link => {
                return {
                    name: link.text,
                    url: project.web_url + link.href,
                    filepath: link.href
                }
            })

            var responses = []

            for(const link of links){
                responses.push(await gitLabApi.createLink(project.id, name, link));
            }

            for(const link of responses){
                link.link_type = "package";
                await gitLabApi.updateLink(project.id, name, link);
            }
        }


        return response.json({
            message: 'Webhook received'
        });

    }

    async projectCreated(request: Request, response: Response): Promise<Response> {
        const { body } = request;
        const { project_id, event_name } = body;

        const gitLabApi = new GitLabApi();
        
        if(event_name === "project_create"){
            await gitLabApi.createProjectHook(project_id);
        }        

        return response.json({
            message: 'Webhook received'
        });
    }

}

export { WebhookController }
