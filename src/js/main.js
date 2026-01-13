document.getElementById('postBtn').onclick=()=>{
let t=document.getElementById('postText').value;
if(!t)return;
let d=document.createElement('div');d.className='glass';
d.innerHTML='<b style=color:cyan>@guest</b><p>'+t+'</p>';
document.getElementById('feed').prepend(d);
document.getElementById('postText').value='';
};