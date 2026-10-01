function isPalindrome(value) {
    // Only strings are valid
    if (typeof value !== "string") {
        return false;
    }

    // Convert to lowercase and remove spaces/punctuation
    const cleaned = value
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");

    // Compare the string with its reverse
    return cleaned === cleaned.split("").reverse().join("");
}

module.exports = isPalindrome;
