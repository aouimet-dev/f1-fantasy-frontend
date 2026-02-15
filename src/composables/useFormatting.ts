export const useFormatting = () => {
  const formatDate = (dateString: string): string => {
    if (!dateString) return '—'
    try {
      return new Intl.DateTimeFormat('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(new Date(dateString))
    } catch {
      return dateString
    }
  }

  const formatDateTime = (dateString: string): string => {
    if (!dateString) return '—'
    try {
      return new Intl.DateTimeFormat('fr-FR', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(new Date(dateString))
    } catch {
      return dateString
    }
  }

  const formatNumber = (num: number, decimals = 0): string => {
    if (num === null || num === undefined) return '—'
    return num.toLocaleString('fr-FR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    })
  }

  const formatPercentage = (value: number, decimals = 1): string => {
    if (value === null || value === undefined) return '—'
    return `${value > 0 ? '+' : ''}${formatNumber(value, decimals)}%`
  }

  const getRankSuffix = (rank: number): string => {
    if (rank === 1) return 'er'
    return 'e'
  }

  const abbreviateNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`
    return num.toString()
  }

  return {
    formatDate,
    formatDateTime,
    formatNumber,
    formatPercentage,
    getRankSuffix,
    abbreviateNumber
  }
}
