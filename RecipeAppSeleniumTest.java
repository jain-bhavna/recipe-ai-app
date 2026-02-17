package tests;

import org.openqa.selenium.By;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class RecipeAppSeleniumTest {

    private static WebDriver driver;
    private static WebDriverWait wait;

    private static final String BASE_URL = "http://localhost:3000";
    private static final String DRIVER_PATH = "C:\\selenium\\chromedriver.exe";
    private static final String SCREENSHOT_DIR = "./screenshots/";

    // Test Data
    private static final String TEST_USER_NAME = "Selenium User";
    private static String TEST_EMAIL; // ✅ dynamic now
    private static final String TEST_PASSWORD = "Test@12345";
    private static final String IMAGE_PATH = "C:\\testdata\\food.jpg";

    public static void main(String[] args) {
        log("Test Suite Started");

        try {
            setup();

            // ✅ generate unique email each run
            TEST_EMAIL = generateUniqueEmail();
            log("Using test email: " + TEST_EMAIL);

            testRegistration();
            testLogin();
            testHomePage();
            testImageUploadAndDetection();

            log("Test Suite Completed Successfully");

        } catch (Exception e) {
            log("CRITICAL FAILURE: " + e.getMessage());
            e.printStackTrace();
        } finally {
            teardown();
        }
    }

    private static void setup() {
        log("Setting up WebDriver...");
        System.setProperty("webdriver.chrome.driver", DRIVER_PATH);

        ChromeOptions options = new ChromeOptions();
        options.addArguments("--start-maximized");
        options.addArguments("--remote-allow-origins=*");

        driver = new ChromeDriver(options);
        wait = new WebDriverWait(driver, Duration.ofSeconds(15));

        new File(SCREENSHOT_DIR).mkdirs();
    }

    private static void teardown() {
        if (driver != null) {
            log("Tearing down WebDriver...");
            driver.quit();
        }
    }

    // =========================
    // TESTS
    // =========================

    private static void testRegistration() {
        logTestStart("testRegistration");
        try {
            driver.get(BASE_URL + "/register");
            demoPause();

            typeWhenReady(By.name("name"), TEST_USER_NAME);
            demoPause();
            typeWhenReady(By.name("email"), TEST_EMAIL);
            demoPause();
            typeWhenReady(By.name("password"), TEST_PASSWORD);
            demoPause();

            clickWhenReady(By.xpath("//button[@type='submit' and contains(text(), 'Create Account')]"));
            demoPause();

            logPass("Registration flow submitted");

        } catch (Exception e) {
            handleFailure("testRegistration", e);
        }
    }

    private static void testLogin() {
        logTestStart("testLogin");
        try {
            driver.get(BASE_URL + "/");
            demoPause();

            typeWhenReady(By.name("email"), TEST_EMAIL);
            demoPause();
            typeWhenReady(By.name("password"), TEST_PASSWORD);
            demoPause();

            clickWhenReady(By.xpath("//button[@type='submit' and contains(text(), 'Sign in')]"));
            demoPause();

            wait.until(ExpectedConditions.urlContains("/home"));
            logPass("Login successful");

        } catch (Exception e) {
            handleFailure("testLogin", e);
        }
    }

    private static void testHomePage() {
        logTestStart("testHomePage");
        try {
            WebElement heroTitle = wait.until(
                ExpectedConditions.visibilityOfElementLocated(By.cssSelector("h1"))
            );

            if (heroTitle.isDisplayed()) {
                logPass("Hero section visible");
            }

            if (driver.getPageSource().contains("Welcome back")) {
                logPass("Welcome message verified");
            }

        } catch (Exception e) {
            handleFailure("testHomePage", e);
        }
    }

    private static void testImageUploadAndDetection() {
        logTestStart("testImageUploadAndDetection");
        try {
            WebElement fileInput = wait.until(
                ExpectedConditions.presenceOfElementLocated(By.cssSelector("input[type='file']"))
            );
            demoPause();

            fileInput.sendKeys(IMAGE_PATH);
            demoPause();

            WebElement analyzeButton = wait.until(
                ExpectedConditions.elementToBeClickable(
                    By.xpath("//button[contains(text(), 'Analyze Dish')]")
                )
            );

            demoPause();
            analyzeButton.click();
            demoPause();

            wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.xpath("//h2[contains(text(), 'Detection Results')]")
            ));

            WebElement dishName = driver.findElement(
                By.xpath("//h3[contains(@class, 'font-display')]")
            );

            logPass("Detection successful: " + dishName.getText());
            demoPause();

        } catch (Exception e) {
            handleFailure("testImageUploadAndDetection", e);
        }
    }

    // =========================
    // HELPERS
    // =========================

    private static void clickWhenReady(By locator) {
        wait.until(ExpectedConditions.elementToBeClickable(locator)).click();
    }

    private static void typeWhenReady(By locator, String text) {
        WebElement el = wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
        el.clear();
        el.sendKeys(text);
    }

    private static void captureScreenshot(String name) {
        try {
            File src = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
            String ts = LocalDateTime.now()
                    .format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
            File dest = new File(SCREENSHOT_DIR + name + "_" + ts + ".png");
            Files.copy(src.toPath(), dest.toPath(), StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException ignored) {}
    }

    private static void handleFailure(String test, Exception e) {
        log("FAIL: " + test + " → " + e.getMessage());
        captureScreenshot(test);
    }

    private static void demoPause() {
        try { Thread.sleep(1200); } catch (InterruptedException ignored) {}
    }

    private static String generateUniqueEmail() {
        return "selenium" + System.currentTimeMillis() + "@test.com";
    }

    private static void log(String m) { System.out.println(m); }
    private static void logTestStart(String t) { System.out.println("\n[START] " + t); }
    private static void logPass(String m) { System.out.println("[PASS] " + m); }
}
