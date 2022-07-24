export const sortedIndex = function(nums, target) {
  if (nums.length === 0) {
    return 0
  }
  let start = 0;
  let end = nums.length - 1;
  
  while(start < end){
      let mid = Math.floor((start+end)/2);
      if (nums[mid] === target) return mid;
      nums[mid] > target ? end = mid : start = mid + 1;
  }
  if (start === end){
      return target <= nums[start] ? start : start + 1;
  }
};
