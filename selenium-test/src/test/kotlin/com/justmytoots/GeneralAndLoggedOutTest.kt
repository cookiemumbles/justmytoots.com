package com.justmytoots

import com.justmytoots.utils.*
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.params.ParameterizedTest
import org.junit.jupiter.params.provider.MethodSource
import org.openqa.selenium.By
import org.openqa.selenium.WebDriver

class GeneralAndLoggedOutTest {

    companion object {
        private lateinit var drivers: List<WebDriver>

        @BeforeAll
        @JvmStatic
        internal fun beforeAll() {
            drivers = startDrivers()
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
    fun `without user`(driver: WebDriver) {
        with(driver) {
            get(getServer())

            assertThat(findPageError().getErrorTitle().text).isEqualTo("ERROR: No username found.")
        }
    }

    @ParameterizedTest
    @MethodSource("getDrivers")
    fun `with broken user`(driver: WebDriver) {
        with(driver) {
            get("${getServer()}?acct=cookie_mumbles@mastodon.social.com")

            assertThat(findPageError().getErrorTitle().text)
                .isEqualTo("ERROR: Unable to connect to server.")
        }
    }

    @ParameterizedTest
    @MethodSource("getDrivers")
    fun `should load toots`(driver: WebDriver) {
        with(driver) {
            get("${getServer()}?acct=cookie_mumbles@mastodon.social")

            assertThat(findToots()).hasSizeGreaterThan(5)
        }
    }

    @ParameterizedTest
    @MethodSource("getDrivers")
    fun `should show help`(driver: WebDriver) {
        with(driver) {
            // given
            get("${getServer()}")
            assertThat(findModalBackground().isDisplayed).isFalse()

            // when
            findAboutBtn().click()
            // then
            assertThat(findModalBackground().isDisplayed).isTrue()

            // when
            findModalClose().click()
            // then
            assertThat(findModalBackground().isDisplayed).isFalse()

            // TODO: This is probably why it doesn't work on ios
            // // when
            // findElement(By.id("btn_help")).click()
            // findElement(By.id("modal_background")).click()
            // // then
            // assertThat(findElement(By.id("modal_background")).isDisplayed).isFalse()
        }
    }

    @ParameterizedTest
    @MethodSource("getDrivers")
    fun `should show login`(driver: WebDriver) {
        with(driver) {
            // given
            get("${getServer()}?acct=cookie_mumbles@mastodon.social")
            assertThat(findModalBackground().isDisplayed).isFalse()

            // when
            findLoginBtn().click()
            // then
            assertThat(findModalBackground().isDisplayed).isTrue()

            // when
            findModalClose().click()
            // then
            assertThat(findModalBackground().isDisplayed).isFalse()
        }
    }

    @ParameterizedTest
    @MethodSource("getDrivers")
    fun `boost should show snacbar with error`(driver: WebDriver) {
        with(driver) {
            // given
            get("${getServer()}?acct=cookie_mumbles@mastodon.social")
            assertThat(findSnacbar().getClases()).containsOnly("tweet_footer") // no enabled
            waitForPageLoaded()

            // when
            findFirstToot().getBoostBtn().click()

            // then
            val snacbar = findSnacbar()
            assertThat(snacbar.getClases()).containsOnly("tweet_footer", "show")
            assertThat(snacbar.getSnacText().text).isEqualTo("Please log in or just copy the link.")
        }
    }

    @ParameterizedTest
    @MethodSource("getDrivers")
    fun `favorite should show snacbar with error`(driver: WebDriver) {
        with(driver) {
            // given
            get("${getServer()}?acct=cookie_mumbles@mastodon.social")
            assertThat(findSnacbar().getClases()).containsOnly("tweet_footer") // no enabled
            waitForPageLoaded()

            // when
            findFirstToot().getFaveBtn().click()

            // then
            val snacbar = findSnacbar()
            assertThat(snacbar.getClases()).containsOnly("tweet_footer", "show")
            assertThat(snacbar.getSnacText().text).isEqualTo("Please log in or just copy the link.")
        }
    }

    @ParameterizedTest
    @MethodSource("getDrivers")
    fun `copy should show snacbar with info`(driver: WebDriver) {
        with(driver) {
            // given
            get("${getServer()}?acct=cookie_mumbles@mastodon.social")
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

    @ParameterizedTest
    @MethodSource("getDrivers")
    fun `clicking a toot should open the toots`(driver: WebDriver) {
        with(driver) {
            // given
            get("${getServer()}?acct=cookie_mumbles@mastodon.social")
            waitForPageLoaded()

            // when
            findFirstToot().getTootTextElement().click()

            // then
            assertThat(currentUrl).startsWith("https://mastodon.social/@cookie_mumbles")
        }
    }

    @ParameterizedTest
    @MethodSource("getDrivers")
    fun `clicking an avi should open the user profile`(driver: WebDriver) {
        with(driver) {
            // given
            get("${getServer()}?acct=cookie_mumbles@mastodon.social")
            waitForPageLoaded()

            // when
            findFirstToot().getAvi().click()

            // then
            assertThat(currentUrl).isEqualTo("https://mastodon.social/@cookie_mumbles")
        }
    }

    @ParameterizedTest
    @MethodSource("getDrivers")
    fun `clicking image preview`(driver: WebDriver) {
        with(driver) {
            // given
            get("${getServer()}?acct=cookie_mumbles@mastodon.social&testdata=true")
            waitForPageLoaded()
            assertThat(findModalBackground().isDisplayed).isFalse()

            // when
            findElements(By.className("toot_pic")).first().click()
            // then
            assertThat(findModalBackground().isDisplayed).isTrue()

            // when
            findModalClose().click()
            // then
            assertThat(findModalBackground().isDisplayed).isFalse()
            assertThat(findSnacbar().getClases()).containsOnly("tweet_footer") // no enabled
        }
    }
}
