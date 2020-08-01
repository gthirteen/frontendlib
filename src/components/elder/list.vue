<template>
<!-- Default box -->
<div class="box">
  <div class="box-header table-bordered">
    <h3 class="box-title">老人信息列表</h3>
    <form>
      <div class="form-row">
        <div class="form-group  col-md-3">
          <label>Name</label>
          <input type="text" class="form-control" v-model="nameKey" v-on:change="getByCond">
        </div>
        <div class="form-group  col-md-3">
          <label>Room ID</label>
          <select class="form-control" v-model="roomid" v-on:change="getByCond">
            <option selected value>Any</option>
            <option v-for="rm in roomlist" :key="rm.id" :value="rm.id">{{rm.id}}</option>
          </select>
        </div>
        <div class="form-group  col-md-3">
          <label>Start birthday</label>
          <input type="date" class="form-control" v-model="startBirthday" v-on:change="getByCond">
        </div>
      </div>
    </form>
    <div class="dataTables_info">Result count: {{this.count}}</div>
    <div class="dataTables_info">Page: {{this.page}}/{{this.pageCount}}</div>
    <div class="box-body">
      <table class="table table-bordered table-striped">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Sex</th>
          <th scope="col">Birthday</th>
          <th scope="col">Room id</th>
          <th scope="col">Operation</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="em in elderlist" v-bind:key="em.id">
          <td>{{em.id }}</td>
          <td>{{em.name }}</td>
          <td>{{em.sex }}</td>
          <td>{{em.birthday }}</td>
          <td>{{em.room.id }}</td>
          <td>
            <router-link v-bind:to="'/elder/modify/'+em.id" class="btn btn-info">Modify</router-link>
            <router-link v-bind:to="'/elder/view/'+em.id" class="btn btn-info">View</router-link>
            <a href="#" class="btn btn-danger" v-on:click="deleteElder(em.id)">Delete</a>
          </td>
        </tr>
      </tbody>
      </table>
      <a class="btn btn-primary" style="float: right;" href="#" v-on:click="toPage('e')">末页</a>
      <a class="btn btn-primary" style="float: right;" href="#" v-on:click="toPage('n')">下页</a>
      <a class="btn btn-primary" style="float: right;" href="#" v-on:click="toPage('p')">上页</a>
      <a class="btn btn-primary" style="float: right;" href="#" v-on:click="toPage('h')">首页</a>
    </div>
    <!-- /.box-body -->
  </div>
  <!--TODO-->
  <router-link to="/elder/add" class="btn btn-default">Add new</router-link>
</div>
<!-- /.box -->
</template>

<script>
export default {
    name:"ElderList",
    data() {
      return {
        roomlist: [],
        elderlist: [],
        page: 1,
        rows: 2,
        count: null,
        pageCount: null,
        // search condition
        startBirthday: null,
        endBirthday: null,
        startJoinDate: null,
        sex: null,
        roomid: null,
        nameKey: null
      };
    },
    created() {
      this.getRoomList();
      this.getList();
    },
    methods: {
      toPage(ch) {
        switch(ch) {
          case 'h':
            this.page = 1;
            break;
          case 'p':
            if (this.page>1) this.page--;
            break;
          case 'n':
             if (this.page<this.pageCount) this.page++;
            break;
          case 'e':
            this.page = this.pageCount;
            break;
          default:
            // code block
        }
        //this.getList();
        this.getByCond();
      },
      getByCond() {
        this.AxiosJSON.get("/elder/getbycond", {
          params:{
            rows: this.rows,
            page: this.page,
            startBirthday: this.startBirthday,
            endBirthday: this.endBirthday ,
            sex: this.sex ,
            roomid: this.roomid,
            nameKey: this.nameKey
          }
        }).then(result => {
          console.log(result);
          this.elderlist = result.data.list;
          this.count = result.data.count;
          this.pageCount = result.data.pageCount;
          for (var i=0; i<this.elderlist.length; i+=1) {
            if (this.elderlist[i].birthday!=null) {
              this.elderlist[i].birthday = this.elderlist[i].birthday.split("T")[0];
            }
            if (this.elderlist[i].joinday!=null) {
              this.elderlist[i].joinday = this.elderlist[i].joinday.split("T")[0];
            }            
            // this.elderlist[i].leaveday = this.elderlist[i].leaveday.split("T")[0];
          }
        });
      },
      getList() {
        this.AxiosJSON.get("/elder/list/all/page", {
          params:{
            rows: this.rows,
            page: this.page
          }
        }).then(result => {
          console.log(result);
          this.elderlist = result.data.list;
          this.count = result.data.count;
          this.pageCount = result.data.pageCount;
          for (var i=0; i<this.elderlist.length; i+=1) {
            if (this.elderlist[i].birthday!=null) {
              this.elderlist[i].birthday = this.elderlist[i].birthday.split("T")[0];
            }
            if (this.elderlist[i].joinday!=null) {
              this.elderlist[i].joinday = this.elderlist[i].joinday.split("T")[0];
            }            
            // this.elderlist[i].leaveday = this.elderlist[i].leaveday.split("T")[0];
          }
        });
      },
      deleteElder(id) {
        let check = confirm("确定？");
        if (check) {
            this.AxiosJSON.post("/elder/delete", {id:id}).then(result => {
              if (result.data.status == "OK") {
                  alert("OK");
                  this.getList();
              } else {
                  alert("Oops");
              }
          });
        }
      },
      getRoomList() {
        this.AxiosJSON.get("/room/list/all", {
          params:{
            
          }
        }).then(result => {
          console.log(result);
          this.roomlist = result.data.list;
        });
      }
    }
}
</script>