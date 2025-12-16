<template>
  <header class="w-full bg-white border-b">
    <div class="mx-auto max-w-7xl px-6">
      <div class="flex h-20 items-center justify-between">

        <!-- LOGO -->
        <!-- LOGO -->
        <div class="flex items-center gap-3">
          <img
              src="/logo.png"
              alt="Long Thanh Home"
              class="h-12 w-auto object-contain"
          />
          <span class="text-lg font-semibold text-gray-900">
            Long Thanh Home
          </span>
        </div>

        <!-- MENU -->
        <nav class="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          <a href="/" class="hover:text-green-700">Trang chủ</a>
          <a href="/gioi-thieu" class="hover:text-green-700">Giới thiệu</a>
          <a href="/dich-vu" class="hover:text-green-700">Dịch vụ</a>
          <a href="/du-an" class="hover:text-green-700">Dự án</a>
          <a href="/tin-tuc" class="hover:text-green-700">Tin tức</a>
          <a href="/lien-he" class="hover:text-green-700">Liên hệ</a>
        </nav>

        <!-- ACTION -->
        <div class="flex items-center gap-3">
          <!-- Search icon kiểu ảnh mẫu -->
          <button
              class="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition"
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.8"
                stroke="currentColor"
                class="h-5 w-5 text-gray-600"
            >
              <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m21 21-4.35-4.35m1.6-5.15a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
              />
            </svg>
          </button>

          <!-- Menu mobile -->
          <button
              class="flex h-10 w-10 items-center justify-center rounded-full border text-gray-600 hover:bg-gray-100 md:hidden"
          >
            ☰
          </button>
        </div>

      </div>
    </div>
  </header>
</template>
