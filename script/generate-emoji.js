#!/usr/bin/env node
const childProcess = require("child_process")
const fs = require("fs")
const path = require("path")

const emojiDataFilename = path.join(process.env['TMPDIR'], "emoji_pretty.json")
if (!fs.existsSync(emojiDataFilename)) {
  childProcess.execSync(`curl 'https://raw.githubusercontent.com/iamcal/emoji-data/master/emoji_pretty.json' -o '${emojiDataFilename}'`)
}

const emojiData = JSON.parse(fs.readFileSync(emojiDataFilename))
const processedData = emojiData.filter(emoji => emoji.has_img_apple).map(emoji => {
  const shortName = emoji.short_names.find(name => name.startsWith('flag-')) || emoji.short_name
  return {
    emoji: String.fromCodePoint(...emoji.unified.split("-").map(hex => parseInt(hex, 16))),
    name: shortName.split('_').map(word => `${word[0].toUpperCase()}${word.slice(1)}`).join(' '),
    shortName: shortName,
    description: emoji.name[0].toUpperCase() + emoji.name.slice(1).toLowerCase(),
    category: emoji.category,
  }
})

const emojiCategories = Array.from(new Set(processedData.map(emoji => emoji.category).sort()))

const emojiMap = Object.fromEntries(processedData.map((data) => {
  const description = (data.description.toLowerCase().replace(/ /g, '_') === data.shortName) ? '' : data.description
  return [
    data.shortName,
    [data.emoji, description, emojiCategories.indexOf(data.category)],
  ]
}))

console.log(JSON.stringify({
  categories: emojiCategories,
  emojis: emojiMap,
}))

// console.log(emojiCategories)
// const emojiCategoriesTypeValue = emojiCategories.map(cat => `"${cat}"`).join(" | ")
// console.log(`type EmojiCategory = ${emojiCategoriesTypeValue}`)