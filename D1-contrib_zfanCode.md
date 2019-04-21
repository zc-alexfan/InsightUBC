# Author of this file: Zicong Fan
## Final Scores
- Final test pass rate
    - 100% 
- Coverage rate
    - 96.28%

## Contribution 
#### Implementation of `performQuery`
- `queryIDs`: extract a list of course sections that satisfies constraints on a query filter. 
- `getMissingDatasets`:  check for datasets needed for a query. if some datasets do not exist in memory, find the datasets from cache; else, reject the `performQuery` request before actually perform the query. 
- Regular expression for the operator IS
- `queryFormalizer` includes implementation for OPTIONS, such as extracting columns from the final query result, sorting a list of query result based on a key
- `NODES`: a list of end result operators for perform query for callback so that the code is easier to manage. 
- `addAllCacheDatasets `: given names of a list of datasets, cache them into memory
- created some unit tests in `PerformQuerySpec.ts`
- created some unit tests in `QuerySpec.ts`


#### Created helper functions for future use
- `putData`: put a list sections into the memory for debugging and experimenting purpose. 
- `showSomeData`: print the first n entries of a specific dataset in the memory for testing and experimenting purpose
- `prettyPrint`: print a query in good format so that it is easier to visualize the query. 
- Set behaviours such as `union`, `minus`, `intersection` 

## Key GitHub Commits
- [New data structure for universe for supporting multiple datasets ](https://github.com/CS310-2017Jan/cpsc310project_team15/commit/5e9be22241584f25ab483c213cf5a67010615e99) 
- [Regular Expression for IS](https://github.com/CS310-2017Jan/cpsc310project_team15/commit/462135d84e23fba8787468aa9116efe8fa5a467f) 
- [Able to cache dataset](https://github.com/CS310-2017Jan/cpsc310project_team15/commit/ec94eb0616ec3305b958655f780704103b5215b9) 
- [Protoype of PerformQuery is done](https://github.com/CS310-2017Jan/cpsc310project_team15/commit/e9817fcb668758481da5f711d2aa52fe1ca83072) 
- [Felper for performQuery, the main query process happens here](https://github.com/CS310-2017Jan/cpsc310project_team15/commit/1bb62153034ce1bcc4db3b67e95cdcc978a2e123)
- [Recursive filtering is done](https://github.com/CS310-2017Jan/cpsc310project_team15/commit/17cfa9f9c98a29adc4744f2ee2e039159294e15a)

## Retrospective
### what went well this deliverable
- We started early for the project. 
- Both teamates are responsible for the project. A good cooperation. 
- We are able to pass all tests. 
- We focus on communication. Before doing anything or decicions, we have a disscussion, and make sure everyone on the same page. 


### what went poorly
- Although started early, we finished the project a few days before the deadline. We could do a better job. 
- The code is a bit disorganized, becaues both of us don't have enough time to optimize the code to make it more organize and shorter. We will spend some time on documentation and organization the code. 
- AutoBot does not pass the test, although we have correct output, which wasted lots of time.


### how you will approach the next deliverable differently
- Still start early. 
- Use AutoBot wisely. One teamate use an autobot in the morning. And another use autobot in the evening, then we could reduce the autobot cycle to 1 autobot/6 hours. 
- Before the next deliverable, spend some time to do code cleansing, so that: 
    1. reuse more code (if two functions have similar structure, try to make into one function)
    2. put more detail into documentation so that when we go back we could still understand what each function is doing. 
- When autobot is available, try to do a autobot, so that we know the domain of the tests to better plan our implementation. 
