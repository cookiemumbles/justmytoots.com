package com.justmytoots

import io.github.bonigarcia.wdm.WebDriverManager
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Disabled
import org.junit.jupiter.api.Test
import org.openqa.selenium.By
import org.openqa.selenium.WebDriver
import org.openqa.selenium.firefox.FirefoxDriver
import org.openqa.selenium.firefox.FirefoxOptions
import java.time.Duration

class LoggedInTest {

    companion object {
        private lateinit var driver: WebDriver

        @BeforeAll
        @JvmStatic
        internal fun beforeAll() {
//            val options = webdriver.FirefoxOptions()
//            options.headless = True
//            webdriver.Firefox(options=options)
//            val firefoxdriver = WebDriverManager.firefoxdriver()
//            driver = firefoxdriver.create()
            WebDriverManager.firefoxdriver().setup()
            val options = FirefoxOptions()
            options.setHeadless(true)
            driver = FirefoxDriver(options)
        }
    }

//    private val serverRoot = "http://localhost:8008"
    private val serverRoot = "https://staging.justmytoots.com"

    @Test
    @Disabled
    fun `should login correctly`() {
        with(driver) {
            // given
            get("$serverRoot?acct=cookie_mumbles@ohai.social&log=d")

            // when
            findElement(By.id("btn_login")).click()
            findElement(By.id("input_server")).sendKeys("techhub.social")
            findElement(By.id("btn_action_login")).click()
            waitForElement(By.id("user_email"), Duration.ofSeconds(3)).sendKeys("cookie_mumbles@proton.me")
            findElement(By.id("user_password")).sendKeys("")
            findElement(By.name("button")).click()
            waitForElements(By.name("button"), Duration.ofSeconds(3))
                .filter { it.text.uppercase() == "AUTHORIZE" }
                .map { it.click() }

            //then
            waitForPageLoaded()
            assertThat(findElement(By.id("btn_login")).text).isEqualTo("Logout")
        }
    }

    private fun WebDriver.waitForPageLoaded() {
        waitForElement(By.className("single_tweet_wrap"), Duration.ofSeconds(3))
            .waitForAllElements(By.tagName("li"))
    }
}
