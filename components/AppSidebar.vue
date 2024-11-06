<template>
    <aside class="fixed left-0 top-0 h-full w-64 bg-gray-100 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 p-4">
      <div class="flex flex-col h-full">
        <!-- Logo/Brand -->
        <div class="mb-8">
          <h1 class="text-xl font-bold">Podcast App</h1>
        </div>
  
        <!-- Navigation -->
        <nav class="flex-1">
          <ul class="space-y-2">
            <li>
              <NuxtLink
                to="/"
                class="flex items-center px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800"
                active-class="bg-gray-200 dark:bg-gray-800"
              >
                <UIcon name="i-heroicons-home" class="w-5 h-5 mr-3" />
                Home
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/discover"
                class="flex items-center px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800"
                active-class="bg-gray-200 dark:bg-gray-800"
              >
                <UIcon name="i-heroicons-globe-alt" class="w-5 h-5 mr-3" />
                Discover
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/library"
                class="flex items-center px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800"
                active-class="bg-gray-200 dark:bg-gray-800"
              >
                <UIcon name="i-heroicons-book-open" class="w-5 h-5 mr-3" />
                Library
              </NuxtLink>
            </li>
          </ul>
        </nav>
  
        <!-- Bottom section (optional) -->
        <div class="mt-auto pt-4">
          <UButton
            icon="i-heroicons-cog-6-tooth"
            color="primary"
            variant="ghost"
            class="w-full justify-start"
          >
            Settings
          </UButton>
        </div>
      </div>
    </aside>
  </template>