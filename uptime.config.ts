import { MaintenanceConfig, PageConfig, WorkerConfig } from './types/config'

const pageConfig: PageConfig = {
  title: "Sylphian's Uptime",
  links: [
    { link: 'https://github.com/Sylphian-Network/', label: 'GitHub' },
  ],
  group: {
    'Website': ['forum_monitor'],
  },
}

const workerConfig: WorkerConfig = {
  kvWriteCooldownMinutes: 3,
  monitors: [
    {
      id: 'forum_monitor',
      name: 'Sylphian.net',
      method: 'GET',
      target: 'https://sylphian.net',
      statusPageLink: 'https://sylphian.net',
      hideLatencyChart: false,
      expectedCodes: [200],
      timeout: 5000,
      headers: {
        'User-Agent': 'Sylphian-Uptimeflare',
      },
      responseKeyword: 'Community platform by XenForo',
      responseForbiddenKeyword: 'bad gateway',
      checkProxy: 'worker://weur',
      checkProxyFallback: true,
    },
    {
      id: 'test_monitor',
      name: 'Cloudflare',
      method: 'GET',
      target: 'https://cloudflare.net',
      statusPageLink: 'https://cloudflare.net',
      hideLatencyChart: true,
      expectedCodes: [200],
      timeout: 5000,
      headers: {
        'User-Agent': 'Sylphian-Uptimeflare',
      },
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
    monitors: ['test_monitor'],
    title: 'Test Scheduled Maintenance',
    body: 'The server will be undergoing regular maintenance.',
    start: '2025-10-27T12:00:00.000Z',
    end: '2025-10-27T13:00:00.000Z',
  },
  {
    monitors: ['test_monitor'],
    title: 'Test Scheduled Maintenance',
    body: 'The server will be undergoing regular maintenance.',
    start: '2025-12-27T13:00:00.000Z',
    end: '2025-12-27T14:00:00.000Z',
  },
  {
    monitors: ['test_monitor'],
    title: 'Test Active Scheduled Maintenance',
    body: 'The server will be undergoing regular maintenance.',
    start: '2025-09-16T14:00:00.000Z',
    end: '2025-09-27T15:00:00.000Z',
  },
  {
    monitors: ['test_monitor'],
    title: 'Test Active Scheduled Maintenance',
    body: 'The server will be undergoing regular maintenance.',
    start: '2025-10-16T15:00:00.000Z',
    end: '2025-10-27T16:00:00.000Z',
  }
]

export { pageConfig, workerConfig, maintenances }
