<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useMediaControls } from '@vueuse/core'
import { Play, Pause, Rewind, FastForward, Volume2, Info, List } from 'lucide-vue-next'

const audio = ref<HTMLAudioElement>()
const {
  playing,
  currentTime,
  duration,
  volume,
  muted,
  seeking,
  ended
} = useMediaControls(audio, {
  src: 'https://chtbl.com/track/38G147/injector.simplecastaudio.com/6d9cb854-64df-4cec-adf4-10a881785a7b/episodes/4103eba6-f2f0-409b-a22d-fd8b763e75e3/audio/128/default.mp3?aid=rss_feed&awCollectionId=6d9cb854-64df-4cec-adf4-10a881785a7b&awEpisodeId=4103eba6-f2f0-409b-a22d-fd8b763e75e3&feed=R14Ca9Ii',
})

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

const progress = computed(() => (currentTime.value / duration.value) * 100)

const seekAudio = (event: MouseEvent) => {
  const rect = (event.target as HTMLElement).getBoundingClientRect()
  const percent = (event.clientX - rect.left) / rect.width
  currentTime.value = percent * duration.value
}

const skipBackward = () => {
  currentTime.value = Math.max(currentTime.value - 15, 0)
}

const skipForward = () => {
  currentTime.value = Math.min(currentTime.value + 30, duration.value)
}

watch(ended, (hasEnded) => {
  if (hasEnded) {
    currentTime.value = 0
  }
})

const togglePlay = () => {
  if (audio.value) {
    if (playing.value) {
      audio.value.pause()
    } else {
      audio.value.play()
    }
  }
}

const toggleMute = () => {
  muted.value = !muted.value
}

const isLoading = computed(() => seeking.value)

const isDragging = ref(false)

const startDrag = (event: MouseEvent) => {
  isDragging.value = true
  document.addEventListener('mousemove', drag)
  document.addEventListener('mouseup', stopDrag)
  drag(event)
}

const drag = (event: MouseEvent) => {
  if (isDragging.value) {
    const progressBar = document.querySelector('.progress-bar') as HTMLElement
    const rect = progressBar.getBoundingClientRect()
    const percent = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width))
    currentTime.value = percent * duration.value
  }
}

const stopDrag = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', drag)
  document.removeEventListener('mouseup', stopDrag)
}
</script>

<template>
  <div class="audio-player">
    <audio ref="audio" />
    <div class="controls">
      <button @click="skipBackward" class="control-button skip-button" aria-label="Skip backward 15 seconds">
        <Rewind :size="20" />
        <span class="skip-text">15</span>
      </button>
      <button @click="togglePlay" class="control-button play-pause" :aria-label="playing ? 'Pause' : 'Play'">
        <Play v-if="!playing" :size="24" />
        <Pause v-else :size="24" />
      </button>
      <button @click="skipForward" class="control-button skip-button" aria-label="Skip forward 30 seconds">
        <FastForward :size="20" />
        <span class="skip-text">30</span>
      </button>
    </div>
    <div class="info">
      <h2 class="title">Make a Splash? With Dave Flemming</h2>
      <p class="show-info">The TK Show: A Show about sports in the Bay Area — November 29, 2023</p>
    </div>
    <div class="volume-controls">
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        v-model="volume"
        class="volume-slider"
        aria-label="Volume"
      />
      <button @click="toggleMute" class="control-button" :aria-label="muted ? 'Unmute' : 'Mute'">
        <Volume2 :size="20" />
      </button>
    </div>
    <div class="additional-controls">
      <button class="control-button" aria-label="Show information">
        <Info :size="20" />
      </button>
      <button class="control-button" aria-label="Show playlist">
        <List :size="20" />
      </button>
    </div>
    <div class="progress-bar" @click="seekAudio">
      <div class="progress" :style="{ width: `${progress}%` }"></div>
      <div 
        class="progress-ball" 
        :style="{ left: `${progress}%` }"
        @mousedown="startDrag"
        role="slider"
        :aria-valuenow="currentTime"
        :aria-valuemin="0"
        :aria-valuemax="duration"
        :aria-valuetext="`${formatTime(currentTime)} of ${formatTime(duration)}`"
      ></div>
    </div>
    <div class="time-display">
      {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
    </div>
    <div v-if="isLoading" class="loading-indicator" aria-live="polite">Loading...</div>
  </div>
</template>

<style scoped>
.audio-player-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.audio-player {
  background-color: #1a1a1a;
  color: white;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-family: Arial, sans-serif;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.control-button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.skip-button {
  position: relative;
}

.skip-text {
  position: absolute;
  font-size: 10px;
  bottom: -2px;
}

.play-pause {
  background-color: #333;
  border-radius: 50%;
  width: 40px;
  height: 40px;
}

.info {
  flex-grow: 1;
  margin: 0 15px;
}

.title {
  font-size: 16px;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.show-info {
  font-size: 12px;
  color: #999;
  margin: 0;
}

.volume-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.volume-slider {
  width: 80px;
  -webkit-appearance: none;
  appearance: none;
  background: #4a4a4a;
  outline: none;
  border-radius: 15px;
  height: 5px;
}

.volume-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 15px;
  height: 15px;
  background: white;
  border-radius: 50%;
  cursor: pointer;
}

.additional-controls {
  display: flex;
  gap: 10px;
  margin-left: 15px;
}

.progress-bar {
  width: 100%;
  height: 4px;
  background-color: #4a4a4a;
  margin-top: 10px;
  cursor: pointer;
  position: relative;
}

.progress {
  height: 100%;
  background-color: #1db954;
  position: absolute;
  top: 0;
  left: 0;
}

.progress-ball {
  width: 12px;
  height: 12px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}

.time-display {
  font-size: 12px;
  color: #999;
  margin-top: 5px;
  width: 100%;
  text-align: right;
}

.loading-indicator {
  margin-top: 10px;
  text-align: center;
}

@media (max-width: 768px) {
  .audio-player {
    flex-direction: column;
    align-items: stretch;
  }

  .info, .volume-controls, .additional-controls {
    margin: 10px 0;
  }

  .progress-bar {
    margin-top: 15px;
  }
}
</style>