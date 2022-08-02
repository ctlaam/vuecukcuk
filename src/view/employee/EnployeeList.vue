<template>
  <div style="height: 100%">
    <div class="m-page-header">
      <div class="m-page-title">DANH SÁCH NHÂN VIÊN</div>
      <div class="m-page-btn">
        <button @click="btnAddOnClick" id="btn-add" class="m-btn m-btn-icon">
          <img class="m-icon-btn" src="@/assets/icon/add.png" alt="" />
          <div class="text-btn">Thêm nhân viên </div>
        </button>
      </div>
    </div>
    <div style="display: flex"></div>

    <div class="m-page-tool-bar">
      <div class="m-toolbar-left">
        <div id="m-input-search">
          <input
            type="text"
            class="m-input"
            id="search"
            placeholder="Tìm kiếm"
            v-model="search"
          />
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        <Combobox @functionSearchGender="functionSearchGender"  />

        <select
          class="m-combobox"
          property="DepartmentId"
          name=""
          id=""
          v-model="searchDepartment"
        >
          <option value="">Tất cả</option>
          <option
            v-for="dep in departments"
            :key="dep.DepartmentId"
            :value="dep.DepartmentId"
          >
            {{ dep.DepartmentName }}
          </option>

          <!-- <option value="6f0731d0-a27e-11ec-9b48-00163e06abee">
                  Phòng Nhân sự
                </option>
                <option value="17120d02-6ab5-3e43-18cb-66948daf6128">
                  Phòng kế toán
                </option>
                <option value="142cb08f-7c31-21fa-8e90-67245e8b283e">
                  Phòng Marketing
                </option> -->
        </select>
      </div>
      <div class="m-toolbar-right">
        <button
          id="btnDelete"
          class="m-btn-delete"
          @click="comfirmDeleteEmployee"
        ></button>
        <button @click="reloadData" class="m-btn-refresh"></button>
      </div>
    </div>
    <div class="m-grid">
      <div class="m-grid-table">
        <table id="tblEmployeeList" class="m-table">
          <thead>
            <tr>
              <th class="text-align-left" style="width: 50px" propName="STT">
                STT
              </th>
              <th
                class="text-align-left"
                style="width: 200px"
                propName="DepartmentName"
              >
                Phòng ban
              </th>
              <th
                class="text-align-left"
                style="width: 150px"
                propName="EmployeeCode"
              >
                Mã nhân viên
              </th>
              <th
                class="text-align-left"
                propName="EmployeeName"
                style="width: 220px"
              >
                Họ và tên
              </th>
              <th
                class="text-align-left"
                style="width: 150px"
                propName="GenderName"
              >
                Giới tính
              </th>
              <th
                class="text-align-left"
                style="width: 150px"
                propName="EmployeePosition"
              >
                Vị trí
              </th>
              <th
                class="text-align-left"
                style="width: 150px"
                propName="TelephoneNumber"
              >
                Số điện thoại
              </th>
              <th class="text-align-left" style="width: 150px" propName="Email">
                Email
              </th>
              <th
                class="text-align-center"
                style="width: 150px"
                propName="DateOfBirth"
                format="Date"
              >
                Ngày sinh
              </th>
              <th
                class="text-align-right"
                style="width: 150px"
                propName="Salary"
                format="Money"
              >
                Mức lương
              </th>
            </tr>
          </thead>
          <tbody class="tbody">
            <tr
              v-for="(emp, index) in filterNames"
              :key="emp.EmployeeId"
              @dblclick="rowOnDblClick(emp)"
              @click="rowOnClick($event, emp)"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ emp.DepartmentName }}</td>
              <td>{{ emp.EmployeeCode }}</td>
              <td>{{ emp.EmployeeName }}</td>
              <td>{{ emp.GenderName || "Chưa có" }}</td>
              <td>{{ emp.EmployeePosition || "Chưa có" }}</td>
              <td>{{ emp.TelephoneNumber || "Chưa có" }}</td>
              <td>{{ emp.Email || "Chưa có" }}</td>
              <td class="text-align-center">
                {{ formatDate(emp.DateOfBirth) || "Chưa có" }}
              </td>
              <td class="text-align-right">
                {{ formatMoney(emp.Salary) || "Chưa có" }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="m-paging">
        <div class="display-page">
          <div class="text-display-page">
            Hiển thị <b>01-20/123</b> lao động
          </div>
        </div>
        <div class="paging">
          <div class="start-page">
            <i class="fa-solid fa-angles-left"></i>
          </div>
          <div class="prev-page">
            <i class="fa-solid fa-angle-left"></i>
          </div>
          <ul class="number-pages">
            <li class="page page-selected"><button>1</button></li>
            <li class="page"><button>2</button></li>
            <li class="page"><button>3</button></li>
            <li class="page"><button>4</button></li>
          </ul>
          <div class="next-page">
            <i class="fa-solid fa-chevron-right"></i>
          </div>
          <div class="end-page">
            <i class="fa-solid fa-angles-right"></i>
          </div>
        </div>
        <div class="explain">
          <div class="people-page">
            <p><b>20</b> lao động/trang</p>
          </div>
        </div>
      </div>
    </div>
    <EmployeeDetail
      :isShow="isShowDialog"
      @formatDate="formatDate"
      @closeOnClick="showOrHideDialog"
      @reloadData="reloadData"
      :employeeSelectedInChil="employeeSelected"
      :formMode="formMode"
      :showToastMsgErr="showToastMsgErr"
      :showToastMsg="showToastMsg"
      :showDialogMsg="showDialogMsg"
      :showConfirm="showConfirm"
    />
  </div>
</template>
<script>
/*eslint-disable */

import axios from "axios";
import EmployeeDetail from "./EmployeeDetail.vue";
import $ from "jquery";
import Combobox from "../combobox/TheCombobox.vue";

export default {
  name: "employee-list",
  components: {
    EmployeeDetail,
    Combobox,
  },
  methods: {
    // Hàm render ra Giới tính
    // 0 - nam
    // 1 - nữ
    // 2 - khác
    functionSearchGender(valueGender) {
      this.searchGender = valueGender;
      return this.searchGender;
    },

    // hàm load lại data mỗi thi crud nhân viên
    reloadData() {
      const me = this;
      me.showLoading(2000);
      // lấy dự liệu danh sách nhiên viên
      axios
        .get("https://amis.manhnv.net/api/v1/Employees")
        .then(function (res) {
          me.employees = res.data;
        })
        .catch(function (err) {
          // kiểm tra mã lỗi của api và thực hiện thao tác với các mã lỗi đó
          me.showToastMsgErr(err.response.data.Message);
        });
    },

    /**
     * Mô tả : THực hiện hiện thị form thêm nhân viên
     * @param
     * @return
     * Created by: Cao Thanh Lâm - MF1103
     * Created date: 22:12 29/03/2022
     */
    btnAddOnClick() {
      const me = this;
      try {

        // gán formmode bằng add
        me.formMode = this.MISAEnum.FormMode.Add;
        me.showOrHideDialog(true);
        me.employeeSelected = {};
        // lây thông tin mã nhân viên mới
        axios
          .get("https://amis.manhnv.net/api/v1/Employees/NewEmployeeCode")
          .then((res) => {
            me.employeeSelected.EmployeeCode = res.data;
            // focus vào ô nhâp liệu đầu tiên
            document.getElementById("txtEmployeeCode").focus();
          })
          .catch((err) => {
            me.showToastMsgErr(err);
          });
      } catch (error) {
        me.showToastMsgErr(error);
      }
    },
    // Hàm show or hide dialog
    // param: isShow: true: hiện dialog, false: ẩn dialog
    showOrHideDialog(isShow) {
      this.isShowDialog = isShow;
    },
    /**
     * Mô tả : Hiển thị form cho phép sửa thông tin nhân viên
     * @param
     * @return
     * Created by: Cao Thanh Lâm - MF1103
     * Created date: 23:49 29/03/2022
     */
    rowOnDblClick(emp) {
      var me = this;
      me.formMode = this.MISAEnum.FormMode.Edit;
      this.employeeSelected = emp;
      // lấy thông tin nhân viên
      // C1 lây thôn tin nhân viên có sẵn dưới clients
      // C2 lấy thông tin nhân viên từ Api

      // binding lên form chi tiết ----> việc ủa component con

      // hiển thi form
      this.showOrHideDialog(true);
    },
    rowOnClick(e, emp) {
      // lấy các thẻ tr
      document.getElementById("btnDelete").style.display = "inline-block";
      // lấy hết các thẻ tr
      let trElements = document.querySelectorAll(
        "table#tblEmployeeList tbody tr"
      );
      // nếu thẻ tr đã chứa class m-row-selected thì click vào hủy bỏ chọn
      if (e.target.parentElement.classList.contains("m-row-selected")) {
        document.getElementById("btnDelete").style.display = "none";
        // remove hết các thẻ chứa m-row-selected
        trElements.forEach((tr) => {
          tr.classList.remove("m-row-selected");
        });
        // trElements.removeClass("m-row-selected");
        this.employeeSelected = {};
      } else {
        // remove hết các thẻ chứa m-row-selected
        trElements.forEach((tr) => {
          tr.classList.remove("m-row-selected");
        });
        this.employeeSelected = emp;
        // gán class m-row-selected cho thẻ tr được click
        e.target.parentElement.classList.add("m-row-selected");
      }
    },

    /**
     * Mô tả : Hàm xác nhận xóa nhân viên
     * @param
     * @return
     * Created by: Cao Thanh Lâm - MF1103
     *
     */
    comfirmDeleteEmployee() {
      const me = this;
      let employeeSelected = me.employeeSelected;
      // comfirm delete
      this.showConfirm(
        `Bạn có chắc chắn muốn xóa nhân viên &nbsp <b style="font-size:13px">${employeeSelected.EmployeeName}</b> `,
        function () {
          axios
            .delete(
              `https://amis.manhnv.net/api/v1/Employees/${employeeSelected.EmployeeId}`
            )
            // show toast message khi xóa thành công
            .then(function () {
              // fake call api
              me.showLoading(2500);
              // show toast msg
              me.showToastMsg("Xóa thành công");
              // load lai dữ liệu sau khi xóa
              me.reloadData();
            })
            // show toast error
            .catch(function (err) {
              me.showToastMsgErr(err.response.data.devMsg);
            });
        }
      );
    },

    /**
     * Mô tả : Hàm định dạng ngày tháng
     * @param
     * @return
     * Created by: Cao Thanh Lâm - MF1103
     * Created date: 22:05 29/03/2022
     */
    // Formate ngày và hiện thị trên màn hình
    formatDate(value) {
      try {
        // nếu dữ liệu tồn tại
        if (value) {
          // lấy dữ liệu date từ trên api
          value = new Date(value);
          // lây ra ngày
          let date = value.getDate();
          // lấy tháng
          let month = value.getMonth() + 1;
          // lấy năm
          let year = value.getFullYear();
          // thêm số 0 vào đằng trước
          date = date < 10 ? `0${date}` : date;
          month = month < 10 ? `0${month}` : month;
          value = `${date}/${month}/${year}`;
        } else {
          value = "";
        }
        return value;
      } catch (error) {
        // show toast error nếu lỗi
        this.showToastMsgErr(error);
      }
    },
    // format tiền
    formatMoney(value) {
      try {
        if (value) {
          value = value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        } else {
          value = "";
        }
        return value;
      } catch (error) {
        // show toast error
        this.showToastMsgErr(error);
      }
    },
    changeGender(event) {
      console.log(event.target.value);
    },
  },

  data() {
    return {
      test:"1245679",
      // Show toast thông báo
      showToastMsgInfo: this.CommonJs.showToastMsgInfo,
      // show toast thông báo lỗi
      showToastMsgErr: this.CommonJs.showToastMsgErr,
      // show toast thông báo thành công
      showToastMsg: this.CommonJs.showToastMsg,
      // show dialog
      showDialogMsg: this.CommonJs.showDialogMsg,

      //Show dialog confirm
      showConfirm: this.CommonJs.showConfirm,

      formMode: this.MISAEnum.FormMode.Add,
      // Name: "Cao Thanh Lâm",
      newEmployeeCode: null,
      employee: {
        // create ramdom employee
        fullName: "employee-list",
        id: "employee-list",
      },

      departments: [],
      employees: [],
      // Biến show dialog
      isShowDialog: false,
      employeeSelected: {},
      // Loading fake api
      showLoading: this.CommonJs.showLoading,
      // tìm kiếm theo tên
      search: "",
      // tìm kiếm theo giới tính
      searchGender: "",
      // tìm kiếm theo bộ phận
      searchDepartment: "",
    };
  },
  computed: {
    /**
     * Mô tả : Hàm lọc nhân viên
     * @param
     * @return mảng danh sách nhân viên phù hợp
     * Created by: Cao Thanh Lâm - MF1103
     * Created date: 20:49 11/04/2022
     */
    filterNames: function () {
      const me = this;
      return me.employees.filter((employee) => {
        // điều kiện tên
        let conditionName = employee.EmployeeName.toLowerCase().match(
          me.search.toLowerCase()
        );

        // check điều kiện value gender nếu bằng không thì đổi sang thành chuỗi 0 nếu không sẽ bị lỗi
        if (employee.Gender === 0) {
          employee.Gender = "0";
        }
        // kiểm tra điều kiện giới tính
        let conditionGender = (employee.Gender || "3")
          .toString()
          .match(me.searchGender);
        // kiểm tra điều kiện phòng ban
        let conditionDepartment = employee.DepartmentId.match(
          me.searchDepartment
        );
        // nếu nhân viên thỏa mãn 3 đk
        if (conditionName && conditionGender && conditionDepartment) {
          return employee;
        }
      });
    },
  },
  // 1.before create
  beforeCreate() {},

  // 2created
  created() {
    var me = this;
    // lấy dự liệu danh sách nhiên viên
    axios
      .get("https://amis.manhnv.net/api/v1/Employees")
      .then(function (res) {
        me.employees = res.data;
      })
      .catch(function (err) {
        // kiểm tra mã lỗi của api và thực hiện thao tác với các mã lỗi đó
        me.showToastMsgErr(err.response.data.devMsg);
      });
    // lấy dữ liệu phòng ban
    axios
      .get("https://amis.manhnv.net/api/v1/Departments")
      .then(function (response) {
        me.departments = response.data;
      })
      .catch(function (error) {
        showToastMsgErr(error);
      });
  },

  // 3before mount
  beforeMount() {
    // fake call api
    // this.showLoading(4000);
  },

  // 4mounted
  mounted() {},

  // 5before update
  beforeUpdate() {},
  // 6updated
  updated() {},

  // 7before destroy
  beforeUnmount() {},

  // 8destroyed
  unmounted() {},
  // props
  props: [],
  /**
   * Các phương thức
   */
};
</script>
