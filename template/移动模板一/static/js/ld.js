
const ld = [
{nickname:"小明",qq:"",wx:"xiaoming",tel:"18888888888",gender:"他"}
]

const ld_index = Math.floor(Math.random()*ld.length);

const nicknames = document.getElementsByClassName("nickname");
for (let i = 0; i < nicknames.length; i++) {
    nicknames[i].innerHTML = ld[ld_index].nickname;
    nicknames[i].style.color="red";
}
const wxs = document.getElementsByClassName("wx");
for (let i = 0; i < wxs.length; i++) {
    wxs[i].innerHTML = ld[ld_index].wx;
    wxs[i].style.color="red";
}
const genders = document.getElementsByClassName("gender");
for (let i = 0; i < genders.length; i++) {
    genders[i].innerHTML = ld[ld_index].gender;
}

function copyText() {
    // 复制事件代码
};
