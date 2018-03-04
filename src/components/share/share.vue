<template>
  <div>
    <transition name="share" v-on:after-leave="deleteNode">
      <div v-if="show" class="share">
        <div class="share-row">
          <div class="share-header">
            <h3>分享到</h3>
          </div>
          <hr/>
          <icon :category_tag="items" :row="3">
          </icon>
        </div>
        <button class="share-cancel" @click="shareOff">取消</button>
      </div>
    </transition>
  </div>
</template>

<script>
  import Icon from '../icon';

  export default {
    name: 'share',
    components: {
      Icon
    },
    props: {
      path: {
        type: String
      }
    },
    data () {
      return {
        items: [
          {message: '新浪微博', iconType: 'am-danger am-icon-weibo'},
          {message: 'QQ好友', iconType: 'am-primary am-icon-qq'},
          {message: 'QQ空间', iconType: 'am-warning am-icon-star'},
          {message: '腾讯微博', iconType: 'am-secondary am-icon-tencent-weibo'},
          {message: '微信', iconType: 'am-success am-icon-weixin'},
          {message: '人人网', iconType: 'am-primary am-icon-renren'}
        ],
        show: false,
        addNode: document.createElement('div')
      }
    },
    mounted () {
      this.shareOn();
      this.shareContent();
    },
    methods: {
      shareOn () {
        this.show = true;
        let cover = document.createElement('div');
        cover.style = 'width:100%;height:100%;background-color:rgba(0,0,0,0.6);position:fixed;left:0;top:0;z-index:1150;';
        document.body.appendChild(cover);
        this.addNode = cover;
        cover.addEventListener('click', this.shareOff);
      },
      shareOff () {
        this.show = false;
      },
      deleteNode () {
        this.addNode.parentNode.removeChild(this.addNode);
      },
      shareContent () {
        let p = {
          url: 'http://138.68.248.224/xadmin/', /* 获取URL，可加上来自分享到QQ标识，方便统计 */
          desc: '亲，快来看看我喜欢的课程', /* 分享理由(风格应模拟用户对话),支持多分享语随机展现（使用|分隔） */
          title: '青学教育课程', /* 分享标题(可选) */
          summary: '这是在青学网上看到的内容', /* 分享摘要(可选) */
          pics: 'https://avatars0.githubusercontent.com/u/27533910?s=460&v=4', /* 分享图片(可选) */
          flash: '', /* 视频地址(可选) */
          site: '青学教育' /* 分享来源(可选) 如：QQ分享 */
        };
        let url = 'http://connect.qq.com/widget/shareqq/index.html?';
        for (let i in p) {
          if (p[i]) {
            url += i + '=';
            url += encodeURIComponent(p[i] || '');
            if (i !== 'site') {
              url += '&';
            }
          }
        }
        this.items[1].url = url;
        return url;
      }
    }
  }
</script>

<style scoped>
  .share-enter-active {
    animation: share-in 600ms;
  }

  .share-leave-active {
    animation: share-in 400ms reverse;
  }

  @keyframes share-in {
    from {
      position: fixed;
      bottom: -200px;
    }
    to {
      bottom: 20px;
    }
  }

  .share {
    width: 100%;
    max-width: 450px;
    position: fixed;
    bottom: 20px;
    z-index: 1200;
  }

  .share-row {
    margin: 0 5%;
    background-color: white;
    border-radius: 10px;
    text-align: center;
  }

  hr {
    margin: 2% 0;
  }

  h3 {
    padding: 3% 0 0 0;
    margin: 0;
    color: gray;
  }

  .share-cancel {
    width: 90%;
    height: 40px;
    margin: 0 5%;
    font-size: larger;
    background-color: white;
    color: gray;
    border: none;
    border-radius: 10px;
  }
</style>
