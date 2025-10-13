import { MaintenanceConfig, PageConfig, WorkerConfig } from './types/config'

const pageConfig: PageConfig = {
  title: "Sylphian's Uptime",
  links: [
    { link: 'https://github.com/Sylphian-Network/', label: 'GitHub' },
  ],
  group: {
    'Website': ['forum_monitor'],
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
    }
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
  }
]

export { pageConfig, workerConfig, maintenances }
