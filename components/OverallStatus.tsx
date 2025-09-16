import { MaintenanceConfig, MonitorTarget } from '@/types/config'
import { Center, Container, Title } from '@mantine/core'
import { IconCircleCheck, IconAlertCircle } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import MaintenanceAlert from './MaintenanceAlert'
import { pageConfig } from '@/uptime.config'

function useWindowVisibility() {
  const [isVisible, setIsVisible] = useState(true)
  useEffect(() => {
    const handleVisibilityChange = () => setIsVisible(document.visibilityState === 'visible')
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])
  return isVisible
}

export default function OverallStatus({
  state,
  maintenances,
  monitors,
}: {
  state: { overallUp: number; overallDown: number; lastUpdate: number }
  maintenances: MaintenanceConfig[]
  monitors: MonitorTarget[]
}) {
  let group = pageConfig.group
  let groupedMonitor = (group && Object.keys(group).length > 0) || false

  let statusString = ''
  let icon = <IconAlertCircle style={{ width: 64, height: 64, color: '#b91c1c' }} />
  if (state.overallUp === 0 && state.overallDown === 0) {
    statusString = 'No data yet'
  } else if (state.overallUp === 0) {
    statusString = 'All systems not operational'
  } else if (state.overallDown === 0) {
    statusString = 'All systems operational'
    icon = <IconCircleCheck style={{ width: 64, height: 64, color: '#059669' }} />
  } else {
    statusString = `Some systems not operational (${state.overallDown} out of ${
      state.overallUp + state.overallDown
    })`
  }

  const [openTime] = useState(Math.round(Date.now() / 1000))
  const [currentTime, setCurrentTime] = useState(Math.round(Date.now() / 1000))
  const isWindowVisible = useWindowVisibility()

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isWindowVisible) return
      if (currentTime - state.lastUpdate > 300 && currentTime - openTime > 30) {
        window.location.reload()
      }
      setCurrentTime(Math.round(Date.now() / 1000))
    }, 1000)
    return () => clearInterval(interval)
  })

  const now = new Date()
  const activeMaintenances = maintenances
    .filter((m) => now >= new Date(m.start) && (!m.end || now <= new Date(m.end)))
    .map((maintenance) => ({
      ...maintenance,
      monitors: maintenance.monitors?.map(
        (monitorId) => monitors.find((mon) => monitorId === mon.id)!
      ),
    }))

  const upcomingMaintenances = maintenances
    .filter((m) => now < new Date(m.start))
    .map((maintenance) => ({
      ...maintenance,
      monitors: maintenance.monitors?.map(
        (monitorId) => monitors.find((mon) => monitorId === mon.id)!
      ),
    }))

  return (
    <Container size="md" mt="xl">
      <Center>{icon}</Center>
      <Title mt="sm" style={{ textAlign: 'center' }} order={1}>
        {statusString}
      </Title>
      <Title mt="sm" style={{ textAlign: 'center', color: '#70778c' }} order={5}>
        Last updated on:{' '}
        {`${new Date(state.lastUpdate * 1000).toLocaleString()} (${
          currentTime - state.lastUpdate
        } sec ago)`}
      </Title>

      {/* Active Maintenance */}
      {activeMaintenances.length > 0 && (
        <>
          <Title order={3} mt="lg" style={{ textAlign: 'center', color: '#b91c1c' }}>
            Ongoing Maintenance
          </Title>
          <MaintenanceAlert
            maintenance={{
              title: activeMaintenances.length > 1 ? 'Multiple ongoing maintenances' : activeMaintenances[0].title,
              body: activeMaintenances
                .map(
                  (m) =>
                    `• ${m.title || 'Scheduled Maintenance'}: ${m.body} (${new Date(
                      m.start
                    ).toLocaleString()} — ${m.end ? new Date(m.end).toLocaleString() : 'ongoing'})` +
                    (m.monitors && m.monitors.length > 0
                      ? `\n  Affected: ${m.monitors.map((mon) => mon.name).join(', ')}`
                      : '')
                )
                .join('\n\n'),
              start: activeMaintenances[0].start,
              end: activeMaintenances[0].end,
            }}
            style={{ maxWidth: groupedMonitor ? '897px' : '865px' }}
          />
        </>
      )}

      {/* Upcoming Maintenance */}
      {upcomingMaintenances.length > 0 && (
        <>
          <Title order={3} mt="lg" style={{ textAlign: 'center', color: '#eab308' }}>
            Upcoming Maintenance
          </Title>
          <MaintenanceAlert
            maintenance={{
              title: upcomingMaintenances.length > 1 ? 'Multiple upcoming maintenances' : upcomingMaintenances[0].title,
              body: upcomingMaintenances
                .map(
                  (m) =>
                    `• ${m.title || 'Scheduled Maintenance'}: ${m.body} (${new Date(
                      m.start
                    ).toLocaleString()} — ${m.end ? new Date(m.end).toLocaleString() : 'upcoming'})` +
                    (m.monitors && m.monitors.length > 0
                      ? `\n  Affected: ${m.monitors.map((mon) => mon.name).join(', ')}`
                      : '')
                )
                .join('\n\n'),
              start: upcomingMaintenances[0].start,
              end: upcomingMaintenances[0].end,
            }}
            style={{ maxWidth: groupedMonitor ? '897px' : '865px' }}
            upcoming
          />
        </>
      )}
    </Container>
  )
}
