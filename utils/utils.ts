export const statusAnimeItem = (status: string | undefined) => {
   return status === 'finished_airing' ? 'finished' : 'currently'
}
