<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import Card from 'primevue/card'
import Divider from 'primevue/divider'
import Splitter from 'primevue/splitter'
import SplitterPanel from 'primevue/splitterpanel'
import Chart from 'primevue/chart'
import 'chart.js/auto'
import { useAuthStore } from '@/stores/auth'
import { useMemberTeamsStore } from '@/stores/memberTeams'
import { getStandings, type Standing } from '@/services/standings'
import { getRaceResults, getRaces } from '@/services/races'
import { resolveMemberIdForUser } from '@/services/member'
import { getTeamPerformance } from '@/services/memberTeams'
import GlobalRankCard from '../components/GlobalRankCard.vue'
import ParticipantTeamsCard from '../components/ParticipantTeamsCard.vue'
import GlobalStandingsCard from '../components/GlobalStandingsCard.vue'

const authStore = useAuthStore()
const memberTeamsStore = useMemberTeamsStore()
const authenticatedUser = computed(() => authStore.user)
const participantDisplayName = computed(() => authenticatedUser.value?.name || authenticatedUser.value?.email || 'Participant')
const participantPicture = computed(() => authenticatedUser.value?.picture)
const teamPointsById = ref<Record<string, number>>({})
const currentMemberId = ref<string | null>(null)
const teams = computed(() => memberTeamsStore.teams.map((team) => ({
    name: team.teamName,
    points: teamPointsById.value[team.id] ?? 0
})))

const participantName = computed(() => participantDisplayName.value)
const standingsRaw = ref<Standing[]>([])
const currentMemberStanding = ref<Standing | null>(null)

const sortedStandings = computed(() =>
    [...standingsRaw.value].sort((left, right) => left.currentRank - right.currentRank)
)

const globalRank = computed(() => currentMemberStanding.value?.currentRank ?? null)
const totalParticipants = computed(() => sortedStandings.value.length)
const rankDelta = computed(() => {
    const rankChange = currentMemberStanding.value?.rankChange ?? 0
    if (rankChange > 0) {
        return `+${rankChange}`
    }

    return `${rankChange}`
})

const positionStats = computed(() => {
    const memberStanding = currentMemberStanding.value
    if (!memberStanding) {
        return []
    }

    const standings = sortedStandings.value
    const firstStanding = standings[0]
    const memberIndex = standings.findIndex((standing) => standing.memberId === memberStanding.memberId)
    const nextStanding = memberIndex >= 0 && memberIndex < standings.length - 1
        ? standings[memberIndex + 1]
        : null

    const pointsToPodium = Math.max((firstStanding?.totalPoints ?? memberStanding.totalPoints) - memberStanding.totalPoints, 0)
    const pointsAheadNext = nextStanding
        ? Math.max(memberStanding.totalPoints - nextStanding.totalPoints, 0)
        : 0
    const averagePoints = Number(memberStanding.averagePointsPerRace)

    return [
        { label: 'Pts du podium', value: pointsToPodium },
        { label: 'Pts d\'avance', value: `+${pointsAheadNext}` },
        { label: 'Pts en moyenne', value: averagePoints }
    ]
})

const hasGlobalRankData = computed(() =>
    globalRank.value !== null && positionStats.value.length > 0
)

const globalStandings = ref<{ rank: number, participant: string, points: number }[]>([])

const grandPrixLabels = ref<string[]>([])
const pointsEvolution = ref<{ participant: string, points: number[] }[]>([])

const css = getComputedStyle(document.documentElement)
const primaryColor = css.getPropertyValue('--p-primary-color').trim() || '#8b5cf6'
const secondaryLineColor = css.getPropertyValue('--p-surface-500').trim() || '#71717a'
const axisColor = css.getPropertyValue('--p-surface-700').trim() || '#a1a1aa'
const gridColor = css.getPropertyValue('--p-surface-300').trim() || '#3f3f46'

const pointsChartData = computed(() => ({
    labels: grandPrixLabels.value,
    datasets: pointsEvolution.value.map((entry) => {
        const isCurrentParticipant = entry.participant === participantName.value

        return {
            label: entry.participant,
            data: entry.points,
            borderColor: isCurrentParticipant ? primaryColor : secondaryLineColor,
            backgroundColor: isCurrentParticipant ? primaryColor : secondaryLineColor,
            borderWidth: isCurrentParticipant ? 3 : 1.25,
            pointRadius: isCurrentParticipant ? 3 : 1.5,
            pointHoverRadius: isCurrentParticipant ? 4 : 2,
            tension: 0.35,
            fill: false
        }
    })
}))

const pointsChartOptions = {
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        }
    },
    scales: {
        x: {
            ticks: {
                color: axisColor,
                autoSkip: false,
                maxRotation: 0,
                minRotation: 0,
                padding: 8
            },
            grid: {
                color: gridColor
            }
        },
        y: {
            ticks: {
                color: axisColor
            },
            grid: {
                color: gridColor
            }
        }
    }
}

const hasPointsEvolutionData = computed(() =>
    grandPrixLabels.value.length > 0 && pointsEvolution.value.length > 0
)

