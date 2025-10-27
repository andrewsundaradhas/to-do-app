@echo off
color 0A
echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║                                                                ║
echo ║     PUSH TO GITHUB - Step by Step                             ║
echo ║                                                                ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

REM Refresh PATH to include Git
set PATH=%PATH%;C:\Program Files\Git\cmd

echo Step 1: Checking Git status...
echo.
git status
echo.

echo ════════════════════════════════════════════════════════════════
echo Step 2: Adding all files to Git...
echo ════════════════════════════════════════════════════════════════
echo.
git add .
echo.
echo ✓ All files added!
echo.

echo ════════════════════════════════════════════════════════════════
echo Step 3: Creating commit...
echo ════════════════════════════════════════════════════════════════
echo.
git commit -m "Initial commit: Full-stack Todo App with E2E testing"
echo.
echo ✓ Commit created!
echo.

echo ════════════════════════════════════════════════════════════════
echo Step 4: Setting up GitHub remote
echo ════════════════════════════════════════════════════════════════
echo.
echo Please create a repository on GitHub first:
echo 1. Go to https://github.com/new
echo 2. Create a new repository (don't initialize with README)
echo 3. Copy the repository URL
echo.
echo Example: https://github.com/yourusername/premium-todo-app.git
echo.
set /p REPO_URL="Enter your GitHub repository URL: "
echo.

if "%REPO_URL%"=="" (
    echo ERROR: No URL provided!
    pause
    exit /b 1
)

echo Adding remote origin...
git remote add origin %REPO_URL%
echo.
echo ✓ Remote added!
echo.

echo ════════════════════════════════════════════════════════════════
echo Step 5: Pushing to GitHub
echo ════════════════════════════════════════════════════════════════
echo.
echo Setting main branch...
git branch -M main
echo.
echo Pushing to GitHub...
git push -u origin main
echo.

if errorlevel 1 (
    echo.
    echo ════════════════════════════════════════════════════════════════
    echo ⚠️  Push failed! Common issues:
    echo ════════════════════════════════════════════════════════════════
    echo.
    echo 1. Authentication required:
    echo    - You may need to enter GitHub username and password
    echo    - Or set up SSH keys
    echo    - Or use GitHub CLI: gh auth login
    echo.
    echo 2. Repository already exists:
    echo    - Remove remote: git remote remove origin
    echo    - Then run this script again
    echo.
    echo 3. Wrong URL:
    echo    - Check the repository URL is correct
    echo.
    pause
    exit /b 1
)

echo.
echo ════════════════════════════════════════════════════════════════
echo ✅ SUCCESS! Repository pushed to GitHub!
echo ════════════════════════════════════════════════════════════════
echo.
echo Your repository is now at:
echo %REPO_URL%
echo.
echo Next steps:
echo 1. Visit your GitHub repository
echo 2. Add a description and topics
echo 3. Share the link with your faculty!
echo.
echo ════════════════════════════════════════════════════════════════
pause
