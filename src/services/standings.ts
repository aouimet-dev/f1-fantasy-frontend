export type Standing = {
    memberId: string
    memberName: string
    totalPoints: number
    racesCompleted: number
    averagePointsPerRace: number
    currentRank: number
    lastRacePoints: number | null
    pointsChangePercent: number | null
    rankChange: number | null
}

export const getStandings = async (): Promise<Standing[]> => {
    const response = await fetch('/api/standings', {
        method: 'GET',
        credentials: 'include'
    })

    if (!response.ok) {
        throw new Error(`Failed to get standings (${response.status})`)
    }

    return response.json() as Promise<Standing[]>
}
