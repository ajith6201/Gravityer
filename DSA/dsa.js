function lengthOfLIS(nums) {
    if (!Array.isArray(nums)) {
        throw new Error("Input must be an array.");
    }

    if (nums.length === 0) {
        return 0;
    }

    let sub = [];
    let prev = new Array(nums.length).fill(-1); 

    let posAtLength = new Array(nums.length);

    for (let i = 0; i < nums.length; i++) {
        let pos = binarySearch(sub, nums, nums[i]);

        if (pos >= sub.length) {
            sub.push(i);
        } else {
            sub[pos] = i;
        }

        posAtLength[pos] = i;
        if (pos > 0) {
            prev[i] = posAtLength[pos - 1];
        }
    }

    let lis = [];
    let k = sub[sub.length - 1];
    while (k >= 0) {
        lis.push(nums[k]);
        k = prev[k];
    }

    lis.reverse();

    console.log("Longest Increasing Subsequence: ", lis);
    return lis.length;
}

function binarySearch(sub, nums, num) {
    let left = 0, right = sub.length;

    while (left < right) {
        let mid = Math.floor((left + right) / 2);
        if (nums[sub[mid]] < num) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return left;
}

try {
    const nums = [10, 9, 2, 5, 3, 7, 101, 18, 201, 170, 259, 1];
    console.log("Length of LIS:", lengthOfLIS(nums));  // Output: 4
} catch (error) {
    console.error(error.message);
}
