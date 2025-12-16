<template>
  <footer class="relative bg-gray-900 text-white">
    <!-- Overlay -->
    <div class="absolute inset-0 bg-black/60"></div>

    <div class="relative mx-auto max-w-7xl px-6 py-14">
      <div class="grid gap-10 md:grid-cols-3">

        <!-- CONTACT -->
        <div>
          <h3 class="mb-4 text-lg font-semibold uppercase">Thông tin liên hệ</h3>
          <ul class="space-y-2 text-sm text-gray-300">
            <li>Công ty TNHH BĐS Nhà ở xã hội Trung Thái</li>
            <li>📞 0936 210 082 (Hà Nội)</li>
            <li>📞 0936 210 072 (Tỉnh khác)</li>
            <li>✉️ noxhtrungthai@gmail.com</li>
            <li>📍 199 Ngô Gia Tự, Việt Hưng, Hà Nội</li>
          </ul>
        </div>

        <!-- POLICY -->
        <div>
          <h3 class="mb-4 text-lg font-semibold uppercase">Điều khoản & chính sách</h3>
          <ul class="space-y-2 text-sm text-gray-300">
            <li><a href="#" class="hover:text-white">Về chúng tôi</a></li>
            <li><a href="#" class="hover:text-white">Chính sách bảo mật</a></li>
            <li><a href="#" class="hover:text-white">Điều khoản sử dụng</a></li>
          </ul>
        </div>

        <!-- SUBSCRIBE -->
        <div>
          <h3 class="mb-4 text-lg font-semibold uppercase">Đăng ký nhận thông tin</h3>
          <form class="space-y-3">
            <input class="w-full rounded bg-white px-4 py-2 text-black" placeholder="Tên của bạn" />
            <input class="w-full rounded bg-white px-4 py-2 text-black" placeholder="Số điện thoại" />
            <input class="w-full rounded bg-white px-4 py-2 text-black" placeholder="Email" />
            <button class="w-full rounded bg-blue-600 py-2 font-semibold hover:bg-blue-700">
              Đăng ký
            </button>
          </form>
        </div>

      </div>

      <div class="mt-10 border-t border-white/20 pt-4 text-center text-sm text-gray-400">
        © 2025 Long Thanh Home. All rights reserved.
      </div>
    </div>
  </footer>
</template>
