const $siteList = $(".siteList");
const $last=$(".last");
const x=localStorage.getItem("x");
const xObj=JSON.parse(x);
const hashMap=xObj|| [
    {logo:"B",url:"https://www.bilibili.com",index:0},
    {logo:"A",url:"https://www.acfun.cn",index:1}
]

const simplifyUrl = (url) => {
    return url.replace('https://', '')
      .replace('http://', '')
      .replace('www.', '')
      .replace(/\/.*/, '') // 删除 / 开头的内容
  }

const render=()=>{
    $siteList.find("li:not(.last)").remove();
    hashMap.forEach((node,index)=>{
        const $li=$(`
            <li class="site">
                <div class="siteLogo">${node.logo}</div>
                <div class="siteLink">${simplifyUrl(node.url)}</div>
                <div class="close">
                  <svg class="icon">
                    <use xlink:href="#icon-close"></use>
                  </svg>
              </div>
            </li>
        `).insertBefore($last);
        $li.on('click', () => {
            window.open(node.url)
          });
        $li.on('click', '.close', (e) => {
            e.stopPropagation() // 阻止冒泡
            hashMap.splice(index, 1)
            render()
        });
    });
}

render();

$(".addButton").on("click",()=>{
    let url=window.prompt("请问你要添加的网址是啥？");
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url;
      }
    hashMap.push({
        logo:simplifyUrl(url)[0].toUpperCase(),
        url:url,
        index:(hashMap.length)
    });
    render();
});

window.onbeforeunload=()=>{
    const string=JSON.stringify(hashMap);
    localStorage.setItem("x",string);
}

$(document).on('keypress', (e) => {
    const {key} = e
    for (let i = 0; i < hashMap.length; i++) {
      if (hashMap[i].logo.toLowerCase() === key) {
        window.open(hashMap[i].url)
      }
    }
  })