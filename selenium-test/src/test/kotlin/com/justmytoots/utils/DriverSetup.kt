package com.justmytoots.utils

import io.github.bonigarcia.wdm.WebDriverManager
import org.openqa.selenium.WebDriver
import org.openqa.selenium.firefox.FirefoxDriver
import org.openqa.selenium.firefox.FirefoxOptions

val debugging = false

fun getServer() =
    if (System.getenv().containsKey("CI_BUILD")) "https://staging.justmytoots.com"
    else "http://localhost:8008"

fun startDrivers(): List<FirefoxDriver> {
    WebDriverManager.firefoxdriver().setup()
    val options = FirefoxOptions()
    if (!debugging) {
        options.setHeadless(true)
    }
    return listOf(FirefoxDriver(options))
}

fun List<WebDriver>.closeUnlessTesting() {
    if (!debugging) {
        forEach { it.quit() }
    }
}
