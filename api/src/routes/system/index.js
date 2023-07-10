import express from 'express';
import { SystemBLL } from '../../logic/system';

export const SystemRoutes = express.Router();

/**
 * @swagger
 * /health:
 *  get:
 *    description: Check the health of the system
 *    responses:
 *      '200':
 *        description: Get the health of the system, 'It works!' if the system is healthy of course
 */
SystemRoutes.get('/health', SystemBLL.HealthCheck);

/**
 * @swagger
 * /version:
 *  get:
 *    description: Get the version of the system
 *    responses:
 *      '200':
 *        description: Get the version of the system
 */
SystemRoutes.get('/version', SystemBLL.SystemVersion);
