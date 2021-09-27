const puppy = require('puppeteer')

async function openBrowser(){
    const browser = await puppy.launch({
        headless : false,
        defaultViewport : false,
        args: [
            '--start-maximized',
        ]
    })
    // console.log(browser)
    // await browser.newPage()
    // let tabs = await browser.pages()
    // console.log(tabs.length)
    // let currentTab = tabs[0]
    // await currentTab.goto("https://www.google.com")

    //open 10 tabs with google.com
  /*  for(let i=0;i<10;i++){
     let tabs = await browser.pages()
       let currentTab = tabs[i]
       await currentTab.goto("https://www.google.com")
       await browser.newPage()
   } */

//    browser.pages().then(function(tabs){
//     tabs[0].goto("https://www.google.com")
// })

//    for(let i=0;i<9;i++){
//        browser.newPage().then(function(tab){
//            tab.goto("https://www.google.com")
//        })
//    }

   const tabs =await browser.pages();
   const tab = tabs[0]
   await tab.goto("https://hackerrank.com/auth/login")
   let usernameInputTab = await tab.$("#input-1")
   let passwordInputTab = await tab.$("#input-2")
   let rememberCheckbox = await tab.$(".checkbox-input")
   let loginButton = await tab.$('[data-analytics="LoginPassword"]')
   await usernameInputTab.type("rakeshsingh61780@gmail.com")
   await passwordInputTab.type("rakesh1234!@#$")
   await rememberCheckbox.click()
   await loginButton.click()
   await tab.waitForNavigation({waitUntil:"networkidle2"})
   await tab.waitForSelector('[data-analytics="NavBarProfileDropDown"]',{
       visible: true
   })
   let myProfileButton = await tab.$('[data-analytics="NavBarProfileDropDown"]')
   await myProfileButton.click()
   let administrationButton = await tab.$('[data-analytics="NavBarProfileDropDownAdministration"]')
   await administrationButton.click()
   await tab.waitForSelector(".admin-tabbed-nav a")
   let administrationTabs = await tab.$$(".admin-tabbed-nav a")
   let manageChallengesTab = administrationTabs[1]
   await manageChallengesTab.click()

   await tab.waitForSelector(".btn.btn-green.backbone.pull-right")
   let createChallengeButton = await tab.$(".btn.btn-green.backbone.pull-right")
   await createChallengeButton.click()


   await tab.waitForSelector("#input_format-container .CodeMirror-code");
   let challengeNameInput = await tab.$("#name")
   await challengeNameInput.type("gajnkcsm")
   let challengeDescInput = await tab.$("#preview")
   await challengeDescInput.type("hard question")

   //can not use directly type into div ( or other html tags which are not made for input) use click first then type
   
//    await tab.evaluate( () => {
//        window.scrollBy(0, window.innerHeight);
//     })
    let codeTextAreas = await tab.$$(".CodeMirror-code");

   for(let i in codeTextAreas){
      await codeTextAreas[i].click()
       await codeTextAreas[i].type("sljcksndc")
   }

   await tab.waitForSelector("#tags_tag")
   let tagsInputTab = await tab.$("#tags_tag")
   await tagsInputTab.click();
   await tagsInputTab.type("hi")   
   await tab.keyboard.press("Enter")

   let saveChangesButton = await tab.$(".save-challenge.btn.btn-green")
   await saveChangesButton.click() 

   await tab.waitForSelector("[data-tab='moderators']")
   let moderatorsButton =await tab.$('[data-tab="moderators"]')
   await moderatorsButton.click()

   
   await tab.waitForSelector("#moderator")
   moderatorsInputTab = await tab.$("#moderator")
   await moderatorsInputTab.type("ajkKALSM")
   await tab.keyboard.press("Enter")

   saveChangesButton = await tab.$(".save-challenge.btn.btn-green")
   await saveChangesButton.click()

}

openBrowser()



// $ = query selector -> selects first query of all other queries
// $$ = All queries selector -> selects all queries