<template>
  <div id="dlgDetail" class="m-dialog-box" :class="{ 'm-dialog-show': isShow }">
    <div class="m-dialog m-dialog-form">
      <div id="" @click="btnCloseDialog" class="m-dialog-close"></div>
      <div class="m-dialog-header">THÔNG TIN CHI TIẾT NHÂN VIÊN</div>
      <div class="form-body-dialog">
        <div class="left-content-dialog">
          <div class="img-dialog">
            <img src="@/assets/img/avatar-dialog.png" alt="" />
          </div>
          <div class="text-dialog">
            (Vui lòng chọn ảnh có định dang <br />.jpq,.jpeg,.png,.gif)
          </div>
        </div>
        <div id="content-right">
          <div class="text-content">A.THÔNG TIN CHUNG:</div>
          <div class="m-dialog-body m-body-form">
            <div class="form-component">
              <div class="form-component-title">
                <b>Mã Nhân viên </b>(<span style="color: red">*</span>)
              </div>
              <div class="form-component-input">
                <input
                  focusError
                  @blur="validateDialog"
                  id="txtEmployeeCode"
                  required
                  validate="EmployeeCode"
                  v-model="employee.EmployeeCode"
                  property="EmployeeCode"
                  type="text"
                  class="input-field-form"
                />
              </div>
            </div>
            <div class="form-component">
              <div class="form-component-title">
                <b>Họ và tên </b>(<span style="color: red">*</span>)
              </div>
              <div class="form-component-input">
                <input
                  focusError
                  id="txtEmployeeName"
                  required
                  property="EmployeeName"
                  validate="EmployeeName"
                  type="text"
                  v-model="employee.EmployeeName"
                  class="input-field-form"
                  @blur="validateDialog"
                />
              </div>
            </div>
          </div>
          <div class="m-dialog-body m-body-form">
            <div class="form-component">
              <div class="form-component-title"><b>Ngày sinh</b></div>
              <div class="form-component-input">
                <input
                  :value="bindingDate(employee.DateOfBirth)"
                  @change="onChangeFormatDate"
                  type="date"
                  dateOfBirth
                  validate="EmployeeDateOfBirth"
                  property="DateOfBirth"
                  @blur="validateDialog"
                  class="input-field-form input-field-date"
                />
              </div>
            </div>
            <div class="form-component">
              <div class="form-component-title"><b>Giới tính</b></div>
              <div class="form-component-input">
                <select
                  class="form-select"
                  property="Gender"
                  name=""
                  id=""
                  v-model="employee.Gender"
                >
                  <option value="0">Nam</option>
                  <option value="1">Nữ</option>
                  <option value="2">Khác</option>
                </select>
              </div>
            </div>
          </div>
          <div class="m-dialog-body m-body-form">
            <div class="form-component">
              <div class="form-component-title">
                <b>Số chứng minh thư </b>(<span style="color: red">*</span>)
              </div>
              <div class="form-component-input">
                <input
                  focusError
                  id="txtIdentityNumber"
                  @blur="validateDialog"
                  type="number"
                  class="input-field-form"
                  validate="EmployeeIdentifyNumber"
                />
              </div>
            </div>
            <div class="form-component">
              <div class="form-component-title"><b>Ngày cấp</b></div>
              <div class="form-component-input">
                <input type="date" class="input-field-form input-field-date" />
              </div>
            </div>
          </div>

          <div class="m-dialog-body m-body-form">
            <div class="form-component">
              <div class="form-component-title">
                <b>Email </b>(<span style="color: red">*</span>)
              </div>
              <div class="form-component-input">
                <input
                  focusError
                  id="txtEmail"
                  required
                  property="Email"
                  type="text"
                  class="input-field-form"
                  v-model="employee.Email"
                  validate="EmployeeEmail"
                  @blur="validateDialog"
                />
              </div>
            </div>
            <div class="form-component">
              <div class="form-component-title">
                <b>Số điện thoại </b>(<span style="color: red">*</span>)
              </div>
              <div class="form-component-input">
                <input
                  focusError
                  id="txtPhoneNumber"
                  type="text"
                  class="input-field-form"
                  v-model="employee.PhoneNumber"
                  validate="EmployeeNumber"
                  @blur="validateDialog"
                />
              </div>
            </div>
          </div>
          <div class="text-content">B.THÔNG TIN CÔNG VIỆC:</div>
          <div class="m-dialog-body m-body-form">
            <div class="form-component">
              <div class="form-component-title"><b>Vị trí</b></div>
              <div class="form-component-input">
                <select
                  class="form-select"
                  property="PositionId"
                  name=""
                  id=""
                  v-model="employee.PositionId"
                >
                  <option value="0">Giám đốc</option>
                  <option value="1">Trưởng phòng</option>
                  <option value="2">Nhân viên</option>
                </select>
              </div>
            </div>
            <div class="form-component">
              <div class="form-component-title"><b>Phòng ban</b></div>
              <div class="form-component-input">
                <select
                  class="form-select"
                  property="DepartmentId"
                  name=""
                  id=""
                  v-model="employee.DepartmentId"
                >
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
            </div>
          </div>

          <div class="m-dialog-body m-body-form">
            <div class="form-component">
              <div class="form-component-title"><b>Mã số thuế các nhân</b></div>
              <div class="form-component-input">
                <input
                  v-model="employee.PersonalTaxCode"
                  type="number"
                  class="input-field-form"
                />
              </div>
            </div>
            <div class="form-component">
              <div class="form-component-title"><b>Mức lương cơ sở</b></div>
              <div class="form-component-input">
                <div class="currency-unit">(VNĐ)</div>
                <input
                  dir="rtl"
                  property="Salary"
                  type="number"
                  class="input-field-form"
                />
              </div>
            </div>
          </div>
          <div class="m-dialog-body m-body-form">
            <div class="form-component">
              <div class="form-component-title">
                <b>Ngày gia nhập công ty</b>
              </div>
              <div class="form-component-input">
                <input
                  :value="bindingDate(employee.CreatedDate)"
                  @change="onChangeFormatDate"
                  createdDate
                  type="date"
                  class="input-field-form input-field-date"
                />
              </div>
            </div>
            <div class="form-component">
              <div class="form-component-title"><b>Trạng thái làm việc</b></div>
              <div class="form-component-input">
                <select class="form-select" property="" name="" id="" value="">
                  <option value="0">Đang làm việc</option>
                  <option value="1">Đã nghỉ việc</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="m-dialog-fotter m-fotter-form">
        <button id="btnCancel" @click="btnCloseDialog" class="m-btn m-cancel">
          Hủy
        </button>
        <button id="btn-save" class="m-btn m-btn-icon" @click="btnSaveOnClick">
          Lưu
        </button>
      </div>
    </div>
  </div>
