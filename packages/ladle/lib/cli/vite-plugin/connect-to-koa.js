/**
 * @typedef {import('koa').Context} KoaContext
 * @typedef {import('koa').Next} KoaNext
 */

/**
 * Converts Connect/Express-style middleware to Koa middleware.
 *
 * This adapter bridges the gap between Vite's Connect-based middleware system
 * and Ladle's Koa-based server architecture.
 *
 * @param {import('vite').Connect.Server} connectMiddleware - Connect/Express middleware function with signature (req, res, next)
 * @returns {(ctx: KoaContext, next: KoaNext) => Promise<void>} Koa middleware function with signature (ctx, next)
 *
 * @description
 * Vite uses Connect middleware internally (similar to Express), which expects
 * (req, res, next) function signatures. Koa uses a different pattern with a context
 * object (ctx) and async/await. This adapter wraps Connect middleware to work with Koa.
 *
 * **Supported Vite Versions:**
 * - Vite 7.x
 * - Vite 6.x
 * - Vite 5.x
 * - Vite 4.x
 *
 * **How it works:**
 * 1. Receives a Connect middleware that expects Node.js req/res objects
 * 2. Extracts req and res from the Koa context (ctx.req, ctx.res)
 * 3. Wraps the Connect middleware call in a Promise
 * 4. Handles errors from the Connect middleware by rejecting the Promise
 * 5. Continues the Koa middleware chain by calling next()
 *
 * @example
 * import { connectToKoa } from './connect-to-koa.js';
 * import vite from 'vite';
 *
 * const viteServer = await vite.createServer();
 * app.use(connectToKoa(viteServer.middlewares));
 */
export const connectToKoa = (connectMiddleware) => {
  return async (/** @type {KoaContext} */ ctx, /** @type {KoaNext} */ next) => {
    await new Promise((resolve, reject) => {
      connectMiddleware(ctx.req, ctx.res, (/** @type {any} */ err) => {
        if (err) reject(err);
        else resolve(undefined);
      });
    });
    await next();
  };
};
