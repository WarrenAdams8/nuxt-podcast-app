<template>
  <div class="min-h-screen bg-white dark:bg-gray-950">
    <AppSidebar />

    <!-- Main content area with proper margin for sidebar and audio player -->
    <main class="ml-64 pb-20"> <!-- 64 = sidebar width (w-64), 20 = audio player height -->
      <div class="p-6">
        <NuxtPage />
      </div>
    </main>

    <!-- Audio player at the bottom -->
    <AudioPlayer />
  </div>
</template>
<style>
@import "tailwindcss";
@import "@nuxt/ui";
</style>
