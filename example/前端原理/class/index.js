import goods from './data.js'

//单件商品
class Goods{
    //constructor内定义的方法和属性 - 实例对象自己的
    constructor(g){
        this.data = g
        this.price = g?.price
        this.choose = 0
    }
    //constructor外定义的方法和属性则 - 所有实例对象共享的
    getTotalPrice(){
        return this.choose * this.price
    }
    hasChoose(){
        return this.choose > 0
    }
    increase(){
        this.choose++
    }
    decrease(){
        this.choose == 0 ? this.choose : this.choose--
    }
}
// 界面商品
class UIGoods{
    constructor(g){
        this.data = g.map(element => {
            return new Goods(element)
        });
        this.deliveryStartFee  = 30
        this.deliveryFee  = 5
    }
    getTotalChooseNumber(){
        return this.data.reduce((preValue,curValue,index)=>{
            preValue += curValue.choose
            return preValue
        },0)
    }
    getTotalPrice(){
        return sum = this.data.reduce((preValue,curValue,index)=>{
            preValue += curValue.getTotalPrice()
            return preValue
        },0)
    }
    // 修改某件商品数量
    increase(ind){
        this.data[ind].increase()
    }
    decrease(ind){
        this.data[ind].decrease()
    }

}
const uig = new UIGoods(goods)
uig.increase(1)
console.log(uig);