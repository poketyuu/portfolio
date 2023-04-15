# Poketyuu's portfolio

## 開発環境

### フレームワーク

Bootstrap5

### 言語

HTML5,CSS3,TypeScript

## 主な特徴

* サークルカット風のデザイン
* スワイプ及び各種UIのクリックによるスムーズなカルーセル遷移の実装

### カルーセル遷移の実装

* UI部分とスライド部分を分け、スライド部分の手前にUI部分が来るように設定
* 各スライド部分をscrollIntoViewメソッドを用いてスムーズにスライドできるように実装
* 全スライドの前後にダミースライドを挿入し、ダミースライドが表示された際はアニメーションなしで元のスライドに移動

### 参考サイト

<https://qiita.com/wintyo/items/a37a197f69aa205297a5>

<https://zenn.dev/rabee/articles/modern-javascript-css-carousel>

<https://developer.mozilla.org/ja/docs/Web/API/Element/scrollIntoView>

<https://developer.mozilla.org/ja/docs/Web/CSS/scroll-snap-type>
