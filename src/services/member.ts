import type { AuthUser } from '@/services/auth'

export type Member = {
    id: string
    name: string
    email: string | null
}

const createMember = async (name: string, email: string): Promise<Member> => {
    const response = await fetch('/api/members', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email })
    })

    if (!response.ok) {
        throw new Error(`Failed to create member (${response.status})`)
    }

    return response.json() as Promise<Member>
}

const getMemberByEmail = async (email: string): Promise<Member | null> => {
    const response = await fetch(`/api/members/by-email?email=${encodeURIComponent(email)}`, {
        method: 'GET',
        credentials: 'include'
    })

    if (response.status === 404) {
        return null
    }

    if (!response.ok) {
        throw new Error(`Failed to get member by email (${response.status})`)
    }

    return response.json() as Promise<Member>
}

export const resolveMemberIdForUser = async (user: AuthUser): Promise<string> => {
    if (!user.email) {
        throw new Error('Authenticated user has no email')
    }

    // 1) Existe déjà dans le pool
    const existingMember = await getMemberByEmail(user.email)
    if (existingMember) {
        return existingMember.id
    }

    // 2) Sinon création
    const createdMember = await createMember(user.name ?? user.email, user.email)
    return createdMember.id
}
