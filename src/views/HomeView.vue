<template>
  <NavBar />
</template>

<script>
import { defineComponent } from 'vue';

// Components
import NavBar from '../components/NavBar';

export default defineComponent({
  name: 'HomeView',

  components: {
    NavBar,
  },
});
</script>
