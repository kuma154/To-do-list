const text = document.querySelector('#text');
const addBtn = document.querySelector('#addBtn');
const ulList = document.querySelector('#ul');
const AllBtn = document.querySelector('#AllBtn');
const CompletedBtn = document.querySelector('#CompletedBtn');
const UnCompletedBtn = document.querySelector('#UnCompletedBtn');
const ul1List = document.querySelector('#ul1');
const ul2List = document.querySelector('#ul2');
const items = ulList.children;
const arr = []

// 删除数组指定元素
function DelArrayElement(arr, n) {
    if (arr == null || isNaN(n) || n >= arr.length) {
      return false;
    }
    arr.splice(n, 1);
}
//获取不同数组元素
function getArrDifference(arr1, arr2) {
    return arr1.concat(arr2).filter(function(v, i, arr) {
        return arr.indexOf(v) === arr.lastIndexOf(v);
    });
}
// 数组去重
function unique(arr) {
     return Array.from(new Set(arr))    
}

// 删除标签移除当前item
function closeItem(){
    var span = document.getElementsByClassName('close');
    for(let i=0;i<span.length;i++){
        span[i].onclick=function(){
         this.parentElement.style.display='none'
         DelArrayElement(arr, i)
         console.log(arr);
        }
    }
}

// 切换方法
function ToggleClass(){
    let isTrue=true;
    for(let i=0;i<ulList.children.length;i++){
        ulList.children[i].onclick=function(){
            if(isTrue){
                this.classList.add('checked');
                isTrue=!isTrue;
            }else{
                this.classList.remove('checked');
                isTrue=!isTrue;
            }
        }
    } 
}


// 获取值进行添加
function getValue(){
  var textValue = text.value;
    if(textValue == ''){
        alert('请输入数据');
        text.value='';
    }else{
        arr.push(textValue);
        text.value='';
        // list展示
        var list = `<li><span>${textValue}</span><span class='close'>X</span></li>`
        ulList.style.display='block';
        ul1List.style.display='none';
        ul2List.style.display='none';
      
        ulList.innerHTML+=list;

        // 关闭列表项
        closeItem();

        // 添加删除元素
        ToggleClass();
    }
};


// 已完成
function AddCompleted(){
    ul1List.innerHTML=''
    var arr1=arr;
    var Carr1=[];
    var spanText = document.getElementsByClassName('checked');
    
    for(let i = 0;i<spanText.length;i++){
        Carr1.push(spanText[i].children[0].textContent);
    }
    var carr1=unique(Carr1);
    console.log(carr1);
    console.log(arr);
    console.log(Carr1);
    var Carr2=carr1.map((carr1) => {
        return `<li class='checked'><span>${carr1}</li>`;
      }).join('');
      console.log(Carr2); 
      ulList.style.display='none';
      ul1List.style.display='block';
      ul2List.style.display='none';
   
    ul1List.innerHTML=Carr2;  
}



   
//未完成
function UnCompleted(){
    ul2List.innerHTML=''
    var Carr1=[];
    var spanText = document.getElementsByClassName('checked');
    
    for(let i = 0;i<spanText.length;i++){
        Carr1.push(spanText[i].children[0].textContent);
    }
    // 去重
    var carr1=unique(Carr1);
    let UnCarr1 = [];
    // 获取不同值
    UnCarr1 = getArrDifference(arr,carr1);
    console.log(carr1);
    console.log(arr);
    console.log(UnCarr1);

    let UnCarr2=UnCarr1.map((UnCarr1) => {
        return `<li><span>${UnCarr1}</span></li>`;
    }).join('');

    ulList.style.display='none';
    ul1List.style.display='none';
    ul2List.style.display='block';
    ul2List.innerHTML=UnCarr2;
}

// 全部
function getAllItems(){
    ulList.style.display='block';
    ul1List.style.display='none';
    ul2List.style.display='none';
}


// 点击事件
AllBtn.addEventListener('click',getAllItems);
addBtn.addEventListener('click',getValue);
CompletedBtn.addEventListener('click',AddCompleted)
UnCompletedBtn.addEventListener('click',UnCompleted)

 