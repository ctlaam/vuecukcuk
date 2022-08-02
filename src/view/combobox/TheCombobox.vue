<template>
  <div id="cbxGender" class="m-combobox" mcombobox>

    <p  class="placeholder">Giới tính</p>
    <div @click="onChange" class="icon-combobox">
      <i class="fa-solid fa-angle-down"></i>
    </div>
    <div class="m-choice-combobox">
      <div value="0" class="m-choice">
        <i class="fa-solid fa-check icon-active"></i>Nam
      </div>
      <div value="1" class="m-choice">
        <i class="fa-solid fa-check icon-active"></i>Nữ
      </div>
      <div value="2" class="m-choice">
        <i class="fa-solid fa-check icon-active"></i>Không xác định
      </div>
      <div value="3" class="m-choice">
        <i class="fa-solid fa-check icon-active"></i>Chưa có
      </div>
    </div>
    

    
  </div>
</template>

<script>
import $ from "jquery";
export default {
  /* eslint-disable */
  name: "TheCombobox",
  props: [
  ],
  
  methods: {
    onChange(e){  

      let me =this
      let a = $(e.target)
      if(!a.hasClass("icon-combobox")){
        a = a.parent()
      }
      a.siblings(".m-choice-combobox").toggle()
      let textSearch = a.siblings(".placeholder")
      let choices = a.siblings(".m-choice-combobox").children()
      choices.each(function(index, item){
        $(item).click(function(){
          if($(item).hasClass("active")){
            $(item).removeClass("active")
            textSearch.text("Giới tính")
            me.takeValueGenders("")     
            //  console.log(this.Gender)
          }
          else{
            choices.removeClass("active")
            $(item).addClass("active")
            textSearch.text($(item).text())
            me.Gender = $(item).attr("value")
            // console.log(this.Gender)
            me.takeValueGenders($(item).attr("value"))            
          }
        })
      });
    },
    takeValueGenders(value){
      this.$emit("functionSearchGender", value)
    },

     
  },
 
  data() {
    return {
      Gender:"",
    }
  },

};
</script>

<style></style>
