let string='';
let buttons=document.querySelectorAll('.button');
var list=document.getElementById('list')
Array.from(buttons).forEach((button)=>{
    button.addEventListener('click',(e)=>{
        if(e.target.value=='='){
            let obj={
                calculation:document.getElementById('display').value
            }
            string=document.getElementById('display').value
            axios.post('http://localhost:3000/post-calculation',obj).then((response)=>{
                onsubmit(response.data)
                console.log(response);
            })
            string=eval(string);
            document.getElementById('display').value=string;
        }else if(e.target.value=='AC'){
            string="";
            document.getElementById('display').value=string;
        }else{
            string=string+e.target.value;
            document.getElementById('display').value=string;
        }
    })
})

window.addEventListener('DOMContentLoaded',()=>{
    console.log(string)
    document.getElementById('display').value=string;
    axios.get('http://localhost:3000/get-calculation').then(response=>{
        console.log(response);
        for(var i=0;i<response.data.length;i++){
            onsubmit(response.data[i])
        }
    })
})

function onsubmit(result){
    var btn=document.createElement('button');
    btn.appendChild(document.createTextNode('Recalculate'));
    var btn2=document.createElement('button');
    btn2.appendChild(document.createTextNode('Delete'));
    btn2.setAttribute('onclick',"del('"+result.id+"')");
    console.log(btn2);
    btn.setAttribute('onclick',"recalculate('"+result.id+"','"+result.calculation+"')");
    var li=document.createElement('li');
    li.id=result.id;
    console.log(li);
    li.appendChild(document.createTextNode("CALCULATION:"+result.calculation+" , RESULT:"+result.result));
    li.appendChild(btn) ;
    li.appendChild(btn2) ;
    list.appendChild(li);
}

function recalculate(calcId,calc){
    console.log(calcId)
    document.getElementById('display').value=calc;
    del(calcId);
}

function del(id){
    axios.delete(`http://localhost:3000/delete-calculation/${id}`)
    .then(()=>{
    const calculationToBeDeleted=document.getElementById(id);
    list.removeChild(calculationToBeDeleted);
    })
    .catch((err)=>console.log(err));
}