const loadTeamPerformanceForUser = async (memberIdOverride?: string | null) => {
    const user = authStore.user

    if (!user?.authenticated) {
        teamPointsById.value = {}
        return
    }

    const memberId = memberIdOverride ?? await resolveMemberIdForUser(user)
    const performances = await Promise.all(
        memberTeamsStore.teams.map(async (team) => ({
            teamId: team.id,
            performance: await getTeamPerformance(memberId, team.id)
        }))
    )

    teamPointsById.value = performances.reduce<Record<string, number>>((accumulator, entry) => {
        accumulator[entry.teamId] = entry.performance.totalPoints
        return accumulator
    }, {})
}

onMounted(async () => {
    const user = authStore.user

    if (user?.authenticated) {
        try {
            currentMemberId.value = await resolveMemberIdForUser(user)
        } catch (error) {
            console.error('Failed to resolve member id:', error)
        }
    }

    try {
        const standings = await getStandings()
        standingsRaw.value = standings
        globalStandings.value = standings.map((standing) => ({
            rank: standing.currentRank,
            participant: standing.memberName,
            points: standing.totalPoints
        }))

        if (currentMemberId.value) {
            currentMemberStanding.value = standings.find((standing) => standing.memberId === currentMemberId.value) ?? null
        } else {
            currentMemberStanding.value = null
        }
    } catch (error) {
        console.error('Failed to load global standings:', error)
    }

    try {
        const races = (await getRaces()).sort((left, right) => left.raceNumber - right.raceNumber)
        grandPrixLabels.value = races.map((race) => race.raceName)

        const pointsByParticipant = new Map<string, number[]>()

        for (const [index, race] of races.entries()) {
            const raceResults = await getRaceResults(race.raceId)

            for (const result of raceResults) {
                if (!pointsByParticipant.has(result.memberName)) {
                    pointsByParticipant.set(result.memberName, Array(races.length).fill(0))
                }

                const participantRacePoints = pointsByParticipant.get(result.memberName)
                if (!participantRacePoints) {
                    continue
                }

                participantRacePoints[index] = result.points
            }
        }

        pointsEvolution.value = Array.from(pointsByParticipant.entries())
            .map(([participant, racePoints]) => {
                let cumulative = 0
                const cumulativePoints = racePoints.map((points) => {
                    cumulative += points
                    return cumulative
                })

                return {
                    participant,
                    points: cumulativePoints
                }
            })
            .sort((left, right) => {
                const leftTotal = left.points[left.points.length - 1] ?? 0
                const rightTotal = right.points[right.points.length - 1] ?? 0
                return rightTotal - leftTotal
            })
    } catch (error) {
        console.error('Failed to load points evolution:', error)
    }

    console.log('Authenticated user:', user)

    if (!user?.authenticated) {
        return
    }

    try {
        await memberTeamsStore.loadTeamsForUser(user)
        await loadTeamPerformanceForUser(currentMemberId.value)
    } catch (error) {
        console.error('Failed to load member teams:', error)
    }
})

const createTeams = async (teamNames: string[]) => {
    const user = authStore.user

    if (!user?.authenticated) {
        return
    }

    try {
        for (const teamName of teamNames) {
            await memberTeamsStore.createTeamForUser(user, teamName)
        }

        await loadTeamPerformanceForUser(currentMemberId.value)
    } catch (error) {
        console.error('Failed to create member team:', error)
    }
}
</script>

<template>
    <main>
        <h1>Accueil</h1>

        <Splitter style="height: auto">
            <SplitterPanel :size="33" :minSize="25" style="display: flex">
                <GlobalRankCard :global-rank="globalRank" :total-participants="totalParticipants"
                    :rank-delta="rankDelta" :position-stats="positionStats" :has-data="hasGlobalRankData" />
            </SplitterPanel>

            <SplitterPanel :size="67" :minSize="45" style="display: flex">
                <ParticipantTeamsCard :participant-name="participantDisplayName"
                    :participant-picture="participantPicture" :teams="teams" @create-teams="createTeams" />
            </SplitterPanel>
        </Splitter>

        <Divider />

        <Splitter style="height: auto">
            <SplitterPanel :size="33" :minSize="25" style="display: flex">
                <GlobalStandingsCard :standings="globalStandings" />
            </SplitterPanel>

            <SplitterPanel :size="67" :minSize="45" style="display: flex">
                <Card class="points-evolution-card" style="width: 100%; height: 100%">
                    <template #title>Évolution des points</template>
                    <template #content>
                        <Divider />
                        <p v-if="!hasPointsEvolutionData" style="margin: 0; opacity: 0.75">
                            Aucune donnée pour le moment.
                        </p>
                        <Chart v-else type="line" :data="pointsChartData" :options="pointsChartOptions"
                            style="height: 100%" />
                    </template>
                </Card>
            </SplitterPanel>
        </Splitter>
    </main>
</template>

<style scoped>
:deep(.points-evolution-card .p-card-body) {
    height: 100%;
    display: flex;
    flex-direction: column;
}

:deep(.points-evolution-card .p-card-content) {
    flex: 1;
    min-height: 0;
}

:deep(.points-evolution-card .p-chart) {
    height: 100%;
}
</style>
