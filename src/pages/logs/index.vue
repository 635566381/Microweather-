<template>
  <div class="weui-agree">
    <div class="content">
      <ul class="title">
        <li class="hr"></li>
        <li>身份验证</li>
        <li class="hr"></li>
      </ul>
      <div class="mar40" style="margin-top: 20px">
        <div class="inputs" :class="{phoneErr: pointPhone}">
          <input type="number" v-model="phone" maxlength="11" placeholder="请输入手机号">
        </div>
        <p class="err" v-if="pointPhone">请输入正确的手机号</p>
      </div>
      <div class="mar40">
        <div class="inputs " :class="{psdErr: pointpassword}">
          <input class="psw" password minlength="4" maxlength="20" v-model="password" placeholder="请输入密码">
        </div>
        <p class="err" v-if="pointpassword">密码错误</p>
      </div>
      
      <div @click="login" class="btn" :class="{active: isdisabledphone&&isdisabledpsw}">登录</div>
      <p class="txt">为了确保孩子的信息安全，需要对您的身份进行验证</p>
    </div>
    
    <!--<mp-panel
      :data-source="dataSource"
      title="图文组合列表"
    />-->
    <div class="footer">
      <div>达威科技 © <span v-text="time"></span> 小程序</div>
    </div>
  </div>
</template>
<style scoped>
  .mar40 {
    height: 100px;
    margin-bottom: 40px;
  }
  
  .err {
    font-size: 18px;
    text-align: left;
    color: red;
    padding-left: 40px;
  }
  
  .weui-agree {
    position: absolute;
    left: 0;
    right: 0;
    background-color: #1b7eed;
    height: 100%;
  }
  
  .btn {
    width: 100%;
    height: 80px;
    line-height: 80px;
    color: #fff;
    font-size: 32px;
    border-radius: 40px;
    background: #cfcfcf;
  }
  
  .btn.active {
    background: linear-gradient(90deg, #21b5fa, #1b7eed);
  }
  
  .inputs.phoneErr, .inputs.psdErr {
    border: 1px solid red;
  }
  
  .footer {
    position: fixed;
    bottom: 40px;
    left: 0;
    right: 0;
    font-size: 30px;
    color: #999;
    text-align: center;
  }
  
  .content .txt {
    position: absolute;
    bottom: 20px;
    color: #1b7eed;
    font-size: 26px;
  }
  
  .content {
    position: relative;
    text-align: center;
    width: 80%;
    margin: 1rem auto;
    min-height: 550px;
    padding: 40px;
    background: #fff;
    border-radius: 20px;
  }
  
  .content .title {
    display: flex;
    align-items: center;
    text-align: center;
    justify-items: center;
    justify-content: center;
    padding: 0 40px;
  }
  
  .content .title li {
    width: 40%;
  }
  
  .content .title li.hr {
    width: 30%;
    height: 2px;
    background: #ccc;
  }
  
  .inputs {
    height: 80px;
    line-height: 80px;
    background: #cfcfcf;
    border-radius: 40px;
    margin-bottom: 10px;
    border: 1px solid transparent;
  }
  
  .inputs input {
    padding-left: 40px;
    padding-right: 40px;
    height: 80px;
    line-height: 1;
    font-size: 30px;
    text-align: left;
    color: #222;
  }
  
  .psw {
    font-size: 20px;
  }
</style>
<script>
  
  export default {
    data() {
      return {
        logs: [],
        phone: '',
        password: '',
        isdisabledphone: false,
        pointPhone: false,
        pointpassword: false,
        isdisabledpsw: false,
        time: '',
      }
    },
    watch: {
      password() {
        if (this.password.length >= 4) {
          this.isdisabledpsw = true;
        } else {
          this.isdisabledpsw = false;
        }
      },
      phone() {
        if (this.phone.length > 11) {
          this.pointPhone = true;
          this.isdisabledphone = false;
          return;
        }
        if (this.phone.length < 11) {
          this.pointPhone = false;
          this.isdisabledphone = false;
          return
        }
        if (this.phone.length == 11) {
          if (/^1[345789]\d{9}$/.test(this.phone) == false) {
            this.pointPhone = true;
            this.isdisabledphone = false;
          } else {
            this.pointPhone = false;
            this.isdisabledphone = true;
          }
        }
      },
    },
    components: {},
    created() {
      const logs = (wx.getStorageSync('logs') || [])
      this.time = (new Date).getFullYear();
      //this.logs = logs.map(log => formatTime(new Date(log)))
    },
    methods: {
      login() {
        console.log(1);
      }
    }
  }
</script>


