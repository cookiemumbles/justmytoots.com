package com.justmytoots

import com.justmytoots.utils.*
import java.time.Duration
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.params.ParameterizedTest
import org.junit.jupiter.params.provider.MethodSource
import org.openqa.selenium.By
import org.openqa.selenium.WebDriver
import org.openqa.selenium.support.ui.ExpectedConditions
import org.openqa.selenium.support.ui.WebDriverWait

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
            get("${getServer()}?acct=cookie_mumbles@ohai.social.com")

            assertThat(findPageError().getErrorTitle().text)
                .isEqualTo("ERROR: Unable to connect to server.")
        }
    }

    @ParameterizedTest
    @MethodSource("getDrivers")
    fun `should load toots`(driver: WebDriver) {
        with(driver) {
            get("${getServer()}?acct=cookie_mumbles@ohai.social")

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
        }
    }

    @ParameterizedTest
    @MethodSource("getDrivers")
    fun `should show login`(driver: WebDriver) {
        with(driver) {
            // given
            get("${getServer()}?acct=cookie_mumbles@ohai.social")
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
            get("${getServer()}?acct=cookie_mumbles@ohai.social")
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
            get("${getServer()}?acct=cookie_mumbles@ohai.social")
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
            get("${getServer()}?acct=cookie_mumbles@ohai.social")
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
            get("${getServer()}?acct=cookie_mumbles@techhub.social")
            waitForPageLoaded()

            // when
            findFirstToot().getTootTextElement().click()

            // then
            assertThat(currentUrl).startsWith("https://techhub.social/@cookie_mumbles")
        }
    }

    @ParameterizedTest
    @MethodSource("getDrivers")
    fun `clicking an avi should open the user profile`(driver: WebDriver) {
        with(driver) {
            // given
            get("${getServer()}?acct=cookie_mumbles@ohai.social")
            waitForPageLoaded()

            // when
            findFirstToot().getAvi().click()

            // then
            assertThat(currentUrl).isEqualTo("https://ohai.social/@cookie_mumbles")
        }
    }

    @ParameterizedTest
    @MethodSource("getDrivers")
    fun `clicking image preview`(driver: WebDriver) {
        with(driver) {
            // given
            get("${getServer()}?acct=cookie_mumbles@ohai.social&testdata=true")
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

    @ParameterizedTest
    @MethodSource("getDrivers")
    fun `options menu opens and closes`(driver: WebDriver) {
        with(driver) {
            // given
            get("${getServer()}?acct=cookie_mumbles@ohai.social&testdata=true")
            // then
            assertThat(findOptionsContainer().isDisplayed).isFalse()

            // when
            findOptionsBtn().click()
            // then
            assertThat(findOptionsContainer().isDisplayed).isTrue()

            // when
            findOptionsBtn().click()
            WebDriverWait(this, Duration.ofSeconds(1))
                .until(ExpectedConditions.invisibilityOf(findOptionsContainer()))
            // then
            assertThat(findOptionsContainer().isDisplayed).isFalse()
        }
    }

    @ParameterizedTest
    @MethodSource("getDrivers")
    fun `options checkboxes work`(driver: WebDriver) {
        with(driver) {
            // given
            get("${getServer()}?acct=cookie_mumbles@ohai.social&testdata=true")
            findOptionsBtn().click()

            mapOf(
                    "checkbox_replies" to "replies",
                    "checkbox_media" to "media_only",
                    "checkbox_public" to "public_only"
                )
                .forEach { checkboxId, paramName ->
                    val checkbox = findElement(By.id(checkboxId))
                    val label = findElement(By.id("${checkboxId}_label"))
                    // initial
                    assertThat(checkbox.isSelected).isFalse()
                    assertThat(currentUrl).doesNotContain("$paramName=")

                    // when
                    label.click()
                    // then
                    assertThat(checkbox.isSelected).isTrue()
                    assertThat(currentUrl).contains("$paramName=true")

                    // when
                    label.click()
                    // then
                    assertThat(checkbox.isSelected).isFalse()
                    assertThat(currentUrl).doesNotContain("$paramName=true")
                }
        }
    }

    @ParameterizedTest
    @MethodSource("getDrivers")
    fun `options filter correctly`(driver: WebDriver) {
        with(driver) {
            // given
            val baseUrl = "${getServer()}?acct=cookie_mumbles@ohai.social&testdata=true"
            val tootIdPublicNoMedia = "109472499431799134"
            val tootIdReply = "109683800922113496"
            val tootIdUnlisted = "109683797485314862"
            val tootIdMedia = "109447955769349950"

            get("$baseUrl")
            assertThat(findToots().mapToTootIds()).contains(tootIdPublicNoMedia)
            assertThat(findToots().mapToTootIds()).doesNotContain(tootIdReply)
            assertThat(findToots().mapToTootIds()).contains(tootIdUnlisted)
            assertThat(findToots().mapToTootIds()).contains(tootIdMedia)

            get("$baseUrl&replies=true")
            assertThat(findToots().mapToTootIds()).contains(tootIdPublicNoMedia)
            assertThat(findToots().mapToTootIds()).contains(tootIdReply)
            assertThat(findToots().mapToTootIds()).contains(tootIdUnlisted)
            assertThat(findToots().mapToTootIds()).contains(tootIdMedia)

            get("$baseUrl&media_only=true")
            assertThat(findToots().mapToTootIds()).doesNotContain(tootIdPublicNoMedia)
            assertThat(findToots().mapToTootIds()).doesNotContain(tootIdReply)
            assertThat(findToots().mapToTootIds()).doesNotContain(tootIdUnlisted)
            assertThat(findToots().mapToTootIds()).contains(tootIdMedia)

            get("$baseUrl&public_only=true")
            assertThat(findToots().mapToTootIds()).contains(tootIdPublicNoMedia)
            assertThat(findToots().mapToTootIds()).doesNotContain(tootIdReply)
            assertThat(findToots().mapToTootIds()).doesNotContain(tootIdUnlisted)
        }
    }
}
