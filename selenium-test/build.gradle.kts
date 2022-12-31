plugins {
    kotlin("jvm") version "1.7.10"
    id("com.diffplug.spotless") version "6.8.0"
}

repositories { mavenCentral() }

spotless {
    kotlin { ktfmt().kotlinlangStyle() }
    kotlinGradle { ktfmt().kotlinlangStyle() }
}

dependencies {
    val seleniumVersion = "4.4.0"
    val webdriverManagerVersion = "5.3.0"
    val jUnitVersion = "5.9.0"

    testImplementation("org.seleniumhq.selenium:selenium-java:$seleniumVersion")
    testImplementation("io.github.bonigarcia:webdrivermanager:$webdriverManagerVersion")
    testImplementation("org.junit.jupiter:junit-jupiter:$jUnitVersion")
    testImplementation("org.assertj:assertj-core:3.21.0")
}

tasks.withType<Test> { useJUnitPlatform() }
