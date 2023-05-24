/**
## Create a short-URL using https://fjelly.link
*/

// Name: Create Short URL
// Description: Add a short-URL redirect from https://fjelly.link to another resource.
// Author: Jordan Fjellman
// Twitter: @jordanfjellman

// Note: This script is very specific to my workflow. See https://fjelly.link/mw87 for more details.

import "@johnlindquist/kit"

const FJELLY_LINK_DIR = "/Users/jordan/code/personal/fjelly.link"
cd(FJELLY_LINK_DIR)

const useRandomChoice = await arg("Use a Random URL?", [
  "Yes",
  "No",
])
const shortUrlPath =
  useRandomChoice === "Yes"
    ? generateRandomId()
    : await arg("Enter the path do you want to use")
const longUrl = await arg("Enter the long URL")

await $`git switch main`
await $`git pull origin main`
await $`echo "\n/${shortUrlPath}  ${longUrl} 302" >> public/_redirects`
await $`git commit -am "Create short URL for ${longUrl}" -m "This commit was automated by ScriptKit."`
await $`git push origin main`

const shortUrl = `https://fjelly.link/${shortUrlPath}`

await $`pbcopy ${shortUrl}`

await div(md(`Created a temporary redirect from ${shortUrl} to ${longUrl}`))



function generateRandomId(length = 4) {
  // All lower cased letters and numbers except vowels and any characters that
  // would be easily mistaken for another similar character.
  const chars = 'bcdfghjklmnpqrstvwxyz23456789';

  // Pick characers randomly
  let str = '';
  for (let i = 0; i < length; i++) {
    str += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return str;
};
