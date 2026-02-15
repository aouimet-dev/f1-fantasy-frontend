# Plan UX — Home F1 Fantasy (Read-Only)

## Objectif
Créer une page d’accueil claire, rapide à lire et 100% read-only pour consulter les points et le classement.

## Architecture de la page
1. **Prochaine course**
   - Nom du GP
   - Date/heure
   - Statut (À venir / Terminé)
2. **Mes équipes**
   - Jusqu’à 3 cartes
   - Points cumulés
   - Points de la dernière course
3. **Classement global**
   - Tableau principal trié par points
   - Ligne de l’utilisateur mise en évidence
4. **Historique récent**
   - 3 à 5 dernières courses
   - Points par équipe
   - Variation de rang
5. **Contexte admin**
   - Message: résultats saisis manuellement par l’admin

## Priorité visuelle
- **Niveau 1:** points totaux utilisateur + rang global
- **Niveau 2:** performance des équipes
- **Niveau 3:** détails historiques

## Comportements & états
- **Chargement:** skeleton sur cartes et tableau
- **Vide:** “Aucun résultat saisi”
- **Erreur:** message simple + action “Réessayer”
- **Read-only explicite:** aucun bouton d’édition/gestion

## Responsive
- **Mobile:** ordre vertical (prochaine course → équipes → classement → historique)
- **Desktop:** 2 colonnes
  - Gauche: prochaine course + équipes
  - Droite: classement + historique

## Composants PrimeVue (MVP)
- `Card` pour prochaine course et équipes
- `DataTable` pour classement global
- `Tag` pour statuts
- `Message` pour information admin

## Plan d’implémentation
1. Wireframe low-fi des sections
2. MVP statique avec données mock
3. États load/empty/error
4. Ajustements responsive et lisibilité
