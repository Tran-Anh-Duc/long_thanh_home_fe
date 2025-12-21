<template>
  <section
      class="relative py-24 bg-gradient-to-r from-[#0F4C81] to-[#1B3A57]"
  >
    <!-- Background overlay image -->
    <div
        class="absolute inset-0 bg-[url('/images/cta-bg.jpg')] bg-cover bg-center opacity-15"
    ></div>

    <div class="relative max-w-6xl mx-auto px-4">
      <!-- Card -->
      <div
          class="mx-auto max-w-4xl bg-white/95 backdrop-blur
               rounded-2xl shadow-2xl p-8 md:p-12"
      >
        <!-- Title -->
        <h2 class="text-center text-2xl md:text-3xl font-bold text-gray-800">
          Nhận tư vấn & báo giá NOXH
        </h2>
        <p class="mt-3 text-center text-gray-600">
          Điền thông tin, chuyên viên sẽ liên hệ và tư vấn miễn phí cho bạn
        </p>

        <!-- Form -->
        <form class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
              type="text"
              placeholder="Họ và tên"
              class="w-full rounded-lg border border-gray-300
                   px-4 py-3 focus:border-primary
                   focus:ring-2 focus:ring-primary/30 outline-none"
          />

          <input
              type="text"
              placeholder="Số điện thoại"
              class="w-full rounded-lg border border-gray-300
                   px-4 py-3 focus:border-primary
                   focus:ring-2 focus:ring-primary/30 outline-none"
          />

          <input
              type="email"
              placeholder="Email"
              class="w-full rounded-lg border border-gray-300
                   px-4 py-3 focus:border-primary
                   focus:ring-2 focus:ring-primary/30 outline-none"
          />

          <!-- Button -->
          <div class="md:col-span-3 mt-6 text-center">
            <button
                type="submit"
                class="inline-flex items-center justify-center
                     rounded-lg bg-[#0F4C81]
                     px-10 py-3 text-white font-semibold
                     hover:bg-[#1E88E5]
                     transition-all duration-300
                     shadow-lg hover:shadow-xl"
            >
              ĐĂNG KÝ TƯ VẤN NGAY
            </button>

            <!-- Trust badges -->
            <div class="mt-4 flex justify-center gap-6 text-sm text-gray-600">
              <!-- Free -->
              <div class="flex items-center gap-2">
                <span
                    class="flex h-5 w-5 items-center justify-center
                         rounded-full border border-green-500"
                >
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3.5 w-3.5 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                  >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                <span>Miễn phí 100%</span>
              </div>

              <!-- Secure -->
              <div class="flex items-center gap-2">
                <span
                    class="flex h-5 w-5 items-center justify-center
                         rounded-full bg-blue-100 text-blue-600"
                >
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-3.5 w-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                  >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4z"
                    />
                  </svg>
                </span>
                <span>Bảo mật thông tin khách hàng</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
