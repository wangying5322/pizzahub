<template>
<div>
	<m-header></m-header>
    <sider @droped='showWidget'></sider>
    <div class="content-body" >
      <!-- <button type="" @click="sendtochild(hhh)">change</button> -->
      <ul ref="showpanel">
        <li class="widget" v-for="(item,index) in widgets" v-show="!item.deleted">
         <span class="iconfont icon-delete" @click="deleted(item)"></span>
          <div>
            <component 
            v-bind:is="item.template"  
            :sourcesName='item.sources'
            :sources='sources'
            :index='index'
            @binded="fromchild">
            </component>
          </div>
        </li>
      </ul>
    </div>
</div>
</template>

<script>
import dragula from 'dragula'
import MHeader from 'components/m-header'
import Sider from 'components/sider'
import Pic from 'components/widgets/pic'
import Words from 'components/widgets/words'
import Chart from 'components/widgets/chart'
import Video from 'components/widgets/video'
import * as io from 'socket.io-client'
import {mapMutations} from 'vuex'

export default {
  data() {
    return {
      widgets: [],
      sources: [],
      scflag: false, // socket
      url: 'http://localhost:8089/',
      socket: null,
      dataSource: [] // 在本地记录注册过的数据源
    }
  },
  components: {
    MHeader,
    Sider,
    Pic,
    Words,
    Chart,
    Video
  },
  methods: {
    getSources() {
      var _this = this
      this.$http.get('../../static/sources.json').then(function(res) {
        console.log(res)
        _this.sources = res.body
        // console.log(_this.sources)
      })
    },
    showWidget: function(i) {
      var widget = {}
      widget.imgsrc = i.iconImg
      widget.text = i.servName
      widget.template = i.template
      widget.sources = i.sources
      widget.deleted = false
      this.widgets.push(widget)
    },
    ...mapMutations({
      socketConnect: 'SOCKET_CONNECT'
    }),
    createIo (url, io, value) {
      this.socket = io.connect(this.url)

      this.socket.on('connect', function() {
        this.scflag = value
        
        if (this.scflag) {
          this.socketConnect(true)
          console.log(`state标志位： ${this.$store.state.socketConnectedFlag}`)
        } else {
          console.log('内部监听失败')
        }
      }.bind(this))
      var _this = this
      this.socket.on('datacome', function(data) {
        // console.log(data)
        // console.log(`data.name: ${data.name}`)
        // console.log(`data.data: ${data.data}`)
        _this.sendtochild(data.name, data.data)
      })
    },
    sendtochild(dsname, data) {
      // console.log('sendtochild')
      // this.$set(this.sources, dsname, '../static/image/default.jpg')
      if (!this.dataSource[dsname]) {
        console.log('this datasourcename has not been registered')
      } else if (this.dataSource[dsname].length === 0) {
        console.log('widgets binded the datasourcename do not exist')
      } else {
        // this.$set(this.sources, dsname, '../static/image/default.jpg')
        this.$set(this.sources, dsname, data)
      }
    },
    sendtoserv(data) {
      this.socket.emit('bind', data)
    },
    fromchild(dsname, dsindex) {
      if (!this.dataSource[dsname]) {
        this.dataSource[dsname] = []
        this.sendtoserv(dsname) 
      }
      this.dataSource[dsname].push(dsindex)
      // console.log(this.dataSource)   
    },
    deleted(deleteitem) {
      deleteitem.deleted = true
    }
    // fromserv(dsname, data) {
    //   this.sendtochild(dsname, data)
    // }
  },
  computed: {
  },
  mounted() {
    dragula([this.$refs.showpanel])
    this.createIo(this.url, io, true)
  },
  created() {
    // this.createIo(this.url, io, true)
    this.getSources()
  },
  watch: {
    widgets: function() {
      console.log('widgets are changed')
    }
  }
}
</script>

<style>
.content-body{
  height: 100%;
  padding: 20px 0px 50px 90px;
}
.widget{
	display: inline-block;
  vertical-align: top;
	width: 22%;
	height: 216px;
	padding: 2px;
	margin: 10px;
	border: 1px solid #eee;
}
.icon-delete{
  float: right;
}
/* Dragula CSS  */
.gu-mirror {
  position: fixed !important;
  margin: 0 !important;
  z-index: 9999 !important;
  opacity: 0.8;
    list-style-type: none;
}

.gu-hide {
  display: none !important;
}

.gu-unselectable {
  -webkit-user-select: none !important;
  -moz-user-select: none !important;
  -ms-user-select: none !important;
  user-select: none !important;
}

.gu-transit {
  opacity: 0.2;
}

</style>