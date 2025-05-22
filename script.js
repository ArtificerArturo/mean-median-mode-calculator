function calculateMMM() {
   const dataInputElement = document.querySelector("#MMMCalculator #dataInput")
   const backgroundElement = document.querySelector("#MMMCalculator .background")

   if (document.querySelector("#MMMCalculator .result")) {
      document.querySelector("#MMMCalculator .result").remove()
   }

   let rawDataString = dataInputElement.value
   let dataArray = rawDataString
      .split(/[\s,]+/) //splits by whitespace or commas
      .filter(Boolean) //removes empty strings
      .map(Number) //converts to numbers

   let resultElement = document.createElement("div")
   resultElement.setAttribute("class", "result")
   resultElement.style.color = "black"

   if (dataArray == "") {
      resultElement.innerHTML = "Please enter a dataset."
      resultElement.style.color = "red"
      backgroundElement.appendChild(resultElement)
      return
   }

   const mean = (array) => array.reduce((a, b) => a + b) / array.length

   function median(array) {
      //does change the original array, which may not be desired
      array.sort((a, b) => a - b)

      const middle = Math.floor(array.length / 2)

      // Check if the array length is even or odd
      if (array.length % 2 === 0) {
         // If even, return the average of middle two elements
         return (array[middle - 1] + array[middle]) / 2
      } else {
         // If odd, return the middle element
         return array[middle]
      }
   }

   function mode(array) {
      // Sort the array in ascending order
      array.sort((a, b) => a - b) //duplicate effort if mean is called, but just in case

      let modes = []
      let maxCount = 0
      let currentCount = 1

      let i = 0
      while (i < array.length) {
         // Count the occurrences of the current element
         while (i < array.length - 1 && array[i] === array[i + 1]) {
            currentCount++
            i++
         }

         // Update the modes array if needed
         if (currentCount === maxCount) {
            modes.push(array[i])
         } else if (currentCount > maxCount) {
            maxCount = currentCount
            modes = [array[i]]
         }

         // Reset currentCount for the next element
         currentCount = 1
         i++
      }
      if (modes.length == array.length) return "No mode"
      else return modes
   }

   let table = document.createElement("table")
   let meanRow = document.createElement("tr")
   let medianRow = document.createElement("tr")
   let modeRow = document.createElement("tr")

   meanRow.innerHTML = `<td><strong>Mean</strong></td><td>${resultConditioner(parseFloat(mean(dataArray)))}</td>`
   medianRow.innerHTML = `<td><strong>Median</strong></td><td>${median(dataArray)}</td>`
   let modeResult = mode(dataArray)
   if (typeof modeResult == "string") modeRow.innerHTML = `<td><strong>Mode</strong></td><td>No mode</td>`
   else if (typeof modeResult == "object") {
      if (modeResult.length == 1)
         modeRow.innerHTML = `<td><strong>Mode</strong></td><td>${mode(dataArray).join(", ")}</td>`
      else modeRow.innerHTML = `<td><strong>Modes</strong></td><td>${mode(dataArray).join(", ")}</td>`
   }

   table.appendChild(meanRow)
   table.appendChild(medianRow)
   table.appendChild(modeRow)
   resultElement.appendChild(table)
   backgroundElement.appendChild(resultElement)
}

function resultConditioner(number) {
   //Intelligent rounding. Results with only decimal component need sig figs,
   //results greater than 1 do not
   if (number < 1 && number > -1) {
      number = +number.toPrecision(2)
   } else {
      number = +number.toFixed(2)
   }
   return number
}
