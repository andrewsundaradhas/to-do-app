@echo off
REM Install Python dependencies
pip install -r tests/requirements.txt

REM Run the Selenium tests
python -m pytest tests/test_selenium_demo.py -v

REM Keep the window open to see the results
pause
