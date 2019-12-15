<template>
  <div id="upload-area" @dragenter="drag" @dragover="drag" @drop="drag" @dragleave="drag">
    <div class="drop-it-hot" id="drop-area" :class="{'dragging': counter}">
      <div class="circle">
        <svg
          fill="currentColor"
          height="24"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
        </svg>
      </div>
      <label>拖曳檔案上傳</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'upload-area',
  data: () => ({
    counter: 0
  }),
  methods: {
    drag(e) {
      e.preventDefault();
      switch (e.type) {
        case 'dragenter':
          this.counter++;
          break;
        case 'drop':
          this.counter = 0;
          this.$emit('dropfile', e);
          break;
        case 'dragleave':
          this.counter--;
          if (this.counter == 0)
            this.$emit('leave');
          break;
      }
    }
  }
};
</script>

<style lang="scss">
#upload-area {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 25%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .dragging {
    .circle {
      transform: scale(1.2);
      opacity: 0.9;
    }
    .circle:before {
      transform: scale(8);
      opacity: 1;
    }
    .circle:after {
      border: 3px solid white;
    }
    .circle svg {
      color: white;
      z-index: 1;
    }
    label {
      color: white;
    }
  }
  label {
    position: relative;
    top: 100px;
    font-size: 20px;
    z-index: 10;
    color: gray;
  }

  * {
    padding: 0;
    margin: 0;
  }

  .drop-it-hot {
    background-color: white;
    border-radius: 15px;
    width: 400px;
    height: 300px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 15px 0 rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  .drop-it-hot:after {
    content: "";
    position: absolute;
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    border: 2px dashed #e6e7f0;
    border-radius: 5px;
    z-index: 0;
  }
  .drop-it-hot .circle {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    position: absolute;
    color: #4a90e2;
    background-color: white;
    border: 3px solid #e6e7f0;
    width: 100px;
    height: 100px;
  }

  .circle {
    transition: transform 150ms ease-in;
    z-index: 10;
  }
  .circle svg {
    width: 40px;
    height: 40px;
  }
  .circle:before {
    content: "";
    background-color: #4a90e2;
    width: 130px;
    height: 130px;
    border-radius: 50%;
    position: absolute;
    opacity: 0;
    transition: transform 250ms ease-in, opacity 200ms ease-in;
    z-index: 0;
  }
  .circle:after {
    content: "";
    position: absolute;
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  .highlight:before {
    transform: scale(8);
    opacity: 1;
  }
  .highlight:after {
    border: 3px solid white;
  }
  .highlight svg {
    color: white;
    z-index: 1;
  }
}
</style>