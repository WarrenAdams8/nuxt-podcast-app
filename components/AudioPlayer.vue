<template>
  <div class="fixed bottom-0 left-0 right-0 z-50">
    <div class="w-full bg-gray-900/95 backdrop-blur-md border-t border-gray-800 px-4 pt-2 pb-4">
      <audio ref="audio" :src="audioSrc" />

      <div class="flex items-start lg:items-center">
        <!-- Track Info - Left aligned -->
        <TrackInfo />

        <!-- Progress and Controls - Centered -->
        <div class="flex-1 flex flex-col items-center">
          <!-- Progress Bar Container -->
          <div class="w-full max-w-2xl px-6 mb-3">
            <!-- Loading Spinner when waiting -->
            <div v-if="waiting" class="flex justify-center py-2">
              <UIcon
                name="i-heroicons-arrow-path"
                class="w-6 h-6 text-gray-400 animate-spin"
              />
            </div>
            <!-- Slider when not waiting -->
            <template v-else>
              <USlider
                v-model="sliderValue"
                :min="0"
                :max="duration"
                :step="0.1"
                @update:model-value="store.handleSeek"
              />
              <div class="flex justify-between text-xs text-gray-400 mt-1">
                <span>{{ store.formatTime(currentTime) }}</span>
                <span>{{ store.formatTime(duration) }}</span>
              </div>
            </template>
          </div>

          <!-- Controls -->
          <div class="flex items-center justify-center space-x-6">
            <UButton
              color="white"
              variant="ghost"
              :disabled="waiting"
              @click="store.skipBackward"
            >
              <div class="flex items-center text-sm">
                <span class="i-heroicons-backward-15 mr-1" />
                15
              </div>
            </UButton>
            <UButton
              color="white"
              variant="ghost"
              size="xl"
              :disabled="waiting"
              :icon="playing ? 'i-heroicons-pause' : 'i-heroicons-play'"
              @click="playing = !playing"
            />
            <UButton
              color="white"
              variant="ghost"
              :disabled="waiting"
              @click="store.skipForward"
            >
              <div class="flex items-center text-sm">
                15
                <span class="i-heroicons-forward-15 ml-1" />
              </div>
            </UButton>
          </div>
        </div>

        <!-- Empty div for balance -->
        <div class="w-72 flex-shrink-0 hidden lg:block"></div>
      </div>
    </div>
  </div>

  <!-- Spacer -->
  <div :style="{ height: isCollapsed ? '64px' : '140px' }" class="w-full"></div>
</template>

<script setup>
const audio = ref()
const isCollapsed = ref(false)
const sliderValue = ref(0)

const store = useAudioPlayerStore()
const { audioSrc, playing, currentTime, duration, waiting } = storeToRefs(store)

onMounted(() => {
  if (audio.value) {
    store.setAudioRef(audio.value)
  }
})

watch(currentTime, (newTime) => {
  sliderValue.value = newTime
})

</script>
