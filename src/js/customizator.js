export default class Customizator {
  constructor() {
    this.body = document.querySelector("body");
    this.btnBlock = document.createElement("div");
    this.colorPicker = document.createElement("input");
    this.clear = document.createElement("div");
    this.scale = localStorage.getItem("scale") || 1;
    this.color = localStorage.getItem("color") || "#ffffff";

  }

  onScaleChange() {
    this.btnBlock.addEventListener("click", (event) => {
      if(event) {
        this.scale = +event.target.value.replace(/x/g, ""); 
      }
      this.recursy(this.body); //2 вызов
      localStorage.setItem("scale", this.scale);
    });

    this.recursy(this.body); //1 вызов
    localStorage.setItem("scale", this.scale);
  }

  recursy(body) {
    body.childNodes.forEach(node => {
      if(node.nodeName === "#text" && node.nodeValue.replace(/\s+/g, "").length > 0) {
        if(!node.parentNode.getAttribute("font-size")) {
          let value = window.getComputedStyle(node.parentNode, null).fontSize;
          node.parentNode.setAttribute("font-size", +value.replace(/px/g, ""));
          node.parentNode.style.fontSize = node.parentNode.getAttribute("font-size") * this.scale + "px";
        } else {
          node.parentNode.style.fontSize = node.parentNode.getAttribute("font-size") * this.scale + "px";
        }
      } else {
        this.recursy(node)
      }
    });
  }

  onColorChange() {
    this.colorPicker.addEventListener("input", (event) => {
      this.color = event.target.value;
      this.body.style.backgroundColor = this.color;
      localStorage.setItem("color", this.color);
    });

    this.body.style.backgroundColor = this.color;
    this.colorPicker.value = this.color;
    localStorage.setItem("color", this.color);
  }

  onCear() {
    this.clear.addEventListener("click", () => {
      localStorage.clear();
      this.scale = 1;
      this.color = "#ffffff";
      this.onScaleChange();
      this.onColorChange();
    })
  }

  injectStyle() {
    const style = document.createElement("style");
    style.innerHTML = `
      .panel {
        display: flex;
        justify-content: space-around;
        align-items: center;
        position: fixed;
        top: 10px;
        right: 0;
        border: 1px solid rgba(0, 0, 0, .2);
        box-shadow: 0 0 20px rgba(0, 0, 0, .5);
        width: 300px;
        height: 60px;
        background-color: #fff;
      }
        
      .scale {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100px;
        height: 40px;
      }
      .scale_btn {
        display: block;
        width: 40px;
        height: 40px;
        border: 1px solid rgba(0, 0, 0, .2);
        border-radius: 4px;
        font-size: 18px;
      }
      .color {
          width: 40px;
          height: 40px;
      }
      .clear {
        cursor: pointer;
        width: 40px;
        height: 40px;
        border: 1px solid rgba(0, 0, 0, .2);
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `;
    document.querySelector("head").append(style);
  }

  render() {
    let scaleInputS = document.createElement("input"),
        scaleInputM = document.createElement("input"),
        panel = document.createElement("div"),
        body = document.querySelector("body");

    panel.classList.add("panel");
    panel.append(this.btnBlock, this.colorPicker, this.clear);
    this.clear.innerHTML = "&times";
    this.clear.classList.add("clear");
    this.clear.style.fontSize = "30px";
    scaleInputS.classList.add("scale_btn");
    scaleInputM.classList.add("scale_btn");
    this.btnBlock.classList.add("scale");
    this.colorPicker.classList.add("color");
    this.btnBlock.append(scaleInputS, scaleInputM);
    scaleInputS.setAttribute("type", "button");
    scaleInputS.setAttribute("value", "1x");
    scaleInputM.setAttribute("type", "button");
    scaleInputM.setAttribute("value", "1.5x");
    this.colorPicker.setAttribute("type", "color");
    this.colorPicker.setAttribute("value", "#ffffff");
    body.append(panel)

    this.onScaleChange();
    this.onColorChange();
    this.injectStyle();
    this.onCear();
  }
}