const ld = [
{nickname:"阿乐222",qq:"",wx:"ldcm222",tel:"18888888888"}
]

const ld_index = Math.floor(Math.random()*ld.length);

const nicknames = document.getElementsByClassName("nickname");
for (let i = 0; i < nicknames.length; i++) {
document.getElementsByClassName("nickname")[i].innerHTML = ld[ld_index].nickname;
}
const wxs = document.getElementsByClassName("wx");
for (let i = 0; i < wxs.length; i++) {
document.getElementsByClassName("wx")[i].innerHTML = ld[ld_index].wx;
document.getElementsByClassName("wx")[i].style.color="red";
}