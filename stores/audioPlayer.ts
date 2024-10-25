export const useAudioPlayerStore = defineStore('audioPlayer', () => {
    const audioSrc = ref('https://www.podtrac.com/pts/redirect.mp3/pdst.fm/e/chrt.fm/track/5961B6/traffic.megaphone.fm/ABS8293406097.mp3?updated=1729538072I')
    const coverArt = ref('https://placehold.co/80x80')
    const title = ref('unknown title unknown title unknown title unknown title')
    const artist = ref('unknown artist')

    return { audioSrc, coverArt, title, artist }
})