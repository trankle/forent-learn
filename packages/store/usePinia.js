import { defineStore } from 'pinia';
import { useOtherStore } from './other-store';



export const useUniqueStore = defineStore(id:'uniqueStoreName', () => {
  let id = ref(0);
  let user = ref({});

  const initUser = () => {
    user.value = { id: 123456, name: 'trpiniaankle' };
  };

  watch([id, user], (v) => {
    /*使用其他store*/
    const otherStore = useOtherStore;
    otherStore.doSomeThing();
  });

  return {
    id,
    user,
    initUser
  };
});
