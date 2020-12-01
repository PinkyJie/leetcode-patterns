const { Heap } = require('../_utils');

/**
 *
 * Problem:
 * Given a set of investment projects with their respective profits, we need to find
 * the most profitable projects. We are given an initial capital and are allowed to
 * invest only in a fixed number of projects. Our goal is to choose projects that
 * give us the maximum profit. Write a function that returns the maximum total
 * capital after selecting the most profitable projects. We can start an investment
 * project only when we have the required capital. Once a project is selected, we can
 * assume that its profit has become our capital.
 * https://leetcode.com/problems/ipo/
 *
 * Example 1:
 * Input: Project Capitals=[0,1,2], Project Profits=[1,2,3], Initial Capital=1,
 *  Number of Projects=2
 * Output: 6
 * Explanation:
 *  1. With initial capital of 1, we will start the second project which
 * will give us profit of 2. Once we selected our first project, our total capital
 * will become 3 (profit + initial capital).
 *  2. With 3 capital, we will select the third project, which will give us 3
 * profit.
 * After the completion of the two projects, our total capital will be 6 (1+2+3).
 *
 * Example 2:
 * Input: Project Capitals=[0,1,2,3], Project Profits=[1,2,3,5], Initial Capital=0,
 *  Number of Projects=3
 * Output: 8
 * Explanation:
 *  1. With 0 capital, we can only select the first project, bringing out capital
 * to 1.
 *  2. Next, we will select the second project, which will bring our capital to 3.
 *  3. Next, we will select the fourth project, giving us a profit of 5.
 * After selecting the three projects, our total capital will be 8 (1+2+5).
 *
 *
 * Time: O(nlog(n) + klog(n))
 * Space: O(n)
 *
 * @param {number} numberOfProjects
 * @param {number} initialCapital
 * @param {number[]} profits
 * @param {number[]} capitals
 * @return {number}
 */
function maximizeCapital(numberOfProjects, initialCapital, profits, capitals) {
  let currentCapital = initialCapital;

  /**
   * To get the maximum profit, we should always choose the max profit project which
   * we have enough capital to buy, so there are 2 factors to consider: capital and
   * profit. To make sure we can always get the max profit project effectively, we
   * need to maintain a max heap for profit.
   *  * What item to push to the max heap? We
   * should always push the projects which we have enough capital to buy into the
   * max heap, so the top item in the max heap will be the optimal project to buy
   * with our current capital (max profit project with our current capital).
   *  * Then how to we get all these projects which we have enough capital? We need
   * to order the projects by the capital from the smallest to the biggest. That's
   * where min heap for capital comes into play.
   */
  const maxProfitHeap = new Heap((a, b) => a.profit - b.profit);
  const minCapitalHeap = new Heap((a, b) => b.capital - a.capital);

  /**
   * We first push all the items into the min heap for capital, this can help us
   * get all the project list which we can buy with our current capital in hands
   * quickly.
   * Time: O(n * log(n)) <- do insertion n times
   */
  for (let i = 0; i < profits.length; i++) {
    const item = {
      profit: profits[i],
      capital: capitals[i],
    };
    minCapitalHeap.push(item);
  }
  /**
   * Time: O(k * log(n)), the loop will run for k times, and each item is at most
   * being pop() twice and push() once.
   */
  while (numberOfProjects > 0) {
    /**
     * Push all the projects we can buy (current capital larger than its capital)
     * to the max heap for profit.
     */
    while (
      minCapitalHeap.size() > 0 &&
      currentCapital >= minCapitalHeap.peek().capital
    ) {
      maxProfitHeap.push(minCapitalHeap.pop());
    }
    // if no items is being pushed, than our current capital can't buy anything
    if (maxProfitHeap.size() === 0) {
      break;
    }
    // the top item from the max heap for profit is our optimal project to buy
    currentCapital += maxProfitHeap.pop().profit;
    numberOfProjects--;
  }

  return currentCapital;
}

// Test
// console.log(maximizeCapital(2, 1, [1, 2, 3], [0, 1, 2])); // 6
console.log(maximizeCapital(10, 0, [1, 2, 3], [0, 1, 2])); // 6
// console.log(maximizeCapital(3, 0, [1, 2, 3, 5], [0, 1, 2, 3])); // 8
