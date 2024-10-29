import { useMediaControls } from '@vueuse/core'

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
        formatTime
    }
})