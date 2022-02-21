import { Router } from "express";
import { WebhookController } from "./controllers/WebhookController";

const router = Router();
const webhookController = new WebhookController();

router.post("/webhook", webhookController.dispatch);
router.post("/webhook/project-created", webhookController.projectCreated);

export { router };
