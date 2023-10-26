export interface MessageType {
  GET_DATA_IF_FAILED?: string;
  GET_DATA_IF_SUCCEED?: string;
  EXPORT_DATA_IF_FAILED?: string;
  EXPORT_DATA_IF_SUCCEED?: string;
}

export interface OptionsType {
  requestError?: () => void;
  requestSuccess?: () => void;
  message: MessageType;
}
const DEFAULT_OPTIONS: OptionsType = {
  message: {
    GET_DATA_IF_FAILED: "获取列表数据失败",
    EXPORT_DATA_IF_FAILED: "导出数据失败",
  },
};

/**
 * 通用的useList hooks，适配大多数增删改查的列表页面
 * @param {*} listRequestFn 
 * @param {*} filterOption 
 * @param {*} options 
 */
export default function useList(listRequestFn:Function, filterOption: Ref<Object>, options = DEFAULT_OPTIONS? :OptionsType) {
  // 加载态
  const loading = ref(false);
  // 当前页
  const curPage = ref(1);
  // 分页大小
  const pageSize = ref(10);
    // 总数量
  const total = ref(0);

  // 存放接口返回的数据
  const list = ref<ItemType[]>([]);
  /**
   * 获取列表数据
   * @param {*} page
   * @param {*} size
   * @return
   */
  const initList = async(page = curPage.value,size = pageSize.value)=>{
    loading.value  = true
    try {
        const {code,data:{list:_list,total:num}} = listRequestFn(page, size, filterOption.value)
        total.value = num
        list.value = _list
    } catch (error) {
        console.log("listRequestFn", error);
    } finally {
        loading.value = false;
      }
  }
  /**
   * 监听分页数据改变
   */
    watch([curPage, pageSize,filterOption.value], () => {
        initList(curPage.value,pageSize.value);
    });
  /**
   * 清空筛选器字段
   * @returns
   */
    const reset = () => {
      if (!filterOption.value) return;
      const keys = Reflect.ownKeys(filterOption.value);
      filterOption.value = {} as FilterOption;
      keys.forEach((key) => {
        Reflect.set(filterOption.value!, key, undefined);
      });
      initList();
    };
}
