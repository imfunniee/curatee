<template>
  <div>
    <Menu v-if="menu" @menu="hideMenu" />
    <div class="header">
      <button @click="showMenu"><i class="fas fa-bars"></i></button>
      <h1>curatee<sup>beta</sup></h1>
      <h4>
        story mode for your favorite subreddits feed
      </h4>
    </div>
    <div class="side">
      <div class="about">
        <ul>
          <li>
            <h3 id="title">
              loading...
            </h3>
            <h4 id="subreddit"></h4>
          </li>
        </ul>
      </div>
    </div>
    <div class="content_area">
      <swiper :options="swiperOption" class="swiper-box" ref="mySwiper">
        <div class="swiper-pagination" slot="pagination"></div>
        <swiper-slide
          class="swiper-item"
          v-for="item in somedata"
          :key="item.data.id"
        >
          <div class="media" :id="'media_' + item.data.id">
            <div
              v-if="
                item.data.domain == 'gfycat.com' ||
                  item.data.is_video == true ||
                  item.data.post_hint == 'video' ||
                  (item.data.url.search(/gif/i) != -1 &&
                    item.data.domain == 'i.imgur.com')
              "
              class="play_btn"
            >
              <i
                class="fas fa-play"
                @click="playVideo(item.data, item.data.id)"
              ></i>
              <video
                :id="'video_' + item.data.id"
                style="width:100%;height:100%;outline:none;display:none;"
                @waiting="pauseAudio(item.data.id)"
                autoplay
                loop
              ></video>
              <audio
                :id="'audio_' + item.data.id"
                style="display:none;"
                autoplay
                loop
              ></audio>
            </div>
            <div
              class="image"
              v-if="item.data.preview != undefined"
              :style="{
                background: 'url(' + getURL(item.data) + ') center center'
              }"
            ></div>
            <div
              v-if="
                item.data.post_hint == null ||
                  (item.data.post_hint == 'link' && item.data.media != null)
              "
              class="no_media"
            >
              no media
            </div>
          </div>
        </swiper-slide>
        <div class="swiper-pagination mobile" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import Menu from '~/components/Menu'

