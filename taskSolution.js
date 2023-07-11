const {By, Key, Builder} = require("selenium-webdriver");
var should = require('chai').should();
require("chromedriver");



const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

async function openLoginPage(){
    let driver = await new Builder().forBrowser("chrome").build();

    await driver.get("https://open.spotify.com");

    await sleep(3000); 

    let loginButton = await driver.findElement(By.xpath("//button[@data-testid='login-button']"));
    loginButton.click();
    await sleep(3000); 
    return driver;
}

async function getUserNameError(){

    let driver = await openLoginPage();
    //UC -1 - Test Login form with empty credentials
    let userName = await driver.findElement(By.id("login-username"));
    await userName.sendKeys("testuser name");

    await userName.sendKeys(Key.chord(Key.CONTROL, "a"), Key.DELETE);
    
    await sleep(1000);

    let message = await driver.findElement(By.id("username-error"));
    let x = await message.getText();

    driver.quit();
    return x;

  /*  setInterval(function(){
        driver.quit();
    }, 10000);*/
}

async function getPasswordError(){

    let driver = await openLoginPage();
    //UC -1 - Test Login form with empty credentials
    let userPassword = await driver.findElement(By.id("login-password"));
    await userPassword.sendKeys("test password");

    await userPassword.sendKeys(Key.chord(Key.CONTROL, "a"), Key.DELETE);
    
    await sleep(1000);

    let message = await driver.findElement(By.id("password-error"));
    let x = await message.getText();

    driver.quit();
    return x;
}

async function getLoginError(){

    let driver = await openLoginPage();
    
    let userName = await driver.findElement(By.id("login-username"));
    await userName.sendKeys("testuser name");

    let userPassword = await driver.findElement(By.id("login-password"));
    await userPassword.sendKeys("test password");

    let loginButton = await driver.findElement(By.id("login-button"));
    await loginButton.click();

    await sleep(3000);

    let message = await driver.findElement(By.xpath("//div[@data-encore-id='banner']"));
    let x = await message.getText();

    driver.quit();
    return x;
}
async function login(){

    let driver = await openLoginPage();
    
    let userName = await driver.findElement(By.id("login-username"));
    await userName.sendKeys("myatne.morozyvo@gmail.com");

    let userPassword = await driver.findElement(By.id("login-password"));
    await userPassword.sendKeys("vAtMt!uxyC?!75H");

    let loginButton = await driver.findElement(By.id("login-button"));
    await loginButton.click();

    await sleep(5000);

    let userAvatar = await driver.findElement(By.xpath("//button[@data-encore-id='buttonTertiary']"));
    let x = await userAvatar.getAttribute("aria-label");

    driver.quit();
    return x;
}
describe("UC 1", function () {
    it("should display the user name error message", async function () {
    
        let expectedMessage = "Укажіть ім’я користувача Spotify або адресу електронної пошти."
        let x = await getUserNameError();
        x.should.equal(expectedMessage);  
    });
    it("should display the password error message", async function () {
    
        let expectedMessage = "Введіть пароль."
        let x = await getPasswordError();
        x.should.equal(expectedMessage);  
    });
  })

  describe("UC 2", function () {
    it("should display the wrong email or password message", async function () {
    
        let expectedMessage = "Неправильне ім’я користувача або пароль."
        let x = await getLoginError();
        x.should.equal(expectedMessage);  
    });
  })

  describe("UC 3", function () {
    it("should display user name", async function () {
    
        let expectedMessage = "Oksana"
        let x = await login();
        x.should.equal(expectedMessage);  
    });
  })




  

