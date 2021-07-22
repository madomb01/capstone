import {
  tripInfo
} from "./js/formHandler.js"

import "./styles/styles.css"
// Event listener to add function to existing HTML DOM element
document.getElementById("generate").addEventListener("click", function() {
  tripInfo()
});
