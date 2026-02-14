/**
 * Types et interfaces partagées
 */

export interface Member {
  id: number
  name: string
  email: string
  createdAt: string
  updatedAt: string
}

export interface MemberTeam {
  id: number
  member: Member
  teamName: string
  teamOrder: number
  createdAt: string
  updatedAt?: string
}

export interface Standing {
  memberId: number
  memberName: string
  totalPoints: number
  racesCompleted: number
  averagePointsPerRace: number
  currentRank: number
  lastRacePoints?: number
  pointsChangePercent?: number
  rankChange?: number
}

export interface Race {
  id: number
  raceNumber: number
  raceName: string
  circuitName: string
  country: string
  raceDate: string
  isCompleted: boolean
  resultCount: number
}

export interface RaceResult {
  raceResultId: number
  raceId: number
  raceName: string
  memberTeamId: number
  teamName: string
  memberName: string
  points: number
  position?: number
  enteredAt: string
}

export interface TeamPerformance {
  teamId: number
  teamName: string
  totalPoints: number
  racesParticipated: number
  averagePointsPerRace: number
  bestRacePoints?: number
  worstRacePoints?: number
  consistencyScore?: number
}

export interface StandingsHistory {
  id: number
  member: Member
  totalPoints: number
  racesCompleted: number
  averagePointsPerRace: number
  currentRank: number
  archiveDate: string
}

export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}
