export type Race = {
    raceId: string
    raceNumber: number
    raceName: string
    circuitName: string | null
    country: string | null
    raceDate: string | null
    isCompleted: boolean
    resultCount: number
}

export type RaceResultDetail = {
    raceResultId: string
    raceId: string
    raceName: string
    memberTeamId: string
    teamName: string
    memberName: string
    points: number
    position: number | null
    enteredAt: string | null
}

export const getRaces = async (): Promise<Race[]> => {
    const response = await fetch('/api/races', {
        method: 'GET',
        credentials: 'include'
    })

    if (!response.ok) {
        throw new Error(`Failed to get races (${response.status})`)
    }

    return response.json() as Promise<Race[]>
}

export const getRaceResults = async (raceId: string): Promise<RaceResultDetail[]> => {
    const response = await fetch(`/api/races/${raceId}/results`, {
        method: 'GET',
        credentials: 'include'
    })

    if (!response.ok) {
        throw new Error(`Failed to get race results (${response.status})`)
    }

    return response.json() as Promise<RaceResultDetail[]>
}
