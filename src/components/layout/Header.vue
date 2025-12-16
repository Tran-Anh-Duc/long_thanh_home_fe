<template>
  <header class="w-full bg-white border-b">
    <div class="max-w-7xl mx-auto h-16 px-4 flex items-center justify-between">

      <!-- LOGO -->
      <div class="flex items-center gap-2">
        <img
            src="/logo.png"
            alt="NOXH Trung Thái"
            class="h-10 w-auto"
        />
      </div>

      <!-- MENU -->
      <nav class="hidden lg:flex items-center gap-6">
        <a class="menu-item" href="#">TRANG CHỦ</a>
        <a class="menu-item" href="#">GIỚI THIỆU</a>
        <a class="menu-item" href="#">DỊCH VỤ</a>
        <a class="menu-item" href="#">DỰ ÁN</a>
        <a class="menu-item" href="#">TIN TỨC</a>
        <a class="menu-item" href="#">THÔNG TIN VỀ NOXH</a>
        <a class="menu-item" href="#">TUYỂN DỤNG</a>
        <a class="menu-item" href="#">HỢP TÁC & GÓP VỐN</a>
        <a class="menu-item" href="#">LIÊN HỆ</a>
      </nav>

      <!-- ICON RIGHT -->
      <div class="flex items-center gap-2">
        <button class="icon-btn">🔍</button>
        <button class="icon-btn lg:hidden">☰</button>
      </div>

    </div>
  </header>
</template>

<style scoped>
.menu-item {
  font-size: 14px;
  font-weight: 600;
  color: #111;
  white-space: nowrap;
}
.menu-item:hover {
  color: #c49a6c;
}

.icon-btn {
  width: 36px;
  height: 36px;
  border-radius: 9999px;
  background: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
