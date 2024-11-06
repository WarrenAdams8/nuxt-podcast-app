import { useMediaControls } from '@vueuse/core'
import type { EpisodeItem } from '~/types/PodcastFeedEpisodesTypes'

export const useAudioPlayerStore = defineStore('audioPlayer', () => {

    const audioRef = shallowRef<HTMLAudioElement>()

    const audioSrc = ref('https://www.podtrac.com/pts/redirect.mp3/pdst.fm/e/chrt.fm/track/5961B6/traffic.megaphone.fm/ABS8293406097.mp3?updated=1729538072I')
    const coverArt = ref('https://placehold.co/80x80')
    const title = ref('unknown title unknown title unknown title unknown title')
    const artist = ref('unknown artist')

    // Media controls state
    const {
        playing,
        currentTime,
        duration,
        waiting,
        volume,
    } = useMediaControls(audioRef, {
        src: audioSrc
    })

    // Methods
    const setAudioRef = (el: HTMLAudioElement) => {
        audioRef.value = el
    }

    const handleSeek = (time: any) => {
        if (audioRef.value) {
            audioRef.value.currentTime = time
        }
    }

    const skipForward = () => {
        if (audioRef.value) {
            audioRef.value.currentTime = Math.min(currentTime.value + 15, duration.value)
        }
    }

    const skipBackward = () => {
        if (audioRef.value) {
            audioRef.value.currentTime = Math.max(currentTime.value - 15, 0)
        }
    }

    const togglePlay = () => {
        playing.value = !playing.value
    }

    const formatTime = (time: number) => {
        if (!time) return '0:00'
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    const play = async () => {
        if (audioRef.value) {
            try {
                await audioRef.value.play()
                playing.value = true
            } catch (error) {
                console.error('Playback failed:', error)
            }
        }
    }

    const changeEpisode = async (episode: EpisodeItem, podcastAuthor?: string) => {
        // If clicking the currently playing episode, toggle play/pause
        if (audioSrc.value === episode.enclosureUrl) {
            togglePlay()
            return
        }

        // Otherwise, update episode details and start playing
        title.value = episode.title
        audioSrc.value = episode.enclosureUrl
        coverArt.value = episode.feedImage
        artist.value = podcastAuthor || 'unknown artist'

        await nextTick()
        await play()
    }

    return {
        // State
        audioSrc,
        coverArt,
        title,
        artist,
        // Media controls
        playing,
        currentTime,
        duration,
        waiting,
        volume,
        // Methods
        setAudioRef,
        handleSeek,
        skipForward,
        skipBackward,
        togglePlay,
        formatTime,
        play,
        changeEpisode
    }
})