package com.justmytoots.utils

import java.time.Duration
import org.openqa.selenium.By
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement

// nav

fun WebDriver.findLoginBtn() = findElement(By.id("btn_login"))

fun WebDriver.findOptionsBtn() = findElement(By.id("btn_options"))

fun WebDriver.findAboutBtn() = findElement(By.id("btn_about"))

// options

fun WebDriver.findOptionsContainer() = findElement(By.id("options_container"))

fun WebDriver.findOptionLabelReplies() = findElement(By.id("checkbox_replies_label"))

fun WebDriver.findOptionCheckReplies() = findElement(By.id("checkbox_replies"))

fun WebDriver.findOptionLabelMedia() = findElement(By.id("checkbox_media_label"))

fun WebDriver.findOptionCheckMedia() = findElement(By.id("checkbox_media"))

// toots

fun WebDriver.findToots() =
    waitForElement(By.id("tweet_list"), Duration.ofSeconds(3))
        .waitForAllElements(By.tagName("li"), Duration.ofSeconds(5)) // sometimes very slow

fun List<WebElement>.mapToTootIds() =
    map { it.findElement(By.cssSelector("*")) }.map { it.getAttribute("data-toot-id") }

fun WebDriver.waitForPageLoaded() {
    findToots()
}

fun WebDriver.findFirstToot() = findToots().first()

fun WebElement.getAvi() = findElement(By.className("avi_container"))

fun WebElement.getTootTextElement() = findElement(By.className("toot_text"))

fun WebElement.getBoostBtn() = findElement(By.className("btn_action_boost"))

fun WebElement.getFaveBtn() = findElement(By.className("btn_action_favorite"))

fun WebElement.getCopyBtn() = findElement(By.className("btn_action_copy"))

// snacbar

fun WebDriver.findSnacbar() = findElement(By.id("snackbar"))

fun WebElement.getSnacText() = findElement(By.className("tweet_header"))

// modal

fun WebDriver.findModalBackground() = findElement(By.id("modal_background"))

fun WebDriver.findModalClose() = findElement(By.id("model_close"))

// error page

fun WebDriver.findPageError() = waitForElement(By.className("toot_content"), Duration.ofSeconds(2))

fun WebElement.getErrorTitle() = findElement(By.tagName("h3"))
