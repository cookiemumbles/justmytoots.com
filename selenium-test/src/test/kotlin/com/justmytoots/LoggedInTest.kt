package com.justmytoots

import com.justmytoots.utils.*
import java.time.Duration
import org.assertj.core.api.Assertions.*
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.params.ParameterizedTest
import org.junit.jupiter.params.provider.MethodSource
import org.openqa.selenium.By
import org.openqa.selenium.WebDriver

class LoggedInTest {
    // Assumes logged in for all tests

    companion object {

        private lateinit var drivers: List<WebDriver>

        @BeforeAll
        @JvmStatic
        internal fun beforeAll() {
            drivers = startDrivers()
            drivers.forEach {
                with(it) {
                    get("${getServer()}?acct=cookie_mumbles@ohai.social&log=d")
                    findLoginBtn().click()
                    findElement(By.id("input_server")).sendKeys("techhub.social")
                    findElement(By.id("btn_action_login")).click()
                    if (System.getenv("MASTO_LOGIN_TEST_USER") == null || System.getenv("MASTO_LOGIN_TEST_PASS") == null) {
                        throw Exception("Please set environment variables with login data")
                    }
                    mastoFindEmailField().sendKeys(System.getenv("MASTO_LOGIN_TEST_USER"))
                    mastoFindPassField().sendKeys(System.getenv("MASTO_LOGIN_TEST_PASS"))
                    findElement(By.name("button")).click()
                    waitForElements(By.name("button"), Duration.ofSeconds(3))
                        .filter { it.text.uppercase() == "AUTHORIZE" }
                        .map { it.click() }
                    waitForPageLoaded() // wait because otherwise the 2nd part of the login is not
                }
            }
        }

        @AfterAll
        @JvmStatic
        internal fun afterAll() {
            drivers.closeUnlessTesting()
        }

        @JvmStatic
        fun getDrivers(): List<WebDriver> {
            return drivers
        }
    }

    @ParameterizedTest
    @MethodSource("getDrivers")
    fun `should load toots`(driver: WebDriver) {
        with(driver) {
            get("${getServer()}?acct=cookie_mumbles@ohai.social")

            assertThat(
                    waitForElement(By.className("single_tweet_wrap"), Duration.ofSeconds(3))
                        .waitForAllElements(By.tagName("li"))
                )
                .hasSizeGreaterThan(5)
        }
    }

    @ParameterizedTest
    @MethodSource("getDrivers")
    fun `boost should change to active and perform action`(driver: WebDriver) {
        with(driver) {
            // given
            get("${getServer()}?acct=cookie_mumbles@ohai.social")
            assertThat(findSnacbar().getClases()).containsOnly("tweet_footer") // no enabled
            val firstToot = findFirstToot()
            val boostBtn = firstToot.getBoostBtn()
            assertThat(boostBtn.getClases()).doesNotContain("active")

            // when
            boostBtn.click()

            // then
            assertThat(findSnacbar().getClases()).isNotEqualTo(listOf("tweet_footer", "show"))
            assertThat(boostBtn.getClases()).contains("active")
            // and then
            firstToot.getTootTextElement().click()
            assertThat(mastoFindBoostButton().getClases()).contains("active")

            // finally
            mastoFindBoostButton().click()
        }
    }

    @ParameterizedTest
    @MethodSource("getDrivers")
    fun `favorite should change to active and perform action`(driver: WebDriver) {
        with(driver) {
            // given
            get("${getServer()}?acct=cookie_mumbles@ohai.social")
            assertThat(findSnacbar().getClases()).containsOnly("tweet_footer") // no enabled
            val firstToot = findFirstToot()
            val faveBtn = firstToot.getFaveBtn()
            assertThat(faveBtn.getClases()).doesNotContain("active")

            // when
            faveBtn.click()

            // then
            assertThat(findSnacbar().getClases()).isNotEqualTo(listOf("tweet_footer", "show"))
            assertThat(faveBtn.getClases()).contains("active")
            // and then
            firstToot.getTootTextElement().click()
            assertThat(mastoFindFaveButton().getClases()).contains("active")

            // finally
            mastoFindFaveButton().click()
        }
    }

    @ParameterizedTest
    @MethodSource("getDrivers")
    fun `clicking an avi should open the localized user profile`(driver: WebDriver) {
        with(driver) {
            // given
            get("${getServer()}?acct=cookie_mumbles@ohai.social")

            // when
            findFirstToot().getAvi().click()

            // then
            assertThat(currentUrl)
                .isEqualTo("https://techhub.social/@cookie_mumbles@ohai.social")
        }
    }

    @ParameterizedTest
    @MethodSource("getDrivers")
    fun `copy should show snacbar with info`(driver: WebDriver) {
        // NOTE: Same as in GeneralAndLoggedOutTest
        with(driver) {
            // given
            get("${getServer()}?acct=cookie_mumbles@ohai.social&log=d")
            assertThat(findSnacbar().getClases()).containsOnly("tweet_footer") // no enabled
            waitForPageLoaded()

            // when
            findFirstToot().getCopyBtn().click()

            // then
            val snacbar = findSnacbar()
            assertThat(snacbar.getClases()).containsOnly("tweet_footer", "show")
            assertThat(snacbar.getSnacText().text)
                .isEqualTo("Copied toot url. Now paste it in your mastodon search.")
        }
    }
}