</template>

<script>
/*eslint-disable */
import MISAEnum from "../../js/enum.js";
import MISAResource from "../../js/resource.js";
import axios from "axios";
import Combobox from "../combobox/TheCombobox.vue";
export default {
  components : {
    Combobox,
  },
  props: [
    "isShow",
    "employeeSelectedInChil",
    "formMode",
    "showToastMsgErr",
    "showToastMsg",
    "showDialogMsg",
    "showConfirm",
  ],
  watch: {
    employeeSelectedInChil: function (newValue) {
      this.employee = {...newValue};
    },
  },
  // hàm created
  created() {
    // lấy dữ liệu từ trên data
    const me = this;
    axios
      .get("https://amis.manhnv.net/api/v1/Departments")
      .then(function (response) {
        me.departments = response.data;
      })
      .catch(function (error) {
        showToastMsgErr(error);
      });
  },
  data() {
    return {
      // Danh sách nhân viên
      employee: {},
      // danh sách departments
      departments: [],
      // danh sách vị trí
      positions: [],
      // show dialog error
      showErrorDialog: this.CommonJs.showErrorDialog,
      // show loading
      showLoading: this.CommonJs.showLoading,
    };
  },

  methods: {
    // hàm reload data
    reloadData() {
      this.$emit("reloadData");
    },
    // fomart date ở trong dialog detail
    onChangeFormatDate(e) {
      // kiểm tra nếu target chứa attibute "dateofbirth" thì gán employee.dateofbith = value
      if (e.target.hasAttribute("dateOfBirth")) {
        this.employee.DateOfBirth = e.target.value;
        // Nếu target chứa attibute "createdDate" thì gán employee.createdDate = value
      } else if (e.target.hasAttribute("createdDate")) {
        this.employee.CreatedDate = e.target.value;
      }
    },
    // fomart dữ liệu date do người dùng nhập vào
    bindingDate(date) {
      if (date) {
        date = new Date(date);
        // lây ra ngày
        let day = date.getDate();
        // lấy tháng
        let month = date.getMonth() + 1;
        // lấy năm
        let year = date.getFullYear();
        // thêm số 0 vào đằng trước
        day = day < 10 ? `0${day}` : day;
        month = month < 10 ? `0${month}` : month;
        date = year + "-" + month + "-" + day;
        return date;
      } else {
        return "";
      }
    },
    // close dialog
    btnCloseDialog() {
      // this.reloadData();
      this.$emit("closeOnClick", false);
    },

    // lưu dữ liệu
    // validate dữ liệu
    // 1.validate bắt buộc nhập
    // 4.validate định dạng email
    btnSaveOnClick() {
      // lấy ra value của các trường bắt buộc email, identityNumber, phoneNumber
      let valueCode = document.querySelector("#txtEmployeeCode").value;
      let valueName = document.querySelector("#txtEmployeeName").value;
      let valueEmail = document.querySelector("#txtEmail").value;
      let valueIdentityNumber =
        document.querySelector("#txtIdentityNumber").value;
      let valuePhoneNumber = document.querySelector("#txtPhoneNumber").value;
      let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      // Nếu 3 trường đều có dữ liệu
      if (
        valueEmail &&
        valueIdentityNumber &&
        valuePhoneNumber &&
        valueName &&
        valueCode
      ) {
        // 1. kiểm tra employeeCode
        // 2. Kiểm tra định dạng email
        // 3. Kiểm tra định dạng số điện thoại

        if (valueCode.match(/^[A-Za-z]+$/)) {
          this.showErrorDialog("Mã nhân viên chỉ chứa số hoặc cả số và chữ");
          document.getElementById("txtEmployeeCode").focus();
        } else {
          if (!valueEmail.match(mailformat)) {
            this.showErrorDialog("Email không hợp lệ");
            document.querySelector("#txtEmail").focus();
          } else {
            if (
              !valuePhoneNumber.match(
                /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g
              )
            ) {
              this.showErrorDialog("Vui lòng điền đúng số điện thoại");
              document.querySelector("#txtPhoneNumber").focus();
            } else {
              if (this.formMode == this.MISAEnum.FormMode.Add) {
                // thu thập thông tin nhân viên
                // gọi api lưu dữ liệu
                let employee = this.employee;
                axios
                  .post("https://amis.manhnv.net/api/v1/Employees", employee)
                  .then(() => {
                    // hiển thị toast thông báo thành công
                    // ẩn form chi tiết và load lại dữ liẹu
                    // fake call api
                    this.showLoading(2500);

                    this.btnCloseDialog();
                    // show toast
                    this.showToastMsg("Thêm thành công");
                    // load lại dữ liệu
                    this.reloadData();
                  })
                  .catch((error) => {
                    switch (error.response.data.userMsg) {
                      // thông tin đơn vị không được phép để trống
                      case "Thông tin đơn vị của nhân viên không được phép trống.":
                        document
                          .querySelector("[property=DepartmentId]")
                          .focus();
                        this.showToastMsgErr(error.response.data.userMsg);

                        break;
                      // mã khách hàng đã tồn tại
                      case "Mã khách hàng đã tồn tại trong hệ thống.":
                        document.getElementById("txtEmployeeCode").focus();
                        this.showToastMsgErr(error.response.data.userMsg);

                        break;
                      // mã nhân viên không hợp lêk
                      case "Thông tin mã nhân viên không hợp lệ.":
                        document.getElementById("txtEmployeeCode").focus();
                        break;
                    }
                  });

                // formmode = put
              } else {
                let employee = this.employee;

                axios
                  // update dữ liệu employee
                  
                  .put(
                    `https://amis.manhnv.net/api/v1/Employees/${employee.EmployeeId}`,
                    employee
                  )
                  .then(() => {
                    //show toast
                    // fake call api
                    this.showLoading(2500);
                    this.showToastMsg("Sửa thành công");
                    // đóng dialog
                    this.btnCloseDialog();
                    // reload lại data
                    this.reloadData();
                  })
                  .catch((error) => {
                    this.showToastMsgErr(error.response.data.devMsg);
                  });
              }
            }
          }
        }
      } else {
        this.showErrorDialog("Vui lòng điền đầy đủ thông tin");
        let listFocus = document.querySelectorAll("[focusError]");
        console.log(listFocus);
        for (let i = 0; i < listFocus.length; i++) {
          if (!listFocus[i].value) {
            listFocus[i].focus();
            break;
          }
        }
      }
    },
    // validate dialog
    validateDialog(event) {
      // lấy target và value
      var el = event.target;
      var value = el.value;
      // Chia trường hợp switch case của từng trường dữ liệu
      //1.Employeename
      //2.EmployeeCode
      //3.EmployeeEmail
      //4.EmployeeNumber
      //5.EmployeeIdentifyNumber
      //6.EmployeeDateOfBirth
      switch (el.getAttribute("validate")) {
        case "EmployeeName":
          if (!value) {
            //show dialog
            setTimeout(() => {
              if (!document.querySelector("div#errorDialog")) {
                this.showErrorDialog("Vui lòng điền tên nhân viên");
              }
            }, 200);
            //add class error
            el.classList.add("error");
            // sau 3s remove class error
            setTimeout(() => {
              el.classList.remove("error");
            }, 3000);
          }
          break;
        case "EmployeeCode":
          if (!value) {
            setTimeout(() => {
              // nếu có một dialog rồi thì dialog này sẽ không xuất hiện
              if (!document.querySelector("div#errorDialog")) {
                this.showErrorDialog("Vui lòng điền mã nhân viên");
              }
            }, 200);
            //add class error

            el.classList.add("error");
            // sau 3s remove class error

            setTimeout(() => {
              el.classList.remove("error");
            }, 3000);
          } else if (value.match(/^[A-Za-z]+$/)) {
            setTimeout(() => {
              if (!document.querySelector("div#errorDialog")) {
                this.showErrorDialog("Vui lòng điền mã nhân viên");
              }
            }, 200);
          }
          break;
        case "EmployeeEmail":
          let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (!value) {
            setTimeout(() => {
              if (!document.querySelector("div#errorDialog")) {
                this.showErrorDialog("Vui lòng điền Email");
              }
            }, 200);
            //add class error

            el.classList.add("error");
            // sau 3s remove class error

            setTimeout(() => {
              el.classList.remove("error");
            }, 3000);
          } else if (value) {
            //kiểm tra email có hợp lệ hay không
            if (!value.match(mailformat)) {
              setTimeout(() => {
                if (!document.querySelector("div#errorDialog")) {
                  this.showErrorDialog("Email không hợp lệ");
                }
              }, 200);
              el.classList.add("error");
              setTimeout(() => {
                el.classList.remove("error");
              }, 3000);
            }
          }
          break;
        case "EmployeeNumber":
          // kiểm tra điền sđt
          if (!value) {
            setTimeout(() => {
              if (!document.querySelector("div#errorDialog")) {
                this.showErrorDialog("Vui lòng điền số điện thoại");
              }
            }, 200);
            el.classList.add("error");
            setTimeout(() => {
              el.classList.remove("error");
            }, 3000);
            // kiểm tra số điện thoại hợp lệ
          } else if (value) {
            if (!value.match(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g)) {
              setTimeout(() => {
                if (!document.querySelector("div#errorDialog")) {
                  this.showErrorDialog("Vui lòng điền đúng số điện thoại");
                }
              }, 200);
              el.classList.add("error");
              setTimeout(() => {
                el.classList.remove("error");
              }, 3000);
            }
          }
          break;
        // validate chứng minh thư
        case "EmployeeIdentifyNumber":
          if (!value) {
            setTimeout(() => {
                if (!document.querySelector("div#errorDialog")) {
                  this.showErrorDialog("Vui lòng điền CTM/CCCD");
                }
              }, 200);
            el.classList.add("error");
            setTimeout(() => {
              el.classList.remove("error");
            }, 3000);
          }
          break;
        // validate ngày sinh nhật < ngày hiện tại
        case "EmployeeDateOfBirth":
          // lấy năm hiện tại
          const currentYear = new Date().getFullYear();
          // lấy tháng hiện tại
          const currentMonth = new Date().getMonth() + 1;
          // lấy ngày hiện tại
          const currentDay = new Date().getDate();
          if (value) {
            let date = new Date(value);
            // lây ra năm sinh của người nhập
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            // nếu năm lớn hơn hiện tại
            if (year > currentYear) {
              this.showErrorDialog("Ngày sinh không hợp lệ");
              el.classList.add("error");
              setTimeout(() => {
                el.classList.remove("error");
              }, 3000);
              el.value = "";
              // năm = nhau tháng lơn hơn hiện tại
            } else if (year == currentYear) {
              if (month > currentMonth) {
                this.showErrorDialog("Ngày sinh không hợp lệ");
                el.classList.add("error");
                setTimeout(() => {
                  el.classList.remove("error");
                }, 3000);
                el.value = "";
                // năm tháng = nhau và ngày lớn hơn hiện tại
              } else if (month == currentMonth) {
                if (day > currentDay) {
                  this.showErrorDialog("Ngày sinh không hợp lệ");
                  el.classList.add("error");
                  setTimeout(() => {
                    el.classList.remove("error");
                  }, 3000);
                  el.value = "";
                }
              }
            }
          }
        default:
          break;
      }
    },
  },
};
</script>
