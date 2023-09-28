const form = document.querySelector("form.url-form")
const textarea = form.querySelector("textarea")
const output = form.querySelector("output")

const EXTRA_PARAMS = ['page', 'sort']

const deleteExtraParams = (url) => {
  for (const p of EXTRA_PARAMS) url.searchParams.delete(p)
}

const writeToClipboard = (text) => {
  navigator.clipboard?.writeText(text)
    .then(() => {
      alert("Результат записан в clipboard")
    })
    .catch(console.log)
}

const writeToOutput = (text, className) => {
  output.textContent = text
  output.classList.add(className)
}

const submitHandler = (e) => {
  e.preventDefault()
  try {
    const url = new URL(textarea.value)
    deleteExtraParams(url)
    const serializedUrl = decodeURI(url.toString())
    writeToClipboard(serializedUrl)
    writeToOutput(serializedUrl, "success")
  } catch (e) {
    console.log(e)
    writeToOutput("Некорректный url адрес", "error")
  }

}

form.addEventListener("submit", submitHandler)
