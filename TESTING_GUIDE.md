# Testing Guide - Selenium + Pytest E2E Tests

## Overview

This document describes the automated end-to-end testing suite for the Todo application. The tests use **Selenium WebDriver** to simulate real user interactions and **Pytest** as the test framework.

## Testing Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| Test Framework | Pytest | 8.3.2 |
| Browser Automation | Selenium WebDriver | 4.24.0 |
| WebDriver Manager | webdriver-manager | 4.0.2 |
| Browser | Chrome | Latest |
| Python | Python 3 | 3.11.9+ |

## Test Architecture

```
┌─────────────┐
│   Pytest    │  Test Runner & Assertions
└──────┬──────┘
       │
┌──────▼──────┐
│  Selenium   │  Browser Automation
└──────┬──────┘
       │
┌──────▼──────┐
│   Chrome    │  Real Browser Instance
└──────┬──────┘
       │
┌──────▼──────┐
│  Frontend   │  http://localhost:3001
└──────┬──────┘
       │
┌──────▼──────┐
│  Backend    │  http://localhost:5000
└──────┬──────┘
       │
┌──────▼──────┐
│   SQLite    │  backend/db/database.sqlite
└─────────────┘
```

## Test Cases

### Test 1: Add Task
**Purpose:** Validates task creation functionality

**Steps:**
1. Navigate to the application
2. Locate the input field
3. Type a new task title
4. Press Enter or click Add button
5. Verify task appears in the list

**Verification:**
- Task text is present in the DOM
- Task is visible on the page

**Expected Result:** ✅ PASS

---

### Test 2: Toggle Complete
**Purpose:** Validates task status update

**Steps:**
1. Add a new task
2. Click the checkbox or task item
3. Verify task has completed styling

**Verification:**
- Task has `line-through` style OR
- Task has `completed` class OR
- Checkbox is checked

**Expected Result:** ✅ PASS

---

### Test 3: Filter Active
**Purpose:** Validates the "Active" filter functionality

**Steps:**
1. Create 3 tasks
2. Mark 1 task as completed
3. Click "Active" filter button
4. Verify only 2 incomplete tasks are visible

**Verification:**
- Only active (incomplete) tasks are displayed
- Completed tasks are hidden

**Expected Result:** ✅ PASS

---

### Test 4: Filter Completed
**Purpose:** Validates the "Completed" filter functionality

**Steps:**
1. Create 3 tasks
2. Mark 1 task as completed
3. Click "Completed" filter button
4. Verify only 1 completed task is visible

**Verification:**
- Only completed tasks are displayed
- Active tasks are hidden

**Expected Result:** ✅ PASS

---

### Test 5: Delete Task
**Purpose:** Validates task deletion functionality

**Steps:**
1. Add a new task
2. Hover over the task (to reveal delete button)
3. Click the delete button
4. Verify task is removed from the DOM

**Verification:**
- Task text is no longer in the page source
- Task count decreases

**Expected Result:** ✅ PASS

## Setup Instructions

### Prerequisites

1. **Python 3.11+** installed
   ```bash
   python --version
   ```

2. **Chrome Browser** installed (latest version)

3. **Backend API** running on `http://localhost:5000`

4. **Frontend App** running on `http://localhost:3001`

### Installation

1. Navigate to the tests directory:
   ```bash
   cd tests
   ```

2. Create a virtual environment (recommended):
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - Windows:
     ```bash
     venv\Scripts\activate
     ```
   - Linux/Mac:
     ```bash
     source venv/bin/activate
     ```

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Running Tests

### Method 1: Using the Batch Script (Windows)

Simply double-click or run:
```bash
run-tests.bat
```

This script will:
- Check Python installation
- Create/activate virtual environment
- Install dependencies
- Run all tests with verbose output

### Method 2: Manual Execution

1. Ensure backend and frontend are running

2. Activate virtual environment:
   ```bash
   cd tests
   venv\Scripts\activate
   ```

3. Run all tests:
   ```bash
   pytest test_todo_app.py -v
   ```

4. Run specific test:
   ```bash
   pytest test_todo_app.py::TestTodoApp::test_add_task -v
   ```

5. Run with detailed output:
   ```bash
   pytest test_todo_app.py -v --tb=short --color=yes
   ```

## Test Output

### Successful Test Run

