<template>
  <div class="menu">
    <div class="menu-container">
      <div class="options">
        Add your subreddit :
        <div class="add">
          r/<input type="text" placeholder="subreddit" disabled />
        </div>
        <span>"Enter" to save</span>
        <div class="subreddits">
          <span>r/webdev <i class="fas fa-times"></i></span>
          <span>r/gaming <i class="fas fa-times"></i></span>
          <span>r/funny <i class="fas fa-times"></i></span>
          <span>r/humansbeingbros <i class="fas fa-times"></i></span>
          <span>r/instant_regret <i class="fas fa-times"></i></span>
          <span>r/aww <i class="fas fa-times"></i></span>
          <span>r/mildlyinfuriating <i class="fas fa-times"></i></span>
          <span>r/natureisfuckinglit <i class="fas fa-times"></i></span>
        </div>
        <span>these will be user specified in next update</span>
      </div>
      <div class="options">Data Saver<span>on by default</span></div>
      <div class="options btn-options" @click="hideMenu">Cancel</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    hideMenu() {
      this.$emit('menu', false)
    }
  }
}
</script>

<style scoped>
.menu {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(10, 10, 10, 0.4);
  z-index: 4;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.menu-container {
  padding: 3vh 2vw;
  background: rgb(35, 35, 35);
  width: 38vw;
  height: auto;
  margin: 0 auto;
  border-radius: 10px;
}

.options {
  color: rgb(200, 200, 200);
  font-size: 16px;
  padding: 6px 12px;
  border-radius: 5px;
  margin: 5px 0;
  transition: 0.1s ease-in-out;
}

.options span {
  display: block;
  font-size: 10px;
  color: rgb(200, 200, 200) !important;
}

.options:hover {
  cursor: not-allowed;
}

.btn-options:hover {
  cursor: pointer;
  color: rgb(254, 254, 254);
}

.add {
  margin: 10px 0;
  font-size: 15px;
  background: rgb(40, 40, 40);
  border-radius: 5px;
  padding: 8px 10px;
  margin-bottom: 5px;
}

.add input {
  font-size: 15px;
  padding: 2px 8px;
  background: transparent;
  border-radius: 5px;
  border: 0;
  font-family: 'Lexend Deca', sans-serif;
  width: 92%;
  color: rgb(254, 254, 254);
}

.add input:focus {
  outline: none;
}

.subreddits {
  margin-top: 5px;
}

.subreddits span {
  display: inline-block;
  padding: 4px 10px;
  background: rgb(45, 45, 45);
  font-size: 12px;
  margin: 5px 0;
  margin-right: 5px;
  border-radius: 50px;
}

.subreddits span i {
  font-size: 11px;
  margin-left: 2px;
  transition: 0.2s ease-in-out;
}

@media (max-width: 800px) {
  .menu-container {
    width: 88vw;
    padding: 15px 2vw;
  }
  .options {
    font-size: 15px;
    padding: 4px 10px;
  }
  .add {
    margin: 6px 0;
    font-size: 14px;
    padding: 6px 8px;
  }
  .add input {
    font-size: 14px;
  }
  .subreddits span {
    padding: 3px 8px;
    font-size: 11px;
    margin-right: 4px;
  }
  .subreddits span i {
    font-size: 10px;
  }
}
</style>