export default {
  name: 'index',
  components: {
    swiper,
    swiperSlide,
    Menu
  },
  data() {
    return {
      swiperOption: {
        direction: 'horizontal',
        slidesPerView: 1,
        spaceBetween: 0,
        mousewheel: true,
        keyboard: {
          enabled: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'progressbar'
        },
        onSlideChangeEnd: function() {
          this.onSwipe()
        }
      },
      somedata: [],
      menu: false
    }
  },
  methods: {
    showMenu() {
      this.menu = true
    },
    hideMenu() {
      this.menu = false
    },
    // gets the thumbnail url
    getURL(str) {
      if (str == undefined || str.preview == undefined) {
        return ''
      } else {
        if (str.preview.images[0].resolutions[4] != undefined) {
          return str.preview.images[0].resolutions[4].url.replace(/&amp;/g, '&')
        } else {
          if (str.preview.images[0].resolutions[1] == undefined) return
          return str.preview.images[0].resolutions[1].url.replace(/&amp;/g, '&')
        }
      }
    },
    // pauses audio of a video, the audio doesnt work sometime #helpwanted
    pauseAudio(id) {
      document.querySelector(`#audio_${id}`).pause()
    },
     // plays the video
    playVideo(data, id) {
      var url = ''
      var audio = ''
      if (data.domain == 'gfycat.com' || data.domain == 'i.imgur.com') {
        url = data.preview.reddit_video_preview.fallback_url
        audio = ''
      } else {
        url = data.media.reddit_video.fallback_url
        audio = data.url + '/audio' // gets the audio file
      }
      document.querySelector(
        `#media_${id}`
      ).childNodes[0].childNodes[2].src = url
      document.querySelector(
        `#media_${id}`
      ).childNodes[0].childNodes[4].src = audio
      document.querySelector(`#media_${id}`).childNodes[0].style.background =
        '#000'
      document.querySelector(
        `#media_${id}`
      ).childNodes[0].childNodes[0].style.display = 'none'
      document.querySelector(
        `#media_${id}`
      ).childNodes[0].childNodes[2].style.display = 'inherit'
      document.querySelector(`#media_${id}`).childNodes[0].childNodes[2].play()
      document.querySelector(`#media_${id}`).childNodes[0].childNodes[4].play()
    },
    // the function syncs audio with video (yes, audio/video files are seperate) and changes the title in sidebar
    onSwipe(v) {
      document.querySelector('#title').innerHTML = this.somedata[
        v.swiper.activeIndex
      ].data.title
      document.querySelector(
        '#subreddit'
      ).innerHTML = `<a href="https://reddit.com${
        this.somedata[v.swiper.activeIndex].data.permalink
      }" target="_blank" title="https://reddit.com${
        this.somedata[v.swiper.activeIndex].data.permalink
      }" style="color: rgb(180, 180, 180);text-decoration: none;">${
        this.somedata[v.swiper.activeIndex].data.subreddit_name_prefixed
      }</a>`
      var videos = document.getElementsByTagName('video')
      var audios = document.getElementsByTagName('audio')
      if (videos.length >= 1) {
        for (var i = 0; i < videos.length; i++) {
          videos[i].pause()
        }
      }
      if (audios.length >= 1) {
        for (var i = 0; i < audios.length; i++) {
          audios[i].pause()
        }
      }
      if (
        document.getElementsByClassName('swiper-item')[v.swiper.activeIndex]
          .childNodes[0].childNodes[0].childNodes.length !== 0 &&
        document
          .getElementsByClassName('swiper-item')
          [
            v.swiper.activeIndex
          ].childNodes[0].childNodes[0].childNodes[2].tagName.toLowerCase() ==
          'video'
      ) {
        document
          .getElementsByClassName('swiper-item')
          [
            v.swiper.activeIndex
          ].childNodes[0].childNodes[0].childNodes[2].play()
        document
          .getElementsByClassName('swiper-item')
          [
            v.swiper.activeIndex
          ].childNodes[0].childNodes[0].childNodes[4].play()
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted() {
    // these will be user specified in next update
    var subreddits = [
      'humansbeingbros',
      'funny',
      'natureisfuckinglit',
      'instant_regret',
      'gaming',
      'aww',
      'mildlyinfuriating',
      'humansbeingbros'
    ]
    subreddits.forEach(element => {
      // get data from reddit
      this.$axios
        .$get(`https://www.reddit.com/r/${element}/top.json?limit=6`)
        .then(response => {
          console.log(response)
          response.data.children.forEach(data => {
            this.somedata.push(data)
            this.somedata.sort(function(a, b) {
              // sort that data
              return b.data.created - a.data.created 
            })
            console.log(this.somedata)
          })
          document.querySelector(
            '#title'
          ).innerHTML = this.somedata[0].data.title      // add title to sidebar
          document.querySelector(
            '#subreddit'
          ).innerHTML = `<a href="https://reddit.com${this.somedata[0].data.permalink}" target="_blank" title="https://reddit.com${this.somedata[0].data.permalink}" style="color: rgb(120, 120, 120);text-decoration: none;">${this.somedata[0].data.subreddit_name_prefixed}</a>` // add subreddit link to sidebar
        })
        .catch(error => {
          if (error) throw error
        })
    })

    this.swiper.on('slideChange', () => {
      this.onSwipe(this)
    })
  }
}
</script>

<style lang="scss" scoped>
.side {
  margin: 0;
  width: 32vw;
  height: 100vh;
  padding: 3vh 0px;
  padding-right: 2vw;
  z-index: 1;
  position: relative;
  background: linear-gradient(0deg, rgb(12, 12, 12), rgb(5, 5, 5));
  color: rgb(245, 245, 245);
}

.side ul {
  list-style: none;
  display: block;
  margin: 0;
}

.header {
  width: 99vw;
  padding: 3vh 0.5vw;
  position: fixed;
  top: 0;
  left: 0;
  text-align: left;
  z-index: 3;
}

.header button {
  background: transparent;
  color: #fff;
  border: 0;
  font-size: 21px;
  padding: 12px 15px;
  border-radius: 50%;
  transition: 0.2s ease-in-out;
  outline: 0;
}

.header button:hover {
  background: rgba(255, 255, 255, 0.1);
  cursor: pointer;
}

.header h1 {
  font-size: 32px;
  background: url(https://images.unsplash.com/photo-1566041510394-cf7c8fe21800?w=1900&q=80)
    center center;
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  display: inline-block;
  position: relative;
  bottom: -1px;
}

.header h1 sup {
  font-size: 12px;
}

.header h4 {
  margin-top: 0;
  margin-left: 1vw;
  width: 28vw;
  color: rgb(68, 68, 68);
}

.about {
  position: fixed;
  width: 30vw;
  bottom: 3vh;
}

.about ul {
  margin: 1vh 0px;
}

.about ul h3 {
  font-weight: normal;
}

.about ul h4 {
  margin-top: 1vh;
  font-weight: normal;
}

.about ul li {
  display: inline-block;
  margin: 1vh 0px;
}

.content_area {
  width: 68vw;
  height: 100vh;
  background: rgb(18, 18, 18);
  position: fixed;
  top: 0;
  right: 0;
  z-index: 0;
  color: rgb(60, 60, 60);
  font-size: 15px;
  display: flex;
  vertical-align: center;
  justify-content: center;
  align-items: center;
}

.media {
  width: 68vw;
  height: 100vh;
  display: flex;
  vertical-align: center;
  justify-content: center;
  align-items: center;
}

.image {
  width: 100%;
  height: 100vh;
  background-size: contain !important;
  background-repeat: no-repeat !important;
  margin: 5vh auto;
}

.no_media {
  width: 90%;
  margin: 5vh auto;
  text-align: center;
  display: block;
  position: absolute;
  z-index: 2;
}

.play_btn {
  color: #fff;
  display: flex;
  vertical-align: center;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  position: absolute;
  background: rgba(10, 10, 10, 0.3);
}

.play_btn i {
  padding: 2vh 2vw;
}

.play_btn i:hover {
  cursor: pointer;
}

.swiper-box {
  width: 100vw;
  height: 100%;
  margin: 0 auto;
}

.swiper-item {
  height: 100%;
  width: 100%;
  font-size: 1.6rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  text-align: center;
  background-size: cover !important;
  background-repeat: no-repeat;
}

.swiper-pagination {
  /deep/ .swiper-pagination-progressbar-fill {
    background: #fff;
  }
}

@media (max-width: 800px) {
  .side {
    width: 100vw;
    height: fit-content;
    padding-right: 0;
    position: fixed;
    bottom: 0;
    background: transparent;
  }
  .header {
    position: relative;
    width: 100vw;
    padding: 1.5vh 4vw;
    background: rgb(5, 5, 5);
    height: auto;
    text-align: center;
  }
  .header button {
    font-size: 17px;
    left: 2vw;
    position: absolute;
    padding: 6px 8px;
  }
  .header h1 {
    font-size: 25px;
    top: -2px;
  }
  .header h4 {
    display: none;
  }
  .content_area {
    width: 100vw;
    height: 93vh;
    top: 7vh;
  }
  .media {
    width: 100%;
    height: 100%;
  }
  .image {
    width: 100%;
    height: 100%;
    background-size: cover !important;
  }
  .about {
    width: 100vw;
    position: relative;
    height: fit-content;
  }
  .about ul {
    padding: 1.5vh 4vw;
    position: fixed;
    bottom: -1.2vh;
    width: 100vw;
    background: linear-gradient(0deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  }
  #title {
    font-size: 18px;
    font-size: normal !important;
  }
  #subreddit {
    font-size: 15px;
    margin-top: 1vh;
    font-size: normal !important;
  }
}
</style>
