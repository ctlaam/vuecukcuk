<template>
  <div>
    <div class="m-header">
      <div class="header-left">
        <div class="sidebar"></div>
        <div class="logo"></div>
      </div>
      <div class="header-right">
            <div class="content-right">
                <div class="sign-header-content">MB</div>
                    <select class="m-combobox combobox-header-content">
                        <option value="0">Chi nhánh MISA  miền Bắc</option>
                        <option value="1">Chi nhánh MISA  miền Nam</option>
                        <option value="2">Chi nhánh MISA  miền Khác</option>
                    </select>   
            </div>

            <div class="content-left">
                <img src="https://img.icons8.com/ios/344/appointment-reminders--v1.png" alt="" class="notification">
                <div class="dot-notification"></div>
                <div class="user-header">
                    <div class="avatar-user"><img src="@/assets/img/avatar-user.png" alt=""></div>
                    <div class="name-user"><p>Cao Thanh Lâm</p></div>

                </div>
                <div class="header-options"><i class="fa-solid fa-ellipsis"></i></div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheHeader",
};
</script>
<style scoped>
@import url("@/css/layout/header.css");

</style>
