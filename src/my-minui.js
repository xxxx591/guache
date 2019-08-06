import Vue from 'vue'

import {
  CellSwipe,
  MessageBox,
  Toast,
  DatetimePicker,
  Picker,
  Range
} from 'mint-ui'

Vue.component(CellSwipe.name, CellSwipe)
Vue.component(MessageBox.name, MessageBox)
// Vue.component(Toast.name, Toast)
Vue.component(DatetimePicker.name, DatetimePicker)
Vue.component(Picker.name, Picker)
Vue.component(Range.name, Range)

Vue.prototype.$toast = (txt, time2) => {
  Toast({
    message: txt,
    position: 'top',
    duration: time2 || 1500
  })
}
