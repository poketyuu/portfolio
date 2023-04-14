"use strict";
const DUMMY_NUM = 4;
class CutCarousel {
    constructor(ele, chlidquery) {
        this.curnum = 0;
        this.element = ele;
        this.slidelength = this.element.querySelector(chlidquery).clientWidth;
        console.log(this.slidelength);
        this.contents = [];
        Array.from(this.element.querySelectorAll(chlidquery)).forEach((value, index) => this.contents.push(new CutElement(value, index, false)));
        this.indicators = Array.from(document.querySelectorAll(".slidenav_area li span"));
        this.indicators.forEach((value, index) => value.onclick = () => this.move(index));
        this.setdummy();
        this.move(0);
    }
    move(index) {
        if (this.curnum == 3 && index == 0)
            index = 4;
        if (this.curnum == 0 && index == 3)
            index = -1;
        let newcontent = this.contents[index + DUMMY_NUM];
        newcontent.element.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
    prev() {
        this.move(this.curnum - 1);
    }
    next() {
        this.move(this.curnum + 1);
    }
    index() {
        //画面内に表示されてるサークルカットの数を確認,複数入るスペースがある場合はその分中心判定をずらす
        let inscreencut = window.innerWidth / this.slidelength;
        console.log(inscreencut);
        let index = Math.round(this.element.scrollLeft / this.slidelength);
        return index - DUMMY_NUM + Math.floor(inscreencut / 2);
    }
    scroll() {
        this.contents[this.curnum + DUMMY_NUM].element.style.opacity = "0.5";
        this.contents[this.curnum + DUMMY_NUM].element.style.filter = "grayscale(1)";
        this.indicators[this.curnum].classList.remove("slidenav_active");
        this.curnum = this.index();
        this.resetdummy();
        this.contents[this.curnum + DUMMY_NUM].element.style.opacity = "1.0";
        this.contents[this.curnum + DUMMY_NUM].element.style.filter = "grayscale(0)";
        this.indicators[this.curnum].classList.add("slidenav_active");
    }
    resetdummy() {
        if (this.contents[this.curnum + DUMMY_NUM].isdummy) {
            let newindex = this.contents[this.curnum + DUMMY_NUM].pagenum;
            this.contents[newindex + DUMMY_NUM].element.scrollIntoView({ behavior: "auto", inline: "center" });
            this.curnum = newindex;
            console.log("reset");
        }
    }
    resize() {
        this.slidelength = this.contents[DUMMY_NUM].element.clientWidth;
        this.move(this.curnum);
    }
    setdummy() {
        let length = this.contents.length;
        //カルーセルがループするように最初と最後に4枚ずつdummyを追加,dummyに移動した場合は元の番号にうつす。
        //最初の4つの要素をdummyとして最後に挿入
        for (let i = 0; i < DUMMY_NUM; i++) {
            let dummy = this.contents[i].element.cloneNode(true);
            this.contents.push(new CutElement(dummy, i, true));
            dummy.id = dummy.id + "_dummyafter";
            this.element.appendChild(dummy);
        }
        //最後の4つの要素をdummyとして最初に挿入
        for (let i = 0; i < DUMMY_NUM; i++) {
            let dummy = this.contents[length - 1].element.cloneNode(true);
            this.contents.unshift(new CutElement(dummy, length - i - 1, true));
            dummy.id = dummy.id + "_dummybefore";
            this.element.prepend(dummy);
        }
    }
}
class CutElement {
    constructor(ele, index, isdum) {
        this.pagenum = index;
        this.element = ele;
        this.isdummy = isdum;
    }
}
var timeoutld;
window.onload = function () {
    var cut_element = document.querySelector(".cut_carousel");
    var cutfolio = new CutCarousel(cut_element, ".circlecut_whole");
    cut_element.onscroll = event => {
        clearTimeout(timeoutld);
        timeoutld = setTimeout(function () {
            cutfolio.scroll();
        }, 100);
    };
    window.onresize = () => { cutfolio.resize(); };
    var btnPrev = document.querySelector(".btn_prev");
    var btnNext = document.querySelector(".btn_next");
    btnPrev.onclick = () => { cutfolio.prev(); };
    btnNext.onclick = () => { cutfolio.next(); };
};
