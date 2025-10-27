"""
Pytest Configuration and Fixtures
Handles WebDriver setup and teardown
"""

import pytest
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager


@pytest.fixture(scope="function")
def driver():
    """
    Pytest fixture that provides a Chrome WebDriver instance
    Automatically sets up and tears down the browser for each test
    """
    print("\n🌐 Starting Chrome WebDriver...")
    
    # Configure Chrome options
    chrome_options = Options()
    chrome_options.add_argument("--start-maximized")
    chrome_options.add_argument("--disable-blink-features=AutomationControlled")
    chrome_options.add_experimental_option("excludeSwitches", ["enable-automation"])
    chrome_options.add_experimental_option('useAutomationExtension', False)
    
    # Optional: Run in headless mode (uncomment if needed)
    # chrome_options.add_argument("--headless")
    # chrome_options.add_argument("--no-sandbox")
    # chrome_options.add_argument("--disable-dev-shm-usage")
    
    # Initialize WebDriver
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)
    
    # Set implicit wait
    driver.implicitly_wait(10)
    
    print("✓ Chrome WebDriver initialized")
    
    yield driver
    
    # Teardown
    print("\n🛑 Closing Chrome WebDriver...")
    driver.quit()
    print("✓ Chrome WebDriver closed")


@pytest.fixture(scope="session", autouse=True)
def print_test_header():
    """Print test suite header"""
    print("""
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║  🧪 TODO APP - END-TO-END TEST SUITE                      ║
║  📦 Selenium WebDriver + Pytest                           ║
║  🎯 Testing: Frontend -> API -> Database Integration      ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
    """)
    yield
    print("""
╔════════════════════════════════════════════════════════════╗
║  ✅ Test Suite Execution Complete                         ║
╚════════════════════════════════════════════════════════════╝
    """)


def pytest_configure(config):
    """Configure pytest"""
    config.addinivalue_line(
        "markers", "e2e: mark test as end-to-end test"
    )
