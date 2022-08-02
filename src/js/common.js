import $ from "jquery";

var CommonJs = {
  showDialogMsg: function (msg) {
    if (!msg) {
      msg = "Có lỗi xảy ra , vui lòng liên hệ MISA";
    }
    $("[MISADialog]").remove();
    let dialogHTML = `<div id="dlgMsg" MISADialog class="m-dialog-box">
          <div class="m-dialog">
            <div id="closeMsg" class="m-dialog-close2">
            </div>
            <div class="m-dialog-header">Thông báo</div>
            <div class="m-dialog-body">${msg}</div>
            <div class="m-dialog-footer">
              
              <button class="m-btn">
                <div class="btn-ok-default text-btn">Đồng ý</div>
              </button>
            </div>
          </div>
        </div>`;
    $("body").append(dialogHTML);
    $("#dlgMsg").show();
    $(".m-dialog-close2").click(function () {
      $("#dlgMsg").hide();
    });
    $("[MISADialog] button .btn-ok-default").click(function () {
      $("[MISADialog]").remove();
    });
  },
  /**
   * @param {string}
   * @param {function}
   */
  showConfirm(msg, callBackFunction) {
    $("[MISADialog]").remove();
    let dialogHTML = `<div id="dlgMsg" MISADialog class="m-dialog-box">
          <div class="m-dialog">
            <div id="closeMsg" class="m-dialog-close2">
            </div>
            <div class="m-dialog-header">Thông báo</div>
            <div class="m-dialog-body">${msg}</div>
            <div class="m-dialog-footer">
               <button id="btnCancel" class="m-btn m-cancel ">Hủy</button>
              <button class="m-btn-ok">
                <div class="btn-ok text-btn">Đồng ý</div>
              </button>
            </div>
          </div>
        </div>`;
    if (callBackFunction) {
      $(document).on("click", "button.m-btn-ok .btn-ok", callBackFunction);
      $(document).on("click", "button.m-btn-ok .btn-ok", () => {
        $("[MISADialog]").remove();
      });
    } else {
      $(document).on("click", "button.m-btn-ok .btn-ok", () => {
        $("[MISADialog]").remove();
      });
    }
    $("body").append(dialogHTML);
    $("#dlgMsg").show();
    $(".m-dialog-close2").click(function () {
      $("#dlgMsg").hide();
    });
    $("[MISADialog] button .btn-ok-default").click(function () {
      $("[MISADialog]").remove();
    });

    $("[MISADialog] button#btnCancel").click(function () {
      $("[MISADialog]").remove();
    });
  },
  //   toast mes
  showToastMsg: function (msg) {
    if (!msg) {
      msg = "Thực hiện thành công";
    }
    let tsHTML = `<div id="tsBoxSuccess" class="m-toast-message toast-success  ">
        <div class="flex">
  
            <div class="m-icon-toast">
                <i class="fa-solid fa-check"></i>
            </div>
            <p class="text-toast">
                ${msg}
            </p>
            <div class="m-close-toast">
                <i class="fa-solid fa-xmark"></i>
            </div>
        </div>
    </div>`;
    $("body").append(tsHTML);
    $("#tsBoxSuccess").show();
    setTimeout(() => {
      $("#tsBoxSuccess").remove();
    }, 5000);
    $(".m-close-toast").click(function () {
      $("#tsBoxSuccess").remove();
    });
  },
  showToastMsgErr: function (msg) {
    if (!msg) {
      msg = "Có lỗi đã xảy ra vui lòng kiểm tra lại";
    }
    let tsHTML = `<div id="tsBoxError" class="m-toast-message error">
            <div class="flex">
                <div class="m-icon-toast">
                <i class="fa-solid fa-triangle-exclamation"></i>
                </div>
                <p class="text-toast">
                    ${msg}
                </p>
                <div class="m-close-toast">
                    <i class="fa-solid fa-xmark"></i>
                </div>
            </div>
        </div>`;
    $("body").append(tsHTML);
    $("#tsBoxError").show();
    setTimeout(() => {
      $("#tsBoxError").remove();
    }, 1500);
    $(".m-close-toast").onclick(function () {
      $("#tsBoxError").remove();
    });
  },
  /**
  * Mô tả : hàm show dialog info
  * @param msg-tin nhắn hiên thị trên màn hình
  * @return
  * Created by: Cao Thanh Lâm - MF1103
  * Created date: 19:38 11/04/2022
  */
  showToastMsgInfo: function (msg) {
    if (!msg) {
      msg = "Thông báo";
    }
    let tsHTML = `<div id="tsBoxInfo" class="m-toast-message info">
            <div class="flex">
                <div class="m-icon-toast">
                <i class="fa-solid fa-circle-info"></i>
                </div>
                <p class="text-toast">
                    ${msg}
                </p>
                <div class="m-close-toast">
                    <i class="fa-solid fa-xmark"></i>
                </div>
            </div>
        </div>`;
    $("body").append(tsHTML);
    $("#tsBoxInfo").show();
    setTimeout(() => {
      $("#tsBoxInfo").remove();
    }, 5000);
    $(".m-close-toast").onclick(function () {
      $("#tsBoxInfo").remove();
    });
  },
  /**
  * Mô tả : hàm show dialog error
  * @param msg-tin nhắn hiên thị trên màn hình
  * @return
  * Created by: Cao Thanh Lâm - MF1103
  * Created date: 19:38 11/04/2022
  */
  showErrorDialog: function (msg) {
    // kiểm tra dialog có tồn tại
    if (document.querySelectorAll(".error-dialog-form")) {
      // chạy vòng lặp for và remove tất cả các dialog hiện tại
      document.querySelectorAll(".error-dialog-form").forEach((element) => {
        element.style.display = "none";
        element.remove();
      });
    }
    // nếu k được truyenf đối số vào msg thì gán giá trị mặc định
    if (!msg) {
      msg = "Thông báo";
    }
    let tsHTML = `<div id="errorDialog" class="error-dialog-form">
        <div class="errorDialogIcon">
        <i class="fa-solid fa-circle-exclamation"></i>
        </div>
        <div class="errorDialogMsg">${msg}</div>
    </div>`;
    document
      .querySelector(".m-dialog-header")
      .insertAdjacentHTML("beforeend", tsHTML);
    document.querySelector("div#errorDialog").style.display = "flex";
    setTimeout(() => {
      if(document.querySelector("div#errorDialog")){
        document.querySelector("div#errorDialog").remove();
      }
    }, 1000);
  },
  /**
  * Mô tả : Mô tả code
  * Hàm show loading fake api
  * @param ms-time : thời gian hiển thị loading
  * @return
  * Created by: Cao Thanh Lâm - MF1103
  * Created date: 19:37 11/04/2022
  */
  showLoading: function (ms) {
    let tsHTML = `<div class="modal-loading">
    <h1>
      <span class="let1">l</span>  
      <span class="let2">o</span>  
      <span class="let3">a</span>  
      <span class="let4">d</span>  
      <span class="let5">i</span>  
      <span class="let6">n</span>  
      <span class="let7">g</span>  
    </h1>
  </div>`;
    document.querySelector("body").insertAdjacentHTML("afterbegin", tsHTML);
    setTimeout(() => {
      document.querySelector(".modal-loading").remove();
    }, ms);
  },
};

export default CommonJs;
