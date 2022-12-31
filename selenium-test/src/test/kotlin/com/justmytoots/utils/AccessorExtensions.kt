package com.justmytoots.utils

import java.time.Duration
import org.openqa.selenium.*
import org.openqa.selenium.support.ui.ExpectedConditions
import org.openqa.selenium.support.ui.WebDriverWait

fun WebDriver.waitUntilPageIsReady() {
    WebDriverWait(this, Duration.ofSeconds(2)).until {
        (this as JavascriptExecutor).executeScript("return document.readyState") == "complete"
    }
}

fun WebDriver.waitForElement(locator: By, duration: Duration = Duration.ofSeconds(1)) =
    WebDriverWait(this, duration).until(ExpectedConditions.presenceOfElementLocated(locator))

fun WebDriver.waitForElements(locator: By, duration: Duration = Duration.ofSeconds(1)) =
    WebDriverWait(this, duration).until(ExpectedConditions.presenceOfAllElementsLocatedBy(locator))

fun WebElement.waitForElement(locator: By, duration: Duration = Duration.ofSeconds(1)) =
    WebDriverWait((this as WrapsDriver).wrappedDriver, duration)
        .until(ExpectedConditions.presenceOfElementLocated(locator))

fun WebElement.waitForAllElements(locator: By, duration: Duration = Duration.ofSeconds(1)) =
    WebDriverWait((this as WrapsDriver).wrappedDriver, duration)
        .until(ExpectedConditions.presenceOfAllElementsLocatedBy(locator))

fun WebElement.getClases() = getAttribute("class").split(" ")
