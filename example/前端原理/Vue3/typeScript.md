<!--
 * @Description:  
 * @Author: 王天琦
 * @Date: 2023-12-06 10:03:36
-->
## 基础类型
基础类型：Boolean、Number、String、null、undefined 以及 ES6 的  Symbol 和 ES10 的 BigInt
void也可以定义undefined 和 null类型
## 内置对象
### ECMAScript 的内置对象
Boolean、Number、string、RegExp、Date、Error
### DOM 和 BOM 的内置对象
HTMLDivElement(类型Div)、HTMLElement、NodeList、NodeListOf<HTMLElement|HTMLDivElement> 等
### 定义Promise 指定返回类型 Promise<T>
```typescript
let p: Promise<number> = new Promise((resolve,reject) => reslove(1))
p().then(res=>{
    console.log(res)
})
```
## 任意类型 any 类型 和 unknown 顶级类型
- any
1. 对 any 进行任何操作，不需要检查类型
2. 声明变量的时候没有指定任意类型默认为any
3. 使用any 就失去了TS类型检测的作用
- unknown
1. unknown类型不能赋值给其他类型，unknown可赋值对象只有unknown 和 any

继承extends ｜ 任意属性[propName: string] ｜可选属性?｜只读属性readonly ｜添加函数

## 数组
1. 类型[ ]
2. 数组泛型 Array<T,K>
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
## 接口interface 和对象类型
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
## 类型断言 | 联合类型 | 交叉类型
- 类型断言 值 as 类型 | <T>值
    value as string ｜ <string>value
- 联合类型 number | string
- 交叉类型 number && string
## 枚举类型 enum
- 数字枚举   enum types {yes=0, no=1 }
- 字符串枚举 enum types {yes='yes', no='no' }
- 异构枚举   enum types {yes='yes', no=1 }
- 接口枚举
```typescript
   enum Types {
      yyds,
      dddd
   }
   interface A {
      red:Types.yyds
   }
 
   let obj:A = {
      red:Types.yyds
   }
```
## 泛型
1. 函数泛型
```typescript
function Add<T>(a: T, b: T): Array<T>  {
    return [a,b]
}
Add<number>(1,2)
Add<string>('1','2')
```
2. 泛型接口
```typescript
interface MyInter<T> {
   res: T
}
let result: MyInter<number> = {res:1}
 ```
## 泛型约束
期望在一个泛型的变量上面获取length参数，有的数据类型是没有length属性;约束其为具有length属性的类型。
1. extends
2. 使用keyof操作符获取T类型的所有键，它的返回 类型是联合 类型
```typescript
function getLegnth<T extends Array>(arg:T) {
  return arg.length
}
// keyof
function prop<T, K extends keyof T>(obj: T, key: K) {
   return obj[key]
}
let o = { a: 1, b: 2, c: 3 }
prop(o, 'a')
prop(o, 'd')
 ```

