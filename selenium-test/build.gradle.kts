plugins {
    kotlin("jvm") version "1.7.10"
}

repositories {
    mavenCentral()
}

dependencies {
    val fluentleniumVersion = "5.0.4"
    val seleniumVersion = "4.4.0"
    val webdriverManagerVersion = "5.3.0"
    val jUnitVersion = "5.9.0"
    val julToSlf4jVersion = "1.7.28"
    val kotlinLoggerVersion = "1.7.6"

    testImplementation("org.seleniumhq.selenium:selenium-java:$seleniumVersion")
    testImplementation("io.github.bonigarcia:webdrivermanager:$webdriverManagerVersion")
    testImplementation("org.junit.jupiter:junit-jupiter:$jUnitVersion")
    testImplementation("org.assertj:assertj-core:3.21.0")

//    testImplementation("org.fluentlenium:fluentlenium-junit-jupiter:$fluentleniumVersion")
//    testImplementation("org.fluentlenium:fluentlenium-assertj:$fluentleniumVersion")
//    testImplementation("org.slf4j:jul-to-slf4j:$julToSlf4jVersion")
//    testImplementation("io.github.microutils:kotlin-logging:$kotlinLoggerVersion")
}

tasks {
    withType<Test> {
        useJUnitPlatform()
        systemProperty("browser", System.getProperty("browser"))
    }
}
