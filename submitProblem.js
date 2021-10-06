const puppy = require('puppeteer')

async function openBrowser(){
    const browser = await puppy.launch({
        headless : false,
        defaultViewport : false,
        args: [
            '--start-maximized',
        ]
    })

    await browser.newPage()
    const tabs =await browser.pages();
   const tab = tabs[1]
   await tab.goto("https://hackerrank.com/auth/login")
   let usernameInputTab = await tab.$("#input-1")
   let passwordInputTab = await tab.$("#input-2")
   let rememberCheckbox = await tab.$(".checkbox-input")
   let loginButton = await tab.$('[data-analytics="LoginPassword"]')
   await usernameInputTab.type("rakeshsingh61780@gmail.com")
   await passwordInputTab.type("rakesh1234!@#$")
   await rememberCheckbox.click()
   await loginButton.click()      //we can pass css selector directly in click tab.click(selector)

   await tab.waitForSelector(".ui-btn.ui-btn-normal.ui-btn-large.ui-btn-primary.ui-btn-link.ui-btn-styled")
   let continuePreparationButton =await tab.$(".ui-btn.ui-btn-normal.ui-btn-large.ui-btn-primary.ui-btn-link.ui-btn-styled")
   await continuePreparationButton.click()

   await tab.waitForSelector(".ui-btn.ui-btn-normal.ui-btn-line-primary.interview-ch-li-cta.ui-btn-link.ui-btn-styled")
   let solveChallengeButtons = await tab.$$(".ui-btn.ui-btn-normal.ui-btn-line-primary.interview-ch-li-cta.ui-btn-link.ui-btn-styled")
//    console.log(solveChallengeButtons.length);

   let solveChallengeUrls = []
   solveChallengeUrls.push(
       await tab.evaluate(function(ele){
       return "https://www.hackerrank.com" + ele.getAttribute("href")
   },solveChallengeButtons[0])
   )

   solveChallengeUrls.push(
    await tab.evaluate(function(ele){
    return "https://www.hackerrank.com" + ele.getAttribute("href")
    },solveChallengeButtons[2])
   )

   for(let i=0;i<solveChallengeUrls.length;i++){
    //   let tab = await browser.newPage()
    //   tab.goto(solveChallengeUrls[i])
      // await solveChallenge(solveChallengeUrls[i],tab)
       solveChallenge(solveChallengeUrls[i],tabs[i])


   }
   // await browser.close()



}

async function solveChallenge(url,tab){
//    await tab.goto(url)
   let problemUrl = url.replace("?","/problem?")
   let editorialUrl = url.replace("?","/editorial?")
//    console.log(editorialUrl);
   await tab.goto(editorialUrl)
   let solutionH3Tags = await tab.$$(".hackdown-content h3")
   let solutionLanguages = [] 
   for(let solutionH3Tag of solutionH3Tags){
      solutionLanguages.push( 
          await tab.evaluate(function(ele){
           return ele.innerText;
       },solutionH3Tag)
      )
   }

   

   let solutionPreTags = await tab.$$(".highlight pre")
   let solution =""
   for(let i = 0;i<solutionLanguages.length;i++){
      if(solutionLanguages[i]=="C++"){
         solution = await tab.evaluate(function(ele){
            return ele.innerText
         },solutionPreTags[i])
      }
      break;
   }


   await tab.goto(problemUrl)
   await tab.waitForSelector(".view-lines");

   await tab.click('[type="checkbox"]')

   await tab.type('#input-1',solution)

   await tab.keyboard.down("Control")
   await tab.keyboard.press("A")
   await tab.keyboard.press("X")
   await tab.keyboard.up("Control")

   await tab.click('.view-lines')
   await tab.keyboard.down("Control")
   await tab.keyboard.press("A")
   await tab.keyboard.press("V")
   await tab.keyboard.up("Control")

   await tab.click(".hr-monaco-submit")
   await tab.waitForSelector(".congrats-wrapper")

}


openBrowser()