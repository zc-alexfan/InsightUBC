# Author of this file: Zicong Fan
## Final Scores
- Final test pass rate
    - 100% 
- Coverage rate
    - 95.71%

## Contribution 
#### Implementation of `MagicParser.ts`
This class is an extension of Parse5 in our project context. 

- `traverser`: recursively traverse the html tree, and do some operations specified by the argument callback
- `findElementsByTagName`: use the traverser to collect all elements with a specified tag name. 
- `findElementsByClassName`: use the traverser to collect all elements with a specified class name. 
- `tableRealizerForOneEntry ` (originated by me, modified by Robin): put every keys together to create a IRoomEntry object. 
- And other generic helper functions to implement the above.

#### Implemented a few tests for D2 in `RoomSpec.ts`
- Tests with query 
- Tests for edge cases

## Key GitHub Commits
- [General framework of MagicParser](https://github.com/CS310-2017Jan/cpsc310project_team15/commit/05d36fe03a4814f49c336d1ef501650163d0ea1f) 
- [Integrated with readAndParseRoom](https://github.com/CS310-2017Jan/cpsc310project_team15/commit/9e196476db580e70495173526a5fb9a8dec72d8f) 
- [Added Alex Tests](https://github.com/CS310-2017Jan/cpsc310project_team15/commit/47ed383cf4bae924ddb284e9ecbad42910c51f65) 

## Retrospective
### what went well this deliverable
- We discussed the entire framework of D2, and discussed the general implementation of this project, so that we both on the same page
- We started early for the project. 
- Both teamates are responsible for the project. A good cooperation. 
- After the discussion, we spent only one night to finished D2 implementation.


### what went poorly
- AutoBot fails for some subtle tests; regression happened. 
- Implementation was efficient, but really spent 90% of the time on figuring out what AutoBot really wants. 

### how you will approach the next deliverable differently
- Still start early. 
- When being frustrated by the failing AutoBot tests, try NOT to solve them in one day. Instead, spend 2 hours on finding those bugs, and if not found, try to do it on another day. (usually after being away from the project, we have some ideas to solve the unsolved problems).
- Use AutoBot wisely. One teamate use an autobot in the morning. And another use autobot in the evening, then we could reduce the autobot cycle to 1 autobot/6 hours. 


