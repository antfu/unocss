/*
 * WHAT IS THIS FILE?
 *
 * The service-worker.ts file is used to have state of the art prefetching.
 * https://qwik.builder.io/docs/advanced/prefetching/#prefetching
 *
 * Qwik uses service worker to speed up your site and reduce latency, ie, not used in the tradicional way of offiline.
 * You can also use this file to add more functionality that runs in the service worker.
 */
import { setupServiceWorker } from '@builder.io/qwik-city/service-worker'

setupServiceWorker()

// eslint-disable-next-line @typescript-eslint/no-use-before-define
addEventListener('install', () => self.skipWaiting())

// eslint-disable-next-line @typescript-eslint/no-use-before-define
addEventListener('activate', () => self.clients.claim())

declare const self: ServiceWorkerGlobalScope
