# BurpSuite Code Bruteforce Guide

## Overview
This guide helps you to use BurpSuite Community Edition to bruteforce codes and gain full access. Follow the steps below carefully.

## Prerequisites
- **BurpSuite Community Edition** (download [here](https://portswigger.net/burp/communitydownload))
- Basic understanding of BurpSuite proxy and intercept functionalities
- Node.js installed on your system

## Steps

1. **Download BurpSuite Community Edition**
   - Visit the [BurpSuite Community Edition Download Page](https://portswigger.net/burp/communitydownload) and install the software.

2. **Set Up BurpSuite Proxy**
   - Open BurpSuite and navigate to the **Proxy** tab.
   - Ensure the BurpSuite proxy is set up and working correctly with your browser.

3. **Navigate to the Login Page**
   - Open your browser (configured with BurpSuite’s proxy) and go to [login.live.com](https://login.live.com).
   
4. **Request a Code**
   - Enter any email in the login form and click the option to request a code.

5. **Activate Interception**
   - Go back to BurpSuite and turn on the **interceptor** in the **Proxy** tab.
   - In the browser, enter any random code into the field.

6. **Analyze the Intercepted Traffic**
   - Look through the intercepted traffic in BurpSuite and search for a field named **"secid"**.
   - Copy the value of **"secid"**.

7. **Edit the `index.js` File**
   - Open the provided `index.js` file in a code editor.
   - Paste the **"secid"** value into the corresponding section in `index.js`.
   - Also, input the email address you used earlier.

8. **Run the `index.js` Script**
   - In a terminal or command prompt, navigate to the directory containing `index.js`.
   - Execute the script by running:

     ```bash
     node index.js
     ```

   Depending on your computer's processing power, the script should be able to bruteforce the code within 15 minutes. Once completed, you should be able to input the code and gain full access automatically.

## Disclaimer
This guide is provided for educational purposes only. Unauthorized access to systems, accounts, or information is illegal and unethical. The responsibility for any misuse or actions taken with this information rests solely with the user. Use responsibly.
