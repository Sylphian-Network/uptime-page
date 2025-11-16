import { MaintenanceConfig, PageConfig, WorkerConfig } from './types/config'

const pageConfig: PageConfig = {
  title: "Sylphian's Uptime",
  links: [
    { link: 'https://github.com/Sylphian-Network/', label: 'GitHub' },
  ],
  group: {
    'Sylphian': ['forum_monitor', 'prod_web_monitor', 'prod_database_monitor', 'prod_redis_monitor', 'prod_elasticsearch_monitor'],
    'Sylphian DEV': ['dev_forum_monitor', 'dev_web_monitor', 'dev_database_monitor'],
  },
  favicon: '/favicon.png',
  maintenances: {
    upcomingColor: "gray",
  }
}

const workerConfig: WorkerConfig = {
  kvWriteCooldownMinutes: 3,
  monitors: [
    {
      id: 'forum_monitor',
      name: 'sylphian.net',
      method: 'GET',
      target: 'https://sylphian.net',
      statusPageLink: 'https://sylphian.net',
      hideLatencyChart: false,
      expectedCodes: [200],
      timeout: 15000,
      headers: {
        'User-Agent': 'Sylphian-Uptimeflare',
      },
      responseKeyword: 'Community platform by XenForo',
      responseForbiddenKeyword: 'bad gateway',
      checkProxy: 'worker://weur',
      checkProxyFallback: true,
    },
    {
      id: 'prod_web_monitor',
      name: 'web server',
      method: 'GET',
      target: 'https://health-prod.sylphian.net/index.php',
      hideLatencyChart: true,
      expectedCodes: [200],
      timeout: 15000,
      headers: { 'User-Agent': 'Sylphian-Uptimeflare' },
      responseKeyword: '"web":"ok"',
      responseForbiddenKeyword: 'bad gateway',
      checkProxy: 'worker://weur',
      checkProxyFallback: true,
    },
    {
      id: 'prod_database_monitor',
      name: 'database',
      method: 'GET',
      target: 'https://health-prod.sylphian.net/index.php',
      hideLatencyChart: true,
      expectedCodes: [200],
      timeout: 15000,
      headers: { 'User-Agent': 'Sylphian-Uptimeflare' },
      responseKeyword: '"database":"ok"',
      responseForbiddenKeyword: 'bad gateway',
      checkProxy: 'worker://weur',
      checkProxyFallback: true,
    },
    {
      id: 'prod_redis_monitor',
      name: 'redis',
      method: 'GET',
      target: 'https://health-prod.sylphian.net/index.php',
      hideLatencyChart: true,
      expectedCodes: [200],
      timeout: 15000,
      headers: { 'User-Agent': 'Sylphian-Uptimeflare' },
      responseKeyword: '"redis":"ok"',
      responseForbiddenKeyword: 'bad gateway',
      checkProxy: 'worker://weur',
      checkProxyFallback: true,
    },
    {
      id: 'prod_elasticsearch_monitor',
      name: 'elasticsearch',
      method: 'GET',
      target: 'https://health-prod.sylphian.net/index.php',
      hideLatencyChart: true,
      expectedCodes: [200],
      timeout: 15000,
      headers: { 'User-Agent': 'Sylphian-Uptimeflare' },
      responseKeyword: '"elasticsearch":"ok"',
      responseForbiddenKeyword: 'bad gateway',
      checkProxy: 'worker://weur',
      checkProxyFallback: true,
    },
    {
      id: 'dev_forum_monitor',
      name: 'dev.sylphian.net',
      method: 'GET',
      target: 'https://dev.sylphian.net',
      statusPageLink: 'https://dev.sylphian.net',
      hideLatencyChart: false,
      expectedCodes: [200],
      timeout: 15000,
      headers: {
        'User-Agent': 'Sylphian-Uptimeflare',
      },
      responseKeyword: 'Community platform by XenForo',
      responseForbiddenKeyword: 'bad gateway',
      checkProxy: 'worker://weur',
      checkProxyFallback: true,
    },
    {
      id: 'dev_web_monitor',
      name: 'web server',
      method: 'GET',
      target: 'https://health-dev.sylphian.net/index.php',
      hideLatencyChart: true,
      expectedCodes: [200],
      timeout: 15000,
      headers: { 'User-Agent': 'Sylphian-Uptimeflare' },
      responseKeyword: '"web":"ok"',
      responseForbiddenKeyword: 'bad gateway',
      checkProxy: 'worker://weur',
      checkProxyFallback: true,
    },
    {
      id: 'dev_database_monitor',
      name: 'database',
      method: 'GET',
      target: 'https://health-dev.sylphian.net/index.php',
      hideLatencyChart: true,
      expectedCodes: [200],
      timeout: 15000,
      headers: { 'User-Agent': 'Sylphian-Uptimeflare' },
      responseKeyword: '"database":"ok"',
      responseForbiddenKeyword: 'bad gateway',
      checkProxy: 'worker://weur',
      checkProxyFallback: true,
    },
  ],
  notification: {
  },
  callbacks: {
    onStatusChange: async (
      env: any,
      monitor: any,
      isUp: boolean,
      timeIncidentStart: number,
      timeNow: number,
      reason: string
    ) => {
      // This callback will be called when there's a status change for any monitor
      // Write any Typescript code here
      // This will not follow the grace period settings and will be called immediately when the status changes
      // You need to handle the grace period manually if you want to implement it
    },
    onIncident: async (
      env: any,
      monitor: any,
      timeIncidentStart: number,
      timeNow: number,
      reason: string
    ) => {
      // This callback will be called EVERY 1 MINTUE if there's an on-going incident for any monitor
      // Write any Typescript code here
    },
  },
}

const maintenances: MaintenanceConfig[] = [
  {
    monitors: ['forum_monitor'],
    title: 'Scheduled Maintenance',
    body: 'The server will be undergoing regular maintenance.',
    start: '2025-09-27T11:00:00.000Z',
    end: '2025-09-27T12:00:00.000Z',
    color: 'yellow',
  },
  {
    monitors: ['forum_monitor'],
    title: 'Scheduled Maintenance',
    body: 'The server will be undergoing regular maintenance.',
    start: '2025-10-25T11:00:00.000Z',
    end: '2025-10-25T11:30:00.000Z',
    color: 'yellow',
  },
  {
    monitors: [
      'forum_monitor',
      'prod_web_monitor',
      'prod_database_monitor',
      'prod_redis_monitor',
      'prod_elasticsearch_monitor'
    ],
    title: 'Scheduled Maintenance',
    body: 'The server will be undergoing regular maintenance.',
    start: '2025-11-16T12:00:00.000Z',
    end: '2025-11-16T12:30:00.000Z',
    color: 'yellow',
  }
]

export { pageConfig, workerConfig, maintenances }
