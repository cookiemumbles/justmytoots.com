package com.justmytoots

import io.github.bonigarcia.wdm.WebDriverManager
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Test
import org.openqa.selenium.By
import org.openqa.selenium.WebDriver
import org.openqa.selenium.firefox.FirefoxDriver
import org.openqa.selenium.firefox.FirefoxOptions
import java.time.Duration

class GeneralAndLoggedOutTest {

    companion object {
        private lateinit var driver: WebDriver

        @BeforeAll
        @JvmStatic
        internal fun beforeAll() {
//            driver = WebDriverManager.firefoxdriver().create()
//            WebDriverManager.firefoxdriver().setup()
//            driver = FirefoxDriver()
            WebDriverManager.firefoxdriver().setup()
            val options = FirefoxOptions()
            options.setHeadless(true)
            driver = FirefoxDriver(options)
        }
    }

//    private val serverRoot = "http://localhost:8008"
    private val serverRoot = "https://staging.justmytoots.com"

    @Test
    fun `without user`() {
        with(driver) {
            get("$serverRoot")

            assertThat(
                findElement(By.className("tweet_text"))
                    .findElement(By.tagName("h3"))
                    .text
            ).isEqualTo("ERROR: No username found.")
        }
    }

    @Test
    fun `with broken user`() {
        with(driver) {
            get("$serverRoot?acct=cookie_mumbles@ohai.social.com")

            assertThat(
                waitForElement(By.className("tweet_text"))
                    .findElement(By.tagName("h3"))
                    .text
            ).isEqualTo("ERROR: Unable to connect to server.")
        }
    }

    @Test
    fun `should load toots`() {
        with(driver) {
            get("$serverRoot?acct=cookie_mumbles@ohai.social")

            assertThat(
                waitForElement(By.className("single_tweet_wrap"), Duration.ofSeconds(3))
                    .waitForAllElements(By.tagName("li"))
            ).hasSizeGreaterThan(5)
        }
    }

    @Test
    fun `should show help`() {
        with(driver) {
            // given
            get("$serverRoot")
            assertThat(findElement(By.id("modal_background")).isDisplayed).isFalse()

            // when
            findElement(By.id("btn_help")).click()
            // then
            assertThat(findElement(By.id("modal_background")).isDisplayed).isTrue()

            // when
            findElement(By.id("model_close")).click()
            // then
            assertThat(findElement(By.id("modal_background")).isDisplayed).isFalse()

            // TODO: This is probably why it doesn't work on ios
            // // when
            // findElement(By.id("btn_help")).click()
            // findElement(By.id("modal_background")).click()
            // // then
            // assertThat(findElement(By.id("modal_background")).isDisplayed).isFalse()
        }
    }

    @Test
    fun `should show login`() {
        with(driver) {
            // given
            get("$serverRoot?acct=cookie_mumbles@ohai.social&log=d")
            assertThat(findElement(By.id("modal_background")).isDisplayed).isFalse()

            // when
            findElement(By.id("btn_login")).click()
            // then
            assertThat(findElement(By.id("modal_background")).isDisplayed).isTrue()

            // when
            findElement(By.id("model_close")).click()
            // then
            assertThat(findElement(By.id("modal_background")).isDisplayed).isFalse()
        }
    }

    private fun WebDriver.waitForPageLoaded() {
        waitForElement(By.className("single_tweet_wrap"), Duration.ofSeconds(3))
            .waitForAllElements(By.tagName("li"))
    }
}
