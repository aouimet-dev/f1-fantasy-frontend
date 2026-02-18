export type MemberTeam = {
    id: string
    teamName: string
    teamOrder: number
}

type CreateMemberTeamPayload = {
    teamName: string
    teamOrder: number
}

export const getMemberTeams = async (memberId: string): Promise<MemberTeam[]> => {
    const response = await fetch(`/api/members/${memberId}/teams`, {
        method: 'GET',
        credentials: 'include'
    })

    if (!response.ok) {
        throw new Error(`Failed to get member teams (${response.status})`)
    }

    return response.json() as Promise<MemberTeam[]>
}

export const createMemberTeam = async (memberId: string, payload: CreateMemberTeamPayload): Promise<MemberTeam> => {
    const response = await fetch(`/api/members/${memberId}/teams`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    if (!response.ok) {
        throw new Error(`Failed to create member team (${response.status})`)
    }

    return response.json() as Promise<MemberTeam>
}
