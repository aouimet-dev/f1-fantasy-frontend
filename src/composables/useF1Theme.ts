export const useF1Theme = () => {
  const teamColors: Record<string, { bg: string; text: string; border: string }> = {
    default: {
      bg: 'bg-gray-200',
      text: 'text-gray-800',
      border: 'border-gray-300'
    },
    red: {
      bg: 'bg-f1-red/20',
      text: 'text-f1-red',
      border: 'border-f1-red'
    },
    ferrari: {
      bg: 'bg-f1-red/20',
      text: 'text-f1-red',
      border: 'border-f1-red'
    },
    silver: {
      bg: 'bg-f1-silver/30',
      text: 'text-gray-800',
      border: 'border-f1-silver'
    },
    mercedes: {
      bg: 'bg-f1-silver/30',
      text: 'text-gray-800',
      border: 'border-f1-silver'
    },
    orange: {
      bg: 'bg-f1-orange/20',
      text: 'text-f1-orange',
      border: 'border-f1-orange'
    },
    mclaren: {
      bg: 'bg-f1-orange/20',
      text: 'text-f1-orange',
      border: 'border-f1-orange'
    },
    blue: {
      bg: 'bg-f1-blue/20',
      text: 'text-f1-blue',
      border: 'border-f1-blue'
    },
    'red bull': {
      bg: 'bg-f1-blue/20',
      text: 'text-f1-blue',
      border: 'border-f1-blue'
    },
    alpine: {
      bg: 'bg-f1-blue/20',
      text: 'text-f1-blue',
      border: 'border-f1-blue'
    },
    green: {
      bg: 'bg-f1-green/20',
      text: 'text-f1-green',
      border: 'border-f1-green'
    },
    aston: {
      bg: 'bg-f1-green/20',
      text: 'text-f1-green',
      border: 'border-f1-green'
    }
  }

  const getTeamColors = (teamName: string) => {
    const lower = teamName.toLowerCase()
    for (const [key, colors] of Object.entries(teamColors)) {
      if (lower.includes(key)) {
        return colors
      }
    }
    return teamColors.default
  }

  const rankColors = {
    1: { bg: 'bg-yellow-100', text: 'text-yellow-800', emoji: '🥇' },
    2: { bg: 'bg-gray-100', text: 'text-gray-800', emoji: '🥈' },
    3: { bg: 'bg-orange-100', text: 'text-orange-800', emoji: '🥉' }
  }

  const getRankColor = (rank: number) => {
    return (rankColors as any)[rank] || { bg: 'bg-white', text: 'text-gray-800', emoji: '' }
  }

  const statusColors = {
    completed: { bg: 'bg-green-100', text: 'text-green-700' },
    upcoming: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
    cancelled: { bg: 'bg-red-100', text: 'text-red-700' }
  }

  return {
    getTeamColors,
    getRankColor,
    statusColors,
    teamColors
  }
}
