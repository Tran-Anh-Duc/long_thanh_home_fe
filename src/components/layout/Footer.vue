<script setup lang="ts">
import { ref, onMounted } from 'vue'

const show = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show.value = true
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
  )

  const el = document.getElementById('footer')
  if (el) observer.observe(el)
})
</script>

<template>
  <footer
      id="footer"
      :class="[
      'bg-gradient-to-b from-[#0F5A3A] to-[#0A2F22] text-green-100',
      'transition-all duration-700 ease-out',
      show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
    ]"
  >
    <div class="max-w-7xl mx-auto px-6 py-16">
      <!-- TOP -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-10">
        <!-- BRAND -->
        <div class="transition-all duration-500 hover:-translate-y-1">
          <h3 class="text-xl font-semibold text-white">
            Long Thanh Home
          </h3>
          <p class="mt-4 text-sm leading-relaxed text-green-100/80">
            Đơn vị tư vấn & hỗ trợ hồ sơ nhà ở xã hội.
            Đồng hành cùng khách hàng minh bạch – đúng quy định.
          </p>
        </div>

        <!-- CONTACT -->
        <div class="transition-all duration-500 hover:-translate-y-1">
          <h4 class="text-sm font-semibold text-white uppercase">
            Liên hệ
          </h4>
          <ul class="mt-4 space-y-3 text-sm">
            <li>📍 199 Ngô Gia Tự, Việt Hưng, Hà Nội</li>
            <li>📞 0936 210 082</li>
            <li>📞 0936 210 072</li>
            <li>✉️ noxhtrungthai@gmail.com</li>
          </ul>
        </div>

        <!-- POLICY -->
        <div class="transition-all duration-500 hover:-translate-y-1">
          <h4 class="text-sm font-semibold text-white uppercase">
            Điều khoản
          </h4>
          <ul class="mt-4 space-y-3 text-sm">
            <li>
              <a
                  href="#"
                  class="relative inline-block
                       after:absolute after:left-0 after:-bottom-0.5
                       after:h-[1px] after:w-0 after:bg-green-400
                       after:transition-all after:duration-300
                       hover:after:w-full"
              >
                Về chúng tôi
              </a>
            </li>
            <li>
              <a
                  href="#"
                  class="relative inline-block
                       after:absolute after:left-0 after:-bottom-0.5
                       after:h-[1px] after:w-0 after:bg-green-400
                       after:transition-all after:duration-300
                       hover:after:w-full"
              >
                Chính sách bảo mật
              </a>
            </li>
            <li>
              <a
                  href="#"
                  class="relative inline-block
                       after:absolute after:left-0 after:-bottom-0.5
                       after:h-[1px] after:w-0 after:bg-green-400
                       after:transition-all after:duration-300
                       hover:after:w-full"
              >
                Điều khoản sử dụng
              </a>
            </li>
          </ul>
        </div>

        <!-- SUBSCRIBE -->
        <div class="transition-all duration-500 hover:-translate-y-1">
          <h4 class="text-sm font-semibold text-white uppercase">
            Nhận thông tin mới
          </h4>

          <form class="mt-4 space-y-3">
            <input
                type="text"
                placeholder="Họ và tên"
                class="w-full rounded-lg bg-[#0B3D2E]
                     px-4 py-3 text-sm text-white
                     placeholder-green-200/70
                     transition-shadow duration-300
                     focus:outline-none focus:ring-2 focus:ring-green-400
                     focus:shadow-[0_0_0_3px_rgba(34,197,94,0.25)]"
            />
            <input
                type="email"
                placeholder="Email"
                class="w-full rounded-lg bg-[#0B3D2E]
                     px-4 py-3 text-sm text-white
                     placeholder-green-200/70
                     transition-shadow duration-300
                     focus:outline-none focus:ring-2 focus:ring-green-400
                     focus:shadow-[0_0_0_3px_rgba(34,197,94,0.25)]"
            />
            <button
                type="submit"
                class="w-full rounded-lg bg-green-500
                     py-3 text-sm font-semibold text-white
                     transition-all duration-300
                     hover:bg-green-600
                     hover:-translate-y-0.5
                     hover:shadow-lg"
            >
              Đăng ký nhận tin
            </button>
          </form>
        </div>
      </div>

      <!-- DIVIDER -->
      <div
          class="mt-14 border-t border-green-900/60 pt-6
               text-center text-sm text-green-200/70"
      >
        © 2025 Long Thanh Home. All rights reserved.
      </div>
    </div>
  </footer>
</template>
