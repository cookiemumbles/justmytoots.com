package com.justmytoots.utils

import java.time.Duration
import org.openqa.selenium.By
import org.openqa.selenium.WebDriver
import org.openqa.selenium.WebElement

fun WebDriver.findSnacbar() = findElement(By.id("snackbar"))

fun WebElement.getSnacText() = findElement(By.className("tweet_header"))

fun WebDriver.findToots() =
    waitForElement(By.id("tweet_list"), Duration.ofSeconds(3))
        .waitForAllElements(By.tagName("li"), Duration.ofSeconds(5)) // sometimes very slow

fun WebDriver.findFirstToot() = findToots().first()

fun WebElement.getAvi() = findElement(By.className("avi_container"))

fun WebElement.getTootTextElement() = findElement(By.className("toot_text"))

fun WebElement.getBoostBtn() = findElement(By.className("btn_action_boost"))

fun WebElement.getFaveBtn() = findElement(By.className("btn_action_favorite"))

fun WebElement.getCopyBtn() = findElement(By.className("btn_action_copy"))

fun WebDriver.findLoginBtn() = findElement(By.id("btn_login"))

fun WebDriver.findHelpBtn() = findElement(By.id("btn_help"))

fun WebDriver.findModalBackground() = findElement(By.id("modal_background"))

fun WebDriver.findModalClose() = findElement(By.id("model_close"))

fun WebDriver.waitForPageLoaded() {
    findToots()
}

fun WebDriver.findPageError() = waitForElement(By.className("tweet_text"), Duration.ofSeconds(2))

fun WebElement.getErrorTitle() = findElement(By.tagName("h3"))
