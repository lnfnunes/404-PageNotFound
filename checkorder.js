const fs = require('fs')
const args = process.argv
const files = args.slice(2, args.length)

const reLink = /\[(.*)\]\(.*\)/g
const reLinkName = /\[(.*)\]\(.*\)/

const compareArr = (arr1, arr2) => {
  let arrErrors = []
  let itemError = null;
  arr1.forEach((a1, n) => {
    const a2 = arr2[n]

    if (a1 !== a2 && !itemError) {
      itemError = a2
      arrErrors.push(`${n + 1}. ${itemError}`)
    }
    if (itemError && itemError === a1) {
      itemError = null
    }
  })
  return arrErrors
}

const isFileOrdered = (file) => {
  const content = fs.readFileSync(file, 'utf-8')
  const data = content
    .split('\n')
    .filter(line => !!line.match(reLink))
    .map(line => line.match(reLinkName)[1])

  const sortedData = []
    .concat(data)
    .sort((a, b) =>  a.localeCompare(b))

  return compareArr(data, sortedData)
}
const checkIfAllFilesAreOrdered = files =>
  files.every(file => {
    const result = isFileOrdered(file)
    console.log(`\n> Checking links in ${file} ${(!result.length? '✔' : '𝙭')}`)
    if (result.length) {
      console.error(`Issues :-(`)
      console.error(`  ${result.join('\n  ')}\n`)
      process.exit(1)
    }
    return result
  })

checkIfAllFilesAreOrdered(files)

module.exports = checkIfAllFilesAreOrdered;
