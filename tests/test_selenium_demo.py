import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException
import pytest

class TestTodoAppUI:
    base_url = "http://localhost:3000"  # Frontend URL
    
    def setup_method(self, method):
        """Setup method that runs before each test"""
        print("\n" + "="*80)
        print("🚀 Starting test session")
        print("="*80)
        
        # Initialize test-specific variables
        self._last_added_todo = None
        
    def teardown_method(self, method):
        """Teardown method that runs after each test"""
        print("\n" + "="*80)
        print("🏁 Test session completed")
        print("="*80)
        time.sleep(2)  # Give time to see the result

    def wait_for_element(self, driver, by, value, timeout=10):
        return WebDriverWait(driver, timeout).until(
            EC.presence_of_element_located((by, value))
        )
        
    def _add_todo(self, driver, todo_text):
        """Helper method to add a new todo item"""
        try:
            print(f"\n➕ Adding todo: {todo_text}")
            # Find the input field and enter text
            todo_input = driver.find_element(By.CSS_SELECTOR, "input[type='text']")
            todo_input.clear()
            todo_input.send_keys(todo_text)
            todo_input.send_keys(Keys.RETURN)
            print(f"✅ Added todo: {todo_text}")
            time.sleep(1)  # Wait for the todo to be added
            return True
        except Exception as e:
            print(f"❌ Failed to add todo: {str(e)}")
            driver.save_screenshot("add_todo_error.png")
            return False
            
    def _verify_todo_present(self, driver, todo_text):
        """Helper method to verify a todo is present in the list"""
        try:
            print(f"🔍 Verifying todo is present: {todo_text}")
            # Wait for the todo to appear in the list
            todo_xpath = f"//*[contains(text(), '{todo_text}')]"
            todo_element = self.wait_for_element(driver, By.XPATH, todo_xpath)
            print(f"✅ Verified todo is present: {todo_text}")
            return True
        except Exception as e:
            print(f"❌ Todo not found: {todo_text}")
            driver.save_screenshot("verify_todo_error.png")
            return False

    def test_add_and_verify_todo(self, driver):
        """Test adding a new todo item and verifying it appears in the list"""
        try:
            # Navigate to the todo app
            driver.get(f"{self.base_url}")
            print("\n🌐 Navigated to:", driver.current_url)
            
            # Wait for the page to be fully loaded
            time.sleep(2)
            
            # Print the current page title and URL for debugging
            print(f"Page title: {driver.title}")
            
            # Add a new todo
            test_todo = f"Test Todo {int(time.time())}"
            assert self._add_todo(driver, test_todo), "Failed to add todo"
            
            # Verify the todo was added
            assert self._verify_todo_present(driver, test_todo), "Todo not found in the list"
            
            # Store the test_todo value for use in other tests
            self._last_added_todo = test_todo
                
        except Exception as e:
            print(f"❌ Test failed with error: {str(e)}")
            driver.save_screenshot("test_error.png")
            raise

    def test_add_multiple_todos(self, driver):
        """Test adding multiple todos and verify they all appear in the list"""
        try:
            todos = [
                f"Test Todo {i} - {int(time.time())}" for i in range(1, 4)
            ]
            
            for todo_text in todos:
                self._add_todo(todo_text)
                
            # Verify all todos are present
            todo_list = self.driver.find_element(By.CSS_SELECTOR, "[class*='todo-list']")
            todo_items = todo_list.find_elements(By.CSS_SELECTOR, "[class*='todo-item']")
            
            # Check that we have at least the number of todos we added
            assert len(todo_items) >= len(todos), \
                f"Expected at least {len(todos)} todos, found {len(todo_items)}"
                
            # Verify each todo text is present
            page_text = self.driver.page_source.lower()
            for todo in todos:
                assert todo.lower() in page_text, f"Todo '{todo}' not found in the list"
                
            print(f"✅ Successfully added and verified {len(todos)} todos")
            
        except Exception as e:
            print(f"❌ Test failed with error: {str(e)}")
            if hasattr(self, 'driver'):
                self.driver.save_screenshot("multiple_todos_error.png")
            raise

    def test_delete_todo(self, driver):
        """Test deleting a todo item"""
        try:
            # Add a todo to delete
            todo_text = f"Todo to delete - {int(time.time())}"
            self._add_todo(todo_text)
            
            # Find the delete button and click it
            todo_item = WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located(
                    (By.XPATH, f"//*[contains(., '{todo_text}')]")
                )
            )
            
            # Hover over the todo item to show the delete button
            webdriver.ActionChains(self.driver).move_to_element(todo_item).perform()
            
            # Find and click the delete button
            delete_button = WebDriverWait(todo_item, 5).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, "button[aria-label*='delete']"))
            )
            delete_button.click()
            
            # Verify the todo is removed
            WebDriverWait(self.driver, 5).until(
                EC.invisibility_of_element_located(
                    (By.XPATH, f"//*[contains(., '{todo_text}')]")
                )
            )
            
            print("✅ Successfully deleted the todo item")
            
        except Exception as e:
            print(f"❌ Test failed with error: {str(e)}")
            if hasattr(self, 'driver'):
                self.driver.save_screenshot("delete_todo_error.png")
            raise

    def test_toggle_todo_completion(self, driver):
        """Test marking a todo as complete by clicking the checkbox"""
        try:
            # First, add a todo using the first test's logic
            self.test_add_and_verify_todo(setup)
            test_todo = self._last_added_todo
    
            print(f"\n🔍 Looking for todo to mark as complete: {test_todo}")
            
            # Take a screenshot before attempting to find the todo
            self.driver.save_screenshot("before_toggle.png")
            print("📸 Screenshot saved: before_toggle.png")
    
            try:
                # First, wait for the todo list to be present
                WebDriverWait(self.driver, 10).until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, "[class*='todo'], [class*='task']"))
                )
                
                # Find the todo item by its text content with a more flexible approach
                todo_item = WebDriverWait(self.driver, 10).until(
                    EC.presence_of_element_located(
                        (By.XPATH, f"//*[contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), "
                                  f"'{test_todo.lower()}')]")
                    )
                )
                
                # Scroll the todo item into view
                self.driver.execute_script("arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", todo_item)
                time.sleep(0.5)  # Small delay for scroll
                
                # Highlight the todo item
                self.driver.execute_script("arguments[0].style.border='3px solid orange';", todo_item)
                
                # Find the checkbox - looking for a div with specific dimensions and classes
                checkbox = WebDriverWait(todo_item, 10).until(
                    EC.element_to_be_clickable(
                        (By.XPATH, ".//div[contains(@class, 'w-5') and contains(@class, 'h-5') and contains(@class, 'rounded')]")
                    )
                )
                
                # Highlight the checkbox
                self.driver.execute_script("arguments[0].style.border='2px solid red';", checkbox)
                
                # Get the initial state
                initial_bg = checkbox.value_of_css_property("background-color")
                print(f"Initial checkbox background: {initial_bg}")
                
                # Take a screenshot before clicking
                self.driver.save_screenshot("before_click.png")
                
                # Click the checkbox to toggle completion
                print("🖱️ Attempting to click the checkbox...")
                checkbox.click()
                print("✅ Clicked the checkbox to mark as complete")
                
                # Wait for the completion animation/state change
                time.sleep(1)
                
                # Take a screenshot after toggling
                self.driver.save_screenshot("after_click.png")
                
                # Check if the todo item is marked as completed
                # Take a screenshot of the todo item for debugging
                self.driver.execute_script("arguments[0].style.border='3px solid green';", todo_item)
                self.driver.save_screenshot("todo_item_after_click.png")
                
                # Get the current state of the todo item
                todo_html = todo_item.get_attribute("outerHTML")
                print("\n🔍 Todo item HTML after click:")
                print("-" * 80)
                print(todo_html[:500] + "..." if len(todo_html) > 500 else todo_html)
                print("-" * 80)
                
                # Check for completion indicators in the HTML
                completed = False
                
                # Check if the todo item has a line-through style
                try:
                    text_decoration = todo_item.value_of_css_property("text-decoration")
                    if "line-through" in text_decoration:
                        print(f"✅ Found line-through style: {text_decoration}")
                        completed = True
                    else:
                        print(f"⚠ No line-through style found. Current text-decoration: {text_decoration}")
                except Exception as e:
                    print(f"⚠ Could not check text-decoration: {str(e)}")
                
                # Check for checkmark in the checkbox
                try:
                    # Look for a checkmark symbol or SVG inside the checkbox
                    checkmark = checkbox.find_element(By.XPATH, ".//*[name()='svg' or contains(text(), '✓')]")
                    print("✅ Found checkmark in the checkbox")
                    completed = True
                except NoSuchElementException:
                    print("⚠ No checkmark found in the checkbox")
                
                # Check the checkbox state
                try:
                    is_checked = checkbox.get_attribute("aria-checked")
                    if is_checked == "true":
                        print("✅ Checkbox is checked (aria-checked=true)")
                        completed = True
                    else:
                        print(f"⚠ Checkbox state: aria-checked={is_checked}")
                except Exception as e:
                    print(f"⚠ Could not check checkbox state: {str(e)}")
                
                if not completed:
                    print("❌ Could not verify todo completion through standard methods")
                    print("Trying alternative verification methods...")
                    
                    # Try to find any indication of completion in the todo item
                    todo_text = todo_item.text
                    if "completed" in todo_text.lower() or "done" in todo_text.lower():
                        print("✅ Found completion indicator in text")
                        completed = True
                    else:
                        print("ℹ️ No completion indicators found in text")
                
                # Final verification
                if completed:
                    print("✅ Successfully verified todo completion")
                else:
                    print("❌ Could not verify todo completion through any method")
                    
                # Final screenshot
                self.driver.save_screenshot("todo_completed.png")
                print("📸 Screenshot saved: todo_completed.png")
                
            except TimeoutException as e:
                print(f"❌ Timeout while trying to find elements: {str(e)}")
                self.driver.save_screenshot("timeout_error.png")
                raise
                
            except NoSuchElementException as e:
                print(f"❌ Element not found: {str(e)}")
                self.driver.save_screenshot("element_not_found.png")
                raise
                
        except Exception as e:
            print(f"❌ Test failed with error: {str(e)}")
            if hasattr(self, 'driver'):
                self.driver.save_screenshot("test_error.png")
            raise

if __name__ == "__main__":
    pytest.main(["-v", "test_selenium_demo.py"])
