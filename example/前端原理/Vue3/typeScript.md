## 基础类型
基础类型：Boolean、Number、String、null、undefined 以及 ES6 的  Symbol 和 ES10 的 BigInt
void也可以定义undefined 和 null类型

## 任意类型 any 类型 和 unknown 顶级类型
- any
1. 对 any 进行任何操作，不需要检查类型
2. 声明变量的时候没有指定任意类型默认为any
3. 使用any 就失去了TS类型检测的作用
- unknown
1. unknown类型不能赋值给其他类型，unknown可赋值对象只有unknown 和 any

## 接口interface 和对象类型
继承extends ｜ 任意属性[propName: string] ｜可选属性?｜只读属性readonly ｜添加函数

```typescript
    interface  A{
        c?:string,                   //可选属性的含义是该属性可以不存在
        cb:()=>void                  //添加函数
    }
    interface Person extends A{      //继承属性
        a:string
        readonly b:string            //b是只读的不允许重新赋值
        [propName: string]: any      //允许添加新的任意属性
    }
    const person:Person  = {
        a:"a",
        b:"b",
        anykey:'value'
    }
    person.b = 'new b'//报错，b是只读的不允许重新赋值
```
## 数组
1. 类型[ ]
2. 数组泛型 Array<类型>
3. 用接口表示数组

```typescript
interface NumberArray {
    [index: number]: number
}
```

4. 多维数组
`let data:number[][] = [[1,2], [3,4]]`
5. arguments类数组 IArguments

```typescript
function Arr(...args:any): void {
    let arr:IArguments = arguments //ts内置对象IArguments 定义
}
```

## 函数
1. 函数的类型

```typescript
//注意，参数不能多传，也不能少传 必须按照约定的类型来
const fn = (name: string = '默认值', age:number = 10): string => {
    return name + age
}
```

2. 接口定义函数

```typescript
interface User{
    name: string;
    age: number;
}
function getUserInfo(user: User): User {
  return user
}
```
