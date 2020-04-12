import { reactive } from '@vue/composition-api'


const useState=(initValue)=>{
    const state = reactive({
       value: initValue
      })


    const setState=(value)=>{
        state.value=value
    }

    return {
        state,setState
    }
}

export default useState;