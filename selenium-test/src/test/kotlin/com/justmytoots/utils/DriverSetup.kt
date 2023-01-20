package com.justmytoots.utils

import io.github.bonigarcia.wdm.WebDriverManager
import org.openqa.selenium.WebDriver
import org.openqa.selenium.firefox.FirefoxDriver
import org.openqa.selenium.firefox.FirefoxOptions

val localDebugging = false

fun getServer() = if (isCi()) "https://staging.justmytoots.com" else "http://localhost:8008"

private fun isCi() = System.getenv().containsKey("CI_BUILD")

fun startDrivers(): List<FirefoxDriver> {
    WebDriverManager.firefoxdriver().setup()
    val options = FirefoxOptions()
    if (!localDebugging || isCi()) {
        options.setHeadless(true)
    }
    return listOf(FirefoxDriver(options))
}

fun List<WebDriver>.closeUnlessTesting() {
    if (!localDebugging || isCi()) {
        forEach { it.quit() }
    }
}
