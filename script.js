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

   let resultElement = document.createElement("div")
   resultElement.setAttribute("class", "result")

   resultElement.innerHTML = `Mean: ${mean(dataArray)}<br>Median: ${median(dataArray)}<br>Mode: ${mode(dataArray)}`

   backgroundElement.appendChild(resultElement)
}

function clearForm() {
   const dataInputElement = document.querySelector("#MMMCalculator #dataInput")
   const backgroundElement = document.querySelector("#MMMCalculator .background")
   dataInputElement.value = ""

   if (document.querySelector("#MMMCalculator .result")) {
      document.querySelector("#MMMCalculator .result").remove()
   }
}
