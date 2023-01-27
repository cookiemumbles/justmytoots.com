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

class LoggingInTest {

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
            drivers.forEach { it.quit() }
        }

        @JvmStatic
        fun getDrivers(): List<WebDriver> {
            return drivers
        }
    }

    @ParameterizedTest
    @MethodSource("getDrivers")
    fun `should login and out correctly`(driver: WebDriver) {
        with(driver) {
            // given
            get("${getServer()}?acct=cookie_mumbles@ohai.social")

            // when
            get("${getServer()}?acct=cookie_mumbles@ohai.social&log=d")
            findLoginBtn().click()
            findElement(By.id("input_server")).sendKeys("techhub.social")
            findElement(By.id("btn_action_login")).click()
            mastoFindEmailField().sendKeys(System.getenv("MASTO_LOGIN_TEST_USER"))
            mastoFindPassField().sendKeys(System.getenv("MASTO_LOGIN_TEST_PASS"))
            findElement(By.name("button")).click()
            waitForElements(By.name("button"), Duration.ofSeconds(3))
                .filter { it.text.uppercase() == "AUTHORIZE" }
                .map { it.click() }
            waitForPageLoaded() // wait because otherwise the 2nd part of the login is not

            // then
            assertThat(findLoginBtn().text).isEqualTo("Logout")

            // given
            findLoginBtn().click()
            assertThat(findLoginBtn().text).isEqualTo("Login")
        }
    }
}
