import { generateButtons, displayButtons } from "./MyFunctions.js"
import { MyColorButton } from "./MyColorButton.js"

let arrButtons = generateButtons()
displayButtons(arrButtons)

// colour button
setTimeout(function() {
  let colourBtn = new MyColorButton("Color button", "pink", "Color button is shown on the purple background", "white")
  colourBtn.show()
}, arrButtons.length * 3000)
