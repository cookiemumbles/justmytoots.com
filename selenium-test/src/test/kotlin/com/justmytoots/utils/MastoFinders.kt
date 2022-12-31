package com.justmytoots.utils

import java.time.Duration
import org.openqa.selenium.By
import org.openqa.selenium.WebDriver

fun WebDriver.mastoFindBoostButton() =
    waitForElements(By.className("detailed-status__button"))[1].findElement(By.tagName("button"))

fun WebDriver.mastoFindFaveButton() =
    waitForElements(By.className("detailed-status__button"))[2].findElement(By.tagName("button"))

fun WebDriver.mastoFindPassField() = waitForElement(By.id("user_password"), Duration.ofSeconds(5))

fun WebDriver.mastoFindEmailField() = waitForElement(By.id("user_email"), Duration.ofSeconds(5))
