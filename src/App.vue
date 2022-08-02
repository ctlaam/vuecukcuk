<template>
<div>
<TheHeader/>
<TheNavbar/>
<TheContent/>
    
</div>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';
import TheNavbar from './components/layout/TheNavbar.vue';
import TheContent from './components/layout/TheContent.vue';

export default {
  name: 'App',
  components: {
    TheContent,TheHeader,TheNavbar
    
  }
}
</script>

<style>
@import url('./css/main.css');
</style>
