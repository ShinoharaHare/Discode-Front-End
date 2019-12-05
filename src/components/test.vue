<template>
  <modal name="test" :width="620" :height="402" @before-open="beforeOpen">
    <div>
      <h1>{{title}}</h1>
    </div>
  </modal>
</template>

<script>
export default {
  name: "test",
  data: () => ({
    title: ""
  }),
  methods: {
    beforeOpen(e) {
      this.title = e.params.title;
    }
  }
};
</script>