```
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║  🧪 TODO APP - END-TO-END TEST SUITE                      ║
║  📦 Selenium WebDriver + Pytest                           ║
║  🎯 Testing: Frontend -> API -> Database Integration      ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝

🌐 Starting Chrome WebDriver...
✓ Chrome WebDriver initialized

tests/test_todo_app.py::TestTodoApp::test_add_task 
🧪 TEST 1: Add Task
   ✓ Task added successfully: 'Test Task - Automated Selenium Test'
PASSED

tests/test_todo_app.py::TestTodoApp::test_toggle_complete 
🧪 TEST 2: Toggle Task Completion
   ✓ Task marked as completed: 'Task to Complete'
PASSED

tests/test_todo_app.py::TestTodoApp::test_filter_active 
🧪 TEST 3: Filter Active Tasks
   ✓ Active filter working: 2 active tasks visible
PASSED

tests/test_todo_app.py::TestTodoApp::test_filter_completed 
🧪 TEST 4: Filter Completed Tasks
   ✓ Completed filter working: Completed tasks visible
PASSED

tests/test_todo_app.py::TestTodoApp::test_delete_task 
🧪 TEST 5: Delete Task
   ✓ Task deleted successfully: 'Task to Delete'
PASSED

🛑 Closing Chrome WebDriver...
✓ Chrome WebDriver closed

╔════════════════════════════════════════════════════════════╗
║  ✅ Test Suite Execution Complete                         ║
╚════════════════════════════════════════════════════════════╝

===================== 5 passed in 45.23s =====================
```

## Test Configuration

### conftest.py

The `conftest.py` file contains:
- WebDriver setup and teardown
- Chrome options configuration
- Test fixtures
- Session-level hooks

**Key Features:**
- Automatic ChromeDriver installation
- Browser window maximization
- Implicit wait configuration
- Graceful cleanup

### Chrome Options

```python
chrome_options.add_argument("--start-maximized")
chrome_options.add_argument("--disable-blink-features=AutomationControlled")
```

Optional headless mode (for CI/CD):
```python
chrome_options.add_argument("--headless")
chrome_options.add_argument("--no-sandbox")
```

## Troubleshooting

### Common Issues

1. **ChromeDriver not found**
   - Solution: webdriver-manager will auto-download it
   - Ensure internet connection is available

2. **Connection refused to localhost:3001**
   - Solution: Start the frontend application first
   ```bash
   npm run dev
   ```

3. **Connection refused to localhost:5000**
   - Solution: Start the backend API first
   ```bash
   cd backend
   npm start
   ```

4. **Element not found errors**
   - Solution: Increase implicit wait time in conftest.py
   - Check if selectors match your frontend implementation

5. **Tests fail randomly**
   - Solution: Add explicit waits using WebDriverWait
   - Increase sleep times between actions

### Debug Mode

Run tests with maximum verbosity:
```bash
pytest test_todo_app.py -vv -s --tb=long
```

## Test Coverage

Current test coverage: **100%** of core user flows

| Feature | Test Coverage |
|---------|--------------|
| Add Task | ✅ Covered |
| Toggle Complete | ✅ Covered |
| Filter Active | ✅ Covered |
| Filter Completed | ✅ Covered |
| Delete Task | ✅ Covered |

## CI/CD Integration

For automated testing in CI/CD pipelines:

```yaml
# Example GitHub Actions workflow
- name: Run E2E Tests
  run: |
    cd tests
    pip install -r requirements.txt
    pytest test_todo_app.py --headless
```

## Best Practices

1. **Always run backend and frontend before tests**
2. **Use virtual environments** to isolate dependencies
3. **Keep ChromeDriver updated** via webdriver-manager
4. **Add explicit waits** for dynamic content
5. **Clean up test data** after each test run
6. **Run tests in isolation** (each test should be independent)

## Extending Tests

To add new test cases:

1. Add method to `TestTodoApp` class
2. Use the `driver` fixture
3. Follow the AAA pattern (Arrange, Act, Assert)
4. Add descriptive docstrings

Example:
```python
def test_edit_task(self, driver):
    """Test Case 6: Validates task editing"""
    # Arrange
    driver.get(FRONTEND_URL)
    
    # Act
    # ... test steps ...
    
    # Assert
    assert expected_result
```

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review test output logs
3. Verify all services are running
4. Check browser console for errors
